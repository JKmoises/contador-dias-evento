document.addEventListener('DOMContentLoaded', startApp);

const events = [];

const eventTemplate = {
  days: '',
  name: '',
  date: '',
}

function startApp(){
  createEvent();
}

function createEvent(){
  const $eventsContainer = document.querySelector('#eventos');
  const $btnEvent = document.querySelector('#btn-evento');

  addEventInfo();

  $btnEvent.addEventListener('click', e => {
  });
}

function addEventInfo() {
  saveInputData('#nombre-evento', 'name');
  saveInputData('#fecha', 'date');
  

}

function saveInputData(element = '',dataTosave = '') {
  document.addEventListener('input', e => {
    if (e.target.matches(element)) {
      eventTemplate[dataTosave] = e.target.value;
      console.log(eventTemplate);
    }
  });
}

function addEventDayLeft(){
  
}



function addEventDate(){
  
}




