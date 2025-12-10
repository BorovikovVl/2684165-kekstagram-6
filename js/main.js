import { renderPictures } from './picture-renderer.js';
import { initForm } from './form.js';
import { initScale } from './scale.js';
import { initEffects } from './effects.js';
import { getData } from './api.js';
import { showErrorMessage } from './message.js';

const initApp = () => {
  getData()
    .then((photos) => {
      renderPictures(photos);
    })
    .catch((error) => {
      showErrorMessage(error.message);
    });

  initForm();
  initScale();

  if (typeof noUiSlider !== 'undefined') {
    initEffects();
  } else {
    console.error('noUiSlider не загружен. Убедитесь, что библиотека подключена в HTML.');
    const effectLevel = document.querySelector('.effect-level');
    if (effectLevel) {
      effectLevel.classList.add('hidden');
    }
  }
};

document.addEventListener('DOMContentLoaded', initApp);
