import { getDestinations } from '../fetch/destinations.js';
import Alert from '../components/alert.js';

// Query build with graphql
// TODO: Update the query to fetch the required data
const query =
  '{\n  getPlaces(categories: ["NATURE"], limit: 10) {\n    id\n    abstract\n    name\n    country\n    }\n}';

document.addEventListener('DOMContentLoaded', async () => {
  const destinationsGrid = document.getElementById('destinations-grid');
  const alertElement = document.getElementById('destinations-error-message');

  // Fetch the data
  await getDestinations(query)
    .then(({ data }) => {
      // Remove skeleton loaders
      destinationsGrid.innerHTML = '';

      // Render destination cards
      data.getPlaces.forEach((place) => {
        const card = document.createElement('article');
        card.classList.add('cta-card');
        card.setAttribute('aria-labelledby', `destination-${place.id}-heading`);
        card.innerHTML = `
          <img src="./media/placeholder.svg" alt="Image of ${place.name}" loading="lazy" />
          <div class="card-content">
            <h3 id="destination-${place.id}-heading">${place.name}</h3>
            <p><strong>Country:</strong> ${place.country}</p>
            <a href="./destination.html?id=${place.id}" class="button mt-auto" aria-label="Explore ${place.name} destination">Explore destination<span class="wrapper-svg svg-chevron-right"></span></a>
          </div>
        `;
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
