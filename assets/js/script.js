// initialize the dinner modal
$(document).ready(function() {
    $("#dinner-modal").modal({
        onCloseEnd: function() {
            $("#meal-type").val("");
            $("#cuisine").val("");
            $("#diet").val("");
        }
    });
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
    $('#movie-modal').modal({
        onCloseEnd: function() {
            $("#sort").val("");
            $("#year").val("");
        }
    });
});

// initialize the sort dropdown
$(document).ready(function(){
    $('#sort').formSelect();
});

// initialize character counting on year field
$(document).ready(function() {
    $("input#year").characterCounter();
});

var getMovies = function(sort, year) {
    // format tmdb api url
    // var tmdbApiUrl ="https://api.themoviedb.org/3/discover/movie?api_key=b2defd411e4c4ccada84680b336db68b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=" +  year + "&with_genres=" + genre + "&with_watch_monetization_types=free";
    var tmdbApiUrl ="https://api.themoviedb.org/3/discover/movie?api_key=b2defd411e4c4ccada84680b336db68b&language=en-US&sort_by=" + sort + "&include_adult=false&include_video=false&page=1&year=" + year + "&with_watch_monetization_types=flatrate";

    // make a request to the url
    fetch(tmdbApiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayMovies(data);
            });
        }
    });
};

// call Spoonacular API for recipes
var getRecipes = function(mealType, cuisine, diet) {
    // format spoonacular api url
    var spoonApiUrl ="https://api.spoonacular.com/food/videos/search?apiKey=98f2006279d64b1894e8b2e18d3687b3&type=" + mealType + "&cuisine=" + cuisine + "&diet=" + diet;

    // make a request to the url
    fetch(spoonApiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayRecipes(data);
            });
        }
    });
};

// display recipe cards on site
var displayRecipes = function(data) {
    for (var i = 0; i < 4; i++) {
        console.log("[Recipe " + i + "]: Thumbnail: " + data.videos[i].thumbnail + " - shortTitle: " + data.videos[i].shortTitle + " - YoutTube: " + data.videos[i].youTubeId + " - Views: " + data.videos[i].views);
    }
    console.log("Length of results: " + data.videos.length);
};

// display movie cards on site
var displayMovies = function(data) {
    for (var i = 0; i < 4; i++) {
        console.log("[Movie " + i + "]: Poster path: " + data.results[i].poster_path + " - Title: " + data.results[i].title + " - Overview: " + data.results[i].overview + " - Release data: " + data.results[i].release_date + " - vote average: " + data.results[i].vote_average);
    }
};


// get dinner user inputs
$("#dinner-submit-btn").click(function(event) {
    event.preventDefault();
    var mealType = $("#meal-type").val();
    var cuisine = $("#cuisine").val();
    var diet = $("#diet").val();
    console.log("meal type: " + mealType + " - cuisine: " + cuisine + " - diet: " + diet);
    getRecipes(mealType, cuisine, diet);
});

// get movie user inputs
$("#movie-submit-btn").click(function(event) {
    event.preventDefault();
    var sort = $("#sort").val();
    var year = $("#year").val();
    if (year < 1960 || year > 2021) {
        alert("You must enter a valid year");
        $("#movie-submit-btn").addClass("disabled");
    }
    else if ($("#movie-submit-btn").hasClass("disabled")) {
        $("#movie-submit-btn").removeClass("disabled");
    }
    console.log(sort + " and " + year);
    getMovies(sort, year);
});
