import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Cookies from "js-cookie";

const firebaseConfig = {
    apiKey: "AIzaSyCL2QroSoT3pJSVluWRoxbdpTViqc6AS60",
    authDomain: "aiwaan.firebaseapp.com",
    projectId: "aiwaan",
    storageBucket: "aiwaan.firebasestorage.app",
    messagingSenderId: "897304727934",
    appId: "1:897304727934:web:4681fe0377a9c4c4a0e32f",
    measurementId: "G-1SM91ME7HH"
};


// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

// Handle auth token in cookies
onAuthStateChanged(auth, (user) => {
    if (user) {
        user.getIdToken().then((token) => {
            Cookies.set("token", token);
        });
    } else {
        Cookies.remove("token");
    }
});

export { app, auth, db };
