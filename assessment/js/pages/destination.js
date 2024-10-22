import { getDestination } from '../fetch/destinations.js';
import Alert from '../components/alert.js';
import BookmarkButton from '../components/bookmark.js';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const destinationId = urlParams.get('id');
  const alertElement = document.getElementById('destination-error-message');

  if (!destinationId) {
    console.error(
      'No destination ID provided in the URL. Redirecting to home.'
    );
    window.location.href = '/';
    return;
  }

  getDestination(destinationId)
    .then((destination) => {
      if (!destination) {
        console.error('Destination not found.');
        Alert({
          message:
            'We could not find your destination. Please have a look at our other destinations.',
          type: 'info',
          parent: alertElement,
        });
        return;
      }

      // Create leafs for the sustainability rating
      const leafs = Array(destination.sustainability_rating)
        .fill(null)
        .map(() => {
          const leaf = document.createElement('span');
          leaf.classList.add('wrapper-svg');
          leaf.classList.add('svg-leaf');
          leaf.setAttribute('aria-hidden', 'true');
          return leaf;
        });

      // Create tags for the filters
      const highlights = destination.filters.map((filter) => {
        const tag = document.createElement('span');
        tag.classList.add('tag');
        tag.textContent = filter;
        tag.setAttribute('role', 'listitem');
        return tag;
      });

      // Populate the page with destination data
      document.getElementById('destination-page-heading').textContent =
        destination.name;
      const destinationImage = document.getElementById('destination-image');
      destinationImage.src = destination.image;
      destinationImage.alt = `Image of ${destination.name}`;
      document.getElementById('destination-description').textContent =
        destination.description;
      document.getElementById('destination-country').textContent =
        destination.country;
      document
        .getElementById('destination-sustainability-rating')
        .append(...leafs);
      document.getElementById('destination-filters').append(...highlights);
      document
        .getElementById('actions')
        .appendChild(BookmarkButton({ id: destination.id }));
    })
    .catch((error) => {
      console.error('Error fetching destination data:', error);
      Alert({
        message:
          'An error occurred while fetching the destination. Please try again later.',
        type: 'error',
        parent: alertElement,
      });
    });
});
