/* ===========================
   DONAS CALIDAD — ui.js
   Efectos visuales: reveal on scroll,
   header shrink y nav activo
   =========================== */

export function initRevealObserver() {
  const revealEls = document.querySelectorAll(".card, .mv-card, .info-col");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => {
    if (!el.classList.contains("card")) {
      el.style.opacity    = "0";
      el.style.transform  = "translateY(24px)";
      el.style.transition = "opacity .6s ease, transform .6s ease";
    }
    observer.observe(el);
  });
}

export function initHeaderShrink() {
  const header = document.getElementById("header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    header.style.boxShadow = window.scrollY > 60
      ? "0 4px 24px rgba(0,0,0,.45)"
      : "0 2px 20px rgba(0,0,0,.35)";
  }, { passive: true });
}

export function initActiveNav() {
  const sections = document.querySelectorAll("section[id], footer[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const headerH  = () => document.getElementById("header")?.offsetHeight ?? 0;

  const activate = () => {
    let current = "";
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - headerH() - 50) {
        current = sec.getAttribute("id");
      }
    });
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", activate, { passive: true });
}
