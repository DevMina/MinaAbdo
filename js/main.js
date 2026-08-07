/* ── NAV TOGGLE ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

/* ── SCROLL-TO-TOP BUTTON ── */
const topBtn = document.getElementById('top-btn');
window.addEventListener('scroll', () => {
  topBtn.classList.toggle('visible', window.scrollY > 320);
});
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal');
const observer  = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
  { threshold: 0.12 }
);
revealEls.forEach(el => observer.observe(el));

/* ── CONTACT FORM VALIDATION ── */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput    = form.querySelector('[name="name"]');
  const emailInput   = form.querySelector('[name="email"]');
  const messageInput = form.querySelector('[name="message"]');

  const nameErr    = document.getElementById('name-err');
  const emailErr   = document.getElementById('email-err');
  const messageErr = document.getElementById('message-err');

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

  /* Inline clear on input */
  nameInput.addEventListener('input',    () => clearError(nameErr));
  emailInput.addEventListener('input',   () => clearError(emailErr));
  messageInput.addEventListener('input', () => clearError(messageErr));
});

/* ── ACTIVE NAV HIGHLIGHT ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 80) current = s.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? '#fff'
      : '';
  });
}, { passive: true });
