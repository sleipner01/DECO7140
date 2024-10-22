import { getCommunityPost } from '../fetch/community.js';
import Alert from '../components/alert.js';
import BookmarkButton from '../components/bookmark.js';

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
      const leafs = Array(post.sustainability_rating)
        .fill(null)
        .map(() => {
          const leaf = document.createElement('span');
          leaf.classList.add('wrapper-svg');
          leaf.classList.add('svg-leaf');
          leaf.setAttribute('aria-hidden', 'true');
          return leaf;
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
      document.getElementById('post-author').textContent = post.owner;
      document.getElementById('post-rating').textContent = post.rating;
      document.getElementById('post-country').textContent = post.country;
      document.getElementById('post-sustainability-rating').append(...leafs);
      document.getElementById('post-filters').append(...highlights);
      document
        .getElementById('actions')
        .appendChild(BookmarkButton({ id: post.id }));
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
