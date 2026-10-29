
"use strict";

// =====================================
// BAKARY TRAORE — PORTFOLIO INTERACTIONS
// =====================================

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.style.setProperty("--bg", "#2b2b2b");

  // 1. Année automatique dans le footer
  const yearElement = document.getElementById("current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Menu de navigation sur mobile
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const navigationLinks = document.querySelectorAll(".nav-link");

  function closeMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Ouvrir le menu");
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Ouvrir le menu" : "Fermer le menu"
      );

      navLinks.classList.toggle("open", !isOpen);
    });

    navigationLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });
  }

  // 3. Animations d'apparition au défilement
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // 4. Mise en évidence de la section active
  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navigationLinks.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", isActive);
          });
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px"
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // 5. Bouton retour en haut
  const backToTop = document.getElementById("back-to-top");

  function updateBackToTop() {
    if (!backToTop) return;

    backToTop.classList.toggle("visible", window.scrollY > 450);
  }

  window.addEventListener("scroll", updateBackToTop, {
    passive: true
  });

  updateBackToTop();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth"
      });
    });
  }

  // 6. Effet de texte animé
  const typedText = document.querySelector(".typed-text");

  if (typedText) {
    const words = [
      "développeur web",
      "passionné de technologie",
      "futur ingénieur"
    ];

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!reducedMotion) {
      let wordIndex = 0;
      let characterIndex = words[0].length;
      let deleting = false;

      function typeEffect() {
        const currentWord = words[wordIndex];

        if (deleting) {
          characterIndex--;
        } else {
          characterIndex++;
        }

        typedText.textContent = currentWord.slice(
          0,
          characterIndex
        );

        let delay = deleting ? 40 : 75;

        if (!deleting && characterIndex === currentWord.length) {
          deleting = true;
          delay = 1500;
        } else if (deleting && characterIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          delay = 350;
        }

        window.setTimeout(typeEffect, delay);
      }

      window.setTimeout(typeEffect, 1800);
    }
  }

  // 7. Petit effet de suivi des liens externes
  // Les liens sont configurés dans index.html.
  // Remplace les adresses d'exemple par tes vrais profils.

  console.log("Portfolio de Bakary Traoré chargé avec succès.");
});


