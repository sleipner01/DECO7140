import BookmarkButton from './bookmark.js';

export default function DestinationCard(destination) {
  const card = document.createElement('article');
  card.classList.add('cta-card');
  card.classList.add('horisontal');
  card.setAttribute('aria-labelledby', `destination-${destination.id}-heading`);
  const charactersToShow = 100;
  const trimmedDescription =
    destination.description.length > charactersToShow
      ? destination.description.substring(0, charactersToShow - 3) + '...'
      : destination.description;
  card.innerHTML = `
    <img src="${destination.image}" alt="Image of ${destination.name}" loading="lazy" />
    <div class="card-content">
      <h3 id="destination-${destination.id}-heading">${destination.name}</h3>
      <p class="flex-row-align-center gap-025"><span class="wrapper-svg svg-map-pin" aria-hidden="true"></span> ${destination.country}</p>
      <p class="short-description">${trimmedDescription}</p>
      <div class="actions mt-auto">
        <a href="./destination.html?id=${destination.id}" class="button translate" aria-label="Explore ${destination.name} destination">Explore destination<span class="wrapper-svg svg-chevron-right"></span></a>
      </div>
    </div>
  `;

  const actions = card.querySelector('.actions');
  actions.insertBefore(
    BookmarkButton({ id: destination.id }),
    actions.firstChild
  );

  return card;
}
