const huhSound = document.querySelector("#huhSound");
huhSound.play();

const huhPic = document.querySelector("img");
huhPic.addEventListener("click", (e) => huhSound.play());