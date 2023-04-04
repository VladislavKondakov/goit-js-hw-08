import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');
let formData = {};

formEl.addEventListener('input', throttle(handleTextareaInput, 500));
formEl.addEventListener('submit', handleFormSubmit);

populateTextarea();

function handleTextareaInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateTextarea() {
  const savedTextarea = localStorage.getItem(STORAGE_KEY);
  if (savedTextarea) {
    formData = JSON.parse(savedTextarea);
    formEl.email.value = formData.email;
    formEl.message.value = formData.message;
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  if (formData.email === '' || formData.message === '') {
    setTimeout(function() {
      alert('Please fill in both email and message fields!');
    }, 100);
    return;
  }
  console.log(formData);
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
