// initialize the dinner modal
$(document).ready(function() {
    $("#dinner-modal").modal();
});

// initialize the meal type dropdown
$(document).ready(function(){
    $('#meal-type').formSelect();
});

// initialize the cuisine dropdown
$(document).ready(function(){
    $('#cuisine').formSelect();
});

// initialize the diet dropdown
$(document).ready(function(){
    $('#diet').formSelect();
});

// initialize the movie modal
$(document).ready(function() {
    $('#movie-modal').modal();
});

// initialize the sort dropdown
$(document).ready(function(){
    $('#sort').formSelect();
});

var getMovies = function (params) {
    // format tmdb api url
    // var tmdbApiUrl ="https://api.themoviedb.org/3/discover/movie?api_key=b2defd411e4c4ccada84680b336db68b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=" +  year + "&with_genres=" + genre + "&with_watch_monetization_types=free";
    var tmdbApiUrl ="https://api.themoviedb.org/3/discover/movie?api_key=b2defd411e4c4ccada84680b336db68b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=westerns&with_watch_monetization_types=flatrate";

    // make a request to the url
    fetch(tmdbApiUrl).then(function (response) {
        response.json().then(function (data) {
            console.log(data)
        });
    });
};

getMovies()


var getRecipes = function (params) {
    // format spoonacular api url
    var spoonApiUrl ="https://api.spoonacular.com/recipes/complexSearch?apiKey=98f2006279d64b1894e8b2e18d3687b3&query=pasta&maxFat=25&number=2";

    // make a request to the url
    fetch(spoonApiUrl).then(function (response) {
        response.json().then(function (data) {
            console.log("The Recipe is", data)
        });
    });
};

getRecipes()