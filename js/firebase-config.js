/* ===========================
   DONAS CALIDAD — firebase-config.js
   Inicialización de Firebase
   =========================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getFirestore }  from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey:            "AIzaSyCvY-IIk_jWTd5_mCsZm9fbwafmOl6m2Wo",
  authDomain:        "donas-calidad.firebaseapp.com",
  projectId:         "donas-calidad",
  storageBucket:     "donas-calidad.firebasestorage.app",
  messagingSenderId: "657979524296",
  appId:             "1:657979524296:web:4fb0d526ff3cf8d08c91fd"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
