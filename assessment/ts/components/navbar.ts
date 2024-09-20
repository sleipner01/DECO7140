export function initilizeMobileNavbar() {
  function handleMenuToggle(toggle: HTMLButtonElement, menu: HTMLElement) {
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

  function handleMenuStateChange(menu: HTMLElement) {
    const state = menu.getAttribute('data-menu-state');
    if (state === 'open') {
      menu.classList.add('menu-open');
      menu.classList.remove('menu-closed');
    } else {
      menu.classList.add('menu-closed');
      menu.classList.remove('menu-open');
    }
  }

  const menu = document.getElementById('navbar-menu') as HTMLElement;
  const toggle = document.getElementById(
    'nav-menu-toggle'
  ) as HTMLButtonElement;
  toggle?.addEventListener('click', () => handleMenuToggle(toggle, menu));
}
