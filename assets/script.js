fetch("https://giphy.p.rapidapi.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=drinks", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "giphy.p.rapidapi.com",
		"x-rapidapi-key": "ebad596933msh0bd0d60b9facb1bp1906dejsn061864291ea2"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});

