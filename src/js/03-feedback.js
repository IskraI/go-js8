import throttle from 'lodash.throttle';

const STORAGE_FEEDBACK = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');

formEl.addEventListener('input', throttle(handleFormInput, 500));
formEl.addEventListener('submit', handleFormSubmit);

let formData = {};
populateForm();

function populateForm() {
  const savedMess = localStorage.getItem(STORAGE_FEEDBACK);

  if (savedMess) {
    const parsedData = JSON.parse(savedMess);
    Object.keys(parsedData).map(key => {
      formEl.elements[key].value = parsedData[key];
      formData[key] = parsedData[key];
    });
    console.log(formData);
  }
}

function handleFormInput(event) {
  event.preventDefault();

  formData[event.target.name] = event.target.value;

  localStorage.setItem(STORAGE_FEEDBACK, JSON.stringify(formData));
}

function handleFormSubmit(event) {
  event.preventDefault();

  if (
    formEl.elements.email.value === '' ||
    formEl.elements.message.value.trim() === ''
  ) {
    return alert('Please fill in all the fields!');
  }

  console.log(
    `Data of  feedback form:`,
    JSON.parse(localStorage.getItem(STORAGE_FEEDBACK))
  );
  localStorage.removeItem(STORAGE_FEEDBACK);
  event.currentTarget.reset();

  formData = {};
}
