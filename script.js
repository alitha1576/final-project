const URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query='

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const TEMPLATE = document.getElementById('template');
const CONTAINER = document.querySelector('.container');

const MODAL_TEMPLATE = document.getElementById('modal-template');
const MOVIE_URL = 'https://api.themoviedb.org/3/movie/';

CONTAINER.addEventListener('click', async function (event) {
    const card = event.target.closest('.card');
    if (!card) {
        return;
    }
    const id = card.getAttribute('data-id');
    const data = await getMovieData(id);
    fillModalData(data);
    document.querySelector('.modal-background').classList.add('overlay');
    document.body.classList.add('prevent-scroll');
    const overlay = document.querySelector('.overlay');
    const closeButton = document.querySelector('.close-button');

    closeButton.addEventListener('click', function () {
        document.querySelector('.modal').remove();
        document.querySelector('.modal-background').classList.remove('overlay');
        document.body.classList.remove('prevent-scroll');
    });

    if (overlay) {
        overlay.addEventListener('click', function () {
            document.querySelector('.modal').remove();
            document.querySelector('.modal-background').classList.remove('overlay');
            document.body.classList.remove('prevent-scroll');
        });
    }
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

document.querySelector('#search').addEventListener('input', (event) => {
    const inputQuery = event.target.value;
    getMovieListData(inputQuery);
});

async function getMovieListData(query = '') {
    let url = URL;
    if(query !== '') {
        url = SEARCH_URL + query;
    }
    CONTAINER.innerHTML='<img src="assets/svg/spinner.svg" alt="spinner" class="spinner">';
    const res = await fetch(url);
    const data = await res.json();
    CONTAINER.innerHTML='';
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