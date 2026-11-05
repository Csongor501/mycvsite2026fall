// Current year in the footer
document.getElementById("year").textContent = new Date().getFullYear();

// Dark mode toggle, remembered between visits
const root = document.documentElement;
const toggle = document.getElementById("theme-toggle");

function setTheme(theme) {
  root.dataset.theme = theme;
  toggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  try { localStorage.setItem("theme", theme); } catch (e) {}
}

let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
setTheme(saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

toggle.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

// Highlight the nav link of the section currently on screen
const links = document.querySelectorAll(".nav a");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
    });
  });
}, { rootMargin: "-40% 0px -55% 0px" });

document.querySelectorAll("main section").forEach((section) => observer.observe(section));
