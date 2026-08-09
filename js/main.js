/* ── DYNAMIC COPYRIGHT YEAR ── */
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── NAV TOGGLE (with Escape key support) ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  })
);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.focus();
  }
});

/* ── SCROLL-TO-TOP BUTTON (passive) ── */
const topBtn = document.getElementById('top-btn');
if (topBtn) {
  window.addEventListener('scroll', () => {
    topBtn.classList.toggle('visible', window.scrollY > 320);
  }, { passive: true });
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── SCROLL REVEAL (with IntersectionObserver fallback) ── */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach(el => observer.observe(el));
} else {
  /* Fallback: show everything immediately */
  revealEls.forEach(el => el.classList.add('visible'));
}

/* ── ACTIVE NAV HIGHLIGHT (uses CSS class, not inline style) ── */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('nav-active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });

/* ── CONTACT FORM VALIDATION ── */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput    = form.querySelector('[name="name"]');
  const emailInput   = form.querySelector('[name="email"]');
  const messageInput = form.querySelector('[name="message"]');
  const nameErr      = document.getElementById('name-err');
  const emailErr     = document.getElementById('email-err');
  const messageErr   = document.getElementById('message-err');

  function showError(el, msg) { el.textContent = msg; el.style.display = 'block'; }
  function clearError(el)     { el.textContent = '';  el.style.display = 'none';  }

  form.addEventListener('submit', e => {
    let valid = true;
    clearError(nameErr); clearError(emailErr); clearError(messageErr);

    if (!nameInput.value.trim()) {
      showError(nameErr, 'Please enter your name.'); valid = false;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      showError(emailErr, 'Please enter your email.'); valid = false;
    } else if (!emailRe.test(emailInput.value.trim())) {
      showError(emailErr, 'Please enter a valid email.'); valid = false;
    }
    if (!messageInput.value.trim()) {
      showError(messageErr, 'Please enter a message.'); valid = false;
    }
    if (!valid) e.preventDefault();
  });

  nameInput.addEventListener('input',    () => clearError(nameErr));
  emailInput.addEventListener('input',   () => clearError(emailErr));
  messageInput.addEventListener('input', () => clearError(messageErr));
});

/* ── FORM SUBMIT LOADING STATE ── */
document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.getElementById('submit-btn');
  const btnText   = document.getElementById('btn-text');
  const form      = document.getElementById('contact-form');
  if (!submitBtn || !form) return;

  form.addEventListener('submit', () => {
    // Only show loading if form is valid (no errors showing)
    const hasErrors = document.querySelectorAll('.form-error[style*="block"]').length > 0;
    if (!hasErrors) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      btnText.textContent = 'Sending…';
    }
  });
});
