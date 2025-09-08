document.addEventListener("DOMContentLoaded", () => {
  const goBtn = document.getElementById("goBtn");
  const ghBtn = document.getElementById("ghBtn");

  if (goBtn) {
    goBtn.addEventListener("click", () => {
      window.location.href = "/login";
    });
  }
