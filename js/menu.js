/* ===========================
   DONAS CALIDAD — menu.js
   Hamburger menu móvil
   =========================== */

export function initMenu() {
  const hamburger  = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("open");
  });

  document.querySelectorAll(".mobile-link").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("open");
    });
  });
}
