/**
 * Create a comment element
 * @param {Object} comment - Comment object
 * @returns {HTMLElement} - Comment element
 */
function createCommentElement(comment) {
  const commentElement = document.createElement('article');
  commentElement.classList.add('wrapper-comment');
  commentElement.setAttribute(
    'aria-labelledby',
    `comment-author-${comment.id}`
  );

  commentElement.innerHTML = `
    <p class="comment-body">${comment.text}</p>
    <div class="comment-footer">
      <img src="${comment.image}" alt="${comment.author} profile picture" class="comment-photo" />
      <div class="comment-details">
        <span class="sr-only">Posted by</span>
        <span class="comment-author" id="comment-author-${comment.id}">${comment.author}</span>
        <span class="sr-only">on</span>
        <span class="comment-date">${new Date(comment.date).toLocaleDateString()}</span>
      </div>
    </div>
  `;

  return commentElement;
}

/**
 * Render comments
 * @param {Array} comments - Array of comment objects
 * @param {HTMLElement} container - Container element to render comments into
 */
export function renderComments(comments, container) {
  container.innerHTML = ''; // Clear existing contents
  const shuffledComments = comments.sort(() => 0.5 - Math.random());
  shuffledComments.slice(0, 4).forEach((comment) => {
    const commentElement = createCommentElement(comment);
    container.appendChild(commentElement);
  });
}
