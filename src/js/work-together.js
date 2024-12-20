import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const emailPattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const form = document.querySelector('.work-together__form');
const emailField = form.querySelector('.form__email');
const textareaField = document.querySelector('.form__textarea');
const emailCheckRight = document.querySelector('.form__svg-check-right');
const emailCheckWrong = document.querySelector('.form__email-check-wrong');
const html = document.querySelector('html');

const wtContent = document.querySelector('.work-together__modal-part');

emailField.addEventListener('blur', () => {
  if (!emailPattern.test(emailField.value)) {
    emailField.style.color = 'var(--error)';
    emailCheckWrong.style.display = 'block';
    emailCheckRight.style.display = 'none';
    return;
  } else {
    emailCheckRight.style.display = 'block';
    emailField.style.color = 'var(--text)';
    emailCheckWrong.style.display = 'none';
  }
});

let formData = {
  'form-email': '',
  'form-textarea': '',
};

function saveData() {
  const formStorage = localStorage.getItem('form-data-storage');

  if (formStorage) {
    formData = JSON.parse(formStorage);
    emailField.value = formData['form-email'];
    textareaField.value = formData['form-textarea'];
  }
}

saveData();

form.addEventListener('input', event => {
  const target = event.target;

  if (target.name) {
    formData[target.name] = target.value;
    localStorage.setItem('form-data-storage', JSON.stringify(formData));
  }
});

form.addEventListener('submit', sendForm);

function sendForm(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const emailFieldValue = formData.get('form-email');
  const textareaFieldValue = formData.get('form-textarea');

  const svgCloseImg = new URL('/images/icons.svg', import.meta.url);

  if (!emailPattern.test(emailField.value)) {
    return;
  }

  formRequest(`${BASE_URL}/requests`, emailFieldValue, textareaFieldValue)
    .then(data => {
      const markup = `
      <div class="work-together__modal-window is-open">
        <div class="modal-window__container container">
          <button class="modal-window__close-btn" type="button">
            <svg class="modal-window__svg" width="12" height="12">
              <use href="${svgCloseImg}#icon-close"></use>
            </svg>
          </button>
          <h2 class="modal-window__title">
            ${data.title}
          </h2>
          <p class="modal-window__text p-l">
            ${data.message}
          </p>
        </div>
      </div>`;

      wtContent.innerHTML = markup;
      html.classList.add('no-scroll');

      form.reset();
      const modalWindow = document.querySelector(
        '.work-together__modal-window'
      );
      const modalWindowCloseBtn = document.querySelector(
        '.modal-window__close-btn'
      );

      const closeModal = () => {
        if (modalWindow.classList.contains('is-open')) {
          modalWindow.classList.remove('is-open');
          document.removeEventListener('keydown', handleEscapeKey);
          html.classList.remove('no-scroll');
        }
      };

      const handleEscapeKey = event => {
        if (event.key === 'Escape') {
          closeModal();
        }
      };

      modalWindow.addEventListener('click', event => {
        if (event.target === modalWindow) {
          closeModal();
        }
      });

      modalWindowCloseBtn.addEventListener('click', () => {
        closeModal();
      });

      document.addEventListener('keydown', handleEscapeKey);
    })
    .catch(error => {
      iziToast.error({
        icon: '',
        titleColor: 'var(--text)',
        message: `${error.message}, try again later`,
        backgroundColor: 'var(--error)',
        messageColor: 'var(--text)',
        closeOnEscape: true,
        position: 'topCenter',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
      });
    });

  localStorage.removeItem('form-data-storage');
  formData['form-email'] = '';
  formData['form-textarea'] = '';

  emailCheckRight.style.display = 'none';
  emailCheckWrong.style.display = 'none';
}

// function request

const BASE_URL = 'https://portfolio-js.b.goit.study/api';

async function formRequest(URL, inputValue, textareaValue) {
  try {
    const response = await axios.post(URL, {
      email: inputValue,
      comment: textareaValue,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
