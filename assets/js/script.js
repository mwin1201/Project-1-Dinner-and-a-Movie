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

// initialize the arrays for user favorites
var favMoviesArr = [];
var favRecipesArr = [];

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

// create recipe object
var createRecipeObj = function(card) {
    //console.log($("#" + card).children());
    var recipeImg = $("#" + card).children()[0].firstElementChild.currentSrc;
    var recipeTitle = $("#" + card).children()[1].innerText;
    var recipeVideo = $("#" + card).children()[2].firstElementChild.href;
    var recipeViews = $("#" + card).children()[2].lastElementChild.innerText;
    //console.log(recipeImg + " " + recipeTitle + " " + recipeVideo + " " + recipeViews);
    var recipeObj = {
        image: recipeImg,
        title: recipeTitle,
        video: recipeVideo,
        views: recipeViews
    };
    addToFavorites(recipeObj);
};

// create movie object
var createMovieObj = function(card) {
    //console.log($("#" + card).children());
    var posterImg = $("#" + card).children()[0].firstElementChild.currentSrc;
    var movieTitle = $("#" + card).children()[1].firstElementChild.innerText;
    var movieOverview = $("#" + card).children()[1].lastElementChild.innerText;
    var movieReleaseDate = $("#" + card).children()[2].firstElementChild.innerText;
    var movieVoteAvg = $("#" + card).children()[2].lastElementChild.innerText;
    //console.log(posterImg + " " + movieTitle + " " + movieOverview + " " + movieReleaseDate + " " + movieVoteAvg);
    var movieObj = {
        poster: posterImg,
        title: movieTitle,
        overview: movieOverview,
        releaseDate: movieReleaseDate,
        voteAvg: movieVoteAvg
    };
    addToFavorites(movieObj);
};

// add to favorite arrays and push to local storage
var addToFavorites = function(obj) {
    var size = Object.keys(obj).length;
    if (size < 5) {
        favRecipesArr.push(obj);
        localStorage.setItem("Favorite-Recipes", JSON.stringify(favRecipesArr));
    }
    else {
        favMoviesArr.push(obj);
        localStorage.setItem("Favorite-Movies", JSON.stringify(favMoviesArr));
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

$(".material-icons").click(function(event) {
    var cardId = $(this).parents(".card").attr("id");
    if (cardId.includes("recipe")) {
        createRecipeObj($(this).parents(".card").attr("id"));
    }
    else{
        createMovieObj($(this).parents(".card").attr("id"));
    }
});