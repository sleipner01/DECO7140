import { getDestinations } from '../fetch/destinations.js';

// Query build with graphql
// TODO: Update the query to fetch the required data
const query =
  '{\n  getPlaces(categories: ["NATURE"], limit: 10) {\n    id\n    abstract\n    name\n    country\n    }\n}';
const { data } = await getDestinations(query);

document.addEventListener('DOMContentLoaded', () => {
  const destinationsGrid = document.getElementById('destinations-grid');

  // TODO: Render proper destination cards
  data.getPlaces.forEach((place) => {
    const card = document.createElement('div');
    card.classList.add('cta-card');
    // TODO: Add Tags
    card.innerHTML = `
      <img src="./media/placeholder.svg" alt="${place.name}" />
      <div class="card-content">
      <h3>${place.name}</h3>
      <p><strong>Country:</strong> ${place.country}</p>
      <a href="./destination.html?id=${place.id}" class="button mt-auto">Explore destination</a>
      </div>
    `;
    destinationsGrid.appendChild(card);
  });
});
