(() => {
  const root = document.documentElement;
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const themeOptions = document.querySelectorAll("[data-theme-option]");
  const header = document.querySelector(".site-header");
  const year = document.querySelector("#year");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

  const applyTheme = (preference) => {
    root.dataset.themePreference = preference;

    if (preference === "system") {
      delete root.dataset.theme;
    } else {
      root.dataset.theme = preference;
    }

    const effectiveTheme =
      preference === "system" ? (systemTheme.matches ? "dark" : "light") : preference;

    themeOptions.forEach(button => {
      const isActive = button.dataset.themeOption === preference;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    if (themeColor) {
      themeColor.setAttribute("content", effectiveTheme === "dark" ? "#090d18" : "#f7f8fb");
    }
  };

  const savedTheme = localStorage.getItem("portfolio-theme");
  let themePreference = ["light", "dark"].includes(savedTheme) ? savedTheme : "system";

  applyTheme(themePreference);

  themeOptions.forEach(button => {
    button.addEventListener("click", () => {
      themePreference = button.dataset.themeOption;

      if (themePreference === "system") {
        localStorage.removeItem("portfolio-theme");
      } else {
        localStorage.setItem("portfolio-theme", themePreference);
      }

      applyTheme(themePreference);
    });
  });

  systemTheme.addEventListener?.("change", () => {
    if (themePreference === "system") applyTheme("system");
  });

  navToggle?.addEventListener("click", () => {
    const isOpen = navMenu?.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  });

  const closeMobileMenu = () => {
    navMenu?.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  };

  document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("click", event => {
    if (!navMenu?.classList.contains("open")) return;
    if (navMenu.contains(event.target) || navToggle?.contains(event.target)) return;
    closeMobileMenu();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMobileMenu();
  });

  const syncHeader = () => header?.classList.toggle("scrolled", window.scrollY > 8);
  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });

  if (year) year.textContent = new Date().getFullYear();

  const revealTargets = document.querySelectorAll(
    ".section-heading, .skill-card, .featured-project, .project-card, .timeline-item, .contact-card"
  );

  revealTargets.forEach(element => element.setAttribute("data-reveal", ""));

  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach(element => observer.observe(element));
  } else {
    revealTargets.forEach(element => element.classList.add("revealed"));
  }
})();