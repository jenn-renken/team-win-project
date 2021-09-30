// Array of questions for the quiz.
var questions = [
    { 
        question: 'Who invented JavaScript?', 
        choices: ['Elon Musk', 'Steve Jobs', 'Bill Gates', 'Brendan Eich'],
        answer: 'Brendan Eich' 
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        question: "A useful tool to debug code and print content is:",
        choices: ["for()", "document.getElement", ".addEventListener", "console.log()"],
        answer: "console.log()"
    },
    {    
        question: "Which of the following is a data type?",
        choices: ["prompt", "boolean", "alert", "variable"],
        answer: "boolean"
    },
    {
        question: "What is an array used for?",
        choices: ["storing numbers and strings", "iterating through data", "displaying content", "none of the above"],
        answer: "storing numbers and strings"
    },
  ];

var score = 0;
var questionIndex = 0;
var holdInterval = 0;


var hideResponseTimeout = null;

  var elements = {
     startQuiz: document.querySelector("#startQuiz"),
     wrapper: document.querySelector("#wrapper"),
     question: document.querySelector("#question"),
     questionChoice: document.querySelector("#questionChoice"),
     intro: document.querySelector("#intro"),
     questionTitle: document.querySelector("#questionTitle"),
     viewHighScores: document.querySelector("#viewHighScores"),
     scores: document.querySelector("#scores"),
     highScore: document.querySelector("#highScore"),
     clear: document.querySelector("#clear"),
     goBack: document.querySelector("#goBack"),
     finalScore: document.querySelector("#finalScore"),
  };

function showWrapperElement(element) {
    var children = elements.wrapper.children;
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        hideElement(child);
    }
    showElement(elements.wrapper);
    if (!element) {
        return;
    }
    showElement(element);
}

function showElement(element) {
    element.style.display = "";
}

function hideElement(element) {
    element.style.display = "none";
}

function startQuiz() {
    startTimer();
    showQuizItem(0);
    
}

function hideResponse () {
    hideElement(elements.correct);
    hideElement(elements.wrong);
}

function showQuizItem(number) {
    showWrapperElement();
    var delay = number? 2000:0;
    hideResponseTimeout = setTimeout(hideResponse, delay);
    var question = questions[number];
    elements.questionTitle.innerHTML = question.question;
    showChoices(number);
    showWrapperElement(elements.question);
}

function showChoices(number) {
    var choices = questions[number].choices;
    removeAllChildNodes(elements.questionChoice);
    choices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        elements.questionChoice.appendChild(listItem);
        listItem.addEventListener("click", onChoice);
    })
};

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// compare choices with answer
function onChoice(event) {
    clearTimeout(hideResponseTimeout);
    hideResponse();
    var element = event.target;

    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");

        if (element.textContent == questions[questionIndex].answer) {
            score++;
            showElement(elements.correct);

        } else {
            secondsLeft = secondsLeft - penalty;
            showElement(elements.wrong);
        }
    }
    questionIndex++;
    if (questionIndex >= questions.length) {
        finishQuiz();
    } else {
        showQuizItem(questionIndex);
    }
}

function finishQuiz() {
   
    // calculate time remaining and show score
    if (secondsLeft < 0) {
        secondsLeft = 0;
    }
        clearInterval(holdInterval);
        elements.finalScore.textContent = secondsLeft;
   
    showWrapperElement(elements.initials);
}

function showScores() {
    var scores = getAllScores();
    removeAllChildNodes(elements.highScore);
    scores.forEach(function (score) {
        var listItem = document.createElement("li");
        listItem.textContent = `${score.initials} - ${score.score}`;
        elements.highScore.appendChild(listItem);
    })
    showWrapperElement(elements.scores);
}

function getAllScores() {
    var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
    return allScores;
}
    
    // set local storage for initials and score
    function onInitialsEntered() {
        var initials = elements.inputInitials.value;

        if (!initials) {
            alert("No value entered!");
            return
        }  
        var finalScore = {
            initials: initials,
            score: secondsLeft
        }
        var allScores = getAllScores();
        
        allScores.push(finalScore);
        var newScore = JSON.stringify(allScores);
        localStorage.setItem("allScores", newScore);
        showScores()

}

// Clear scores
elements.submitInitials.addEventListener("click", onInitialsEntered);
clear.addEventListener("click", function() {
    localStorage.clear();
    showScores();
});

elements.goBack.addEventListener("click", function () {
     score = 0;
     questionIndex = 0;
     secondsLeft = questions.length * 20;
     holdInterval = 0;
     elements.currentTime.textContent = "";
     elements.inputInitials.value = "";
    showWrapperElement(elements.intro);
    
});

elements.viewHighScores.addEventListener("click", showScores);

showWrapperElement(elements.intro);
elements.startQuiz.addEventListener("click", startQuiz);

    

