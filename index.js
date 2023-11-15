import { responses } from './response.js';

const section = document.querySelector('.section');

let responseText = '';
let seeMoreButton = '';

function renderResponses() {
  const markup = responses
    .map(response => {
      responseText = response.response;
      seeMoreButton = '';

      if (responseText.length >= 185) {
        responseText = responseText.substring(0, 185) + '...';
        seeMoreButton =
          '<button type="button" class="card_button">See more</button>';
      }

      return `<div class="card">
        <div class="card_img_response_wrapper">
          <img
            src=${response.photoProduct}
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
                src=${response.photoUser}
                alt="User Name"
                width="50"
                height="50"
                class="card_img"
                loading="lazy"
              />
            </div>
            <div>
                <div class="card_name_wrapper">
                  <h4 class="card_user_name">${response.userName}</h4>
                  <svg class="icon" width="20" height="20">
                    <use href="./img/symbol-defs.svg#icon-check"></use>
                  </svg>
                </div>
                <div class="rating" style="--rating:${response.rating};"></div></div>
            </div>
        <div class="wrapper_response" >
              <p class="card_response"data-full-text="${response.response}">
                ${responseText}
              </p>
             ${seeMoreButton}
        </div>
          <p class="card_data" >${response.data}</p>
        </div>
      </div>`;
    })
    .join('');

  section.insertAdjacentHTML('afterbegin', markup);
}

document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.section');

  section.addEventListener('click', onClickButton);
});

function onClickButton(ev) {
  const element = ev.target;
  if (element.classList.contains('card_button')) {
    const responseTextElement = element.previousElementSibling;
    const fullText = responseTextElement.getAttribute('data-full-text');

    if (element.textContent === 'See more') {
      responseTextElement.textContent = fullText;
      element.textContent = 'See less';
    } else {
      responseTextElement.textContent = fullText.substring(0, 185) + '...';
      element.textContent = 'See more';
    }
  }
}

renderResponses();
