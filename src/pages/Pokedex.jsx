import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PokeCard from '../components/PokeCard'
import Header from '../components/pokedex/Shared/header'
import SelectTypes from '../components/SelectTypes'
import  './styles/pokedex.css'



const Pokedex = () => {

   const {nameTrainer} =useSelector(state=> state)

   const [pokemons, setPokemons] = useState()
   const [selectValue, setSelectValue] = useState('allpokemons')
   const [isLoading, setIsLoading] = useState(false)

   const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleBackClick = () => {
    window.history.back();
  };
  

   useEffect(() => {

    if (selectValue === 'allpokemons') {
      const url = 'https://pokeapi.co/api/v2/pokemon?limit=102&offset=0'
    axios.get(url)
    .then(res => setPokemons(res.data))
    .catch(err => console.log(err))
    }else{
      axios.get(selectValue)
      .then(res =>{
        const results= res.data.pokemon.map(e => e.pokemon)
       setPokemons({results})
      })
      .catch(err => console.log(err))
    }
   }, [selectValue]);


   const navigate= useNavigate()
   
   const handleSubmit= e => {
    e.preventDefault()
    const inputValue= e.target.pokemon.value.trim().toLowerCase()
    navigate(`/pokedex/${inputValue}`)
    e.target.pokemon.value= ''
   }

  return (
    <div className='poke_main-container'>
        <Header/>
        <h1 className='poke_greeting-pokedex'><span className='poke_greeting-span'>Hi {nameTrainer}</span>, here you can find your favourite pokemon.</h1>
          <form  className='poke_container' onSubmit={handleSubmit}>
            <input className='poke_input' placeholder='search a pokemon' id='pokemon' type="text" />
            <button className='pokedex_search'>Search</button>
          </form>
          <SelectTypes setSelectValue= {setSelectValue}/>
            <div className='poke_cards'>
            {
                pokemons?.results.map(pokemon => (
                    <PokeCard
                    key={pokemon.url}
                    pokemon={pokemon}
                    />
                ))
            }
            </div> 
            <footer>
            <button className='return__pokedex-button' onClick={handleBackClick}>Back page</button>
        <button className='scroll__button' onClick={handleScrollToTop}>Go top</button>
        </footer> 
    </div>
  )
}

export default Pokedex