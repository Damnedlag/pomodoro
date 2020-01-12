const timer = document.getElementById('setTime')
const breakT = document.getElementById('breakT')
const counter = document.getElementById('counter')
const message = document.getElementById('message')
const pauser = document.getElementById('pause')
const error = () => {document.getElementById('error').innerHTML = "Please stop the program before setting parameters";
document.getElementById('error').style.background="red";
t = window.setTimeout(() => {document.getElementById('error').style.background="white"}, 800)}
const clearError = () => {document.getElementById('error').innerHTML = ''}
let isrunning = false;
let isrunningBreak = false;

counter.innerHTML = "Press start when ready";

let session = 25, breaktime = 5, i, pausedAt, timeString

timer.innerHTML = session
breakT.innerHTML = breaktime

// eventlisteners ofr buttons below

document.getElementById('addTime').addEventListener('click', e => {
    if (!isrunning && !isrunningBreak) {
    session += 1
    timer.innerHTML = session}
    else {error()}})
document.getElementById('subtractTime').addEventListener('click', e => {
    if (session > 0){
    if (!isrunning && !isrunningBreak) {
    session -= 1
    timer.innerHTML = session}
    else {error()}}})
document.getElementById('addBreak').addEventListener('click', e => {
    if (!isrunning && !isrunningBreak) {
    breaktime += 1
    breakT.innerHTML = breaktime}
    else {error()}})
document.getElementById('removeBreak').addEventListener('click', e => {
    if (breaktime > 0){
    if (!isrunning && !isrunningBreak) {
    breaktime -= 1
    breakT.innerHTML = breaktime}
    else {error()}}})
document.getElementById('start').addEventListener('click', e => {
    if (!isrunning && !isrunningBreak) {
    message.innerHTML = 'Time for work'
    session *= 60
    breaktime *= 60
    counting(session)
}})

pauser.addEventListener('click', e => {
    if (isrunning || isrunningBreak) {
    if (pauser.innerHTML == 'Pause') {
    pausedAt = timeStringConverter(counter.innerHTML);
    clearInterval(i);
    pauser.innerHTML = 'Continue';
    }
    else {
        pauser.innerHTML = "Pause";
        if (isrunning) {counting(pausedAt)}
        else {countingBreak(pausedAt)}
    }
}})

document.getElementById('stop').addEventListener('click', e =>{
    clearInterval(i);
    session = Number(timer.innerHTML); breaktime = Number(breakT.innerHTML);
    isrunningBreak = false; isrunning = false
    counter.innerHTML = "Press start when ready";
    clearError();
    pauser.innerHTML = "Pause";
})

document.getElementById('reset').addEventListener('click', e => {
    isrunning = false; isrunningBreak = false;
    session = 25;
    timer.innerHTML = session;
    breaktime = 5;
    breakT.innerHTML = breaktime;
    counter.innerHTML = "Press start when ready"
    clearInterval(i);
    clearError();
    pauser.innerHTML = "Pause";
})

// functions below

// helper function to conver string of time to seconds
const timeStringConverter = (stringOfTime) => {
    let sum = 0;
    let arrayOfTime = stringOfTime.split(':');
    sum = Number(arrayOfTime[0]) * 3600;
    sum += Number(arrayOfTime[1]) * 60;
    sum += Number(arrayOfTime[2]);
    return sum;
}

const counting = (time) => {
    isrunning = true;
    isrunningBreak = false;
    i = window.setInterval(funcion = () => {
    let date = new Date(null);
    date.setSeconds(time);
    timeString = date.toISOString().substr(11, 8);
        time -= 1;
        counter.innerHTML = timeString;
    if (time === 0) {
        clearInterval(i);
        message.innerHTML = 'You are on a break';
        countingBreak(breaktime);
    }
}, 1000)
}

const countingBreak = (time) => {
    isrunningBreak = true;
    isrunning =false;
    i = window.setInterval(funcion = () => {
    let date = new Date(null);
    date.setSeconds(time);
    timeString = date.toISOString().substr(11, 8);
    time -= 1;
    counter.innerHTML = timeString;
if (time === 0) {
    clearInterval(i);
    message.innerHTML = 'Time for work';
    counting(session);
}
}, 1000)
}