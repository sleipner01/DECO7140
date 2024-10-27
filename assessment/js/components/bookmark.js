import { createTooltip } from './tooltip.js';

/**
 * Get the bookmarks from local storage.
 * @returns {Array} An array of bookmark IDs.
 */
export function getBookmarks() {
  const bookmarks = localStorage.getItem('bookmarks');
  return bookmarks ? JSON.parse(bookmarks) : [];
}

function addBookmark(id) {
  const bookmarks = getBookmarks();
  bookmarks.push(id);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function removeBookmark(id) {
  const bookmarks = getBookmarks();
  const index = bookmarks.indexOf(id);
  bookmarks.splice(index, 1);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function bookmark(id) {
  const bookmarks = getBookmarks();
  if (bookmarks.includes(id)) {
    removeBookmark(id);
  } else {
    addBookmark(id);
  }
}

function isBookmarked(id) {
  const bookmarks = getBookmarks();
  return bookmarks.includes(id);
}

/**
 * Create a bookmark button.
 * This function creates a bookmark button element.
 * @param {string} id - The ID of the bookmark.
 * @param {boolean} [ghost=true] - Whether the button should be a ghost button.
 * @returns {HTMLElement} The bookmark button element.
 */
export default function BookmarkButton({ id, ghost = true }) {
  if (id === undefined || id === '') {
    throw new Error('An ID is required');
  }

  const updateButton = () => {
    button.setAttribute(
      'aria-label',
      isBookmarked(id) ? 'Remove bookmark' : 'Click to add bookmark'
    );
    button.innerHTML = `
      <span class="wrapper-svg svg-${isBookmarked(id) ? 'remove-bookmark' : 'bookmark'}" aria-hidden="true"></span>
    `;
    const tooltip = createTooltip(
      isBookmarked(id) ? 'Click to remove bookmark' : 'Click to add bookmark',
      button
    );
    button.appendChild(tooltip);
  };

  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.setAttribute('aria-live', 'assertive');
  button.classList.add('button');
  if (ghost) button.classList.add('ghost');

  updateButton();

  button.addEventListener('click', () => {
    bookmark(id);
    updateButton();
  });

  return button;
}
