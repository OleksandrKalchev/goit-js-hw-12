import { getImagesByQuery } from './js/pixabay-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  clearGallery,
  createGallery,
  hideLoader,
  hideLoadMoreButton,
  showLoader,
  showLoadMoreButton,
} from './js/render-functions';

export const refs = {
  formEl: document.querySelector('.form'),
  listElem: document.querySelector('.gallery'),
  loader: document.querySelector('.js-loader'),
  loadMore: document.querySelector('.js-btn-load'),
};

const PER_PAGE = 15;

let query;
let page;
let totalPages;

refs.formEl.addEventListener('submit', async e => {
  e.preventDefault();

  hideLoadMoreButton();

  query = e.target.elements['search-text'].value.trim();

  if (!query) {
    iziToast.show({
      message: 'Fill please field',
      messageColor: 'white',
      color: 'red',
      position: 'topRight',
    });
    return;
  }
  page = 1;
  clearGallery();
  showLoader();

  try {
    const res = await getImagesByQuery(query, page);
    if (res.hits.length === 0) {
      hideLoader();
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: 'white',
        color: 'red',
        position: 'topRight',
      });

      return;
    }
    createGallery(res.hits);
    totalPages = Math.ceil(res.totalHits / PER_PAGE);
    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }
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

refs.loadMore.addEventListener('click', async () => {
  page += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const res = await getImagesByQuery(query, page);
    createGallery(res.hits);
    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }

    const elem = refs.listElem.lastElementChild;
    const height = elem.getBoundingClientRect().height;

    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });
  } catch {
    iziToast.show({
      message: 'Sorry, error. Please try again later!',
      messageColor: 'white',
      color: 'red',
      position: 'topRight',
    });
  }

  hideLoader();
});
