import { getImagesByQuery } from './js/pixabay-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  clearGallery,
  createGallery,
  hideLoader,
  showLoader,
} from './js/render-functions';

export const refs = {
  formEl: document.querySelector('.form'),
  listElem: document.querySelector('.gallery'),
  loader: document.querySelector('.js-loader'),
};

refs.formEl.addEventListener('submit', async e => {
  e.preventDefault();

  const query = e.target.elements['search-text'].value.trim();

  if (!query) {
    iziToast.show({
      message: 'Fill please field',
      messageColor: 'white',
      color: 'red',
      position: 'topRight',
    });
    return;
  }
  clearGallery();
  showLoader();

  try {
    const images = await getImagesByQuery(query, 1);
    if (images.length === 0) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: 'white',
        color: 'red',
        position: 'topRight',
      });

      return;
    }

    createGallery(images);
  } catch {
    iziToast.show({
      message: 'Sorry, error. Please try again later!',
      messageColor: 'white',
      color: 'red',
      position: 'topRight',
    });
  }

  hideLoader();

  e.target.reset();
});
