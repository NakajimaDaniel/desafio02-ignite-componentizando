
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

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function Content({selectedGenreIdState}: ContentProps) {


  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreIdState}`).then(response => {
      setMovies(response.data);
    });

  }, [selectedGenreIdState]);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreIdState}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreIdState]);

  return(
    <div className="container">
        <header>
          <span className="category">Categoria: {selectedGenre.title}<span></span></span>
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