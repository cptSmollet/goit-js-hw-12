export function renderGallery(images) {
    const galleryContainer = document.querySelector('.gallery');
    const markup = images
      .map(
        ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <div class="photo-card">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b> ${likes}</p>
          <p class="info-item"><b>Views</b> ${views}</p>
          <p class="info-item"><b>Comments</b> ${comments}</p>
          <p class="info-item"><b>Downloads</b> ${downloads}</p>
        </div>
      </div>
    `
      )
      .join('');
  
    galleryContainer.insertAdjacentHTML('beforeend', markup);
  }
  
  export function clearGallery() {
    const galleryContainer = document.querySelector('.gallery');
    galleryContainer.innerHTML = '';
  }