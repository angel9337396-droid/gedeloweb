if (new URLSearchParams(window.location.search).get("animations") === "on") {
  document.documentElement.classList.add("motion-preview");
}

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
  navLinks.classList.toggle("is-open", !isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    navLinks.classList.remove("is-open");
  });
});

document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const isExpanded = question.getAttribute("aria-expanded") === "true";
    question.setAttribute("aria-expanded", String(!isExpanded));
    document.getElementById(question.getAttribute("aria-controls")).hidden = isExpanded;
  });
});

const otherSystemsToggle = document.querySelector(".other-systems-toggle");
const otherSystemsPanel = document.getElementById(otherSystemsToggle.getAttribute("aria-controls"));
otherSystemsToggle.addEventListener("click", () => {
  const isExpanded = otherSystemsToggle.getAttribute("aria-expanded") === "true";
  otherSystemsToggle.setAttribute("aria-expanded", String(!isExpanded));
  otherSystemsPanel.hidden = isExpanded;
  otherSystemsToggle.firstChild.textContent = isExpanded ? "Otros sistemas " : "Ocultar otros sistemas ";
});

document.querySelectorAll("[data-plan], [data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const interest = link.dataset.plan || link.dataset.service;
    const option = document.querySelector(`#interest option[value="${interest}"]`);
    if (option) document.querySelector("#interest").value = interest;
  });
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  && !document.documentElement.classList.contains("motion-preview");
if (!reduceMotion) {
  document.querySelector(".hero").classList.add("intro-ready");
}

if (!reduceMotion && "IntersectionObserver" in window) {
  const revealItems = document.querySelectorAll(
    ".section-heading, .service-card, .plan-card, .system-cards > .system-card, .other-system-cards > .system-card, .process-card, .faq-item, .contact-card"
  );
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });

  revealItems.forEach((item, index) => {
    item.dataset.reveal = "";
    item.style.setProperty("--reveal-delay", `${(index % 4) * 90}ms`);
    revealObserver.observe(item);
  });
  document.documentElement.classList.add("motion-ready");
}

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get("name").trim();
  const business = form.get("business").trim();
  const interest = form.get("interest");
  const message = form.get("message").trim();
  const lines = [
    `Hola, soy ${name}.`,
    business ? `Mi negocio se llama ${business}.` : "",
    `Me interesa: ${interest}.`,
    message ? `Te cuento un poco más: ${message}` : ""
  ].filter(Boolean);
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(lines.join("\n"))}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  document.querySelector("#form-note").textContent = "¡Listo! Se abrió WhatsApp con tu mensaje. Elige a quién enviárselo.";
});
