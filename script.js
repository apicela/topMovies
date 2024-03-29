const API_KEY = "api_key=4afe9ae58f077a64af133da919425eca";
const BASE_URL = "https://api.themoviedb.org/3/";
const LANGUAGE = "&language=pt-BR";
var page = 1;
const API_POPULAR_MOVIES = BASE_URL +  'movie/popular?&' + API_KEY + LANGUAGE  + "&vote_count.gte=70";
const API_POPULAR_SERIES = BASE_URL  + 'tv/popular?&' + API_KEY + LANGUAGE + "&vote_count.gte=70";
const API_DISCOVER_MOVIES = BASE_URL + "discover/movie?"+ API_KEY+ LANGUAGE+"&sort_by=release_date.desc" + "&vote_count.gte=100"; 
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchBar = document.getElementById('form');
const search = document.getElementById('pesquisa');
const SEARCH_URL = BASE_URL + 'search/multi?' + API_KEY; 
const GENRE_MOVIES = BASE_URL + "genre/movie/"+"list?"+ API_KEY + LANGUAGE;
const GENRE_TV = BASE_URL + "genre/tv/"+"list?"+ API_KEY + LANGUAGE;
const main = document.getElementById('main');
const watchFilmes = document.getElementById('filmes');
const watchSeries = document.getElementById('series');
const discoverMovies = document.getElementById('releases');
const genreSelector = document.getElementById('genreSelector');
const filter = document.getElementById('filter');
var type="movie/";


getMovies(API_POPULAR_MOVIES);
getList(GENRE_MOVIES);

function getAPI(){
    var country = document.getElementById("selectCountry").value;
    if(country.length==0){
        country="br";
    }
    var orderBy = document.getElementById("orderBy").value;
    var provider = document.getElementById("provider").value;
    if(provider!=""){
        country="US";
    }
    var genre = document.getElementById("genreSelector").value;
    var type = typeWatch();
    return BASE_URL + type+ orderBy+ API_KEY + LANGUAGE + "&page=1" +  
     "&vote_count.gte=100" + "&with_genres="+ genre + provider
     +"&watch_region=" + country + "&page=" + page;  

}

var countryBox = document.getElementById("selectCountry")
.onchange = () => {
    page =1;
    getMovies(getAPI());
}

var orderByBox = document.getElementById("orderBy")
.onchange = () => {
    page =1;
    getMovies(getAPI());
 }

 var orderByBox = document.getElementById("provider")
 .onchange = () => { 
    page =1;
     getMovies(getAPI());
  }

  var orderByBox = document.getElementById("genreSelector")
.onchange = () => {
    page =1;
    getMovies(getAPI());
 }

function typeWatch(){
    return type;
}

function getMovies(url){ 
    main.innerHTML = "";
    fetch(url).then(res => res.json()).then(data => 
        {   console.log(data.results);
            showMovies(data.results); } )
}

function getList(url){
    fetch(url).then(res => res.json()).then(data =>
        { genreList(data.genres);})
}

function genreList(data){
    type = typeWatch();
    genreSelector.innerHTML = `
     <option value="" selected>Gênero</option>
     <option value="" >Todos</option>   `
    data.forEach(genre => {
        const{name,id} = genre;
        const divGenre =  document.createElement('option');
        divGenre.value=id;
        divGenre.innerHTML = `
        ${name}
        `
        genreSelector.appendChild(divGenre);
    })
}

function showMovies(data){
    data.forEach(movie => 
    { 
        const{title,name,poster_path,vote_average,overview} = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML =  `
        <img src="${IMG_URL+poster_path}">
            
                <div class="movieInfo">
                    <h2 class="titleMovie">${title||name}</h2>
                    <span class="${getColor(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h2>RESUMO </h2>
                    ${overview}
                </div>
        `  
        main.appendChild(movieElement);
    })
}

function detectarFimDoScroll() {
    function onScroll() {
       if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
          // chegou ao fim do scroll
        page++;  
        getMovies(getAPI());  
        console.log(page)
       }
    }
    window.addEventListener('scroll', onScroll);
 }
window.addEventListener('load', detectarFimDoScroll);


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
        getMovies(getAPI());
    }
})


watchFilmes.addEventListener('click',(e)=> {
    main.innerHTML = "";
    type = 'movie/';
    getList(GENRE_MOVIES);
    filter.classList.remove("noFilter");

    watchFilmes.classList.add("dourado");
    discoverMovies.classList.remove("dourado");
    watchSeries.classList.remove("dourado");
    getMovies(getAPI());}

)

watchSeries.addEventListener('click',(e)=> {
    main.innerHTML = "";
    getList(GENRE_TV);
      filter.classList.remove("noFilter");
    type = 'tv/';
    watchSeries.classList.add("dourado");
    discoverMovies.classList.remove("dourado");
    watchFilmes.classList.remove("dourado");
    getMovies(getAPI());
    console.log(API_POPULAR_SERIES + "&region="+ country)}
    
    )

    discoverMovies.addEventListener('click',(e)=> {
        main.innerHTML = "";
        filter.classList.add("noFilter");
        discoverMovies.classList.add("dourado");
        watchFilmes.classList.remove("dourado");
        watchSeries.classList.remove("dourado");
        getMovies(getAPI());        
    }) 