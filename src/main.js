import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

let currentPage = 1;
let query = '';
let gallery = new SimpleLightbox('.gallery a');

const form = document.getElementById('search-form');
const loadMoreButton = document.getElementById('load-more');
const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

form.addEventListener('submit', onSearch);
loadMoreButton.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();

  query = event.currentTarget.elements.searchQuery.value.trim();
  if (!query) {
    iziToast.error({ message: 'Please enter a search query' });
    return;
  }

  clearGallery();
  loadMoreButton.classList.add('hidden');
  currentPage = 1;

  try {
    const data = await fetchImages(query, currentPage);
    if (data.hits.length === 0) {
      iziToast.error({ message: 'No images found. Please try again.' });
      return;
    }
    renderGallery(data.hits);
    gallery.refresh();
    loadMoreButton.classList.remove('hidden');
    iziToast.success({ message: `Hooray! We found ${data.totalHits} images.` });
  } catch (error) {
    iziToast.error({ message: 'Error fetching images' });
  }
}

async function onLoadMore() {
  currentPage += 1;

  try {
    const data = await fetchImages(query, currentPage);
    renderGallery(data.hits);
    gallery.refresh();

    const totalPages = Math.ceil(data.totalHits / 15);
    if (currentPage >= totalPages) {
      loadMoreButton.classList.add('hidden');
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    }
  } catch (error) {
    iziToast.error({ message: 'Error fetching images' });
  }
}