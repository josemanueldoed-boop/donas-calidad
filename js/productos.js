/* ===========================
   DONAS CALIDAD — productos.js
   Carga las donas desde Firestore,
   las renderiza y gestiona el modal
   =========================== */

import { obtenerDonas } from "./firestore.js";

/* ---------- MODAL ---------- */
function crearModal() {
  const overlay = document.createElement("div");
  overlay.id = "modalOverlay";
  overlay.className = "modal-overlay";
  overlay.innerHTML = `
    <div class="modal-card" role="dialog" aria-modal="true">
      <button class="modal-close" id="modalClose" aria-label="Cerrar">✕</button>
      <div class="modal-img-wrap">
        <img id="modalImg" src="" alt="" class="modal-img" />
      </div>
      <div class="modal-body">
        <span class="modal-cat" id="modalCat"></span>
        <h2 class="modal-nombre" id="modalNombre"></h2>
        <p class="modal-desc" id="modalDesc"></p>
        <span class="modal-precio" id="modalPrecio"></span>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const cerrar = () => {
    overlay.classList.remove("modal--visible");
    document.body.style.overflow = "";
  };

  document.getElementById("modalClose").addEventListener("click", cerrar);
  overlay.addEventListener("click", e => { if (e.target === overlay) cerrar(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") cerrar(); });

  return overlay;
}

function abrirModal(dona) {
  const overlay = document.getElementById("modalOverlay");
  document.getElementById("modalImg").src       = dona.imagen || "";
  document.getElementById("modalImg").alt       = dona.nombre;
  document.getElementById("modalNombre").textContent = dona.nombre;
  document.getElementById("modalDesc").textContent   = dona.descripcion;
  document.getElementById("modalPrecio").textContent =
    "$" + Number(dona.precio).toLocaleString("es-CO");
  document.getElementById("modalCat").textContent =
    dona.categoria ? dona.categoria.charAt(0).toUpperCase() + dona.categoria.slice(1) : "";

  overlay.classList.add("modal--visible");
  document.body.style.overflow = "hidden";
}

/* ---------- TARJETA (CAMBIO 2: solo imagen, nombre, precio) ---------- */
function crearTarjeta(dona, index) {
  const art = document.createElement("article");
  art.className = "card";
  art.style.animationDelay = `${index * 0.1}s`;
  art.setAttribute("role", "button");
  art.setAttribute("tabindex", "0");
  art.setAttribute("aria-label", `Ver detalle de ${dona.nombre}`);

  const precio = Number(dona.precio).toLocaleString("es-CO");

  art.innerHTML = `
    <div class="card-img-wrap">
      <img src="${dona.imagen || ''}" alt="${dona.nombre}" class="card-img"
           onerror="this.style.display='none';this.parentElement.classList.add('card-img--error')" />
    </div>
    <div class="card-body">
      <h3 class="card-name">${dona.nombre}</h3>
      <div class="card-footer">
        <span class="card-price">$${precio}</span>
        <span class="card-hint">Ver más →</span>
      </div>
    </div>
  `;

  const abrir = () => abrirModal(dona);
  art.addEventListener("click", abrir);
  art.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") abrir(); });

  return art;
}

/* ---------- CARGAR ---------- */
export async function cargarProductos() {
  const grid = document.querySelector(".cards-grid");
  if (!grid) return;

  // Crear modal una sola vez
  if (!document.getElementById("modalOverlay")) crearModal();

  grid.innerHTML = `<p class="productos-loading">Cargando donas…</p>`;

  try {
    const donas = await obtenerDonas();

    if (!donas.length) {
      grid.innerHTML = `<p class="productos-empty">Pronto tendremos novedades. ¡Vuelve pronto! 🍩</p>`;
      return;
    }

    grid.innerHTML = "";
    donas.forEach((dona, i) => grid.appendChild(crearTarjeta(dona, i)));

  } catch (err) {
    grid.innerHTML = `<p class="productos-error">No se pudieron cargar los productos. Intenta más tarde.</p>`;
    console.error("Error cargando donas:", err);
  }
}
