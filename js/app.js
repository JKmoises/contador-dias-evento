document.addEventListener('DOMContentLoaded', startApp);

const $eventsContainer = document.querySelector('#eventos');
const $inputEventName = document.querySelector('#nombre-evento');
const $inputEventDate = document.querySelector('#fecha');
const $fragment = document.createDocumentFragment();

let events = [];

let eventTemplate = {
  id: '',
  days: '20',
  name: '',
  date: '',
}

function startApp() {
  cleanInputs();
  addEventInfo();
  createEvent();
}

function eventValidation(){
  if ($inputEventName.value === '' && $inputEventDate.value === '') {
    showAlert('Todos los campos estan vacíos, vuelve a ingresar', '#card');
  } else if ($inputEventName.value === '') {
    showAlert('El campo de nombre del evento está vacío', '#card');
  } else if ($inputEventDate.value === '') {
    showAlert('El campo de la fecha del evento está vacío', '#card');
  } else {
    cleanInputs();
    addEvent();
    renderEvent();
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
  cleanEventTemplate();
}

function renderEvent() {
  cleanHTML();

  showDefaultMessage();

  events.forEach((event, i) => {
    event.id = i + 1;

    let { id, days, name, date } = event;

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
    $spanOfDate.textContent = date;
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
}

function deleteEvent(e) {
  const eventId = parseInt(e.target.parentElement.dataset.eventId);
  events = events.filter(event => event.id !== eventId);


  renderEvent();
}


function saveEventDays(){
  
} 

function addEventInfo() {
  saveInputData('#nombre-evento', 'name');
  saveInputData('#fecha', 'date');
  saveEventDays();
  
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

function cleanEventTemplate(){
  eventTemplate = {
    id: '',
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
  $inputEventName.value = '';
  $inputEventDate.value = '';
}








