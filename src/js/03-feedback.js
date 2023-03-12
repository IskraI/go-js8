import throttle from 'lodash.throttle';

const STORAGE_FEEDBACK = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');

formEl.addEventListener('input', handleFormInput);
formEl.addEventListener('submit', handleFormSubmit);

populateForm();

let dataEl = {};

function populateForm() {
  const savedMess = JSON.parse(localStorage.getItem(STORAGE_FEEDBACK));
  if (savedMess) {
    formEl.email.value = savedMess.email;
    formEl.message.value = savedMess.message;
  }
}

function handleFormInput(event) {
  event.preventDefault();

  const { email, message } = event.currentTarget;

  dataEl = {
    email: email.value,
    message: message.value,
  };
  localeStorageSet(dataEl);
  return dataEl;
}

function localeStorageSet(dataEl) {
  return localStorage.setItem(STORAGE_FEEDBACK, JSON.stringify(dataEl));
}

function handleFormSubmit(event) {
  event.preventDefault();
  console.log(
    `Data of  feedback form: email: ${dataEl.email}, message: ${dataEl.message}`
  );

  if (dataEl.email === '' || dataEl.message === '') {
    return alert('Please fill in all the fields!');
  }
  localStorage.removeItem(STORAGE_FEEDBACK);
  event.currentTarget.reset();
}
