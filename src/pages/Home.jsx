import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNameTrainer } from '../store/slices/trainerName.slice'


const Home = () => {

   const dispatch= useDispatch()

    const navigate= useNavigate()

    const handleSubmit= e => {
        e.preventDefault()
       dispatch (setNameTrainer( e.target.name.value.trim()))
       e.target.name.value= ''
       navigate('/pokedex')
    }
       

  return (
    <div>
        <h1>Pokedex</h1>
        <h2>Hi trainer</h2>
        <p>To start this pokedex, give me your name</p>
        <form onSubmit={handleSubmit}>
            <input id='name' type="text" />
            <button>Start</button>
        </form>
    </div>
  )
}

export default Home