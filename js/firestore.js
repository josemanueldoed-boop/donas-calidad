/* ===========================
   DONAS CALIDAD — firestore.js
   Funciones CRUD para la colección "donas"
   =========================== */

import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const COLECCION = "donas";

/**
 * Agrega una dona nueva a Firestore.
 * @param {{ nombre, descripcion, precio, emoji, categoria }} dona
 * @returns {Promise<string>} id del documento creado
 */
export async function agregarDona(dona) {
  const ref = await addDoc(collection(db, COLECCION), {
    ...dona,
    creadoEn: serverTimestamp()
  });
  return ref.id;
}

/**
 * Obtiene todas las donas de Firestore.
 * @returns {Promise<Array<{id, ...datos}>>}
 */
export async function obtenerDonas() {
  const snap = await getDocs(collection(db, COLECCION));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/**
 * Elimina una dona por su id.
 * @param {string} id
 */
export async function eliminarDona(id) {
  await deleteDoc(doc(db, COLECCION, id));
}

/**
 * Actualiza los campos de una dona existente.
 * @param {string} id
 * @param {object} campos
 */
export async function actualizarDona(id, campos) {
  await updateDoc(doc(db, COLECCION, id), campos);
}
