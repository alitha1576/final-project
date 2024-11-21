const URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const TEMPLATE = document.getElementById('template');
const CONTAINER = document.querySelector('.container');

function fillCardData (movie) {
    const card = TEMPLATE.cloneNode(true);
    const img = card.querySelector('.card-img-src');
    img.src = IMAGE_URL + movie.poster_path;
    img.alt = movie.title;
    card.removeAttribute('id');
    CONTAINER.appendChild(card);
}


async function getData() {
    const res = await fetch(URL);
    const data = await res.json();
    data.results.forEach(movie => {       
        fillCardData(movie);
    });
}
getData();




