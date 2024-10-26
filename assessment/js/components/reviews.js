/**
 * Create a comment element
 * @param {Object} comment - Comment object
 * @returns {HTMLElement} - Comment element
 */
function createReviewCommentElement(comment) {
  const commentElement = document.createElement('article');
  commentElement.classList.add('wrapper-comment', 'review');
  commentElement.setAttribute(
    'aria-labelledby',
    `comment-${comment.id}-heading`
  );

  commentElement.innerHTML = `
    <div class="review-stars" id="review-${comment.id}-rating"></div>
    <header>
      <h3 id="comment-${comment.id}-heading" aria-label="${comment.title}, ${comment.rating} out of 5 stars.">${comment.title}</h3>
    </header>
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

  // Create stars for the rating
  const starsContainer = commentElement.querySelector(
    `#review-${comment.id}-rating`
  );
  const stars = Array.from({ length: comment.rating }, () => {
    const star = document.createElement('span');
    star.classList.add('wrapper-svg', 'svg-star');
    star.setAttribute('aria-hidden', 'true');
    return star;
  });
  stars.forEach((star) => starsContainer.appendChild(star));

  return commentElement;
}

/**
 * Render comments
 * @param {Array} comments - Array of comment objects
 * @param {HTMLElement} container - Container element to render comments into
 */
export function renderReviewComments(comments, container) {
  container.innerHTML = ''; // Clear existing contents
  const shuffledComments = comments.sort(() => 0.5 - Math.random());
  shuffledComments.slice(0, 4).forEach((comment) => {
    const commentElement = createReviewCommentElement(comment);
    container.appendChild(commentElement);
  });
}
