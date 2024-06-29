import { fetchImages } from './js/pixabay-api';
import { renderImages, clearGallery, toggleLoadMoreButton } from './js/render-functions';

const searchForm = document.querySelector('.search-form');
const loadMoreButton = document.querySelector('#load-more');
const gallery = document.querySelector('.gallery');

let query = '';
let page = 1;
let totalHits = 0;

searchForm.addEventListener('submit', onSearch);
loadMoreButton.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  query = event.currentTarget.elements.searchQuery.value.trim();
  page = 1;
  clearGallery();
  toggleLoadMoreButton(false);

  if (query === '') {
    return;
  }

  try {
    const data = await fetchImages(query, page);
    totalHits = data.totalHits;
    if (totalHits > 0) {
      renderImages(data.hits);
      toggleLoadMoreButton(page < Math.ceil(totalHits / 15));
    } else {
      alert('No images found.');
    }
  } catch (error) {
    console.error(error);
  }
}

async function onLoadMore() {
  page += 1;

  try {
    const data = await fetchImages(query, page);
    renderImages(data.hits);
    if (page >= Math.ceil(totalHits / 15)) {
      toggleLoadMoreButton(false);
      alert("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.error(error);
  }

  smoothScroll();
}

function smoothScroll() {
  const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}