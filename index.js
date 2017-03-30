
function useJsonOnPage (json) {
  let name = document.querySelector('.movieName');
  name.textContent = json.original_title;
  let poster = document.querySelector('.movie_poster');
  poster.src = "https://image.tmdb.org/t/p/w500" + json.poster_path;
  let tagline = document.querySelector('.tagline');
  tagline.textContent = json.tagline;
  let home = document.querySelector('.synopsis');
  home.textContent = json.overview;
  let releaseDate = document.querySelector('.date');
  releaseDate.textContent = json.release_date;
}

fetch("https://api.themoviedb.org/3/movie/769?api_key=" + key)
.then(response => response.json())  //converting to json
.then(json => useJsonOnPage(json));

//search box

let search = document.querySelector('.searchButton');
search.addEventListener('click', additional);

function additional (event) {
event.preventDefault();
let movie = document.querySelector(".searchField").value;
fetch("https://api.themoviedb.org/3/search/movie?api_key=" + key + "&query=" + movie + "")
.then(response => response.json())
.then(json => useJsonOnPage(json.results[0]));
}





//1. what is the total budget of the ten most popular movies in the db?

function getData (url, params) {
     let key = "1922c66ebaed294ac65a15f52834a49b";
     return fetch(`https://api.themoviedb.org/3/${url}?api_key=${key}&${params}`)
       .then(response => response.json())

   }
   function getMovie (movieData) {
     return getData(`movie/${movieData.id}`)
   }
   function combineBudget (total, movie) {
     console.log('Current movie budget:', movie.budget);
     return total + movie.budget;
   }
   function showCombinedBudget (movies) {
     let allTheMonies = movies.reduce(combineBudget, 0);
     console.log('1. The total budget is: ', allTheMonies);
   }
   getData('movie/popular')
     .then(json => {
       let topTen = json.results.slice(0, 10);
       return topTen.map(getMovie)
     })
     .then(moviePromises => Promise.all(moviePromises))
     .then(showCombinedBudget);


//5. how many movies have the stars of the most popular movie of last year appeared in? (list each star's name with the number of movies)


function getActorCredits (actor) {
  console.log("working with", [actor.name , actor.movies]);
  return getData(`person/${actor.id}/movie_credits`)  //reduce?

}
getData('discover/movie', 'primary_release_year=2016')                //pulling discover and primary_release_year
     .then(json => getData(`movie/${json.results[0].id}/credits`))
     .then(json => json.cast.map(getActorCredits))
     .then(wtf => console.log(wtf));


//#3 which of the top 25 horror movies have no spoken language besides English?

function getEnglishHorrorMovies (movie) {
  console.log("horror movies", movie.title)
  return getData(`movie/${movie.id}/movie_genres`)
}

getData('movie/popular')
.then(json => getData(`movie/${json.results[0].id}/movie`))
.then(json => json.genres.map(getEnglishHorrorMovies))
.then(test => console.log(test));
