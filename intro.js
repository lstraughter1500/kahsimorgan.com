(() => {
  const overlay = document.querySelector("[data-intro-overlay]");

  if (!overlay) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const replayRequested = new URLSearchParams(window.location.search).get("intro") === "preview";
  const hasSeenIntro = sessionStorage.getItem("kahsiIntroSeen") === "true";

  if (prefersReducedMotion || (hasSeenIntro && !replayRequested)) {
    overlay.remove();
    sessionStorage.setItem("kahsiIntroSeen", "true");
    return;
  }

  document.body.classList.add("intro-is-running");
  overlay.setAttribute("aria-hidden", "false");

  window.setTimeout(() => {
    overlay.classList.add("intro-overlay-exit");
  }, 2850);

  window.setTimeout(() => {
    sessionStorage.setItem("kahsiIntroSeen", "true");
    document.body.classList.remove("intro-is-running");
    overlay.remove();
  }, 3450);
})();
