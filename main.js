var question1 = {
  questionType: "image",
  questionMaterial: "images/aventador.jpg",
  questionText: "Resimdeki arabanın markası nedir",
  answers: ["lamborghini", "mercedes", "bmw", "ferrari"],
  reply: "lamborghini",
};

var question2 = {
  questionType: "image",
  questionMaterial: "images/cristianoRonaldo.jpg",
  questionText: "Resimdeki futbolcu kimdir",
  answers: ["messi", "ronaldo", "pele", "maradona"],
  reply: "ronaldo",
};

var question3 = {
  questionType: "image",
  questionMaterial: "images/rb12.jpg",
  questionText: "Resimdeki RedBull f1 arabasının modeli nedir",
  answers: ["rb12", "sf90", "f2004", "fw26", "MP4-19"],
  reply: "rb12",
};

var question4 = {
  questionType: "image",
  questionMaterial: "images/senna.jpg",
  questionText: "Resimdeki mclarenin modeli nedir",
  answers: ["senna", "720s", "650s", "P1", "M6 GT"],
  reply: "senna",
};

var question5 = {
  questionType: "video",
  questionMaterial: new String(
    `<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/KDC_WcR0wjc?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `
  ),
  questionText: "Videodaki f1 arabası hangi takımındır",
  answers: ["mercedes", "ferrari", "mclaren", "renault", "williams"],
  reply: "renault",
};

var questions = [question1, question2, question3, question4, question5];
var pointsArea = document.getElementById("pointsArea");
var questionMaterial = document.getElementById("questionMaterial");
var questionNumber = document.getElementById("questionNumber");
var questionText = document.getElementById("questionText");
var answersArea = document.getElementById("answersArea");
var startBtn = document.getElementById("startBtn");
var askedQuestionsNumbers = [];
var currentTrueAnswer;
var points = 0;
var questionCurser = 0;

startBtn.addEventListener("click", function () {
  getRandomQuestion();
});

function getRandomQuestion() {
  pointsArea.innerText = points + " / " + questionCurser;
  answersArea.innerText = "";
  questionMaterial.innerHTML = "";
  var randomQuestionNumber = Math.floor(Math.random() * 5);
  if (!askedQuestionsNumbers.includes(randomQuestionNumber)) {
    var currentQuestion = questions[randomQuestionNumber];
    askedQuestionsNumbers.push(randomQuestionNumber);
    if (currentQuestion.questionType == "image") {
      let img = document.createElement("img");
      img.src = currentQuestion.questionMaterial;
      questionMaterial.appendChild(img);
    } else if (currentQuestion.questionType == "video") {
      questionMaterial.innerHTML = currentQuestion.questionMaterial;
    }
    questionText.innerText = currentQuestion.questionText;
    var qesNum = questionCurser;
    qesNum++;
    questionNumber.innerText = "Soru " + qesNum;
    currentQuestion.answers.forEach((answer) => {
      let answerButton = document.createElement("button");
      answerButton.type = "button";
      answerButton.className =
        "btn btn-block btn-outline-secondary answerButton";
      answerButton.innerText = answer;
      if (answer == currentQuestion.reply) {
        answerButton.classList.add("trueAnswer");
        currentTrueAnswer = answerButton;
      }
      answerButton.onclick = controlAnswer;
      answersArea.appendChild(answerButton);
    });
  } else {
    getRandomQuestion();
  }
}

var controlAnswer = function (e) {
  currentTrueAnswer.classList.remove("btn-outline-secondary");
  currentTrueAnswer.classList.add("btn-success");
  if (e.path[0].classList.contains("trueAnswer")) {
    setTimeout(() => {
      getNextQuestion("true");
    }, 1000);
  } else {
    e.path[0].classList.remove("btn-outline-secondary");
    e.path[0].classList.add("btn-danger");
    setTimeout(() => {
      getNextQuestion("false");
    }, 1000);
  }
};

var getNextQuestion = function (answerState) {
  if (answerState == "true") {
    points += 1;
  }
  questionCurser += 1;
  if (questionCurser == 5) {
    gameOver();
  } else {
    getRandomQuestion();
  }
};

var gameOver = function () {
  pointsArea.innerText = points + " / " + questionCurser;
  answersArea.innerText = "";
  questionText.innerText = points + " / " + questionCurser;
  questionNumber.innerText = "Toplam Skor";
  questionMaterial.innerHTML = "";
  let img = document.createElement("img");
  img.src = "images/oyunBitti.jpg";
  questionMaterial.appendChild(img);
  let againButton = document.createElement("button");
  againButton.type = "button";
  againButton.className = "btn btn-block btn-outline-secondary answerButton";
  againButton.innerText = "Tekrar Başla";
  againButton.onclick = getRandomQuestion;
  askedQuestionsNumbers = [];
  points = 0;
  questionCurser = 0;
  answersArea.appendChild(againButton);
};
