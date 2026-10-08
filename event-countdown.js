(() => {
  const events = [
    {
      title: "vs Cabell Midland",
      opponent: "Cabell Midland",
      details: "8:15 PM @ Capital High School",
      date: "2026-10-08T20:15:00-04:00"
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

  const showtimeDuration = 90 * 60 * 1000;
  const section = document.querySelector(".countdown-section");
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

  const setClock = (dayCount, hourCount, minuteCount, secondCount) => {
    days.textContent = format(dayCount);
    hours.textContent = format(hourCount);
    minutes.textContent = format(minuteCount);
    seconds.textContent = format(secondCount);
  };

  const updateCountdown = () => {
    const now = Date.now();
    const activeEvent = events.find((event) => {
      const eventTime = new Date(event.date).getTime();
      return eventTime <= now && now < eventTime + showtimeDuration;
    });

    if (activeEvent) {
      section?.classList.add("is-showtime");
      title.textContent = activeEvent.title;
      details.textContent = activeEvent.details;
      setClock(0, 0, 0, 0);
      return;
    }

    section?.classList.remove("is-showtime");

    const nextEvent = events.find((event) => new Date(event.date).getTime() > now);

    if (!nextEvent) {
      title.textContent = "Schedule Complete";
      details.textContent = "New events will be posted soon.";
      setClock(0, 0, 0, 0);
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
    setClock(dayCount, hourCount, minuteCount, secondCount);
  };

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
})();
