// ===== Config (troque por cliente) =====
const SITE_CONFIG = {
  whatsappNumber: "5531982315279", // (31) 98231-5279
  whatsappDefaultMessage: "Olá! Vim pelo site e gostaria de agendar um horário para o meu pet",
};

function buildWhatsAppLink(message) {
  const text = encodeURIComponent(message || SITE_CONFIG.whatsappDefaultMessage);
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${text}`;
}

document.addEventListener("DOMContentLoaded", () => {
  // Preenche todos os links de WhatsApp com mensagem contextual (data-wa-message)
  document.querySelectorAll("[data-whatsapp]").forEach((el) => {
    el.href = buildWhatsAppLink(el.dataset.waMessage);
  });

  // ---- Mobile menu ----
  const toggle = document.querySelector(".navbar__toggle");
  const menu = document.querySelector(".mobile-menu");
  const closeBtn = document.querySelector(".mobile-menu__close");
  if (toggle && menu) {
    const openMenu = () => { menu.classList.add("is-open"); document.body.style.overflow = "hidden"; };
    const closeMenu = () => { menu.classList.remove("is-open"); document.body.style.overflow = ""; };
    toggle.addEventListener("click", openMenu);
    closeBtn?.addEventListener("click", closeMenu);
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  }

  // ---- FAQ accordion ----
  document.querySelectorAll(".faq-item__question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const answer = item.querySelector(".faq-item__answer");
      const isOpen = item.classList.contains("is-open");

      document.querySelectorAll(".faq-item.is-open").forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove("is-open");
          openItem.querySelector(".faq-item__answer").style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove("is-open");
        answer.style.maxHeight = null;
      } else {
        item.classList.add("is-open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // ---- Scroll reveal (fade-up / scale-in) ----
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // ---- Botão flutuante do WhatsApp: só aparece depois que o CTA do hero sai de vista ----
  const floatingWhatsApp = document.querySelector(".floating-whatsapp");
  const heroWhatsApp = document.getElementById("heroWhatsApp");
  if (floatingWhatsApp && heroWhatsApp && "IntersectionObserver" in window) {
    const ctaObserver = new IntersectionObserver(
      ([entry]) => {
        floatingWhatsApp.classList.toggle("is-visible", !entry.isIntersecting);
      },
      { threshold: 0 }
    );
    ctaObserver.observe(heroWhatsApp);
  } else if (floatingWhatsApp) {
    floatingWhatsApp.classList.add("is-visible");
  }

  // ---- Navbar shadow on scroll ----
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.style.boxShadow = window.scrollY > 8 ? "var(--shadow-small)" : "none";
    });
  }

  // ---- Ano no footer ----
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
