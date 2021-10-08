// Array of questions for the quiz.
var questions = [
  {
    question: "Select an ingredient:",
    choices: ["Elderberry", "Honey", "Lavender", "Pineapple"],
  },
  {
    question: "How are you feeling?",
    choices: ["Happy", "Pensive", "Gregarious","Sad"],
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

var questionIndex = 0;

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
    var random = Math.floor(Math.random() * res.drinks.length)
    var drinkString = res.drinks[random].strDrink
    document.getElementById("cocktail-result").textContent = drinkString
    showStoredDrinks()
    storeNewDrink(drinkString)
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
          console.log(response.data)
			var gifImg = document.createElement("img");
      var random = Math.floor(Math.random() * response.data.length)
			gifImg.setAttribute('src', response.data[random].images.fixed_height.url);

			responseContainerEl.appendChild(gifImg)
        })
        .catch((err) => {
          console.error(err);
        });
}

// store previous drinks in local storage
function storeNewDrink(drink) {
  var currentStore = localStorage.getItem("drinks")
  if (!currentStore) {
    localStorage.setItem("drinks", JSON.stringify([drink]))
  }
  else {
    var parsed = JSON.parse(currentStore)
    parsed.push(drink)
    localStorage.setItem("drinks", JSON.stringify(parsed))
  }
}

// return the innerHTML that we wnat to go inside of the UL
function showStoredDrinks() {
  var currentStore = localStorage.getItem("drinks")
  var resultsDiv = document.getElementById("previous-results")
  resultsDiv.innerHTML = ""
  if (!currentStore) {
    resultsDiv.textContent = "No previous drink searches"
  }
  else {
    var parsed = JSON.parse(currentStore)
    var ul = document.createElement("ul")
    for (let i = 0; i < parsed.length; i++) {
      var li = document.createElement("li")
      li.textContent = parsed[i]
      ul.appendChild(li)
    }
    resultsDiv.appendChild(ul)
  }
}

// clear local storage
document.querySelector("#clear").addEventListener("click", () => {
  localStorage.clear()
  showStoredDrinks()
})

const url = "https//www.thecocktaildb.com/api/json/v1/1/filter.php?1=";

let currentIndex = 0;



