// nav.js - automatically switch to hamburger menu when nav buttons wrap
console.log("Navigation script loaded.");
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const topBar = document.querySelector('nav.top-bar');
  const navButton = document.querySelector('.nav-button');
  const navToggle = document.querySelector('.nav-toggle');
  
  if (!topBar || !navButton || !navToggle) return;

  // Store the single-line height (initial render without wrapping)
  function checkNavWrapping() {
    // Use width-based detection: compare needed width for nav + logo + signin against available topBar width
    const topRect = topBar.getBoundingClientRect();
    const navRect = navButton.getBoundingClientRect();
    const logo = document.querySelector('.nav-logo');
    const logoRect = logo ? logo.getBoundingClientRect() : { width: 0 };
    const signin = document.querySelector('.signin-up-button');
    const signinRect = signin ? signin.getBoundingClientRect() : { width: 0 };

    // Amount of horizontal space the nav items actually need
    const neededWidth = navButton.scrollWidth + logoRect.width + signinRect.width + 32; // buffer
    const availableWidth = topRect.width;

    // Also check if nav visually overflows to the right
    const isOverflowingX = navRect.right > (topRect.right - 8);

    if (neededWidth > availableWidth || isOverflowingX) {
      // Enable hamburger mode
      console.log('Nav overflowing horizontally — enabling hamburger mode', { neededWidth, availableWidth, isOverflowingX });
      body.classList.add('wrapped');
      navToggle.style.display = 'inline-block';
    } else {
      // Disable hamburger mode
      console.log('Nav fits horizontally — disabling hamburger mode', { neededWidth, availableWidth, isOverflowingX });
      body.classList.remove('wrapped');
      navButton.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
      navToggle.style.display = '';
    }
  }

  // Check on load and whenever window resizes
  window.addEventListener('load', checkNavWrapping);
  window.addEventListener('resize', checkNavWrapping);
  checkNavWrapping();

  // Setup hamburger toggle functionality
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navButton.classList.toggle('open');
    document.body.classList.toggle('nav-open', !expanded);
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navButton.classList.contains('open')) return;
    if (e.target === navToggle) return;
    if (navButton.contains(e.target)) return;
    
    navButton.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  });
});
