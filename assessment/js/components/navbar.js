export function initilizeMobileNavbar() {
  if (typeof document === 'undefined') {
    console.error('This code must be run in a browser environment.');
    return;
  }

  function handleMenuToggle(toggle, menu) {
    if (menu.getAttribute('data-menu-state') === 'open') {
      menu.setAttribute('data-menu-state', 'closed');
      toggle.setAttribute('aria-label', 'Close menu');
      toggle.classList.remove('toggle-open-state');
      toggle.innerText = 'Open';
    } else {
      menu.setAttribute('data-menu-state', 'open');
      toggle.setAttribute('aria-label', 'Open menu');
      toggle.classList.add('toggle-open-state');
      toggle.innerText = 'Close';
    }
    handleMenuStateChange(menu);
  }
  function handleMenuStateChange(menu) {
    const state = menu.getAttribute('data-menu-state');
    if (state === 'open') {
      menu.classList.add('menu-open');
      menu.classList.remove('menu-closed');
    } else {
      menu.classList.add('menu-closed');
      menu.classList.remove('menu-open');
    }
  }
  const menu = document.getElementById('navbar-menu');
  const toggle = document.getElementById('nav-menu-toggle');
  toggle === null || toggle === void 0
    ? void 0
    : toggle.addEventListener('click', () => handleMenuToggle(toggle, menu));
}
