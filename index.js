function useJsonOnPage (json) {
  let name = document.querySelector('.userName');
  name.textContent = json.original_title;
  let avatar = document.querySelector('img');
  avatar.src = json.poster_path;
  let home = document.querySelector('.address');
  home.textContent = json.location;
}

fetch("https://api.themoviedb.org/3/movie/769?api_key=" + key + "");
.then(response => response.json())
.then(useJsonOnPage);
