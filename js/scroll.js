/* ===========================
   DONAS CALIDAD — scroll.js
   Smooth scroll con offset de header
   =========================== */

export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      const headerH = document.getElementById("header")?.offsetHeight ?? 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 12;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
}
