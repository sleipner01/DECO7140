/**
 * Create an alert element.
 * Provide a message and type to display an alert.
 * The alert will be appended to the parent element.
 *
 * @param {string} message - The message to display in the alert
 * @param {string} type - The type of alert to display (success, info, warning, error)
 * @param {HTMLElement} parent - The parent element to append the alert to
 * @returns {HTMLElement} - The alert element
 */
export default function Alert({ message, type, parent }) {
  if (message === undefined) {
    throw new Error('A message is required');
  }
  const validTypes = ['success', 'info', 'warning', 'error'];
  if (type === undefined || !validTypes.includes(type)) {
    type = 'info';
  }
  if (parent === undefined) {
    throw new Error('An anchor element is required');
  }
  if (parent.tagName !== 'DIV') {
    throw new Error('The anchor element must be a div');
  }

  parent.classList.add('alert', `alert-${type}`);
  parent.setAttribute('role', 'alert');
  parent.setAttribute('aria-live', 'assertive');
  parent.setAttribute('aria-atomic', 'true');
  if (parent.hidden) {
    parent.hidden = false;
  }

  if (parent.hasChildNodes()) {
    parent.innerHTML = '';
  }
  parent.innerHTML = `
    <div class="wrapper-svg svg-${type}" aria-hidden="true"></div>
    <p>${message}</p>
  `;
  return alert;
}
