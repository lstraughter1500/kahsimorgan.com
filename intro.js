(() => {
  const overlay = document.querySelector('[data-intro-overlay]');
  if (!overlay) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const params = new URLSearchParams(location.search);
  const preview = params.get('intro') === 'preview';
  let seen = false;
  try { seen = sessionStorage.getItem('kahsiIntroSeen') === 'true'; } catch {}
  let raf, ended = false, started = false, lastTime = 0;
  const onResize = () => { if (started && !ended) render(lastTime); };
  window.addEventListener('resize', onResize);
  const page = [...document.querySelectorAll('body > header, body > main, body > footer')];
  const previousInert = page.map(el => el.inert);
  function finish() {
    if (ended) return;
    ended = true;
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', onResize);
    try { sessionStorage.setItem('kahsiIntroSeen', 'true'); } catch {}
    document.documentElement.classList.remove('intro-pending');
    document.body.classList.remove('intro-is-running');
    page.forEach((el, i) => { el.inert = previousInert[i]; });
    const restoreFocus = overlay.contains(document.activeElement);
    overlay.remove();
    if (restoreFocus) document.querySelector('.hero-actions a')?.focus({ preventScroll: true });
  }
  if (motion.matches || (seen && !preview)) { finish(); return; }
  overlay.hidden = false;
  document.body.classList.add('intro-is-running');
  page.forEach(el => { el.inert = true; });
  overlay.querySelector('.recruit-intro-skip').addEventListener('click', finish);
  motion.addEventListener('change', event => { if (event.matches) finish(); });
  const elements = {
    logo: overlay.querySelector('.recruit-intro-logo'),
    rule: overlay.querySelector('.recruit-intro-logo-rule'),
    standard: overlay.querySelector('.recruit-intro-standard'),
    name: overlay.querySelector('.recruit-intro-name'),
    motto: overlay.querySelector('.recruit-intro-motto'),
    classLine: overlay.querySelector('.recruit-intro-class'),
    brand: overlay.querySelector('.recruit-intro-brand'),
    back: overlay.querySelector('.recruit-intro-backdrop'),
    basket: overlay.querySelector('.recruit-basket'),
    shadow: overlay.querySelector('.recruit-basket-shadow'),
    soccer: overlay.querySelector('.recruit-soccer')
  };
  const clamp = v => Math.max(0, Math.min(1, v));
  const easeOut = v => 1 - (1 - clamp(v)) ** 3;
  function reveal(el, time, at, scale = false) {
    const p = easeOut((time - at) / 360);
    el.style.opacity = p;
    el.style.transform = `translateY(${(1 - p) * 8}px) scale(${scale ? .94 + .06 * p : 1})`;
  }
  // Closed-form ballistic arcs: gravity is constant; each impact loses energy.
  function bounce(seconds, height, gravity, restitution) {
    let impact = Math.sqrt(2 * height / gravity);
    if (seconds < impact) return { height: height - .5 * gravity * seconds ** 2, squash: 0 };
    let t = seconds - impact;
    let velocity = Math.sqrt(2 * gravity * height) * restitution;
    for (let i = 0; i < 10; i++) {
      const duration = 2 * velocity / gravity;
      if (t <= duration) return { height: Math.max(0, velocity * t - .5 * gravity * t * t), squash: Math.max(0, 1 - t / .055) };
      t -= duration;
      velocity *= restitution;
    }
    return { height: 0, squash: 0 };
  }
  function render(time) {
    lastTime = time;
    const w = overlay.clientWidth, h = overlay.clientHeight, mobile = w <= 760;
    reveal(elements.logo, time, 50, true);
    reveal(elements.rule, time, 120);
    reveal(elements.name, time, 320);
    reveal(elements.motto, time, 650);
    reveal(elements.classLine, time, 980);
    const size = mobile ? Math.min(82, w * .21) : Math.min(180, w * .14);
    const floor = h * (mobile ? .86 : .83);
    const drop = h * (mobile ? .72 : .59);
    const flight = bounce(Math.max(0, (time - 50) / 1000), drop, mobile ? 2000 : 1900, mobile ? .5 : .63);
    const x = w * (mobile ? .13 : .13) + Math.min(time / 2700, 1) * w * (mobile ? .12 : .08);
    const y = floor - flight.height;
    const fade = clamp(time / 90) * (1 - clamp((time - 2520) / 200));
    elements.basket.style.width = elements.basket.style.height = `${size}px`;
    elements.basket.style.opacity = fade;
    elements.basket.style.transform = `translate3d(${x-size/2}px,${y-size/2}px,0) scale(${1 + flight.squash * .10},${1-flight.squash*.10}) rotate(${time * .045}deg)`;
    elements.shadow.style.opacity = fade * (.2 + .6 * (1 - Math.min(1, flight.height / drop)));
    elements.shadow.style.transform = `translate3d(${x-50}px,${floor+size*.36}px,0) scale(${.65 + .65 * (1 - Math.min(1,flight.height/drop))})`;
    // A perspective kick from below-right; the textured ball conceals the scene change.
    const p = clamp((time - 2960) / 470);
    const approach = p ** 2.6;
    const soccerSize = 90 + (Math.hypot(w,h) * 1.65 - 90) * approach;
    const cx = w * (.82 - .32 * easeOut(p));
    const cy = h * (1.18 - .68 * easeOut(p));
    elements.soccer.style.width = elements.soccer.style.height = `${soccerSize}px`;
    elements.soccer.style.opacity = time < 2960 ? 0 : 1 - clamp((time - 3430) / 140);
    elements.soccer.style.transform = `translate3d(${cx-soccerSize/2}px,${cy-soccerSize/2}px,0) rotate(${-30 + p*200}deg)`;
    const switched = time >= 3430;
    elements.back.style.opacity = 1;
    elements.standard.style.visibility = switched ? 'visible' : 'hidden';
    overlay.style.opacity = 1 - clamp((time - 4850) / 350);
    elements.brand.style.visibility = switched ? 'hidden' : 'visible';
    overlay.querySelector('.recruit-intro-site').style.opacity = 1;
    overlay.querySelector('.recruit-intro-skip').firstChild.textContent = switched ? 'Enter site ' : 'Skip intro ';
    overlay.dataset.introTime = Math.round(time);
    if (time >= 3570) elements.soccer.hidden = true;
  }
  async function preload() {
    await Promise.all([...overlay.querySelectorAll('img')].map(async img => {
      if (!img.complete) await new Promise((resolve, reject) => {
        img.addEventListener('load', resolve, { once:true });
        img.addEventListener('error', reject, { once:true });
      });
      if (!img.naturalWidth) throw new Error('Intro image unavailable');
      if (img.decode) await img.decode();
    }));
  }
  const safety = setTimeout(() => { if (!started) finish(); }, 5000);
  preload().then(() => {
    clearTimeout(safety);
    if (ended) return;
    started = true;
    overlay.dataset.introReady = 'true';
    const reviewTime = preview && params.has('introAt') ? Number(params.get('introAt')) : null;
    if (reviewTime !== null && Number.isFinite(reviewTime)) {
      render(Math.max(0, Math.min(5200, reviewTime)));
      if (reviewTime >= 5200) finish();
      return;
    }
    const start = performance.now();
    function frame(now) {
      if (ended) return;
      const time = now - start;
      render(time);
      if (time >= 5200) finish();
      else raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
  }).catch(() => { clearTimeout(safety); finish(); });
})();
