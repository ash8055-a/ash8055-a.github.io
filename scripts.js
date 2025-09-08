document.addEventListener("DOMContentLoaded", () => {
  const goBtn = document.getElementById("goBtn");
  const ghBtn = document.getElementById("ghProfileBtn");

  if (goBtn) {
    goBtn.addEventListener("click", () => {
      window.location.href = "/login";
    });
  }

if (ghProfileBtn) {
    ghProfileBtn.addEventListener("click", () => {
      window.location.href = "https://github.com/ash8055-a";
    });
  }
});
