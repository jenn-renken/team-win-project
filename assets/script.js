// Array of questions for the quiz.
var questions = [
  {
    question: "Select an ingredient:",
    choices: ["Elderberry", "Honey", "Lavender", "Pineapple"],
  },
  {
    question: "How are you feeling?",
    choices: ["happy", "pensive", "gregarious","sad"],
  },
  {
    question: "Select another ingredient:",
    choices: [
      "Mint",
      "Cherry",
      "Cranberry",
      "Lime",
    ],
  },
  {
    question: "Select a mixer:",
    choices: ["Grand Marnier", "Vermouth", "Aperol", "Cointreau"],
  },
  {
    question: "Where would you rather spend the day?",
    choices: [
      "By the pool",
      "In a library",
      "At a bar",
      "At the beach",
    ],
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
  showQuizItem(0);
}

function showQuizItem(number) {
  showWrapperElement();
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

// assign ranking to answers
function onChoice(event) {
  const answerId = parseInt(event.target.id)
    const selectedKey = spiritList[answerId]
    spiritDict[selectedKey]+=1;

  questionIndex++;
  if (questionIndex >= questions.length) {
    finishQuiz();
  } else {
    showQuizItem(questionIndex);
  }
}

function finishQuiz() {
    const drink = getKeyWithHighestPoints()
    getCocktail(drink)
    getGif(drink)
    elements.question.style.display = "none"
    elements.results.style.display = "block"
    for (key in spiritDict) {
      spiritDict[key] = 0
    }
    
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
  holdInterval = 0;
  showWrapperElement(elements.intro);
});



showWrapperElement(elements.intro);
elements.startQuiz.addEventListener("click", startQuiz);

// call cocktail db api

function getCocktail(drink) {
  fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="+drink
  ).then(function (response) {
    return response.json();
  })
  .then(function (res) {
    var drinkString = res.drinks[0].strDrink
    document.getElementById("cocktail-result").textContent = drinkString

  } );
}

function getGif(drink) {
    fetch(
        'https://api.giphy.com/v1/gifs/search?q=' +
			drink +
			'&api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN&limit=1'
      )
        .then((response) => {
          return response.json();
        })
        .then(function(response) {
			var responseContainerEl = document.querySelector("#cocktail-img");
			responseContainerEl.innerHTML = '';

			var gifImg = document.createElement("img");
			gifImg.setAttribute('src', response.data[0].images.fixed_height.url);

			responseContainerEl.appendChild(gifImg)
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
