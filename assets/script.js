// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Project filtering (All / AI / DE / BI)
const buttons = Array.from(document.querySelectorAll("button[data-filter]"));
const projects = Array.from(document.querySelectorAll(".project"));

function setActive(btn){
  buttons.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

function applyFilter(tag){
  projects.forEach(p => {
    const tags = (p.getAttribute("data-tags") || "").split(",").map(s => s.trim().toLowerCase());
    const show = (tag === "all") || tags.includes((tag || '').toLowerCase());
    p.style.display = show ? "" : "none";
  });
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const tag = btn.getAttribute("data-filter");
    setActive(btn);
    applyFilter(tag);
  });
});

// default state
if (buttons.length) {
  setActive(buttons[0]);
  applyFilter("all");
}

// Small helper for link placeholders
const help = document.getElementById("addLinksHelp");
if (help) {
  help.addEventListener("click", (e) => {
    e.preventDefault();
    alert(
      "To add your links:\n\n" +
      "1) Open index.html\n" +
      "2) Find 'add link' and replace # with your URLs\n" +
      "   - GitHub repo\n" +
      "   - Live demo (if any)\n" +
      "   - Power BI report link\n\n" +
      "Tip: You can also set the Resume button URL near the top."
    );
  });
}

// Prevent Resume placeholder click if not set
const resumeBtn = document.getElementById("resumeBtn");
if (resumeBtn && resumeBtn.getAttribute("href") === "#") {
  resumeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Add your hosted resume link in index.html (search for id='resumeBtn').");
  });
}

// Lightbox video modal handling (uses Bootstrap modal)
document.addEventListener('DOMContentLoaded', () => {
  const videoModalEl = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  if (!videoModalEl || !modalVideo) return;
  const bsModal = new bootstrap.Modal(videoModalEl, {});

  document.querySelectorAll('.open-video').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const src = el.getAttribute('data-video-src');
      if (!src) return;
      const sourceEl = modalVideo.querySelector('source');
      sourceEl.setAttribute('src', src);
      modalVideo.load();
      bsModal.show();
    });
  });

  videoModalEl.addEventListener('hidden.bs.modal', () => {
    try {
      modalVideo.pause();
      const sourceEl = modalVideo.querySelector('source');
      sourceEl.setAttribute('src', '');
      modalVideo.load();
    } catch (err) {
      // ignore
    }
  });
});
