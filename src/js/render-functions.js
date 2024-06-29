import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderImages(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags }) => `
    <div class="photo-card">
      <a class="gallery__item" href="${largeImageURL}">
        <img class="gallery__image" src="${webformatURL}" alt="${tags}" />
      </a>
      <div class="info">
        <p class="info-item">${tags}</p>
      </div>
    </div>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);

  let lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}

export function toggleLoadMoreButton(isVisible) {
  const loadMoreButton = document.querySelector('#load-more');
  loadMoreButton.classList.toggle('hidden', !isVisible);
}