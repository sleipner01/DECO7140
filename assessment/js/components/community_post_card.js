import BookmarkButton from './bookmark.js';

export default function VerticalCard(post) {
  const card = document.createElement('article');
  card.classList.add('cta-card');
  card.setAttribute('aria-labelledby', `post-${post.id}-heading`);
  card.innerHTML = `
    <img src="${post.image}" alt="Image of ${post.name}" loading="lazy" />
    <div class="card-content">
    <div>
      <p>By ${post.owner} · <span class="sr-only">Rating:</span>${post.rating}</p>
    </div>
      <h3 id="post-${post.id}-heading">${post.name}</h3>
      <p><span class="wrapper-svg svg-map-pin" aria-hidden="true" style="width:0.9rem;height:0.9rem;"></span> ${post.country}</p>
      <div class="actions mt-auto">
      <a href="./community-post.html?id=${post.id}" class="button translate" aria-label="Explore ${post.name} post">Explore gem<span class="wrapper-svg svg-chevron-right"></span></a>
      </div>
    </div>
  `;

  const actions = card.querySelector('.actions');
  actions.insertBefore(BookmarkButton({ id: post.id }), actions.firstChild);

  return card;
}
