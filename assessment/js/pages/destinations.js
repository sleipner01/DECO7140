import { getDestinations } from '../fetch/destinations.js';
import Alert from '../components/alert.js';
import VerticalCard from '../components/destination_card.js';

document.addEventListener('DOMContentLoaded', () => {
  const destinationsGrid = document.getElementById('destinations-grid');
  const alertElement = document.getElementById('destinations-error-message');

  // Fetch the data
  getDestinations()
    .then((data) => {
      // Remove skeleton loaders
      destinationsGrid.innerHTML = '';

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
