import './polyfills';
import { selectMounts } from '@abcnews/mount-utils';
import styles from './styles.css';

function initColdOpen() {
  const headerEl = document.querySelector('.Header');
  const headerContentEl = headerEl.querySelector('.Header-content');
  const coldOpenBlockEl = document.querySelector('.Block');
  const coldOpenBlockMediaEl = coldOpenBlockEl.querySelector('.Block-media');
  const coldOpenHeaderEl = coldOpenBlockEl.querySelector('.Block-content').cloneNode(true);

  coldOpenBlockMediaEl.classList.add(styles.coldOpenMedia);

  coldOpenHeaderEl.innerHTML = '';
  coldOpenHeaderEl.classList.add('Header-content');
  coldOpenHeaderEl.classList.add(styles.coldOpenHeader);
  coldOpenHeaderEl.classList.remove('Block-content');

  Array.prototype.slice
    .call(headerContentEl.childNodes)
    .forEach(node => coldOpenHeaderEl.appendChild(node.cloneNode(true)));

  coldOpenBlockEl.classList.add(styles.coldOpenBlock);
  coldOpenBlockEl.appendChild(coldOpenHeaderEl);

  headerEl.parentElement.removeChild(headerEl);

  coldOpenBlockEl.nextElementSibling.classList.add('u-dropcap');
}

function initBlockMediaPosition() {
  // CSS manages this, but the objectFitPolyfill Odyssey uses
  // to support IE11 requires data-* attributes and a refresh

  if (!window.objectFitPolyfill) {
    return;
  }

  function setPicturePosition(pictureEl, position) {
    const imgEl = pictureEl.querySelector('img');

    if (!imgEl) {
      return;
    }

    imgEl.setAttribute('data-object-position', position);
    window.objectFitPolyfill(imgEl);
  }

  ['top', 'bottom'].forEach(position => {
    selectMounts(`mediaposition${position}`)
      .map(el => el.nextElementSibling)
      .filter(el => el.className.indexOf('Block') > -1)
      .map(el => el.querySelector('.Block-media .Picture'))
      .filter(el => el && el.api)
      .forEach(el => {
        el.api.loadedHook = () => setPicturePosition(el, position);
        el.api.loadedHook();
      });
  });
}

function initMiniMapMargin() {
  [...document.querySelectorAll('.ImageEmbed')]
    .filter(el => el.querySelector('.Sizer.lg-1x1'))
    .forEach(el => {
      el.classList.add(styles.miniMap);
    });
}

function init() {
  initColdOpen();
  initBlockMediaPosition();
  initMiniMapMargin();
  window.__ODYSSEY__.scheduler.invalidateClient();
}

window.__ODYSSEY__ ? init() : window.addEventListener('odyssey:api', init);
