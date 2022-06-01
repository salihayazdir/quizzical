import React, { useEffect, useState } from 'react';
import Game from './Components/Game';
import categoriesData from './categoriesData';



export default function App() {
  
  const [gameStarted, setGameStarted] = useState(false)
  const [difficulty, setDifficulty] = useState("")
  const [category, setCategory] = useState(9)
  
  const startGame = () => setGameStarted(!gameStarted)

  const handleDifficulty = (event) => setDifficulty(event.target.value)
  const handleCategory = (event) => setCategory(event.target.value)

  console.log(category)

  const categoriesElements = categoriesData.map((val, i, arr) => {
    return  <option value={val.id} key={val.id}>
              {val.name}
            </option>
  })

  return (
  <>
  {gameStarted
  
  ?
  
  <Game   difficulty={difficulty}
          category={category}
          startGame={startGame}/>
  
  : 

  <div className='flex flex-column gap-16 flex-col mt-20 mx-auto'>
    
    <div>
      <h1 className=' text-center text-[50px] text-textBlue '>Quizzical</h1>
      <h2 className='text-center text-slate-400 mt-2 font-normal'>A simple quiz game.<br/>
      Built with React JS, styled with Tailwind CSS.</h2>
    </div>

    <span className='mb-[-3em] text-center text-lg text-slate-400'>Choose a Category</span>
    <select value={category} onChange={handleCategory} name='category'
      className='mx-auto text-textBlue font-bold text-center text-lg cursor-pointer px-8 py-4 bg-white rounded-full'
      >{categoriesElements}
    </select>

    
    <span className='mt-[-1em] mb-[-2em] relative text-center text-lg text-slate-400'>Choose Difficulty</span>

    <fieldset className='flex mx-auto'>
      <div className='active:translate-y-[-3px]'>
        <input
          className='hidden peer'
          type="radio"
          name="difficulty"
          onChange={handleDifficulty}
          id="difficulty-easy"
          value="easy"
          checked={difficulty === "easy"}
        />
        <label
          className='cursor-pointer px-8 py-4 mx-4 bg-white rounded-full
            text-textBlue text-lg hover:bg-lime-100
            peer-checked:bg-lime-500 peer-checked:text-white'  
          htmlFor="difficulty-easy"
          >Easy
        </label>
      </div>        
        
      <div className='active:translate-y-[-3px]'>
        <input 
          className='hidden peer'
          type="radio"
          name="difficulty"
          onChange={handleDifficulty}
          id="difficulty-medium"
          value="medium"
          checked={difficulty === "medium"}
        />
        <label
          className=' cursor-pointer px-8 py-4 mx-4 bg-white rounded-full
                      text-textBlue text-lg hover:bg-yellow-100
                      peer-checked:bg-yellow-400 peer-checked:text-white' 
          htmlFor="difficulty-medium"
          >Medium
        </label>
      </div>
        
      <div className='active:translate-y-[-3px]'>
        <input
          className='hidden peer'
          type="radio"
          name="difficulty"
          onChange={handleDifficulty}
          id="difficulty-hard"
          value="hard"
          checked={difficulty === "hard"}
        />
        <label 
          className=' cursor-pointer px-8 py-4 mx-4 bg-white rounded-full
            text-textBlue text-lg hover:bg-rose-200
            peer-checked:bg-rose-500 peer-checked:text-white' 
          htmlFor="difficulty-hard"
        >Hard
        </label>
      </div>
    </fieldset>

    {difficulty && (<button 
      onClick={startGame}
      className='text-white font-bold bg-indigo-700 hover:bg-indigo-600
      w-60 text-2xl self-center px-4 py-4
      rounded-full active:translate-y-[-3px]'
      >Start Game
    </button>)}

  </div>
    }
  </>
  )
}