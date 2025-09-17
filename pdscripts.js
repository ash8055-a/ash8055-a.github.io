document.addEventListener("DOMContentLoaded", () => {
  const playdatebtn = document.getElementById("playdateBtn");
  if (playdatebtn) {
    playdatebtn.addEventListener("click", () => {
      window.location.href = "/playdate";
    });
  }
});
