// Array of questions for the quiz.
var questions = [
  {
    question: "Which ingredient is your favorite",
    choices: ["Juniper", "Honey", "Lavender", "Pineapple"],
  },
  {
    question: "How are you feeling?",
    choices: ["happy", "rock n' roll", "gregarious","sad"],
  },
  {
    question: "A useful tool to debug code and print content is:",
    choices: [
      "for()",
      "document.getElement",
      ".addEventListener",
      "console.log()",
    ],
    answer: "console.log()",
  },
  {
    question: "Which of the following is a data type?",
    choices: ["prompt", "boolean", "alert", "variable"],
    answer: "boolean",
  },
  {
    question: "What is an array used for?",
    choices: [
      "storing numbers and strings",
      "iterating through data",
      "displaying content",
      "none of the above",
    ],
    answer: "storing numbers and strings",
  },
];

const spiritList = ["gin", "bourbon", "vodka", "tequila"];

const spiritDict = {
  gin: 0,
  bourbon: 0,
  vodka: 0,
  tequila: 0,
};


// var score = 0;
var questionIndex = 0;
// var holdInterval = 0;

var hideResponseTimeout = null;

var elements = {
  startQuiz: document.querySelector("#startQuiz"),
  wrapper: document.querySelector("#wrapper"),
  question: document.querySelector("#question"),
  questionChoice: document.querySelector("#questionChoice"),
  intro: document.querySelector("#intro"),
  questionTitle: document.querySelector("#questionTitle"),
  goBack: document.querySelector("#goBack"),
  results: document.querySelector("#results"),
  cocktailResult: document.querySelector("#cocktail-result"),
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
  // startTimer();
  showQuizItem(0);
}

// function hideResponse () {
//     hideElement(elements.correct);
//     hideElement(elements.wrong);
// }

function showQuizItem(number) {
  showWrapperElement();
  // var delay = number? 2000:0;
  // hideResponseTimeout = setTimeout(hideResponse, delay);
  var question = questions[number];
  elements.questionTitle.innerHTML = question.question;
  showChoices(number);
  showWrapperElement(elements.question);
}

function showChoices(number) {
  var choices = questions[number].choices;
  removeAllChildNodes(elements.questionChoice);
  choices.forEach(function (newItem, index) {
    var listItem = document.createElement("li");
    listItem.setAttribute("class", "choice-button")
    listItem.setAttribute("id", index)
    listItem.textContent = newItem;
    elements.questionChoice.appendChild(listItem);
    listItem.addEventListener("click", onChoice);
  });
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// compare choices with answer
function onChoice(event) {
  // clearTimeout(hideResponseTimeout);
  // hideResponse();
  const answerId = parseInt(event.target.id)
    const selectedKey = spiritList[answerId]
    spiritDict[selectedKey]+=1;
    console.log(spiritDict)
//   if (element.matches("li")) {
//     var createDiv = document.createElement("div");
//     createDiv.setAttribute("id", "createDiv");

//     // if (element.textContent == questions[questionIndex].answer) {
//     //     score++;
//     //     showElement(elements.correct);

//     // } else {
//     //     // secondsLeft = secondsLeft - penalty;
//     //     showElement(elements.wrong);
//     // }
//   }
  questionIndex++;
  if (questionIndex >= questions.length) {
    finishQuiz();
  } else {
    showQuizItem(questionIndex);
  }
}

function finishQuiz() {
    console.log(spiritDict)
    const drink = getKeyWithHighestPoints()
    getCocktail(drink)
    getGif(drink)
    // THIS IS WHERE YOU MAKE THE API CALL AND SHOW THE RESULTS
  // calculate time remaining and show score
  // if (secondsLeft < 0) {
  //     secondsLeft = 0;
  // }
  //     clearInterval(holdInterval);
  //     elements.finalScore.textContent = secondsLeft;
  // showWrapperElement(elements.initials);
}

function getKeyWithHighestPoints () {
    let highest = "";
    for (key in spiritDict) {
        if (highest.length <= 0) {
            highest = key;
        }
        else {
            if (spiritDict[highest] < spiritDict[key]) {
                highest=key;
            }
        }
    }
    return highest;
}

function showResult() {
  var result = getAllScores();
  removeAllChildNodes(elements.results);
  result.forEach(function (result) {
    var listItem = document.createElement("li");
    listItem.textContent = `${score.initials} - ${result.score}`;
    elements.results.appendChild(listItem);
  });
  showWrapperElement(elements.scores);
}



elements.goBack.addEventListener("click", function () {
  score = 0;
  questionIndex = 0;
  //  secondsLeft = questions.length * 20;
  holdInterval = 0;
  //  elements.currentTime.textContent = "";
  //  elements.inputInitials.value = "";
  showWrapperElement(elements.intro);
});

// elements.viewHighScores.addEventListener("click", showScores);

showWrapperElement(elements.intro);
elements.startQuiz.addEventListener("click", startQuiz);

// "margarita" can be replaced with our var of choice

function getCocktail(drink) {
  fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="+drink
  ).then(function (response) {
    return response.json();
  })
  .then(function (res) {
    console.log(res)

  } );
}

function getGif(drink) {
    fetch(
        "https://giphy.p.rapidapi.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q="+drink,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "giphy.p.rapidapi.com",
            "x-rapidapi-key": "ebad596933msh0bd0d60b9facb1bp1906dejsn061864291ea2",
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then(function(res) {
            console.log(res)
        })
        .catch((err) => {
          console.error(err);
        });
}


const url = "https//www.thecocktaildb.com/api/json/v1/1/filter.php?1=";

let currentIndex = 0;


// for each answer, predetermine which spirt a given answer is correlated to

// const questions = [
//     {
//         question:
//             possibles:
//     },
//     {
//         question:
//             possibles:
//     },
// ]

// function processAnswer(answer) {
//   const indexOfAnswer = questions.possibles.indexOf(answer);
//   spirits[spiritDict[indexOfAnswer]] += 1;
// }

// function run() {
//   askQuestion();
// }

// function askQuestion() {
//   if (currentIndex < questions.length) {
//     // take current index and pass to questions[currentIndex]
//     // when answer received from user, pass that answer to process answer;
//   } else {
//     // process final answer, make call api
//   }
// }

// function processAnswer(answer)

// processAnswer()

// function getFinalAnswer() {
//     let highest = "";

//     Object.keys(key in 0)
// }
