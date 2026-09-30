/* =========================================================
   GOOGLE ANALYTICS
========================================================= */

window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}

gtag("js", new Date());
gtag("config", "G-RCPLRD82K2");


/* =========================================================
   VERCEL ANALYTICS
========================================================= */

window.va = window.va || function () {
    (window.vaq = window.vaq || []).push(arguments);
};


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("show");
    });
}


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    const icon = themeToggle.querySelector("i");
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");

        if (icon) {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );
    }

    themeToggle.addEventListener("click", () => {

        const isLightMode =
            document.body.classList.toggle("light-mode");

        localStorage.setItem(
            "theme",
            isLightMode ? "light" : "dark"
        );

        if (icon) {
            icon.classList.toggle("fa-sun", !isLightMode);
            icon.classList.toggle("fa-moon", isLightMode);
        }

        themeToggle.setAttribute(
            "aria-label",
            isLightMode
                ? "Switch to dark mode"
                : "Switch to light mode"
        );
    });
}


/* =========================================================
   BEFORE / AFTER SLIDER
========================================================= */

document.querySelectorAll(".before-after").forEach((slider) => {

    const range = slider.querySelector(".compare-range");
    const afterLayer = slider.querySelector(".after-layer");
    const handle = slider.querySelector(".compare-handle");

    if (!range || !afterLayer || !handle) return;

    function updateSlider(value) {

        const position = Math.max(
            0,
            Math.min(100, Number(value))
        );

        afterLayer.style.clipPath =
            `inset(0 0 0 ${position}%)`;

        handle.style.left = `${position}%`;
    }

    range.addEventListener("input", () => {
        updateSlider(range.value);
    });

    updateSlider(range.value);
});


