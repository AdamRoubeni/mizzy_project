const toggleBtn = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

toggleBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});


// Mobile menu toggle
// script.js

document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
  
    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  
    // Contact form handler
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const name = contactForm.name.value;
      const email = contactForm.email.value;
      const message = contactForm.message.value;
  
      const res = await fetch("http://localhost:3001/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
  
      const result = await res.text();
      alert(result);
      contactForm.reset();
    });
  });
  