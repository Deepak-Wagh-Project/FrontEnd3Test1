//const apiKey=`fedb3ccb`;
const baseUrl=`https://www.omdbapi.com/`
const movieContainer=document.getElementById("movieContainer");
const apiKeyBox = document.getElementById("apiKey-Search-Box")
const movieSearchBox=document.getElementById("movie-Name-Search-Box");
const loader=document.createElement('div')
loader.className="loader";

 async function searchMovie(){
    movieContainer.append(loader);
    
  const apiKey=apiKeyBox.value.trim();
  const movieName=movieSearchBox.value.trim()

    const url=`https://www.omdbapi.com/?s=${movieName}&apikey=${apiKey}`
    const response= await fetch(url,{method:"GET"});
    const movieList=await response.json();
    const actualMovieList=movieList.Search
   // console.log(actualMovieList);
   movieContainer.innerHTML=``;
   console.log(actualMovieList);
    for(let i=0;i<actualMovieList.length;i++){
     
        addMovieName(actualMovieList[i]);
    }
 }
 function addMovieName(movie){
    console.log(movie);
    let image=movie.Poster;
    if(image==="N/A"){
        image="NoImage.png"
    }
    movieContainer.innerHTML+=`<div class="movie-details"> 
    <div class="img-container"><img src="${image}" alt="logo"></div>
    <div class="details-container"> <div class="movie-title">${movie.Title}</div>
    <div class="movie-release-year">
       ${movie.Year}
    </div>
   <a href="https://www.imdb.com/title/${movie.imdbID}/" target="_blank"> <div class="more-details">More details</div>
   <div class="arrow"><span class="material-symbols-outlined">
                open_in_new
                </span></div></a></div>
</div>
</div>`
    
    
 }

// searchMovie("-Holmes");