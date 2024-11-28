const URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query='

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const TEMPLATE = document.getElementById('template');
const CONTAINER = document.querySelector('.container');

const MODAL_TEMPLATE = document.getElementById('modal-template');
const MOVIE_URL = 'https://api.themoviedb.org/3/movie/';

const HOME_BUTTON = document.getElementById('home-button');


// Сlick on Home button
document.querySelector('.logo').addEventListener('click', () => {
    document.querySelector('#search').value = '';
    getMovieListData();
});

// CLick on Logo button
HOME_BUTTON.addEventListener('click', () => {
    document.querySelector('#search').value = '';
    getMovieListData();
});


//Click on Watchlist page
document.getElementById('watchlist-button').addEventListener('click', () => {
    CONTAINER.innerHTML = '';
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    watchlist.forEach(movie => {
        fillCardData(movie);
    });


})

function toggleWatchList(data) {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    if (!watchlist.some(item => item.id === data.id)) {
        watchlist.push(data);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        return true;
    } else {
        let index = watchlist.findIndex(item => item.id === data.id);
        if (index !== -1) {
            watchlist.splice(index, 1);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
        }
        return false;
    }
}

// Click on card 
CONTAINER.addEventListener('click', async function (event) {
    const card = event.target.closest('.card');

    if (!card) {
        return;
    }
    const id = card.getAttribute('data-id');
    const data = await getMovieData(id);

    if (event.target.classList.contains('watchlist')) {
        const isAdded = toggleWatchList(data);
        if (isAdded) {
            event.target.innerHTML = '- Remove from watchlist';
        } else {
            event.target.innerHTML = '+ Add to watchlist';
        }
        return
    }

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

// Fill search input
document.querySelector('#search').addEventListener('input', (event) => {
    const inputQuery = event.target.value;
    getMovieListData(inputQuery);
});


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

    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    if (watchlist.some(item => item.id === movie.id)) {
        card.querySelector('.watchlist').innerHTML="- Remove from watchlist";
    }

    CONTAINER.appendChild(card);
}

async function getMovieListData(query = '') {
    let url = URL;
    if (query !== '') {
        url = SEARCH_URL + query;
    }
    CONTAINER.innerHTML = '<img src="assets/svg/spinner.svg" alt="spinner" class="spinner">';
   try { const res = await fetch(url);
    const data = await res.json();
    
    CONTAINER.innerHTML = '';
    data.results.forEach(movie => {
        fillCardData(movie);
    });}
    catch (error) {
        CONTAINER.innerHTML = `<span style="color:white">${error.message}</span>`;
        }
}
getMovieListData();


async function getMovieData(id) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=3fd2be6f0c70a2a598f084ddfb75487c`);
    const data = await res.json();
    return data;
}