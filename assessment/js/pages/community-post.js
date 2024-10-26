import { getCommunityPost } from '../fetch/community.js';
import Alert from '../components/alert.js';
import BookmarkButton from '../components/bookmark.js';
import { renderComments } from '../components/comments.js';
import { fetchComments } from '../fetch/comments.js';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');
  const alertElement = document.getElementById('post-error-message');

  if (!postId) {
    console.error('No post ID provided in the URL. Redirecting to home.');
    window.location.href = '/';
    return;
  }

  getCommunityPost(postId)
    .then((post) => {
      if (!post) {
        console.error('Post not found.');
        Alert({
          message:
            'We could not find your post. Please have a look at our other posts.',
          type: 'info',
          parent: alertElement,
        });
        return;
      }

      // Create leafs for the sustainability rating
      const leafs = Array.from({ length: post.sustainability_rating }, () => {
        const leaf = document.createElement('span');
        leaf.classList.add('wrapper-svg', 'svg-leaf');
        leaf.setAttribute('aria-hidden', 'true');
        return leaf;
      });

      // Create stars for the rating
      const stars = Array.from({ length: post.rating }, () => {
        const star = document.createElement('span');
        star.classList.add('wrapper-svg', 'svg-star');
        star.setAttribute('aria-hidden', 'true');
        return star;
      });

      // Create tags for the filters
      const highlights = post.filters.map((filter) => {
        const tag = document.createElement('span');
        tag.classList.add('tag');
        tag.textContent = filter;
        tag.setAttribute('role', 'listitem');
        return tag;
      });

      // Populate the page with post data
      document.getElementById('post-page-heading').textContent = post.name;
      const postImage = document.getElementById('post-image');
      postImage.src = post.image;
      postImage.alt = `Image of ${post.name}`;
      document.getElementById('post-description').textContent =
        post.description;
      document.getElementById('post-author').textContent = 'By: ' + post.owner;
      document.getElementById('post-country').textContent = post.country;
      document.getElementById('post-rating').append(...stars);
      document.getElementById('post-sustainability-rating').append(...leafs);
      document.getElementById('post-filters').append(...highlights);
      document
        .getElementById('actions')
        .appendChild(BookmarkButton({ id: post.id, ghost: false }));
    })
    .catch((error) => {
      console.error('Error fetching post data:', error);
      Alert({
        message:
          'An error occurred while fetching the post. Please try again later.',
        type: 'error',
        parent: alertElement,
      });
    });
});

document.addEventListener('DOMContentLoaded', async () => {
  const commentsContainer = document.getElementById('comments');
  const comments = await fetchComments();
  renderComments(comments, commentsContainer);
});
