const carousel = document.querySelector('.carousel');
const card = document.querySelector('.card');
const firstCardWidth = card.querySelector('.card_item').offsetWidth;
const cardChildren = [...card.children];

let isDragging = false;
let cardPerView = Math.random(card.offsetWidth / firstCardWidth);

const button_left = document.createElement('button');
button_left.type = 'button';
button_left.className = 'button_arrow_left button';

const button_right = document.createElement('button');
button_right.type = 'button';
button_right.className = 'button_arrow_right';

carousel.prepend(button_left);
carousel.append(button_right);

carousel.addEventListener('click', onClickCarousel);
card.addEventListener('scroll', scrollCard);

const buttonLeft = document.querySelector('.button_arrow_left');
const buttonRight = document.querySelector('.button_arrow_right');

function onClickCarousel(ev) {
  const element = ev.target;

  if (element.classList.contains('button_arrow_left')) {
    return (card.scrollLeft -= firstCardWidth + 20);
  }
  if (element.classList.contains('button_arrow_right')) {
    buttonLeft.removeAttribute('disabled');
    buttonLeft.classList.remove('button');
    return (card.scrollLeft += firstCardWidth + 20);
  }
}

function scrollCard() {
  const length = card.scrollWidth - card.offsetWidth;
  if (card.scrollLeft === 0) {
    buttonLeft.classList.toggle('button');
  } else if (Math.ceil(card.scrollLeft) === length) {
    buttonRight.classList.toggle('button');
  }
}
