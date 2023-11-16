const carousel = document.querySelector('.carousel');
const card = document.querySelector('.card');
const firstCardWidth = card.querySelector('.card_item').offsetWidth;
const cardChildren = [...card.children];

let isDragging = false;
let cardPerView = Math.random(card.offsetWidth / firstCardWidth);

const button_left = document.createElement('button');
button_left.type = 'button';
button_left.className = 'button_arrow_left';

const button_right = document.createElement('button');
button_right.type = 'button';
button_right.className = 'button_arrow_right';

carousel.prepend(button_left);
carousel.append(button_right);

carousel.addEventListener('click', onClickCarousel);
card.addEventListener('scroll', scrollCard);

function onClickCarousel(ev) {
  const element = ev.target;

  if (element.classList.contains('button_arrow_left')) {
    return (card.scrollLeft -= firstCardWidth + 20);
  }
  if (element.classList.contains('button_arrow_right')) {
    return (card.scrollLeft += firstCardWidth + 20);
  }
}
