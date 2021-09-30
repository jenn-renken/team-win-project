function getCocktail () {
	fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka")
	.then(function(response) {
	  console.log(response);
	})
}
getCocktail();
