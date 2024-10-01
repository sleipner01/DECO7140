export function initilizeMobileNavbar() {
  if (typeof document === 'undefined') {
    console.error('This code must be run in a browser environment.');
    return;
  }

  function handleMenuToggle(toggle, menu) {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !isExpanded);
    toggle.setAttribute('aria-label', !isExpanded ? 'Close menu' : 'Open menu');

    handleMenuStateChange(toggle, menu);
  }

  function handleMenuStateChange(toggle, menu) {
    menu.classList.toggle('menu-open');
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-hidden', !isOpen);

    // Add or remove no-scroll class to prevent or allow scrolling
    const body = document.body;
    if (isOpen) {
      body.classList.add('no-scroll');
    } else {
      body.classList.remove('no-scroll');
    }
  }

  function addShadowOnScroll(navbar) {
    if (window.scrollY > 0) {
      navbar.classList.add('navbar-shadow');
    } else {
      navbar.classList.remove('navbar-shadow');
    }
  }

  const menu = document.getElementById('navbar-menu');
  const toggle = document.getElementById('nav-menu-toggle');
  const navbar = document.getElementById('navbar');
  toggle.addEventListener('click', () => handleMenuToggle(toggle, menu));
  window.addEventListener('scroll', () => addShadowOnScroll(navbar));
}
