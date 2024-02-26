const apiKey = '195f9bb150f7dc7c6d1be77416c3b24a';

function fetchTopRatedMovies(){
    const searchUrl = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key=${apiKey}`;
    fetch(searchUrl).
    then(res=> res.json())
    .then(
        (res) =>{
            
            function displayMovies() {
                var movieList = document.getElementById("movieList");
                movieList.innerHTML = "";
            
                const movies=res.results
                console.log(movies)
                movies.forEach(function(movie) {

                  var listItem = document.createElement("li");
                  listItem.textContent = movie.original_title
            
                  movieList.appendChild(listItem);
                });
              }
            displayMovies();
        }
    )
}

window.onload = fetchTopRatedMovies;