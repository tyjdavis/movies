function useJsonOnPage (json) {
  let name = document.querySelector('.movieName');
  name.textContent = json.original_title;

  let poster = document.querySelector('.movie_poster');
  poster.src = "https://image.tmdb.org/t/p/w300" + json.poster_path;

  let tagline = document.querySelector('.tagline');
  tagline.textContent = json.tagline;

  let home = document.querySelector('.synopsis');
  home.textContent = json.overview;

  let releaseDate = document.querySelector('.date');
  releaseDate.textContent = json.release_date;


}

fetch("https://api.themoviedb.org/3/movie/769?api_key=" + key + "")
.then(response => response.json())
.then(useJsonOnPage);
