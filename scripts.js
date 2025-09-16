document.addEventListener("DOMContentLoaded", () => {
  const ghBtn = document.getElementById("ghProfileBtn");
  if (ghBtn) {
    ghBtn.addEventListener("click", () => {
      window.open("https://github.com/ash8055-a", "_blank");
    });
  }
});
