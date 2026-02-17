const zoomBtn = document.querySelector("#zoom");
const img = document.querySelector("img");
zoomBtn.addEventListener("click", (e) => {
    e.preventDefault();
    zoomBtn.remove();
    img.style.width = "12%";
})