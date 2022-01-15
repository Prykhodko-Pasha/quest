const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '352acb8d318346b404dce557309fb342';

export function fetchTrendingMovies(pageNumber) {
  return fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${pageNumber}`,
  )
    .then(response => response.json())
    .catch(error => Promise.reject(error));
}

export function fetchSearchingMovies(searchQuery, pageNumber) {
  return fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${pageNumber}`,
  )
    .then(response => response.json())
    .catch(error => Promise.reject(error));
}

export function fetchMovieById(movieId) {
  return fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`)
    .then(response => response.json())
    .catch(error => Promise.reject(error));
}

export function fetchMovieReviews(movieId) {
  return fetch(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`)
    .then(response => response.json())
    .catch(error => Promise.reject(error));
}

export function fetchMovieCast(movieId) {
  console.log(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
  return fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`)
    .then(response => response.json())
    .catch(error => Promise.reject(error));
}
