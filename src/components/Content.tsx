
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { MovieCard } from './MovieCard';
import '../styles/content.scss';

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentProps {
  selectedGenreIdState: number;
}


export function Content({selectedGenreIdState}: ContentProps) {


  const [movies, setMovies] = useState<MovieProps[]>([]);
  

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreIdState}`).then(response => {
      setMovies(response.data);
    });

  }, [selectedGenreIdState]);


  return(
    <div className="container">
        <header>
          <span className="category">Categoria:<span></span></span>
        </header>

        <main>
          <div className="movies-list">
            {movies.map(movie => (
              <MovieCard title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
            ))}
          </div>
        </main>
      </div>
  );
}