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

// movie and recipe search variables
// values will increment by 10 when search buttons are clicked
// get recipe and get movie functions will increase by i
// purpose is to create unique card IDs
var recipeSearches = 0;
var movieSearches = 0;

var getMovies = function(sort, year, movieSearches) {
    // format tmdb api url
    // var tmdbApiUrl ="https://api.themoviedb.org/3/discover/movie?api_key=b2defd411e4c4ccada84680b336db68b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=" +  year + "&with_genres=" + genre + "&with_watch_monetization_types=free";
    var tmdbApiUrl ="https://api.themoviedb.org/3/discover/movie?api_key=b2defd411e4c4ccada84680b336db68b&language=en-US&sort_by=" + sort + "&include_adult=false&include_video=false&page=1&year=" + year + "&with_watch_monetization_types=flatrate";

    // make a request to the url
    fetch(tmdbApiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayMovies(data, movieSearches);
            });
        }
    });
};

// call Spoonacular API for recipes
var getRecipes = function(mealType, cuisine, diet, recipeSearches) {
    // format spoonacular api url
    var spoonApiUrl ="https://api.spoonacular.com/food/videos/search?apiKey=98f2006279d64b1894e8b2e18d3687b3&type=" + mealType + "&cuisine=" + cuisine + "&diet=" + diet;

    // make a request to the url
    fetch(spoonApiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayRecipes(data, recipeSearches);
            });
        }
    });
};

// display recipe cards on site
var displayRecipes = function(data, recipeSearches) {
    $("#recipe-container").empty();
    for (var i = 0; i < 4; i++) {
        $("#recipe-container").append(
            '<div class="col s12 m3 l3">' +
            '<div class="card" id="recipe' + (recipeSearches + i) +  '">' +
            '<div class="card-image">' +
            '<img src=' + data.videos[i].thumbnail + '>' +
            '<a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>' +
            '</div>' +
            '<div class="card-content">' + 
            '<h4 class="card-title">' + data.videos[i].shortTitle + '</h4>' +
            '</div>' +
            '<div class="card-action">' +
            '<a href="https://www.youtube.com/watch?v=' + data.videos[i].youTubeId + '" target="_blank">YouTube Tutorial</a>' +
            '<span>Views: ' + data.videos[i].views + '</span>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
        console.log("[Recipe " + i + "]: Thumbnail: " + data.videos[i].thumbnail + " - shortTitle: " + data.videos[i].shortTitle + " - YoutTube: " + data.videos[i].youTubeId + " - Views: " + data.videos[i].views);
    }
    console.log("Length of results: " + data.videos.length);
};

// display movie cards on site
var displayMovies = function(data, movieSearches) {
    $("#movie-container").empty();
    for (var i = 0; i < 4; i++) {
        $("#movie-container").append(
            '<div class="col s12 m3 l3">' +
            '<div class="card" id="movie' + (movieSearches + i) + '">' +
            '<div class="card-image">' +
            '<img src="https://image.tmdb.org/t/p/w200' + data.results[i].poster_path + '">' + 
            '<a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>' +
            '</div>' + 
            '<div class="card-content">' +
            '<h4 class="card-title">' + data.results[i].title + '</h4>' +
            '<p>' + data.results[i].overview + '</p>' +
            '</div>' +
            '<div class="card-action">' +
            '<p>Release Date: ' + data.results[i].release_date + '</p>' +
            '<p>Vote Average: ' + data.results[i].vote_average + '</p>' +
            '</div>'+
            '</div>'+
            '</div>'
        );
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
    var recipeId = card;
    //console.log(recipeImg + " " + recipeTitle + " " + recipeVideo + " " + recipeViews);
    var recipeObj = {
        image: recipeImg,
        title: recipeTitle,
        video: recipeVideo,
        views: recipeViews,
        id: recipeId
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
    var movieId = card;
    //console.log(posterImg + " " + movieTitle + " " + movieOverview + " " + movieReleaseDate + " " + movieVoteAvg);
    var movieObj = {
        poster: posterImg,
        title: movieTitle,
        overview: movieOverview,
        releaseDate: movieReleaseDate,
        voteAvg: movieVoteAvg,
        id: movieId
    };
    addToFavorites(movieObj);
};

// add to favorite arrays and push to local storage
var addToFavorites = function(obj) {
    var size = Object.keys(obj).length;
    if (size < 6) {
        favRecipesArr.push(obj);
        localStorage.setItem("Favorite-Recipes", JSON.stringify(favRecipesArr));
        loadFavRecipes(false);
    }
    else {
        favMoviesArr.push(obj);
        localStorage.setItem("Favorite-Movies", JSON.stringify(favMoviesArr));
        loadFavMovies(false);
    }
};

// load favorite recipes
var loadFavRecipes = function(remove) {
    if (!remove) {
        favRecipesArr = JSON.parse(localStorage.getItem("Favorite-Recipes"));
    }
    else {
        localStorage.setItem("Favorite-Recipes", JSON.stringify(favRecipesArr));
    }
    if (!favRecipesArr) {
        favRecipesArr = [];
        return;
    }
    $("#fav-recipe-container").empty();
    for (var i = 0; i < favRecipesArr.length; i++) {
        $("#fav-recipe-container").append(
            '<div class="col s12 m3 l3">' +
            '<div class="card" id="fav-' + favRecipesArr[i].id + '">' +
            '<div class="card-image">' +
            '<img src=' + favRecipesArr[i].image + '>' +
            '<a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">clear</i></a>' + 
            '</div>' +
            '<div class="card-content">' +
            '<h4 class="card-title">' + favRecipesArr[i].title + '</h4>' +
            '</div>' +
            '<div class="card-action">' +
            '<a href=' + favRecipesArr[i].video + ' target="_blank">YouTube Tutorial</a>' +
            '<span>' + favRecipesArr[i].views + '</span>' +
            '</div>' + 
            '</div>' +
            '</div>'
        );
    }
};

// load favorite movies
var loadFavMovies = function(remove) {
    if (!remove) {
        favMoviesArr = JSON.parse(localStorage.getItem("Favorite-Movies"));
    }
    else {
        localStorage.setItem("Favorite-Movies", JSON.stringify(favMoviesArr));
    }
    if (!favMoviesArr) {
        favMoviesArr = [];
        return;
    }
    $("#fav-movie-container").empty();
    for (var i = 0; i < favMoviesArr.length; i++) {
        $("#fav-movie-container").append(
            '<div class="col s12 m3 l3">' +
            '<div class="card" id="fav-' + favMoviesArr[i].id + '">' +
            ' <div class="card-image">' +
            '<img src=' + favMoviesArr[i].poster + '>' + 
            '<a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">clear</i></a>' + 
            '</div>' + 
            '<div class="card-content">' +
            '<h4 class="card-title">' + favMoviesArr[i].title + '</h4>' + 
            '<p>' + favMoviesArr[i].overview + '</p>' +
            '</div>' +
            '<div class="card-action">' +
            '<p>' + favMoviesArr[i].releaseDate + '</p>' +
            '<p>' + favMoviesArr[i].voteAvg + '</p>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }
};

// remove recipe from favorite list
var removeRecipe = function(card) {
    index = 0;
    var title = $("#" + card).children()[1].innerText;
    for (var i = 0; i < favRecipesArr.length; i++) {
        if (favRecipesArr[i].title === title) {
            index = i;
            break;
        }
    }
    favRecipesArr.splice(index,1);
    loadFavRecipes(true);
};

// remove movie from favorite list
var removeMovie = function(card) {
    index = 0;
    var title = $("#" + card).children()[1].firstElementChild.innerText;
    for (var i = 0; i < favMoviesArr.length; i++) {
        if (favMoviesArr[i].title === title) {
            index = i;
            break;
        }
    }
    favMoviesArr.splice(index,1);
    loadFavMovies(true);

}

// show add favorite confirmation message
var addConfirmation = function() {
    $("#fav-add-confirmation").addClass("show");
    setTimeout(function() {
        $("#fav-add-confirmation").removeClass("show");
    }, 2000);
};

// show remove favorite confirmation message
var removeConfirmation = function() {
    $("#fav-remove-confirmation").addClass("show");
    setTimeout(function() {
        $("#fav-remove-confirmation").removeClass("show");
    }, 2000);
};

// get dinner user inputs
$("#dinner-submit-btn").click(function(event) {
    event.preventDefault();
    recipeSearches += 10;
    var mealType = $("#meal-type").val();
    var cuisine = $("#cuisine").val();
    var diet = $("#diet").val();
    console.log("meal type: " + mealType + " - cuisine: " + cuisine + " - diet: " + diet);
    getRecipes(mealType, cuisine, diet, recipeSearches);
});

// get movie user inputs
$("#movie-submit-btn").click(function(event) {
    event.preventDefault();
    movieSearches += 10;
    var sort = $("#sort").val();
    var year = $("#year").val();
    /* if (year < 1960 || year > 2021) {
        alert("You must enter a valid year");
        $("#movie-submit-btn").addClass("disabled");
    }
    else if ($("#movie-submit-btn").hasClass("disabled")) {
        $("#movie-submit-btn").removeClass("disabled");
    } */
    console.log(sort + " and " + year);
    getMovies(sort, year, movieSearches);
});

// click event to add static movie or recipe cards to favorite sections
/* $(".material-icons").on("click", function() {
    var cardId = $(this).parents(".card").attr("id");
    if (cardId.includes("recipe")) {
        createRecipeObj(cardId);
    }
    else{
        createMovieObj(cardId);
    }
}); */

// click event to add dynamically created recipe cards to favorites
$("#recipe-container").on("click", function(event) {
    var cardId = event.target.parentElement.parentElement.parentElement.id;
    addConfirmation();
    createRecipeObj(cardId);
});

// click event to add dynamically created movie cards to favorites
$("#movie-container").on("click", function(event) {
    var cardId = event.target.parentElement.parentElement.parentElement.id;
    addConfirmation();
    createMovieObj(cardId);
});

// click event to remove dynamically created favorite recipe cards
$("#fav-recipe-container").on("click", function(event) {
    var cardId = event.target.parentElement.parentElement.parentElement.id;
    removeConfirmation();
    removeRecipe(cardId);
});

// click event to remove dynamically created favorite movie cards
$("#fav-movie-container").on("click", function(event) {
    var cardId = event.target.parentElement.parentElement.parentElement.id;
    removeConfirmation();
    removeMovie(cardId);
});


loadFavRecipes(false);
loadFavMovies(false);