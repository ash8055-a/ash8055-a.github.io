document.addEventListener("DOMContentLoaded", () => {
  const ghBtn = document.getElementById("ghProfileBtn");
  const projectsBtn = document.getElementById("projectsBtn");
  const socialBtn = document.getElementById("socialBtn");
  
  if (ghBtn) {
    ghBtn.addEventListener("click", () => {
      window.open("https://github.com/ash8055-a", "_blank");
    });
  }

  if (projectsBtn) {
    projectsBtn.addEventListener("click", () => {
      window.location.href = "/projects";
    });
  }
  
  if (socialBtn) {
    socialBtn.addEventListener("click", () => {
      window.location.href = "/social";
    });
  }
});
