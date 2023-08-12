//if you dont have apikey use this one - "fedb3ccb"
const baseUrl=`https://www.omdbapi.com/`
const movieContainer=document.getElementById("movieContainer");
const apiKeyBox = document.getElementById("apiKey-Search-Box")
const movieSearchBox=document.getElementById("movie-Name-Search-Box");
const loader=document.createElement('div');
const noResults=document.createElement('div');
 noResults.className="noResults";
noResults.innerText="No results found"
loader.className="loader";
let apiKeyError=document.createElement("div");
apiKeyError.className="api-Key-Error";
apiKeyError.innerText="*Please enter valid api key";
const apiContainer=document.getElementById("apiContainer");


 async function searchMovie(){
    movieContainer.innerHTML=``;
    movieContainer.append(loader);
    
  const apiKey=apiKeyBox.value.trim();
  const movieName=movieSearchBox.value.trim()

    const url=`https://www.omdbapi.com/?s=${movieName}&apikey=${apiKey}`
    const response= await fetch(url,{method:"GET"});
   
    if(response.status>=400){
       
        apiContainer.append(apiKeyError);
        apiKeyBox.value='';
        loader.remove();
        return;
    }
    const movieList=await response.json();
    
    const actualMovieList=movieList.Search
    if(actualMovieList===undefined){
      
        movieSearchBox.value='';
        loader.remove();
        movieContainer.append(noResults);
        return;
    }
  
   movieContainer.innerHTML=``;

    for(let i=0;i<actualMovieList.length;i++){
     
        addMovieName(actualMovieList[i]);
    }
 }
 function addMovieName(movie){
   
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
 apiKeyBox.addEventListener("click",()=>{
  apiKeyError.remove();
 })


