-- No seeded RSVPs: empty tables give actual counts of zero.
CREATE TABLE IF NOT EXISTS attendance (
  game_id TEXT NOT NULL,
  visitor_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (game_id, visitor_hash)
) WITHOUT ROWID;
