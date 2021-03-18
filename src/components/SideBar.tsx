import { useEffect, useState } from "react";
import { api } from '../services/api';
import '../styles/sidebar.scss';
import { Button } from './Button';


interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}


interface SideBarProps {
  selectedGenreIdState: number;
  handleClick(id: number): void;
}

export function SideBar({selectedGenreIdState, handleClick}: SideBarProps) {

 

  
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);
 

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreIdState}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreIdState]);


  
  return(
    <div style={{ display: 'flex', flexDirection: 'row' }}>
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            id={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={()=> handleClick(genre.id)}
            selected={selectedGenreIdState === genre.id}
          />
        ))}
      </div>

    </nav>
    </div>
  );
}