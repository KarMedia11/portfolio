// =====================
// CUSTOM CURSOR
// =====================

    const cursor = document.querySelector(".custom-cursor");

    const menuBtn = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");

    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });

    // mouse press = grab
    document.addEventListener("mousedown", () => {
      cursor.classList.add("dragging");
    });

    // mouse release = normal
    document.addEventListener("mouseup", () => {
      cursor.classList.remove("dragging");
    });

    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("active");
    });




document.querySelectorAll(".slides img").forEach(img => {
    let zoomed = false;

    img.addEventListener("mouseenter", () => {
        zoomed = true;
        img.style.transform = "scale(2)";
        img.style.cursor = "zoom-out";
    });

    img.addEventListener("mouseleave", () => {
        zoomed = false;
        img.style.transform = "scale(1)";
        img.style.cursor = "zoom-in";
        img.style.transformOrigin = "center";
    });

    img.addEventListener("mousemove", (e) => {
        if (!zoomed) return;

        const rect = img.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    });
});
// Navbar toggle
function hamburg() {
    document.querySelector(".dropdown").style.transform = "translateY(0px)";
}
function cancel() {
    document.querySelector(".dropdown").style.transform =
        "translateY(-500px)";
}
/* ===== SLIDER LOGIC ===== */
let index = 0;

function showSlide() {
    const slides = document.getElementById("slides");
    slides.style.transform = `translateX(${-index * 100}%)`;
}

function nextSlide() {
    const total = document.querySelectorAll("#slides img").length;
    index = (index + 1) % total;
    showSlide();
}

function prevSlide() {
    const total = document.querySelectorAll("#slides img").length;
    index = (index - 1 + total) % total;
    showSlide();
}



