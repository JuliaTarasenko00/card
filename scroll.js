const carousel = document.querySelector('.carousel');
const card = document.querySelector('.card');
const firstCardWidth = card.querySelector('.card_item').offsetWidth;
const cardChildren = [...card.children];

let isDragging = false;
const cardPerView = Math.random(card.offsetWidth / firstCardWidth);

const button_left = document.createElement('button');
button_left.type = 'button';
button_left.className = 'button_arrow_left disabled';

const button_right = document.createElement('button');
button_right.type = 'button';
button_right.className = 'button_arrow_right';

const svgLeft = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svgLeft.classList.add('icon_arrow');
svgLeft.classList.add('disabled');

const useLeft = document.createElementNS('http://www.w3.org/2000/svg', 'use');
useLeft.setAttributeNS(
  'http://www.w3.org/1999/xlink',
  'xlink:href',
  './img/symbol-defs.svg#icon-circle-left'
);

const svgRight = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svgRight.classList.add('icon_arrow');

const useRight = document.createElementNS('http://www.w3.org/2000/svg', 'use');
useRight.setAttributeNS(
  'http://www.w3.org/1999/xlink',
  'xlink:href',
  './img/symbol-defs.svg#icon-circle-right'
);

svgLeft.append(useLeft);
svgRight.append(useRight);

button_right.append(svgRight);
button_left.append(svgLeft);

carousel.prepend(button_left);
carousel.append(button_right);

button_left.setAttribute('disabled', 'disabled');

carousel.addEventListener('click', onClickCarousel);

const buttonLeft = document.querySelector('.button_arrow_left');
const buttonRight = document.querySelector('.button_arrow_right');

function onClickCarousel(ev) {
  const element = ev.target;

  if (element.classList.contains('button_arrow_left')) {
    return (card.scrollLeft -= firstCardWidth + 20);
  }
  if (element.classList.contains('button_arrow_right')) {
    buttonLeft.removeAttribute('disabled');
    buttonLeft.classList.remove('disabled');
    svgLeft.classList.remove('disabled');
    return (card.scrollLeft += firstCardWidth + 20);
  }
}
