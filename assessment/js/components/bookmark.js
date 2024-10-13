import { createTooltip } from './tooltip.js';

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
 * @returns {HTMLElement} The bookmark button element.
 */
export default function BookmarkButton({ id }) {
  if (id === undefined || id === '') {
    throw new Error('An ID is required');
  }

  const updateButton = () => {
    button.setAttribute(
      'aria-label',
      isBookmarked(id) ? 'Remove bookmark' : 'Bookmark'
    );
    button.innerHTML = `
      <span class="sr-only">${isBookmarked(id) ? 'Remove bookmark' : 'Bookmark'}</span>
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
  button.classList.add('ghost');

  updateButton();

  button.addEventListener('click', () => {
    bookmark(id);
    updateButton();
  });

  return button;
}
