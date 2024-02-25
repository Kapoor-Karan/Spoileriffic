const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-movie');
const imageContainer = document.getElementById('image-container');
const reviewSection = document.getElementById('review-section');

const apiKey = '195f9bb150f7dc7c6d1be77416c3b24a';

searchButton.addEventListener('click', () => {
    const movieTitle = searchInput.value.trim();
    if (!movieTitle) {
        alert('Please enter a movie title.');
        return;
    }

    searchInput.value = ''; 

    fetchMovieInfo(movieTitle);
});

function fetchMovieInfo(movieTitle) {
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieTitle}`;

    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results.length === 0) {
                alert(`No movie found with title "${movieTitle}".`);
                return;
            }

            const movieId = data.results[0].id;
            fetchReview(movieId);

            displayImage(data.results[0].poster_path);
        })
        .catch(error => {
            console.error('Error fetching movie info:', error);
        });
}

function fetchReview(movieId) {
    const reviewUrl = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`;

    fetch(reviewUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results.length === 0) {
                reviewSection.textContent = 'No reviews found for this movie.';
                return;
            }

            const review = data.results[0];
            const author = review.author || 'Anonymous';

            reviewSection.innerHTML = `
                <h2>Review by ${author}</h2>
                <p>${review.content}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching review:', error);
        });
}

function displayImage(posterPath) {
    if (!posterPath) {
        imageContainer.innerHTML = 'No image available.';
        return;
    }

    const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
    imageContainer.innerHTML = `<img src="${imageUrl}" alt="Movie poster">`;
}
