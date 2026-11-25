const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = [...document.querySelectorAll(".nav-link")];
const backToTop = document.querySelector(".back-to-top");
const sections = [...document.querySelectorAll("main section[id]")];
const revealItems = document.querySelectorAll(".reveal");

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  navMenu.classList.toggle("open", !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    navMenu.classList.remove("open");
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

const updateNavigation = () => {
  const marker = window.scrollY + 180;
  let currentId = "home";
  sections.forEach((section) => {
    if (section.offsetTop <= marker) currentId = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
  backToTop.classList.toggle("visible", window.scrollY > 600);
};

window.addEventListener("scroll", updateNavigation, { passive: true });
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
document.getElementById("copyright-year").textContent = new Date().getFullYear();
updateNavigation();
