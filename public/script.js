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

let img = document.querySelector("img");
const spinBtn = document.querySelector("#spin");
const spinSound = document.querySelector("#spinSound");
spinBtn.addEventListener("click", (e) => {
    e.preventDefault();
    spinSound.play();
    img.animate([
        { transform: "rotate(0deg)" },
        { transform: "rotate(360deg)" }
    ], {
        duration: 1500,
        iterations: 1
    });
})
const pulsateBtn = document.querySelector("#pulsate");
const pulsateSound = document.querySelector("#pulsateSound");
pulsateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    pulsateSound.setAttribute("src", `./soundLibrary/sound${Math.floor(Math.random()*4)}.mp3`);
    pulsateSound.play();
    img.animate([
        { transform: "scale(1)" },
        { transform: "scale(0.7, 2)" },
        { transform: "scale(2, 0.7)" },
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
const randomizeBtn = document.querySelector("#randomize");
randomizeBtn.addEventListener("click", (e) => {
    const oldImg = document.querySelector("#img-cont > img:not(.hidden)");
    const possibleImgs = document.querySelectorAll("#img-cont > img.hidden:not(:last-child)");
    const newIndex = Math.floor(Math.random()*(possibleImgs.length));
    img = possibleImgs[newIndex];
    img.classList.remove("hidden");
    oldImg.classList.add("hidden");
})
const explosionBtn = document.querySelector("#explosion");
const bombSound = document.querySelector("#bombSound");
const explosionGif = document.querySelector("#explosion-gif");
const bombCountCont = document.querySelector("#bomb-count-cont");
const bombCount = document.querySelector("#bomb-count");
explosionBtn.addEventListener("click", async (e) => {
    bombSound.play();
    explosionGif.setAttribute("src", "./explosionGif.gif" + "?" + new Date().getTime());
    explosionGif.classList.remove("hidden");
    setTimeout(() => {
        explosionGif.classList.add("hidden");
    }, 2000);
    const bombCountRef = doc(db, "interactCount", "bombs");
    let bombCountDoc = await getDoc(bombCountRef);
    await updateDoc(bombCountRef, { count: bombCountDoc.data()["count"] + 1 });
    bombCountDoc = await getDoc(bombCountRef);
    bombCount.textContent = bombCountDoc.data()["count"];
    bombCountCont.hidden = false;
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
    updateStats();
}
processVisit();
let totalVisitors;
let visitorsToday;
const totalVisitorsSpan = document.querySelector("#total-visitors");
const visitorsTodaySpan = document.querySelector("#visitors-today");
async function updateStats() {
    totalVisitors = 0;
    const allVisitDates = await getDocs(collection(db, "userData"));
    allVisitDates.forEach((date) => {
        totalVisitors += date.data()["numUsers"];
    })
    totalVisitorsSpan.textContent = totalVisitors;

    const currentDateQuery = await getDocs(query(collection(db, "userData"), where("date", "==", currentISODate)));
    currentDateQuery.forEach(async (d) => {
        visitorsToday = d.data()["numUsers"];
    })
    visitorsTodaySpan.textContent = visitorsToday;
}
setInterval(updateStats, 5000);

