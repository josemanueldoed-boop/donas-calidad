/* ===========================
   DONAS CALIDAD — admin.js
   Lógica del panel administrativo
   =========================== */

import { agregarDona, obtenerDonas, eliminarDona } from "./firestore.js";

/* ---------- REFERENCIAS DOM ---------- */
const form          = document.getElementById("formDona");
const inputNombre   = document.getElementById("nombre");
const inputDesc     = document.getElementById("descripcion");
const inputPrecio   = document.getElementById("precio");
const inputImagen   = document.getElementById("imagen");       // ← imagen
const inputCat      = document.getElementById("categoria");
const lista         = document.getElementById("listaDonasAdmin");
const btnGuardar    = document.getElementById("btnGuardar");
const toast         = document.getElementById("toast");
const contador      = document.getElementById("contador");
const imgPreview    = document.getElementById("imgPreview");
const imgPreviewWrap = document.getElementById("imgPreviewWrap");

/* ---------- PREVIEW DE IMAGEN ---------- */
inputImagen.addEventListener("input", () => {
  const url = inputImagen.value.trim();
  if (url) {
    imgPreview.src = url;
    imgPreviewWrap.style.display = "block";
    imgPreview.onerror = () => { imgPreviewWrap.style.display = "none"; };
  } else {
    imgPreviewWrap.style.display = "none";
  }
});

/* ---------- TOAST ---------- */
function mostrarToast(msg, tipo = "ok") {
  toast.textContent = msg;
  toast.className   = `toast toast--${tipo} toast--visible`;
  setTimeout(() => toast.classList.remove("toast--visible"), 3200);
}

/* ---------- CARGAR LISTA ---------- */
export async function cargarDonas() {
  lista.innerHTML = `<p class="loading-msg">Cargando donas…</p>`;
  try {
    const donas = await obtenerDonas();
    contador.textContent = donas.length;
    if (!donas.length) {
      lista.innerHTML = `<p class="empty-msg">Aún no hay donas registradas. ¡Agrega la primera!</p>`;
      return;
    }
    lista.innerHTML = "";
    donas.forEach(d => lista.appendChild(crearTarjeta(d)));
  } catch (err) {
    lista.innerHTML = `<p class="error-msg">Error al cargar: ${err.message}</p>`;
  }
}

/* ---------- TARJETA ADMIN ---------- */
function crearTarjeta(dona) {
  const art = document.createElement("article");
  art.className = "admin-card";
  art.innerHTML = `
    <div class="admin-card__img-wrap">
      <img src="${dona.imagen || ''}" alt="${dona.nombre}"
           class="admin-card__img"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
      <div class="admin-card__img-fallback" style="display:none">🍩</div>
    </div>
    <div class="admin-card__info">
      <h3>${dona.nombre}</h3>
      <p class="admin-card__desc">${dona.descripcion}</p>
      <span class="admin-card__precio">$${Number(dona.precio).toLocaleString("es-CO")}</span>
      <span class="admin-card__cat">${dona.categoria || "—"}</span>
    </div>
    <button class="btn-eliminar" data-id="${dona.id}" aria-label="Eliminar ${dona.nombre}">
      🗑️
    </button>
  `;
  art.querySelector(".btn-eliminar").addEventListener("click", async () => {
    if (!confirm(`¿Eliminar "${dona.nombre}"?`)) return;
    try {
      await eliminarDona(dona.id);
      mostrarToast("Dona eliminada.", "ok");
      await cargarDonas();
    } catch (err) {
      mostrarToast("Error al eliminar: " + err.message, "error");
    }
  });
  return art;
}

/* ---------- SUBMIT ---------- */
form.addEventListener("submit", async e => {
  e.preventDefault();
  const precio = parseFloat(inputPrecio.value);
  if (isNaN(precio) || precio <= 0) {
    mostrarToast("El precio debe ser mayor a 0.", "error");
    return;
  }
  const imagen = inputImagen.value.trim();
  if (!imagen) {
    mostrarToast("Por favor ingresa la URL de la imagen.", "error");
    return;
  }

  btnGuardar.disabled    = true;
  btnGuardar.textContent = "Guardando…";

  try {
    await agregarDona({
      nombre:      inputNombre.value.trim(),
      descripcion: inputDesc.value.trim(),
      precio,
      imagen,                           // ← guardamos URL
      categoria:   inputCat.value
    });
    mostrarToast("¡Dona agregada exitosamente! 🎉", "ok");
    form.reset();
    imgPreviewWrap.style.display = "none";
    await cargarDonas();
  } catch (err) {
    mostrarToast("Error al guardar: " + err.message, "error");
  } finally {
    btnGuardar.disabled    = false;
    btnGuardar.textContent = "Guardar Dona";
  }
});
