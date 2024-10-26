import { getDestination } from '../fetch/destinations.js';
import Alert from '../components/alert.js';
import BookmarkButton from '../components/bookmark.js';
import { renderReviewComments } from '../components/reviews.js';
import { fetchReviewComments } from '../fetch/reviews.js';

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
      const leafs = Array.from(
        { length: destination.sustainability_rating },
        () => {
          const leaf = document.createElement('span');
          leaf.classList.add('wrapper-svg', 'svg-leaf');
          leaf.setAttribute('aria-hidden', 'true');
          return leaf;
        }
      );

      // Create tags for the filters
      const highlights = destination.filters.map((filter) => {
        const tag = document.createElement('li');
        tag.classList.add('tag');
        tag.textContent = filter;
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

      const countryElement = document.getElementById('destination-country');
      countryElement.textContent = destination.country;
      countryElement.setAttribute(
        'aria-label',
        `Country: ${destination.country}`
      );

      const sustainabilityRatingElement = document.getElementById(
        'destination-sustainability-rating'
      );
      const sustainabilityRatingLabel = document.createElement('span');
      sustainabilityRatingLabel.classList.add('sr-only');
      sustainabilityRatingLabel.innerText = `Sustainability rating ${destination.sustainability_rating} out of 3`;
      sustainabilityRatingElement.appendChild(sustainabilityRatingLabel);
      sustainabilityRatingElement.append(...leafs);

      document.getElementById('destination-filters').append(...highlights);
      document
        .getElementById('actions')
        .appendChild(BookmarkButton({ id: destination.id, ghost: false }));
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

document.addEventListener('DOMContentLoaded', async () => {
  const commentsContainer = document.getElementById('comments');
  const comments = await fetchReviewComments();
  renderReviewComments(comments, commentsContainer);
});
