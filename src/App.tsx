import { useEffect, useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';



export function App() {

  const [selectedGenreIdProp, setSelectedGenreIdProp] = useState(1);

  function handleClickButton(id: number) {
    setSelectedGenreIdProp(id);
    console.log(selectedGenreIdProp)
  }


  return (
    <div>
      <SideBar selectedGenreIdState={selectedGenreIdProp} handleClick={handleClickButton}/>
      <Content selectedGenreIdState={selectedGenreIdProp}/>
    </div>


 
  )
}