(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const countdownEl = document.querySelector(".countdown");
  const weddingISO = countdownEl?.dataset.wedding || "2026-11-25T20:00:00+05:30";
  const weddingDate = new Date(weddingISO);

  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minsEl = document.getElementById("cd-mins");
  const secsEl = document.getElementById("cd-secs");

  const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

  const setCount = (el, value) => {
    if (!el || el.textContent === value) return;
    el.textContent = value;
    if (reduceMotion) return;
    el.classList.remove("is-flip");
    void el.offsetWidth;
    el.classList.add("is-flip");
  };

  const tick = () => {
    const now = Date.now();
    let diff = weddingDate.getTime() - now;

    if (diff <= 0) {
      setCount(daysEl, "00");
      setCount(hoursEl, "00");
      setCount(minsEl, "00");
      setCount(secsEl, "00");
      return;
    }

    const days = Math.floor(diff / 86400000);
    diff %= 86400000;
    const hours = Math.floor(diff / 3600000);
    diff %= 3600000;
    const mins = Math.floor(diff / 60000);
    diff %= 60000;
    const secs = Math.floor(diff / 1000);

    setCount(daysEl, pad(days));
    setCount(hoursEl, pad(hours));
    setCount(minsEl, pad(mins));
    setCount(secsEl, pad(secs));
  };

  tick();
  window.setInterval(tick, 1000);

  const nav = document.querySelector(".nav");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  const scrollBar = document.getElementById("scroll-bar");

  const onScroll = () => {
    nav?.classList.toggle("is-solid", window.scrollY > 40);
    if (!scrollBar) return;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = height > 0 ? (window.scrollY / height) * 100 : 0;
    scrollBar.style.width = `${progress}%`;
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  navToggle?.addEventListener("click", () => {
    const open = navLinks?.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  const sections = ["countdown", "story", "events", "fun", "family", "rsvp"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if ("IntersectionObserver" in window && navLinks) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.querySelectorAll("a").forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
          });
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 }
    );
    sections.forEach((section) => spy.observe(section));
  }

  document.querySelectorAll(".event-grid, .schedule-list, .joke-list, .family-grid").forEach((group) => {
    group.querySelectorAll(".reveal").forEach((el, index) => {
      el.style.transitionDelay = `${index * 90}ms`;
    });
  });

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  const hero = document.querySelector(".hero");
  if (hero && !reduceMotion) {
    const petals = document.createElement("div");
    petals.className = "petals";
    petals.setAttribute("aria-hidden", "true");
    const colors = ["#d4af37", "#f3ebe0", "#e7b7c4", "#c46a42", "#fff6e8"];
    for (let i = 0; i < 16; i += 1) {
      const petal = document.createElement("span");
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.background = colors[i % colors.length];
      petal.style.animationDuration = `${9 + Math.random() * 11}s`;
      petal.style.animationDelay = `${Math.random() * -14}s`;
      petal.style.setProperty("--drift", `${Math.round(Math.random() * 120 - 60)}px`);
      petals.appendChild(petal);
    }
    hero.appendChild(petals);

    const media = hero.querySelector(".hero-media");
    media?.classList.add("is-live");
    hero.addEventListener("pointermove", (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 18;
      const y = (event.clientY / window.innerHeight - 0.5) * 12;
      if (media) media.style.transform = `scale(1.08) translate(${x}px, ${y}px)`;
    });
  }

  const tilt = document.querySelector(".invite-tilt");
  if (tilt && !reduceMotion) {
    const frame = tilt.parentElement;
    frame?.addEventListener("pointermove", (event) => {
      const rect = frame.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      tilt.style.animation = "none";
      tilt.style.transform = `rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg)`;
    });
    frame?.addEventListener("pointerleave", () => {
      tilt.style.animation = "";
      tilt.style.transform = "";
    });
  }
})();
