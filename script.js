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

const carouselWrapper =
    document.querySelector(".carousel-track-wrapper");

let isDragging = false;
let startX = 0;
let startScrollLeft = 0;


/* =========================================================
   MOUSE DRAG
========================================================= */

carouselWrapper.addEventListener("mousedown", (e) => {

    isDragging = true;

    carouselWrapper.classList.add("dragging");

    startX = e.pageX;
    startScrollLeft = carouselWrapper.scrollLeft;

    e.preventDefault();
});


carouselWrapper.addEventListener("mousemove", (e) => {

    if (!isDragging) return;

    e.preventDefault();

    const distance = e.pageX - startX;

    carouselWrapper.scrollLeft =
        startScrollLeft - distance;

});


/* =========================================================
   STOP DRAGGING
========================================================= */

function stopDragging() {

    isDragging = false;

    carouselWrapper.classList.remove("dragging");
}

document.addEventListener("mouseup", stopDragging);

carouselWrapper.addEventListener(
    "mouseleave",
    stopDragging
);


/* =========================================================
   TOUCH DRAG
========================================================= */

carouselWrapper.addEventListener(
    "touchstart",
    (e) => {

        isDragging = true;

        startX =
            e.touches[0].pageX;

        startScrollLeft =
            carouselWrapper.scrollLeft;

    },
    { passive: true }
);


carouselWrapper.addEventListener(
    "touchmove",
    (e) => {

        if (!isDragging) return;

        const distance =
            e.touches[0].pageX - startX;

        carouselWrapper.scrollLeft =
            startScrollLeft - distance;

    },
    { passive: true }
);


carouselWrapper.addEventListener(
    "touchend",
    stopDragging
);

/* =========================================================
   SET INITIAL POSITION
========================================================= */

function setInitialPosition() {

    const halfWidth =
        carouselTrack.scrollWidth / 2;

    carouselWrapper.scrollLeft = halfWidth;
}

setInitialPosition();


/* =========================================================
   INFINITE LOOP
========================================================= */

function normalizeCarouselPosition() {

    const halfWidth =
        carouselTrack.scrollWidth / 2;

    /*
     * Moved too far LEFT
     * → jump forward by one copy
     */

    if (carouselWrapper.scrollLeft <= 0) {

        carouselWrapper.scrollLeft += halfWidth;

    }


    /*
     * Moved too far RIGHT
     * → jump backward by one copy
     */

    else if (
        carouselWrapper.scrollLeft >= halfWidth * 2
    ) {

        carouselWrapper.scrollLeft -= halfWidth;

    }
}




/* =========================================================
   MOUSE DRAG
========================================================= */

carouselWrapper.addEventListener(
    "mousedown",
    (e) => {

        isDragging = true;

        carouselWrapper.classList.add("dragging");

        startX = e.pageX;

        startScrollLeft =
            carouselWrapper.scrollLeft;

        e.preventDefault();
    }
);


carouselWrapper.addEventListener(
    "mousemove",
    (e) => {

        if (!isDragging) return;

        e.preventDefault();

        const distance =
            e.pageX - startX;

        carouselWrapper.scrollLeft =
            startScrollLeft - distance;

        normalizeCarouselPosition();
    }
);


/* =========================================================
   STOP DRAGGING
========================================================= */

function stopCarouselDrag() {

    if (!isDragging) return;

    isDragging = false;

    carouselWrapper.classList.remove("dragging");
}


document.addEventListener(
    "mouseup",
    stopCarouselDrag
);


/* =========================================================
   TOUCH DRAG
========================================================= */

carouselWrapper.addEventListener(
    "touchstart",
    (e) => {

        isDragging = true;

        startX =
            e.touches[0].pageX;

        startScrollLeft =
            carouselWrapper.scrollLeft;

    },
    { passive: true }
);


carouselWrapper.addEventListener(
    "touchmove",
    (e) => {

        if (!isDragging) return;

        const currentX =
            e.touches[0].pageX;

        const distance =
            currentX - startX;

        carouselWrapper.scrollLeft =
            startScrollLeft - distance;

        normalizeCarouselPosition();

    },
    { passive: true }
);


carouselWrapper.addEventListener(
    "touchend",
    () => {

        isDragging = false;

    }
);

document.querySelectorAll(".case-study-image").forEach((container) => {

    let isDragging = false;
    let startY = 0;
    let startScrollTop = 0;

    container.addEventListener("pointerdown", (e) => {

        isDragging = true;

        container.classList.add("is-dragging");

        startY = e.clientY;
        startScrollTop = container.scrollTop;

        container.setPointerCapture(e.pointerId);
    });

    container.addEventListener("pointermove", (e) => {

        if (!isDragging) return;

        const distance = e.clientY - startY;

        container.scrollTop =
            startScrollTop - distance;
    });

    const stopDragging = () => {
        isDragging = false;
        container.classList.remove("is-dragging");
    };

    container.addEventListener("pointerup", stopDragging);
    container.addEventListener("pointercancel", stopDragging);
    container.addEventListener("lostpointercapture", stopDragging);

}); 

document.querySelectorAll(".carousel-card").forEach((card) => {

    card.addEventListener(
        "wheel",
        (e) => {

            // Only take over scrolling if the card
            // actually has vertical content
            if (card.scrollHeight <= card.clientHeight) {
                return;
            }

            e.preventDefault();

            card.scrollTop += e.deltaY;

        },
        { passive: false }
    );

});



