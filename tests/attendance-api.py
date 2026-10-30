"""Integration tests against `wrangler dev` and its real local D1 database."""
import concurrent.futures
import json
import os
import urllib.request
import urllib.error
import uuid

BASE = os.environ.get('ATTENDANCE_TEST_URL', 'http://127.0.0.1:8787')
GAME = '2026-12-04-logan'
OTHER = '2026-12-08-2'
a, b = str(uuid.uuid4()), str(uuid.uuid4())

def call(visitor, game=GAME, going=None, origin=BASE):
    headers = {'X-Visitor-ID': visitor, 'Origin': origin}
    data = None
    if going is not None:
        headers['Content-Type'] = 'application/json'
        data = json.dumps({'going': going}).encode()
    req = urllib.request.Request(BASE + '/api/attendance/' + game, headers=headers, data=data, method='GET' if going is None else 'PUT')
    try:
        with urllib.request.urlopen(req) as res:
            assert res.headers['Cache-Control'] == 'no-store'
            return res.status, json.load(res)
    except urllib.error.HTTPError as error:
        return error.code, json.load(error)

try:
    code, initial = call(a)
    assert code == 200 and not initial['going']
    initial_count = initial['count']
    assert call(a, going=True)[1] == dict(gameId=GAME, count=initial_count + 1, going=True)
    assert call(a)[1]['going']  # New HTTP request remembers the saved selection.
    assert call(b)[1] == dict(gameId=GAME, count=initial_count + 1, going=False)
    assert not call(a, OTHER)[1]['going']
    other_count = call(a, OTHER)[1]['count']
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
        responses = list(pool.map(lambda _: call(a, going=True), range(5)))
    assert all(code == 200 and data['count'] == initial_count + 1 for code, data in responses)
    assert call(b, going=True)[1]['count'] == initial_count + 2
    assert call(a, OTHER)[1]['count'] == other_count
    assert call(a, going=False)[1] == dict(gameId=GAME, count=initial_count + 1, going=False)
    assert call(a, going=False)[1]['count'] == initial_count + 1
    assert call(b, going=False)[1]['count'] == initial_count
    assert call(a, 'not-a-game')[0] == 404
    assert call('invalid')[0] == 400
    assert call(a, going=True, origin='https://unrelated.example')[0] == 403
    assert call(a, going='yes')[0] == 400
    print('PASS: D1 persistence, shared totals, separate games, concurrent duplicate prevention, idempotent cancel, invalid IDs/bodies and cross-origin rejection.')
finally:
    call(a, going=False)
    call(b, going=False)
