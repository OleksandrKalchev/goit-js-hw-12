import axios from 'axios';

export async function getImagesByQuery(query, page) {
  const API_KEY = '55051390-ef93f0dae1124012c9fc0333f';
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const url = `${BASE_URL}${END_POINT}`;

  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 15,
    page: page,
  };

  const res = await axios.get(url, { params });
  return res.data.hits;
}
