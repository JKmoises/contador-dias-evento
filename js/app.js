document.addEventListener('DOMContentLoaded', startApp);

const $eventsContainer = document.querySelector('#eventos');
const $inputEventName = document.querySelector('#nombre-evento');
const $inputEventDate = document.querySelector('#fecha');
const $fragment = document.createDocumentFragment();

const ls = localStorage;

let events = [];

let eventTemplate = {
  id: '',
  days: '',
  name: '',
  date: '',
}

function startApp() {
  loadEventsStorage();  
  cleanInputs();
  addEventInfo();
  createEvent();
}

function loadEventsStorage(){
  events = JSON.parse(localStorage.getItem('events')) || [];
  console.log(events);
  renderEvents();
}

function eventValidation() {
  const { days, name, date } = eventTemplate;
  
  if (name === '' && date === '') {
    showAlert('Todos los campos estan vacíos, vuelve a ingresar', '#card');
  }else if (name === '') {
    showAlert('El campo de nombre del evento está vacío', '#card');
  }else if (date === '') {
    showAlert('El campo de la fecha del evento está vacío', '#card');
  }else if (days <= 0) {
    showAlert('No puedes usar la fecha actual, vuelve a ingresar', '#card');
  } else {
    cleanInputs();
    addEvent();
    renderEvents();
  }
}

function createEvent(){
  const $btnEvent = document.querySelector('#btn-evento');
  
  $btnEvent.addEventListener('click', e => {
    eventValidation();
    
  });

  document.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    e.preventDefault();

    eventValidation();
    
  });
  
}

function addEvent(){
  events = [...events, eventTemplate];
  // console.log(events);
  cleanEventTemplate();
}

function renderEvents() {
  cleanHTML();

  showDefaultMessage();
  
  
  events.forEach((event, i) => {
    event.id = i + 1;

    let { id, days, name, date } = event;

    const actualDate = addDayToDate(date);
    
    let formatDate = actualDate.toLocaleDateString();

    const $liContainer = document.createElement('li');

    const $spanOfDays = document.createElement('span');
    $spanOfDays.innerHTML = /*html*/`${days} <span>días</span>`;
    $spanOfDays.classList.add('dias-faltantes');
    $liContainer.appendChild($spanOfDays);
    
    const $spanOfName = document.createElement('span');
    $spanOfName.textContent = name;
    $spanOfName.classList.add('nombre');
    $liContainer.appendChild($spanOfName);
    
    const $spanOfDate = document.createElement('span');
    $spanOfDate.textContent = formatDate;
    $spanOfDate.classList.add('fecha');
    $liContainer.appendChild($spanOfDate);

    const $btnDelete = document.createElement('button');
    $btnDelete.textContent = 'Eliminar';
    $btnDelete.classList.add('btn', 'btn-eliminar');
    $btnDelete.onclick = (e) => deleteEvent(e);
    $liContainer.appendChild($btnDelete);

    $liContainer.dataset.eventId = id;
    
    $fragment.appendChild($liContainer);
    
  });

  $eventsContainer.appendChild($fragment);

  syncStorage();
}

function deleteEvent(e) {
  const eventId = parseInt(e.target.parentElement.dataset.eventId);
  events = events.filter(event => event.id !== eventId);
  // console.log(events);
  renderEvents();
}


function saveEventDaysLeft(){
  
  $inputEventDate.addEventListener('input', e => {

    const actualDate = addDayToDate(e.target.value);

    const eventDateInMs = actualDate.getTime();
    const currentDateInMs = new Date().getTime();
    const eventDaysLeftInMs = eventDateInMs - currentDateInMs;
    
    const eventDaysLeft = Math.ceil(eventDaysLeftInMs / 1000 / 60 / 60 / 24);
    eventTemplate.days = eventDaysLeft;
    // console.log(eventDaysLeft);
  });

} 

function addEventInfo() {
  preventPastDate();
  saveInputData('#nombre-evento', 'name');
  saveInputData('#fecha', 'date');
  saveEventDaysLeft();
}

function showDefaultMessage(){
  if (events.length === 0) {
    $eventsContainer.innerHTML = /*html*/`
      <li class="default">No hay eventos hasta el momento, ingrese uno</li>
    `;
  }
}

function saveInputData(element = '',dataTosave = '') {
 
  document.addEventListener('input', e => {
    if (e.target.matches(element)) {
      eventTemplate[dataTosave] = e.target.value;
      // console.log(eventTemplate);
    }
  });
}

function addDayToDate(dateToFormat){
  //* Sumando un dia a la fecha para que sea correcta 
  const date = new Date(dateToFormat);
  date.setDate(date.getDate() + 1);
  // console.log(date);

  return date;
}

function showAlert(mensaje = '', elemento = '', tipo = 'error', desaparece = true) {
  //? Previniendo que se genera más de una alerta de error
  const alertaPrevia = document.querySelector(".alerta");
  if (alertaPrevia) alertaPrevia.remove(); 
  
  //? Scripting para crear la alerta
  const alerta = document.createElement("div");
  alerta.textContent = mensaje;
  alerta.classList.add("alerta", tipo);
  
  const referencia = document.querySelector(elemento);
  referencia.insertAdjacentElement('afterbegin',alerta);

  if (desaparece) {
    setTimeout(() => {
      referencia.removeChild(alerta);
    }, 3000);
  }
}

function preventPastDate() {
  let month = new Date().getMonth() + 1;
  const monthTodayDate = month < 10 ? '0' + month : month;
  const todayDate = `${new Date().getFullYear()}-${monthTodayDate}-${new Date().getDate()}`;
  $inputEventDate.min = todayDate;
  // console.log($inputEventDate);
}

function cleanEventTemplate(){
  eventTemplate = {
    id: '',
    days: '',
    name: '',
    date: '',
  }
}

function cleanHTML(){
  while ($eventsContainer.firstElementChild) {
    $eventsContainer.removeChild($eventsContainer.firstElementChild);
  }
}

function cleanInputs(){
  $inputEventName.value = '';
  $inputEventDate.value = '';
}

function syncStorage(){
  localStorage.setItem('events', JSON.stringify(events));
}








