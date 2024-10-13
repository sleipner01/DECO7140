import { getBookmarkedDestinations } from '../fetch/bookmarks.js';
import Alert from '../components/alert.js';
import VerticalCard from '../components/destination_card.js';

document.addEventListener('DOMContentLoaded', async () => {
  const destinationsGrid = document.getElementById(
    'itineraries-destinations-grid'
  );
  const alertElement = document.getElementById('destinations-error-message');
  const emptyMessage = document.getElementById('no-destinations-bookmarked');

  // Fetch the data
  getBookmarkedDestinations()
    .then((data) => {
      // Remove skeleton loaders
      destinationsGrid.innerHTML = '';

      if (data.length === 0) {
        emptyMessage.hidden = false;
        emptyMessage.setAttribute('aria-hidden', 'false');
        emptyMessage.classList.remove('hidden');
        return;
      }

      // Render destination cards
      data.forEach((destination) => {
        const card = VerticalCard(destination);
        destinationsGrid.appendChild(card);
      });
    })
    .catch((error) => {
      // Remove skeleton loaders
      destinationsGrid.innerHTML = '';

      console.error('Something went wrong while fetching destinations:', error);
      Alert({
        message:
          'An error occurred while fetching destinations. Please try again later.',
        type: 'error',
        parent: alertElement,
      });
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const communityGrid = document.getElementById('itineraries-community-grid');
  const alertElement = document.getElementById('community-error-message');
  const emptyMessage = document.getElementById('no-community-bookmarked');

  // Fetch the data
  getBookmarkedDestinations()
    .then((data) => {
      // Remove skeleton loaders
      communityGrid.innerHTML = '';

      if (data.length === 0) {
        emptyMessage.hidden = false;
        emptyMessage.setAttribute('aria-hidden', 'false');
        emptyMessage.classList.remove('hidden');
        return;
      }

      // Render destination cards
      data.forEach((destination) => {
        const card = VerticalCard(destination);
        communityGrid.appendChild(card);
      });
    })
    .catch((error) => {
      // Remove skeleton loaders
      communityGrid.innerHTML = '';

      console.error('Something went wrong while fetching destinations:', error);
      Alert({
        message:
          'An error occurred while fetching destinations. Please try again later.',
        type: 'error',
        parent: alertElement,
      });
    });
});
