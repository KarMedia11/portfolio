  // Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-RCPLRD82K2');

//Vercel Analytics
  window.va = window.va || function () {
    (window.vaq = window.vaq || []).push(arguments);
  };

const slider = document.querySelector(".projects-grid");

function scrollProjects(direction) {
    slider.scrollLeft += direction * 400;
}

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

const form = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendBtn");

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
            confirmButtonColor: "#ff6b35"
        });

        form.reset();

    } catch (error) {

        Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "Something went wrong. Please try again.",
            confirmButtonColor: "#ff6b35"
        });

        console.error(error);

    } finally {

        sendBtn.disabled = false;
        sendBtn.innerHTML = "SEND MESSAGE";

    }
});
