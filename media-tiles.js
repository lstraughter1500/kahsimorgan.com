(() => {
  const tileImages = {
    basketball: [
      {
        src: "assets/basketball-hero.jpeg",
        alt: "Kahsi Morgan seated in basketball uniform holding a basketball"
      },
      {
        src: "assets/basketball-dribble.jpeg",
        alt: "Kahsi Morgan dribbling a basketball in studio portrait"
      },
      {
        src: "assets/basketball-point.jpeg",
        alt: "Kahsi Morgan pointing while spinning a basketball"
      },
      {
        src: "assets/basketball-towel.jpeg",
        alt: "Kahsi Morgan holding a basketball with towel over shoulders"
      }
    ],
    soccer: [
      {
        src: "assets/soccer-run.png",
        alt: "Kahsi Morgan running during soccer warmups"
      },
      {
        src: "assets/soccer-black.jpeg",
        alt: "Kahsi Morgan on the soccer field in black and blue jersey"
      },
      {
        src: "assets/soccer-team.png",
        alt: "Kahsi Morgan with soccer teammates"
      }
    ]
  };

  document.querySelectorAll("[data-media-tile]").forEach((tile) => {
    const sport = tile.dataset.mediaTile;
    const options = tileImages[sport];
    const image = tile.querySelector("img");

    if (!options || !image) {
      return;
    }

    const nextImage = options[Math.floor(Math.random() * options.length)];
    image.src = nextImage.src;
    image.alt = nextImage.alt;
  });
})();
