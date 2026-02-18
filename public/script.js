// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, addDoc, setDoc, updateDoc, collection, query, where } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBlu4ZRBB5sfmft-H20AK-DfN91GrM5cto",
    authDomain: "figmentcrocs.firebaseapp.com",
    databaseURL: "https://figmentcrocs-default-rtdb.firebaseio.com",
    projectId: "figmentcrocs",
    storageBucket: "figmentcrocs.firebasestorage.app",
    messagingSenderId: "1010649645701",
    appId: "1:1010649645701:web:3399a8f7815691bd7b9fec",
    measurementId: "G-PJM8BK70DR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const img = document.querySelector("img");
const spinBtn = document.querySelector("#spin");
spinBtn.addEventListener("click", (e) => {
    e.preventDefault();
    img.animate([
        { transform: "rotate(0deg)" },
        { transform: "rotate(360deg)" }
    ], {
        duration: 1000,
        iterations: 1
    });
})
const pulsateBtn = document.querySelector("#pulsate");
pulsateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    img.animate([
        { transform: "scale(1)" },
        { transform: "scale(1.8)" },
        { transform: "scale(1)" },
        { transform: "scale(1)" },
    ], {
        duration: 500,
        iterations: 3
    });
})
const mysteryBtn = document.querySelector("#mystery");
mysteryBtn.addEventListener("click", (e) => {
    window.location.href = "/404.html";
})

const currentDate = new Date();
const currentISODate = currentDate.toISOString().split("T")[0];
console.log(currentISODate);

async function processVisit() {
    const currentDateQuery = await getDocs(query(collection(db, "userData"), where("date", "==", currentISODate)));
    if (currentDateQuery.size == 0) {
        const newDateDoc = { "numUsers": 1, "date": currentISODate };
        await addDoc(collection(db, "userData"), newDateDoc);
    } else {
        currentDateQuery.forEach(async (d) => {
            const currentDateRef = doc(db, "userData", d.id);
            await updateDoc(currentDateRef, { "numUsers": d.data()["numUsers"] + 1 });
            console.log("all done!");
        })
    }
}
processVisit();