(() => {
  const dialog = document.getElementById("requestContactDialog");
  const openButtons = document.querySelectorAll("[data-open-contact-form]");
  const closeButtons = document.querySelectorAll("[data-close-contact-form]");

  if (!dialog || openButtons.length === 0) {
    return;
  }

  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => dialog.close());
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  dialog.querySelector(".request-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = data.get("message").trim();
    const lines = [
      "Request to contact Kahsi Morgan",
      "",
      `Name: ${data.get("name")}`,
      `School: ${data.get("school")}`,
      `Sport: ${data.get("sport")}`,
      `Role within program: ${data.get("role")}`,
      `Phone: ${data.get("phone")}`,
      `Email: ${data.get("email")}`
    ];

    if (message) {
      lines.push("", "Message:", message);
    }

    const subject = encodeURIComponent("Kahsi Morgan recruiting contact request");
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:skmorgan05@hotmail.com?subject=${subject}&body=${body}`;
    dialog.close();
    event.currentTarget.reset();
  });
})();
