import { getDestinations } from '../fetch/destinations.js';
import Alert from '../components/alert.js';

document.addEventListener('DOMContentLoaded', async () => {
  const destinationsGrid = document.getElementById('destinations-grid');
  const alertElement = document.getElementById('destinations-error-message');

  // Fetch the data
  await getDestinations()
    .then((data) => {
      // Remove skeleton loaders
      destinationsGrid.innerHTML = '';

      // Render destination cards
      data.forEach((destination) => {
        const card = document.createElement('article');
        card.classList.add('cta-card');
        card.setAttribute(
          'aria-labelledby',
          `destination-${destination.id}-heading`
        );
        card.innerHTML = `
          <img src="${destination.image}" alt="Image of ${destination.name}" loading="lazy" />
          <div class="card-content">
            <h3 id="destination-${destination.id}-heading">${destination.name}</h3>
            <p><span class="wrapper-svg svg-map-pin" aria-hidden="true" style="width:0.9rem;height:0.9rem;"></span> ${destination.country}</p>
            <a href="./destination.html?id=${destination.id}" class="button mt-auto" aria-label="Explore ${destination.name} destination">Explore destination<span class="wrapper-svg svg-chevron-right"></span></a>
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
