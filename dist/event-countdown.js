(() => {
  const events = [
    {
      title: "MSAC Placement Game",
      opponent: "Opponent TBD",
      details: "Opponent & time TBD",
      date: "2026-10-08T00:00:00-04:00"
    },
    {
      title: "vs Nicholas County",
      opponent: "Nicholas County",
      details: "1:00 PM @ Capital High School",
      date: "2026-10-10T13:00:00-04:00"
    },
    {
      title: "vs PikeView",
      opponent: "PikeView",
      details: "8:00 PM @ Capital High School",
      date: "2026-10-13T20:00:00-04:00"
    },
    {
      title: "vs Charleston Catholic",
      opponent: "Charleston Catholic",
      details: "1:00 PM @ Capital High School",
      date: "2026-10-17T13:00:00-04:00"
    }
  ];

  const title = document.querySelector("[data-next-event-title]");
  const details = document.querySelector("[data-next-event-details]");
  const days = document.querySelector("[data-countdown-days]");
  const hours = document.querySelector("[data-countdown-hours]");
  const minutes = document.querySelector("[data-countdown-minutes]");
  const seconds = document.querySelector("[data-countdown-seconds]");

  if (!title || !details || !days || !hours || !minutes || !seconds) {
    return;
  }

  const format = (value) => String(Math.max(0, value)).padStart(2, "0");

  const updateCountdown = () => {
    const now = Date.now();
    const nextEvent = events.find((event) => new Date(event.date).getTime() >= now);

    if (!nextEvent) {
      title.textContent = "Schedule Complete";
      details.textContent = "New events will be posted soon.";
      days.textContent = "00";
      hours.textContent = "00";
      minutes.textContent = "00";
      seconds.textContent = "00";
      return;
    }

    const distance = new Date(nextEvent.date).getTime() - now;
    const totalSeconds = Math.max(0, Math.floor(distance / 1000));
    const dayCount = Math.floor(totalSeconds / 86400);
    const hourCount = Math.floor((totalSeconds % 86400) / 3600);
    const minuteCount = Math.floor((totalSeconds % 3600) / 60);
    const secondCount = totalSeconds % 60;

    title.textContent = nextEvent.title;
    details.textContent = nextEvent.details;
    days.textContent = format(dayCount);
    hours.textContent = format(hourCount);
    minutes.textContent = format(minuteCount);
    seconds.textContent = format(secondCount);
  };

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
})();
