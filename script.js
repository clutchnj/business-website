// Clutch Detailing — script.js

// Mobile hamburger
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.background = 'rgba(7,7,7,0.98)';
  } else {
    navbar.style.background = 'rgba(10,10,10,0.92)';
  }
});

// Contact form
async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const success = document.getElementById('form-success');
  const submitBtn = form.querySelector('button[type="submit"]');

  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  const data = new FormData(form);

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: data
    });
    const json = await res.json();

    if (json.success) {
      if (success) success.style.display = 'block';
      form.reset();
      submitBtn.textContent = 'Sent!';
      setTimeout(() => {
        if (success) success.style.display = 'none';
        submitBtn.textContent = 'Submit';
        submitBtn.disabled = false;
      }, 5000);
    } else {
      submitBtn.textContent = 'Error — Try Again';
      submitBtn.disabled = false;
    }
  } catch {
    submitBtn.textContent = 'Error — Try Again';
    submitBtn.disabled = false;
  }
}

// Package filter tabs
const tabs = document.querySelectorAll('.pkg-tab');
const cards = document.querySelectorAll('.pkg-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;

    cards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});
