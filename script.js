const URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const TEMPLATE = document.getElementById('template');
const CONTAINER = document.querySelector('.container');

const MODAL_TEMPLATE = document.getElementById('modal-template');
const MOVIE_URL = 'https://api.themoviedb.org/3/movie/'

CONTAINER.addEventListener('click', async function(event) {
    const card = event.target.closest('.card');
    if (!card) {
        return;
    }
    const id = card.getAttribute('data-id');
    const data = await getMovieData(id);
    fillModalData(data);
})

function fillModalData(movie) {
    const modal = MODAL_TEMPLATE.cloneNode(true);
    const img = modal.querySelector('.modal-img-src');
    img.src = IMAGE_URL + movie.poster_path;
    img.alt = movie.title;
    modal.querySelector('.modal-movie-title').innerHTML = movie.title;
    modal.querySelector('.modal-movie-rating').innerHTML = movie.vote_average.toFixed(1);;
    modal.querySelector('.modal-movie-year').innerHTML = movie.release_date.slice(0, -6);
    modal.querySelector('.modal-movie-genre').innerHTML = movie.genres.map(item => item.name).join(', ');
    modal.querySelector('.modal-movie-description').innerHTML = movie.overview;

    modal.removeAttribute('id');
    CONTAINER.appendChild(modal);
}

function fillCardData(movie) {
    const card = TEMPLATE.cloneNode(true);
    const img = card.querySelector('.card-img-src');
    img.src = IMAGE_URL + movie.poster_path;
    img.alt = movie.title;
    card.querySelector('.movie-title').innerHTML = movie.original_title;
    card.querySelector('.movie-imdb').innerHTML = movie.vote_average.toFixed(1);
    card.setAttribute('data-id', movie.id);
    card.removeAttribute('id');
    CONTAINER.appendChild(card);
}

async function getMovieListData() {
    const res = await fetch(URL);
    const data = await res.json();
    data.results.forEach(movie => {       
        fillCardData(movie);
    });
}
getMovieListData();

async function getMovieData(id) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=3fd2be6f0c70a2a598f084ddfb75487c`);
    const data = await res.json();
    return data;
}