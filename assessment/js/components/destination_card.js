import BookmarkButton from './bookmark.js';

export default function VerticalCard(destination) {
  const card = document.createElement('article');
  card.classList.add('cta-card');
  card.setAttribute('aria-labelledby', `destination-${destination.id}-heading`);
  card.innerHTML = `
    <img src="${destination.image}" alt="Image of ${destination.name}" loading="lazy" />
    <div class="card-content">
      <h3 id="destination-${destination.id}-heading">${destination.name}</h3>
      <p><span class="wrapper-svg svg-map-pin" aria-hidden="true" style="width:0.9rem;height:0.9rem;"></span> ${destination.country}</p>
      <div class="actions mt-auto">
        <a href="./destination.html?id=${destination.id}" class="button translate" aria-label="Explore ${destination.name} destination">Explore destination<span class="wrapper-svg svg-chevron-right"></span></a>
      </div>
    </div>
  `;

  card
    .querySelector('.actions')
    .appendChild(BookmarkButton({ id: destination.id }));

  return card;
}
