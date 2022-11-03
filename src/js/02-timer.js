import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const calendarEl = document.querySelector('#datetime-picker');
const buttonStartEl = document.querySelector('button[data-start]');

const dayValueEl = document.querySelector('span[data-days]');
const allLabelsEl = document.querySelectorAll('.label');
const hoursValueEl = document.querySelector('span[data-hours]');
const minutesValueEl = document.querySelector('span[data-minutes]');
const secondsValueEl = document.querySelector('span[data-seconds]');


const timerDivEl = document.querySelector('.timer');
const allValueEl = document.querySelectorAll('.value');
const fieldDivEl = document.querySelectorAll('.field');

timerDivEl.style.cssText= 'display: flex; gap: 30px'
allLabelsEl.forEach(el => el.style.cssText = 'font-size: 25px; color: teal');
allValueEl.forEach(el => el.style.cssText = 'font-size: 35px; color: teal');
fieldDivEl.forEach(el => el.style.cssText ='display: flex; flex-direction:column;  align-items:center')


let startTimer = 0;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
       
       const  startTime = selectedDates[0].getTime();
       startTimer = startTime;
        const currentDate = Date.now ()
        if (startTime - currentDate< 0){
            buttonStartEl.setAttribute('disabled', 'true');
            Notiflix.Report.failure('WRONG DATE', 'Please choose a date in the future', 'Try again');
            
        } else{
            buttonStartEl.removeAttribute('disabled');
            
        }
      
    },
  };

flatpickr(calendarEl, options);


function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
 
    const days = Math.floor(ms / day);
   
    const hours = Math.floor((ms % day) / hour);
    
    const minutes = Math.floor(((ms % day) % hour) / minute);
    
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
function addLeadingZero(value){
  return  String(value).padStart(2, '0');
}

let timeId = null;

const timer = {
    
     start() { 
        let deltaTime = 0;
        timeId =  setInterval(() => {
            const endTime = Date.now();
             deltaTime = startTimer - endTime;
            const timerValue= convertMs(deltaTime);
            
            const dataDaysValue  = addLeadingZero(timerValue.days);
            dayValueEl.textContent = dataDaysValue;
            const dataHoursValue = addLeadingZero(timerValue.hours);
            hoursValueEl.textContent = dataHoursValue;
            const dataMinutesValue = addLeadingZero(timerValue.minutes);
            minutesValueEl.textContent = dataMinutesValue;
            const dataSecondsValue = addLeadingZero(timerValue.seconds);
            secondsValueEl.textContent = dataSecondsValue;
            if( timerValue.days !== 1){
                allLabelsEl[0].textContent =' Days';
            } else {allLabelsEl[0].textContent =' Day'};
            if (timerValue.hours !== 1){
                allLabelsEl[1].textContent = 'Hours';
            } else{allLabelsEl[1].textContent = 'Hour'} ;
            if (timerValue.minutes !== 1){
                allLabelsEl[2].textContent = 'Minutes';
            } else {allLabelsEl[2].textContent = 'Minute'};
            if(timerValue.seconds !== 1){
                allLabelsEl[3].textContent = 'Seconds';
            } else{ allLabelsEl[3].textContent = 'Second'};
            if (deltaTime <= 999){
                this.stop()
            }
            
        }, 1000);
     },
     stop(){
        clearInterval(timeId);
    }
}
buttonStartEl.addEventListener('click', startTimerHandler);
function startTimerHandler() {
    timer.start()
}