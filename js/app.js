document.addEventListener('DOMContentLoaded', startApp);

const $eventsContainer = document.querySelector('#eventos');
const $fragment = document.createDocumentFragment();

let events = [];

let eventTemplate = {
  days: '20',
  name: '',
  date: '',
}

function startApp() {
  cleanInputs();
  addEventInfo();
  createEvent();
}

function createEvent(){
  const $btnEvent = document.querySelector('#btn-evento');
  const $liDefault = document.querySelector('.eventos > .default');
  
  $btnEvent.addEventListener('click', e => {
    cleanInputs();
    addEvent();
    
    if ($eventsContainer.contains($liDefault)) $liDefault.remove();
      
    renderEvent();
  });

  document.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    e.preventDefault();

    cleanInputs();
    addEvent();


    renderEvent();

  });

}

function addEvent(){
  events = [...events, eventTemplate];
  console.log(events);
  cleanEventTemplate();
}

function renderEvent() {
  cleanHTML();
  events.forEach(event => {
    let { days, name, date } = event;

    const $liContainer = document.createElement('li');

    const $spanOfDays = document.createElement('span');
    $spanOfDays.innerHTML = /*html*/`${days} <span>dias</span>`;
    $spanOfDays.classList.add('dias-faltantes');
    $liContainer.appendChild($spanOfDays);
    
    const $spanOfName = document.createElement('span');
    $spanOfName.textContent = name;
    $spanOfName.classList.add('nombre');
    $liContainer.appendChild($spanOfName);
    
    const $spanOfDate = document.createElement('span');
    $spanOfDate.textContent = date;
    $spanOfDate.classList.add('fecha');
    $liContainer.appendChild($spanOfDate);
    
    $eventsContainer.appendChild($liContainer);
    
  });
}


function saveEventDays(){
  
} 

function addEventInfo() {
  saveInputData('#nombre-evento', 'name');
  saveInputData('#fecha', 'date');
  saveEventDays();
  
}

function saveInputData(element = '',dataTosave = '') {
 
  document.addEventListener('input', e => {
    if (e.target.matches(element)) {
      eventTemplate[dataTosave] = e.target.value;
      // console.log(eventTemplate);
    }
  });
}

function cleanEventTemplate(){
  eventTemplate = {
    days: '20',
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
  const $inputEventName = document.querySelector('#nombre-evento');
  const $inputEventDate = document.querySelector('#fecha');

  $inputEventName.value = '';
  $inputEventDate.value = '';
}








