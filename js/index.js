import { responses } from './response.js';

const card = document.querySelector('.card');
const slider = document.querySelector('.slider');

export const activeCard = { value: 1 };

function renderResponses(data, position) {
  let responseText = data.response;
  let seeMoreButton = '';

  if (responseText.length >= 185) {
    responseText = responseText.substring(0, 185) + '...';
    seeMoreButton =
      '<button type="button" class="card_button">See more</button>';
  }

  const markup = `<div class="card_item">
        <div class="card_img_response_wrapper">
          <img
            src="${data.photoProduct}"
            alt="response"
            width="300"
            height="300"
            class="card_img_response"
            loading="lazy"
          />
        </div>
        <div class="card-wrapper">
          <div class="wrapper">
            <div class="card_img_wrapper">
              <img
                src="${data.photoUser}"
                alt="User Name"
                width="50"
                height="50"
                class="card_img"
                loading="lazy"
              />
            </div>
            <div>
              <div class="card_name_wrapper">
                <h4 class="card_user_name">${data.userName}</h4>
                <svg class="icon" width="20" height="20">
                  <use href="./img/symbol-defs.svg#icon-check"></use>
                </svg>
              </div>
              <div class="rating" style="--rating:${data.rating};"></div>
            </div>
          </div>
          <div>
            <div class="wrapper_response">
                <p class="card_response" data-full-text="${data.response}">
                  ${responseText} 
                </p>
                ${seeMoreButton}
              </div>
              <p class="card_data">${data.data}</p>
          </div>
        </div>
      </div>`;

  card.insertAdjacentHTML(position, markup);
}

renderResponses(responses[activeCard.value], 'afterbegin');

card.addEventListener('click', function (ev) {
  const element = ev.target;

  if (element.classList.contains('card_button')) {
    const responseTextElement = element.previousElementSibling;
    const fullText = responseTextElement.getAttribute('data-full-text');
    const item = element.closest('.card_item');

    if (element.textContent === 'See more') {
      responseTextElement.textContent = fullText;
      element.textContent = 'See less';
      item.style.setProperty('--height', 'auto');
      item.dataset.open = 'open';
    } else {
      responseTextElement.textContent = fullText.substring(0, 185) + '...';
      element.textContent = 'See more';
      item.style.removeProperty('--height');
      delete item.dataset.open;
    }
  }
});

export function nextCardGenerate() {
  let nextCard = activeCard.value + 1;

  if (nextCard >= responses.length) {
    nextCard = nextCard - responses.length;
  }

  renderResponses(responses[nextCard], 'beforeend');
}

nextCardGenerate();

export function prevCard() {
  let prevCard = activeCard.value - 1;
  if (prevCard < 0) {
    prevCard = responses.length - 1;
  }

  renderResponses(responses[prevCard], 'afterbegin');
}

prevCard();
