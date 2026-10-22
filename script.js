/* ============================================================
   Nguyen Quang Nhat — Portfolio 2026
   Video Editor & Motion Graphic Designer
   ============================================================ */

/* ---------- Helpers ---------- */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* ---------- Year ---------- */
const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- Preloader (Tối ưu tốc độ) ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const pre = document.querySelector(".preloader");
  const num = document.querySelector(".preloader-num");
  const bar = document.querySelector(".preloader-bar");
  if (!pre) return;

  let progress = 0;
  // Tốc độ chạy nhanh hơn (nhảy 25-30% mỗi lần thay vì 15%)
  const interval = setInterval(() => {
    progress += Math.random() * 25 + 10; 
    if (progress >= 100) progress = 100;
    
    if (num) num.textContent = Math.floor(progress);
    if (bar) bar.style.width = progress + "%";
    
    if (progress >= 100) {
      clearInterval(interval);
      // Chờ 0.2s cho mượt rồi ẩn đi
      setTimeout(() => pre.classList.add("done"), 200);
    }
  }, 50); // 50ms thay vì 100ms
});


/* ---------- Mobile menu ---------- */
const navToggle  = $(".nav-toggle");
const mobileMenu = $(".mobile-menu");

if (navToggle && mobileMenu) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  $$("a", mobileMenu).forEach(a => a.addEventListener("click", () => {
    navToggle.classList.remove("active");
    mobileMenu.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }));
}

/* ---------- Custom cursor ---------- */
const dot  = $(".cursor-dot");
const ring = $(".cursor-ring");

if (dot && ring) {
  let mx = 0, my = 0, rx = 0, ry = 0;

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });

  (function animateRing() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  })();

  $$("a, button, [data-cursor='hover']").forEach(el => {
    el.addEventListener("mouseenter", () => ring.classList.add("hover"));
    el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
  });
}

/* ---------- Magnetic buttons ---------- */
$$(".magnetic").forEach(btn => {
  btn.addEventListener("mousemove", (e) => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width  / 2;
    const y = e.clientY - r.top  - r.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "";
  });
});

/* ---------- Lenis smooth scroll ---------- */
let lenis = null;
if (typeof Lenis !== "undefined") {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  (function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  })(performance.now());
}

/* ---------- Anchor links (with Lenis) ---------- */
$$('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: -20 });
    else target.scrollIntoView({ behavior: "smooth" });
  });
});

/* ---------- Showreel play button ---------- */
const reelPoster = $(".reel-poster");
const reelPlay   = $(".reel-play");
if (reelPoster && reelPlay) {
  reelPlay.addEventListener("click", () => {
    reelPoster.classList.add("hidden");
    const iframe = $(".reel-video iframe");
    if (iframe && !iframe.src.includes("autoplay=1")) {
      iframe.src = iframe.src + (iframe.src.includes("?") ? "&" : "?") + "autoplay=1";
    }
  });
}

/* ---------- Project modal ---------- */
const modal       = $("#modal");
const modalIframe = $("#modalIframe");
const modalTitle  = $("#modalTitle");

function openModal(videoUrl, title) {
  if (!modal || !modalIframe) return;
  if (modalTitle) modalTitle.textContent = title || "";
  if (videoUrl) {
    modalIframe.src = videoUrl +
      (videoUrl.includes("?") ? "&" : "?") +
      "autoplay=1&rel=0";
  }
  modal.classList.add("active");
  document.body.classList.add("no-scroll");
}

function closeModal() {
  if (!modal || !modalIframe) return;
  modal.classList.remove("active");
  modalIframe.src = "";
  document.body.classList.remove("no-scroll");
}

$$(".work-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    openModal(btn.dataset.video, btn.dataset.title);
  });
});

if (modal) {
  const closeBtn = $(".modal-close", modal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
}
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

/* ---------- GSAP reveal animations ---------- */
if (typeof gsap !== "undefined") {
  if (typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);

  $$("[data-reveal]").forEach((el) => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        once: true,
      },
    });
  });
}

/* ---------- Swiper (testimonials, if present) ---------- */
if (typeof Swiper !== "undefined" && $(".testimonials-swiper")) {
  new Swiper(".testimonials-swiper", {
    slidesPerView: 1,
    spaceBetween: 40,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    pagination: { el: ".swiper-pagination", clickable: true },
  });
}
