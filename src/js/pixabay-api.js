import axios from 'axios';

const API_KEY = '44503068-6cc3802f70205d42434a99aa5';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page) {
  const response = await axios.get(`${BASE_URL}`, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 15,
    },
  });

  return response.data;
}