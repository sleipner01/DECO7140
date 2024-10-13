/**
 * Create a tooltip element.
 * This function creates a tooltip element. Remember to attach the tooltip to an element in the DOM.
 * @param {string} text - The text content of the tooltip.
 * @param {HTMLElement} element - The element to attach the tooltip to.
 * @param {boolean} inverse - Whether the tooltip should be inverse. Default is false.
 * @returns {HTMLElement} The tooltip element.
 */

export const createTooltip = (text, element, inverse = false) => {
  const tooltip = document.createElement('div');
  tooltip.classList.add('tooltip');
  if (inverse) {
    tooltip.classList.add('inverse');
  }
  tooltip.textContent = text;

  element.addEventListener('mouseenter', () => {
    tooltip.style.visibility = 'visible';
  });

  element.addEventListener('mouseleave', () => {
    tooltip.style.visibility = 'hidden';
  });

  element.addEventListener('focus', () => {
    tooltip.style.visibility = 'visible';
  });

  element.addEventListener('blur', () => {
    tooltip.style.visibility = 'hidden';
  });

  return tooltip;
};
