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

  const menu = document.getElementById('navbar-menu');
  const toggle = document.getElementById('nav-menu-toggle');
  toggle.addEventListener('click', () => handleMenuToggle(toggle, menu));
}
