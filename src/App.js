import './App.css';
import { useState, useEffect } from 'react';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';

const api_url = 'http://www.omdbapi.com?apikey=b7bcc4d7'



function App() {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const searchMovies = async (title) => {
    const response = await fetch(`${api_url}&s=${title}`)
    const data = await response.json()
    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies('Spiderman')
  }, [])

  return (
    <div className="App">
      <h1>Movie Poster</h1>

      <div className='search'>
        <input placeholder='Search for movies or TV shows' value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value)}} />
        <img src={SearchIcon} alt='Search' onClick={() => {searchMovies(searchTerm)}} />
      </div>


      {
        movies?.length>0     
        ? ( <div className='container'>
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
           </div>)
        : ( <div className='empty'>
              <h2>NO movies found</h2>
            </div>)
      }

    </div>
  );
}

export default App;
