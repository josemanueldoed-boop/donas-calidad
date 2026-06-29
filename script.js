/* ===========================
   DONAS CALIDAD — script.js
   Punto de entrada principal (index.html)
   =========================== */

import { initMenu }            from "./js/menu.js";
import { initSmoothScroll }    from "./js/scroll.js";
import { initRevealObserver,
         initHeaderShrink,
         initActiveNav }       from "./js/ui.js";
import { cargarProductos }     from "./js/productos.js";

document.addEventListener("DOMContentLoaded", async () => {
  initMenu();
  initSmoothScroll();
  initHeaderShrink();
  initActiveNav();
  await cargarProductos();
  initRevealObserver(); // después de cargar las tarjetas
});
