(() => {
  const root = document.documentElement;
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const themeToggle = document.querySelector(".theme-toggle");
  const header = document.querySelector(".site-header");
  const year = document.querySelector("#year");

  const themeColor = document.querySelector('meta[name="theme-color"]');

  const syncThemeControl = () => {
    const isDark = root.dataset.theme === "dark";
    const icon = themeToggle?.querySelector(".theme-icon");
    const label = themeToggle?.querySelector(".theme-label");

    if (icon) icon.textContent = isDark ? "☀" : "☾";
    if (label) label.textContent = isDark ? "Light" : "Dark";
    if (themeToggle) {
      const action = isDark ? "Switch to light mode" : "Switch to dark mode";
      themeToggle.setAttribute("aria-label", action);
      themeToggle.setAttribute("title", action);
    }
    if (themeColor) themeColor.setAttribute("content", isDark ? "#090d18" : "#f7f8fb");
  };

  root.dataset.theme = localStorage.getItem("portfolio-theme") || "light";
  syncThemeControl();

  themeToggle?.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    localStorage.setItem("portfolio-theme", nextTheme);
    syncThemeControl();
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