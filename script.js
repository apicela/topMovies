const API_KEY = "api_key=4afe9ae58f077a64af133da919425eca";
const BASE_URL = "https://api.themoviedb.org/3/";
const LANGUAGE = "&language=pt-BR";
const API_POPULAR_MOVIES = BASE_URL + 'movie/popular?&' + API_KEY + LANGUAGE + "&page=1" + "&vote_count.gte=100";
const API_POPULAR_SERIES = BASE_URL + 'tv/popular?&' + API_KEY + LANGUAGE + "&page=1" + "&vote_count.gte=100";
const API_DISCOVER_MOVIES = BASE_URL + "discover/movie?"+ API_KEY+ LANGUAGE+"&sort_by=release_date.desc" + "&vote_count.gte=100"; 
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchBar = document.getElementById('form');
const search = document.getElementById('pesquisa');
const SEARCH_URL = BASE_URL + 'search/multi?' + API_KEY; 
const main = document.getElementById('main');
var watchFilmes = document.getElementById('filmes');
var watchSeries = document.getElementById('series');
var discoverMovies = document.getElementById('releases');
var filme = true;


console.log(API_POPULAR_MOVIES);
console.log(API_POPULAR_SERIES)
getMovies(API_POPULAR_MOVIES);

var countryBox = document.getElementById("selectCountry")
.onchange = change => {
    var country = document.getElementById("selectCountry").value;
    if(filme){
    getMovies(API_POPULAR_MOVIES+ "&region="+ country);}
        else{getMovies(API_POPULAR_SERIES+ "&region="+ country);}
}


function getMovies(url){
    
    fetch(url).then(res => res.json()).then(data => 
        {   console.log(data.results);
            showMovies(data.results); } )
}

function showMovies(data){
    main.innerHTML = "";
    data.forEach(movie => {
    
    const{title,name,poster_path,vote_average,overview} = movie;
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.innerHTML =  `
    <img src="${IMG_URL+poster_path}">
        
            <div class="movieInfo">
                <h2 class="titleMovie">${title}</h2>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">
                <h2>RESUMO </h2>
                ${overview}
            </div>

    `  
       if(!filme){movieElement.innerHTML = `   
        <img src="${IMG_URL+poster_path}">
        
       <div class="movieInfo">
           <h2 class="titleMovie">${name}</h2>
           <span class="${getColor(vote_average)}">${vote_average}</span>
       </div>

       <div class="overview">
           <h2>RESUMO </h2>
           ${overview}
       </div> ` }
    main.appendChild(movieElement);
    })
}

function getColor(vote){
    if(vote>=8){return 'green';}
    else if(vote>=5){return 'orange';}
    else {return 'red';}
}


searchBar.addEventListener('submit',(e) => {
    e.preventDefault();
    const keyword = search.value;
    console.log(SEARCH_URL + '&query=' + keyword);
    if(keyword){
        getMovies(SEARCH_URL + '&query=' + keyword + LANGUAGE);
    } else {
        getMovies(API_POPULAR);
    }
})

watchFilmes.addEventListener('click',(e)=> {
    filme = true;
var country = document.getElementById("selectCountry").value;
    getMovies(API_POPULAR_MOVIES + "&region="+ country);}

)

watchSeries.addEventListener('click',(e)=> {
    var country = document.getElementById("selectCountry").value;
    filme = false;
    getMovies(API_POPULAR_SERIES + "&region="+ country);
    console.log(API_POPULAR_SERIES + "&region="+ country)}
    
    )

    discoverMovies.addEventListener('click',(e)=> {
        var country = document.getElementById("selectCountry").value;
        filme = true;
        getMovies(API_DISCOVER_MOVIES + "&region="+ country);        
    }) 
