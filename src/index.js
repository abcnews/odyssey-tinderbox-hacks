import './polyfills';
import styles from './styles.css';

function initColdOpen() {
  const headerEl = document.querySelector('.Header');
  const headerContentEl = headerEl.querySelector('.Header-content');
  const coldOpenBlockEl = document.querySelector('.Block');
  const coldOpenBlockMediaEl = coldOpenBlockEl.querySelector('.Block-media');
  const coldOpenHeaderEl = coldOpenBlockEl.querySelector('.Block-content').cloneNode(true);

  coldOpenBlockMediaEl.classList.add(styles.coldOpenMedia);

  coldOpenHeaderEl.innerHTML = '';
  coldOpenHeaderEl.classList.add('Header-content', styles.coldOpenHeader);

  Array.prototype.slice
    .call(headerContentEl.childNodes)
    .forEach(node => node.tagName !== 'DIV' && coldOpenHeaderEl.appendChild(node.cloneNode(true)));

  coldOpenBlockEl.classList.add(styles.coldOpenBlock);
  coldOpenBlockEl.appendChild(coldOpenHeaderEl);

  headerEl.parentElement.removeChild(headerEl);

  coldOpenBlockEl.nextElementSibling.classList.add('u-dropcap');
}

function initBlockMediaPosition() {
  // Handled by custom marker CSS
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
