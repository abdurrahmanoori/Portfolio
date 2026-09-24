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
    const effectiveTheme =
      preference === "system" ? (systemTheme.matches ? "dark" : "light") : preference;

    root.dataset.themePreference = preference;
    root.dataset.theme = effectiveTheme;

    themeOptions.forEach(button => {
      const isActive = button.dataset.themeOption === preference;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    if (themeColor) {
      themeColor.setAttribute("content", effectiveTheme === "dark" ? "#090d18" : "#f7f8fb");
    }
  };

  let themePreference = localStorage.getItem("portfolio-theme") || "system";
  if (!["system", "light", "dark"].includes(themePreference)) {
    themePreference = "system";
  }

  applyTheme(themePreference);

  themeOptions.forEach(button => {
    button.addEventListener("click", () => {
      themePreference = button.dataset.themeOption;
      localStorage.setItem("portfolio-theme", themePreference);
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

  document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu?.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
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