let studyInterval;
let isRunning = false;
let totalStudyTime = 0; // Total study time in minutes
let studyTimeRemaining = 0; // Study time remaining in minutes
let totaltimestuidied = 0;
let breakTimeRemaining = 0; // Break time remaining in minutes
let breaks = 0
let breaklimit = 0

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const timerDisplay = document.getElementById("timerDisplay");

const studyStartSound = document.getElementById("studyStartSound");
const breakStartSound = document.getElementById("breakStartSound");
const studyEndSound = document.getElementById("studyEndSound");

function updateDisplay(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  timerDisplay.textContent = `${hours < 10 ? "0" + hours : hours}:${mins < 10 ? "0" + mins : mins}`;
}

function startBreak() {
    document.getElementById('state').textContent = 'Break'
    updateDisplay(breakTimeRemaining);
  if (breakTimeRemaining > 0) {
    breakStartSound.play();
    breaks++
    const breakInterval = setInterval(() => {
        breakTimeRemaining--;
        updateDisplay(breakTimeRemaining);
        if (breakTimeRemaining <= 0) {
            clearInterval(breakInterval);
            startStudy()
        }
    }, 60000);
    
  }
}

function startStudy() {
    document.getElementById('state').textContent = 'Study'
    updateDisplay(studyTimeRemaining);
  if (studyTimeRemaining > 0) {
    studyStartSound.play();
        studyInterval = setInterval(() => {
      studyTimeRemaining--;
      totaltimestuidied++
      updateDisplay(studyTimeRemaining);
      if (totaltimestuidied % 60 == 0 && breaks<breaklimit){
        clearInterval(studyInterval)
        breakTimeRemaining = 10 
        startBreak()
      }
      if (studyTimeRemaining <= 0) {
        breakTimeRemaining = totalStudyTime - breaklimit * 60
        startBreak();
        clearInterval(studyInterval);
        studyEndSound.play();  
      }
    }, 60000);
  }
}

function startTimer() {
  const studyHours = parseInt(document.getElementById("studyHours").value) || 0;
  const studyMinutes = parseInt(document.getElementById("studyMinutes").value) || 0;
  document.getElementById("studyHours").hidden = true
  document.getElementById("studyMinutes").hidden = true
    breaklimit = studyHours
  totalStudyTime = studyHours * 60 + studyMinutes; // Convert study time to minutes
  studyTimeRemaining = totalStudyTime; // Set initial study time

  if (totalStudyTime > 0) {
    startStudy();
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  totalStudyTime = 0;
  studyTimeRemaining = 0;
  breakTimeRemaining = 0;
  updateDisplay(0);
  startBtn.textContent = "Start";
  document.getElementById("studyHours").hidden = false
  document.getElementById("studyMinutes").hidden = false
}

let startbuttonclicked=0

startBtn.addEventListener("click", () => {
  if (isRunning) {
    clearInterval(studyInterval);
    startBtn.textContent = "Start";
  } else if(startbuttonclicked==0) {
    startBtn.textContent = "Pause";
    startTimer();
  }
  else{
    startBtn.textContent = "Pause";
    startStudy();
  }
  isRunning = !isRunning;
  startbuttonclicked++
});

resetBtn.addEventListener("click", resetTimer);
