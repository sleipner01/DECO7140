import { getCommunityPosts } from '../fetch/community.js';
import Alert from '../components/alert.js';
import CommunityCard from '../components/community_post_card.js';

document.addEventListener('DOMContentLoaded', () => {
  const communityGrid = document.getElementById('community-grid');
  const alertElement = document.getElementById('community-error-message');

  // Fetch the data
  getCommunityPosts()
    .then((data) => {
      // Remove skeleton loaders
      communityGrid.innerHTML = '';

      // Render community cards
      data.forEach((destination) => {
        // TODO: Create a card for community post
        const card = CommunityCard(destination);
        communityGrid.appendChild(card);
      });
    })
    .catch((error) => {
      // Remove skeleton loaders
      communityGrid.innerHTML = '';

      console.error(
        'Something went wrong while fetching community posts:',
        error
      );
      Alert({
        message:
          'An error occurred while fetching community posts. Please try again later.',
        type: 'error',
        parent: alertElement,
      });
    });
});
