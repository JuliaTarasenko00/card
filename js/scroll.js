import { activeCard, nextCardGenerate, prevCard } from './index.js';
import { responses } from './response.js';

const carousel = document.querySelector('.carousel');
const cards = document.querySelector('.card');
const firstCardWidth = cards.querySelector('.card_item').offsetWidth;

let timeout = null;

const createButton = (className, iconHref) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('icon_arrow');

  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', iconHref);

  svg.append(use);
  button.append(svg);

  return button;
};

const button_left = createButton(
  'button_arrow_left',
  './img/symbol-defs.svg#icon-circle-left'
);

const button_right = createButton(
  'button_arrow_right',
  './img/symbol-defs.svg#icon-circle-right'
);

carousel.prepend(button_left);
carousel.append(button_right);

const buttonNext = document.querySelector('.button_arrow_right');
const buttonPrev = document.querySelector('.button_arrow_left');

buttonNext.addEventListener('click', nextSlide);
buttonPrev.addEventListener('click', prevSide);

function nextSlide() {
  activeCard.value += 1;
  if (activeCard.value >= responses.length) {
    activeCard.value = 0;
  }
  const element = document.querySelector('.card_item');

  slideCard(-1, element);
}

function prevSide() {
  activeCard.value -= 1;

  if (activeCard.value < 0) {
    activeCard.value = responses.length - 1;
  }
  const element = document.querySelector('.card_item:last-child');

  slideCard(1, element);
}

function slideCard(direction, element) {
  element.style.transform = `translateX(${
    direction * (firstCardWidth + 20)
  }px)`;

  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(function () {
    direction === -1 ? nextCardGenerate() : prevCard();
    return element.remove();
  }, 300);
}
