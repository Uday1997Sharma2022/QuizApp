//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
  {
    id: "0",
    question: "Bose-Einstein Condensate have",
    options: ["Low kinetic energy", "Very low kinetic energy", "High kinetic energy", "Highest kinetic energy"],
    correct: "Very low kinetic energy",
  },
  {
    id: "1",
    question: " Which of the following option is not an endothermic process",
    options: ["Temperature", "Insoluble heavy impurities", "Fusion", "Vaporisation"],
    correct: "Temperature",
  },
  {
    id: "2",
    question: " Vapours formed on sublimation of iodine solid are in which color??",
    options: ["Colourless", "Purple or violet in color", "Orange", "Yellow"],
    correct: "Purple or violet in color",
  },
  {
    id: "3",
    question: "As per the following the Kinetic energy of molecules is directly proportional to",
    options: ["Pressure", "Pressure", "Temperature", "None of them"],
    correct: "Temperature",
  },
  {
    id: "4",
    question: " Select the following that does not affect rate of evaporation?",
    options: ["Temperature", "Surface area.", "Wind speed.", "Insoluble heavy impurities."],
    correct: "Insoluble heavy impurities.",
  },
  {
    id: "5",
    question: "Select the following which has highest kinetic energy?",
    options: ["Particles of water at 0 °C", "Particles of ice at 0 °C", "Particles of steam at 100 °C", "Particles of water at 100 °C"],
    correct: "Particles of steam at 100 °C",
  },
  {
    id: "6",
    question: "Which among the following is different from other three?",
    options: ["Fish", "Crab", "Prawn", "Snail"],
    correct: "Charles Babbage",
  },
  {
    id: "7",
    question: "Who invented Computer?",
    options: ["Charles Babbage", "Henry Luce", "Henry Babbage", "Charles Luce"],
    correct: "Fish",
  },
  {
    id: "8",
    question: "Vitamin A, D & C are respectively called as ____________ ?",
    options: [" Retinol, Ascorbic Acid, Calciferol", "Retinol, Calciferol, Ascic Acidorb", "Pyridoxal. Calciferol. Ascorbic Acid", "Ascorbic Acid, Pyridoxal. Calciferol"],
    correct: "Retinol, Calciferol, Ascorbic Acid",
  },
  {
    id: "9",
    question: "Digestion is not a function of which of the following ?",
    options: ["Biotin", "Pepsin", "Renin", "None of the above"],
    correct: "Biotin",
  },
];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};