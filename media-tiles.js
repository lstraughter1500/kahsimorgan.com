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
      },
      {
        src: "assets/soccer-s1.jpg",
        alt: "Kahsi Morgan in blue soccer uniform before a match"
      },
      {
        src: "assets/soccer-s2.jpg",
        alt: "Kahsi Morgan tracking the soccer ball in blue uniform"
      },
      {
        src: "assets/soccer-s3.jpg",
        alt: "Kahsi Morgan controlling the soccer ball in game action"
      },
      {
        src: "assets/soccer-s4.jpg",
        alt: "Kahsi Morgan running toward the soccer ball"
      },
      {
        src: "assets/soccer-s5.jpg",
        alt: "Black and white portrait of Kahsi Morgan in soccer uniform"
      },
      {
        src: "assets/soccer-s6.jpg",
        alt: "Black and white photo of Kahsi Morgan under stadium lights"
      },
      {
        src: "assets/soccer-s7.png",
        alt: "Kahsi Morgan smiling with soccer coach on the field"
      }
    ]
  };

  window.kahsiFeaturedProfileImages = window.kahsiFeaturedProfileImages || {};

  const galleryImagesForSport = (sport) => {
    const gallery = document.querySelector(`[data-gallery-sport="${sport}"]`);

    if (!gallery) {
      return [];
    }

    return Array.from(gallery.querySelectorAll("img")).map((image) => ({
      src: image.getAttribute("src"),
      alt: image.alt
    })).filter((image) => image.src);
  };

  document.querySelectorAll("[data-media-tile], [data-profile-tile], [data-profile-feature]").forEach((tile) => {
    const sport = tile.dataset.mediaTile || tile.dataset.profileTile || tile.dataset.profileFeature;
    const options = tile.dataset.profileFeature ? galleryImagesForSport(sport) : tileImages[sport];
    const image = tile.querySelector("img");

    if (!options || !image) {
      return;
    }

    const nextImage = options[Math.floor(Math.random() * options.length)];
    image.src = nextImage.src;
    image.alt = nextImage.alt;

    if (tile.dataset.profileFeature) {
      window.kahsiFeaturedProfileImages[sport] = nextImage.src;
    }
  });
})();
