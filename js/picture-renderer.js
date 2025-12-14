import { openFullscreenPicture } from './fullscreen-picture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture');

const clearPictures = () => {
  if (picturesContainer) {
    const pictureElements = picturesContainer.querySelectorAll('.picture');
    pictureElements.forEach((element) => {
      element.remove();
    });
  }
};

const renderPictures = (pictures) => {
  if (!pictureTemplate || !picturesContainer) {
    return;
  }

  clearPictures();

  const fragment = document.createDocumentFragment();

  pictures.forEach((pictureData) => {
    const { url, description, likes, comments, id } = pictureData;
    const pictureElement = pictureTemplate.content.cloneNode(true).children[0];

    if (id) {
      pictureElement.dataset.id = id;
    }

    const img = pictureElement.querySelector('.picture__img');
    if (img) {
      img.src = url;
      img.alt = description;
      img.loading = 'lazy';
    }

    const likesElement = pictureElement.querySelector('.picture__likes');
    if (likesElement) {
      likesElement.textContent = likes;
    }

    const commentsElement = pictureElement.querySelector('.picture__comments');
    if (commentsElement) {
      commentsElement.textContent = Array.isArray(comments) ? comments.length : comments;
    }

    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openFullscreenPicture(pictureData);
    });

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
};

export { renderPictures, clearPictures };
