const startScreen = document.getElementById("startPage");
const startBtn = document.getElementById("startBtn");
const questionScreen = document.getElementById("questions");
const questionTextElement = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const messageElement = document.getElementById("message");
const answerButtons = document.querySelectorAll("#optionsContainer button");
const scoreElement = document.getElementById("score")
const postScreen = document.getElementById("post")
const timerElement = document.getElementById("timeRemaining")
const topScoresList = document.getElementById("topScores")
const scoreList = document.getElementById("topScoresContainer")
const clearScoresBtn = document.getElementById("clearScoresBtn")
var restartBtn = document.getElementById("restartBtn1")
const timer = document.getElementById("timer")
let currentQuestionIndex = 0;
let score = 0;
let timeRemaining = 60

const questions = [
    
    {question: "Which function is used to serialize an object into a JSON string in Javascript?",
    answers: ["stringify()", "parse()", "convert()", "none of the above"],
    correctAnswer: "stringify()" },
    
    {question: "How do you write a comment in Javascript?",
    answers: ["/**/", "//", "#", "$$"],
    correctAnswer: "//", },

    {question: "Function and Var are known as:",
    answers: ["Keywords", "Data types", "Declaration statements", "Prototypes"],
    correctAnswer: "Declaration statements", },
   
    {question: "Which of the following function of the String object returns the character in the string starting at the specified position via the specified number of characters?",
    answers: ["slice()", "split()", "substr()", "search()"],        
    correctAnswer: "substr()", },
   
    {question: "In JavaScript, what will be used for calling the function definition expression:",
    answers: ["Function prototype", "Function literal", "Function calling", "Function declaration"],        
    correctAnswer: "Function literal", },
   
    {question: "Which one of the following is known as the Equality operator, which is used to check whether the two values are equal or not:",
    answers: ["=", "===", "==", "&&"],
    correctAnswer: "==",},
 
    {question: "Which one of the following operator returns false if both values are equal?",
    answers: ["!", "!==", "!=", "All of the above"],
    correctAnswer: "Paris", },
 
    {question: "A set of unordered properties that, has a name and value is called______",
    answers: ["String", "Array", "Serialized Object", "Object"],
    correctAnswer: "Object",}, 
   
    {question: "A collection of elements of the same data type which may either in order or not, is called _____.",
    answers: ["String", "Array", "Serialized Object", "Object"],
    correctAnswer: "Array", },

    {question: "Which one of the following keywords is used for defining the function in the JavaScript?",
    answers: ["Void", "init", "main", "function"],
    correctAnswer: "function", },
  
  ]

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
hideElement(postScreen)
hideElement(timerElement)
hideElement(scoreList)

function showMessage(message) {
  messageElement.textContent = message;
}

function hideElement(element) {
  element.style.display = "none";
}

function showElement(element) {
  element.style.display = "block";
}


function startQuiz() {
  hideElement(startScreen);
  showElement(questionScreen);
  showElement(timerElement)
  hideElement(scoreList)
  showElement(restartBtn)
  hideElement(startBtn)
  shuffle(questions)
  currentQuestionIndex = 0;
  score = 0;
  displayQuestion();
  startTimer()
}

function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionTextElement.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer, index) => {
    const optionElement = document.createElement("button");
    optionElement.textContent = answer;
    optionElement.addEventListener("click", () => {
      handleOptionSelection(index);
    });
    optionsContainer.appendChild(optionElement);
  });
}

function handleOptionSelection(selectedIndex) {
  const selectedAnswer = questions[currentQuestionIndex].answers[selectedIndex];
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;

  if (selectedAnswer === correctAnswer) {
    showMessage("Correct");
    score++;
  } else {
    showMessage("Wrong");
    timeRemaining -= 5;
  }

  showNextQuestion();
}

function showNextQuestion() {
    if (timeRemaining <= 0) {
      showScore();
      return;
    }
  
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      showScore();
    }
}

function startTimer() {
    const countdown = setInterval(() => {
        timeRemaining--
        timerElement.textContent = "Time Remaining: " + timeRemaining + " seconds"

        if (timeRemaining <= 0) {
            clearInterval(countdown)
        }
        if (timeRemaining === 0) {
            showScore()
        }
    }, 1000)
    }

function updateTimerStyle()  {
  if (timeRemaining <= 10) {
    timer.style.color = "red"
    timer.style.fontSize = "20px"
  } else {
    timer.style.color = "black"
    timer.style.fontSize = "16px"
  }
}

function showScore() {
    hideElement(questionScreen);
    showElement(postScreen)
    showElement(scoreElement)  
    scoreElement.textContent = "Your score: " + score + "/" + questions.length;

    const initialsInput = document.getElementById("initials")
    const saveScoreBtn = document.getElementById("saveScore")

    saveScoreBtn.addEventListener("click", function() {
        const initials = initialsInput.value.trim()
        if (initials !== "") {
            const scoreData = {
                initials: initials,
                score: score
            }
            const existingScores = JSON.parse(localStorage.getItem("scores")) || []
            existingScores.push(scoreData)
            existingScores.sort((a, b) => b.score - a.score)
            const topScores = existingScores.slice(0, 3)
            localStorage.setItem("scores", JSON.stringify(topScores))
            displayTopScores()
        }
    })
}

startBtn.addEventListener("click", startQuiz);

displayTopScores()

clearScoresBtn.addEventListener('click', clearScores)

function getTopScores() {
  const scores = JSON.parse(localStorage.getItem('scores')) || []
  const sortedScores = scores.sort((a, b) => b - a)
  return sortedScores
}

function displayTopScores() {
  const topScores = getTopScores();
  topScoresList.innerHTML = '';
  topScores.forEach((scoreObj) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${scoreObj.initials}: ${scoreObj.score}`; 
    topScoresList.appendChild(listItem);
  });

  showElement(scoreList);
}


function clearScores() {
  localStorage.clear();
  updateTopScoresUI()
  alert("Scores have been cleared")
}

function updateTopScoresUI() {
  const updatedScores = JSON.parse(localStorage.getItem('scores')) || [];
  topScoresList.innerHTML = '';

  updatedScores.forEach((scoreObj) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${scoreObj.initials}: ${scoreObj.score}`;
    topScoresList.appendChild(listItem);
  });
}

restartBtn.addEventListener("click", () => {
  location.reload()
})