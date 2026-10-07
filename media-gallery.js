(() => {
  const galleries = Array.from(document.querySelectorAll("[data-random-gallery]"));

  if (!galleries.length) {
    return;
  }

  const dialog = document.createElement("dialog");
  dialog.className = "gallery-lightbox";
  dialog.innerHTML = `
    <button class="gallery-close" type="button" aria-label="Close image viewer">Close</button>
    <button class="gallery-arrow gallery-arrow-prev" type="button" aria-label="Previous image">&lsaquo;</button>
    <figure>
      <img alt="">
    </figure>
    <button class="gallery-arrow gallery-arrow-next" type="button" aria-label="Next image">&rsaquo;</button>
    <button class="button primary gallery-save" type="button">Save Image</button>
    <p class="mobile-save-instruction">Press and hold the image to save it.</p>
  `;
  document.body.append(dialog);

  const lightboxImage = dialog.querySelector("img");
  const closeButton = dialog.querySelector(".gallery-close");
  const prevButton = dialog.querySelector(".gallery-arrow-prev");
  const nextButton = dialog.querySelector(".gallery-arrow-next");
  const saveButton = dialog.querySelector(".gallery-save");
  let activeImages = [];
  let activeIndex = 0;

  const shuffle = (items) => {
    const shuffled = [...items];

    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }

    return shuffled;
  };

  const filenameFromSrc = (src) => src.split("/").pop() || "kahsi-photo.jpg";

  const updateLightbox = () => {
    const image = activeImages[activeIndex];

    if (!image) {
      return;
    }

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
  };

  const downloadImage = (image) => {
    const opened = window.open(image.src, "_blank", "noopener");

    if (!opened) {
      window.location.href = image.src;
    }
  };

  const saveImage = async () => {
    const image = activeImages[activeIndex];

    if (!image) {
      return;
    }

    try {
      const response = await fetch(image.src);
      const blob = await response.blob();
      const file = new File([blob], filenameFromSrc(image.src), { type: blob.type || "image/jpeg" });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Kahsi Morgan photo"
        });
        return;
      }

      if (navigator.share) {
        await navigator.share({
          title: "Kahsi Morgan photo",
          url: image.src
        });
        return;
      }
    } catch (error) {
      // Fall back to browser download below.
    }

    downloadImage(image);
  };

  const openLightbox = (images, index) => {
    activeImages = images;
    activeIndex = index;
    updateLightbox();
    document.body.classList.add("gallery-lightbox-open");
    dialog.showModal();
  };

  const moveLightbox = (direction) => {
    activeIndex = (activeIndex + direction + activeImages.length) % activeImages.length;
    updateLightbox();
  };

  closeButton.addEventListener("click", () => dialog.close());
  prevButton.addEventListener("click", () => moveLightbox(-1));
  nextButton.addEventListener("click", () => moveLightbox(1));
  saveButton.addEventListener("click", saveImage);

  dialog.addEventListener("close", () => {
    document.body.classList.remove("gallery-lightbox-open");
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (!dialog.open) {
      return;
    }

    if (event.key === "ArrowLeft") {
      moveLightbox(-1);
    }

    if (event.key === "ArrowRight") {
      moveLightbox(1);
    }
  });

  galleries.forEach((gallery) => {
    const showAllButton = gallery.parentElement.querySelector("[data-gallery-show-all]");
    const figures = shuffle(Array.from(gallery.querySelectorAll("figure")));
    const images = figures.map((figure) => figure.querySelector("img")).filter(Boolean);
    const defaultCount = Math.min(6, figures.length);

    figures.forEach((figure, index) => {
      gallery.append(figure);
      figure.hidden = index >= defaultCount;
      figure.tabIndex = 0;
      figure.setAttribute("role", "button");
      figure.setAttribute("aria-label", "Open photo");

      const openCurrentImage = () => openLightbox(images, images.indexOf(figure.querySelector("img")));

      figure.addEventListener("click", openCurrentImage);
      figure.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openCurrentImage();
        }
      });
    });

    if (showAllButton && figures.length > defaultCount) {
      showAllButton.hidden = false;
      showAllButton.addEventListener("click", () => {
        figures.forEach((figure) => {
          figure.hidden = false;
        });
        showAllButton.hidden = true;
      });
    }
  });
})();
