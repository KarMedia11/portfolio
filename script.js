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
   PROJECT CAROUSEL
========================================================= */

const slider = document.querySelector(".projects-grid");

function scrollProjects(direction) {
    if (slider) {
        slider.scrollLeft += direction * 400;
    }
}


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    const icon = themeToggle.querySelector("i");

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );
    }

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        const isLightMode =
            document.body.classList.contains("light-mode");

        if (isLightMode) {

            localStorage.setItem("theme", "light");

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

        } else {

            localStorage.setItem("theme", "dark");

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );
        }

    });

}


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursor = document.querySelector(".custom-cursor");

if (cursor) {

    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });

    document.addEventListener("mousedown", () => {
        cursor.classList.add("dragging");
    });

    document.addEventListener("mouseup", () => {
        cursor.classList.remove("dragging");
    });

}


/* =========================================================
   CONTACT FORM
========================================================= */

const form = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendBtn");

if (form && sendBtn) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const data = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value
        };

        // Loading state
        sendBtn.disabled = true;
        sendBtn.innerHTML = "SENDING...";

        Swal.fire({
            title: "Sending message...",
            text: "Please wait",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {

            await fetch(
                "https://script.google.com/macros/s/AKfycbz5JXDQNEY6pdzTWjDF_BnIbtVE0HZa9dcOPXe3RPQgcupDx6zOVzuVFWMGZFVlqZqGTQ/exec",
                {
                    method: "POST",
                    body: JSON.stringify(data)
                }
            );

            Swal.fire({
                icon: "success",
                text: "Thank you for contacting me. I will get back to you soon.",
                confirmButtonColor: "#1ACB8B"
            });

            form.reset();

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Something went wrong. Please try again.",
                confirmButtonColor: "#1ACB8B"
            });

            console.error(error);

        } finally {

            sendBtn.disabled = false;
            sendBtn.innerHTML = "SEND MESSAGE";

        }

    });

}


/* =========================================================
   GOOGLE ANALYTICS — CUSTOM EVENTS
========================================================= */

function trackEvent(eventName, parameters = {}) {

    if (typeof gtag === "function") {
        gtag("event", eventName, parameters);
    }

}



document.querySelectorAll(".before-after").forEach((slider) => {

    const range = slider.querySelector(".compare-range");
    const afterLayer = slider.querySelector(".after-layer");
    const handle = slider.querySelector(".compare-handle");

    function updateSlider(value) {

        value = Math.max(0, Math.min(100, Number(value)));

        // Keep the after image at its original size
        afterLayer.style.clipPath = `inset(0 0 0 ${value}%)`;

        // Move only the handle
        handle.style.left = value + "%";
    }

    range.addEventListener("input", () => {
        updateSlider(range.value);
    });

    // Initial position
    updateSlider(range.value); 
    

});
/* =========================================================
   PROJECT CAROUSEL — DRAG LEFT / RIGHT
========================================================= */

const carouselWrapper = document.querySelector(
    ".carousel-track-wrapper"
);

if (carouselWrapper) {

    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    carouselWrapper.addEventListener("pointerdown", (e) => {

        // Only allow left mouse button
        if (e.pointerType === "mouse" && e.button !== 0) {
            return;
        }

        isDragging = true;

        startX = e.clientX;
        startScrollLeft = carouselWrapper.scrollLeft;

        carouselWrapper.classList.add("dragging");

        carouselWrapper.setPointerCapture(e.pointerId);
    });


    carouselWrapper.addEventListener("pointermove", (e) => {

        if (!isDragging) return;

        const distance = e.clientX - startX;

        carouselWrapper.scrollLeft =
            startScrollLeft - distance;
    });


    function stopCarouselDrag(e) {

        if (!isDragging) return;

        isDragging = false;

        carouselWrapper.classList.remove("dragging");

        if (
            e.pointerId !== undefined &&
            carouselWrapper.hasPointerCapture(e.pointerId)
        ) {
            carouselWrapper.releasePointerCapture(
                e.pointerId
            );
        }
    }


    carouselWrapper.addEventListener(
        "pointerup",
        stopCarouselDrag
    );

    carouselWrapper.addEventListener(
        "pointercancel",
        stopCarouselDrag
    );

    carouselWrapper.addEventListener(
        "lostpointercapture",
        () => {

            isDragging = false;

            carouselWrapper.classList.remove(
                "dragging"
            );
        }
    );
}


/* =========================================================
   CASE STUDY IMAGE — VERTICAL DRAG
========================================================= */

document.querySelectorAll(".case-study-image").forEach(
    (container) => {

        let isDragging = false;
        let startY = 0;
        let startScrollTop = 0;

        container.addEventListener(
            "pointerdown",
            (e) => {

                if (
                    e.pointerType === "mouse" &&
                    e.button !== 0
                ) {
                    return;
                }

                isDragging = true;

                startY = e.clientY;
                startScrollTop =
                    container.scrollTop;

                container.classList.add(
                    "is-dragging"
                );

                container.setPointerCapture(
                    e.pointerId
                );
            }
        );


        container.addEventListener(
            "pointermove",
            (e) => {

                if (!isDragging) return;

                const distance =
                    e.clientY - startY;

                container.scrollTop =
                    startScrollTop - distance;
            }
        );


        function stopImageDrag(e) {

            if (!isDragging) return;

            isDragging = false;

            container.classList.remove(
                "is-dragging"
            );

            if (
                e.pointerId !== undefined &&
                container.hasPointerCapture(
                    e.pointerId
                )
            ) {
                container.releasePointerCapture(
                    e.pointerId
                );
            }
        }


        container.addEventListener(
            "pointerup",
            stopImageDrag
        );

        container.addEventListener(
            "pointercancel",
            stopImageDrag
        );
    }
);
