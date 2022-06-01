import React, { useEffect, useState } from 'react'
import he, { decode } from 'he'
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";


export default function Question(props) {

    let [shuffledChoices, setShuffledChoices] = useState(
        props.choices.sort(() => Math.random() - 0.5))

    useEffect( () => {
        setShuffledChoices(
            props.choices.sort(() => Math.random() - 0.5)) },
            [props.question])

    
    const choicesElements = shuffledChoices.map((choice, i) => {
        
        const isSelected = (choice === props.givenAnswer)
        const isCorrect = (choice === props.correctAnswer)

        const choiceStyle = () => {
            if (isSelected) {
                if (isCorrect) {
                    return "bg-lime-500 text-slate-100"
                } else { return "bg-rose-500 text-slate-100"}
            } else {
                if (isCorrect) {
                    return "text-lime-500 bg-lime-100"
                } else { return "bg-slate-100"}
            }
        }

        return (
            <div key={i} className={`flex flex-wrap ${ !props.disabled && "active:translate-y-[-3px]"}`}>
                <input 
                    type="radio"
                    id={`choice${i}-${props.index}`}
                    name={props.index}
                    onChange={props.handleAnswer}
                    value={choice}
                    disabled={props.disabled}
                    className="hidden peer"
                />
                <label
                    className={`rounded-2xl py-4 px-6 text-lg text-slate-600 overflow-x-auto
                            ${!props.disabled ?
                            "cursor-pointer bg-slate-100 hover:bg-indigo-100 peer-checked:bg-indigo-600 peer-checked:text-white"
                            :   
                            choiceStyle()}
                            `}
                    
                    htmlFor={`choice${i}-${props.index}`}
                    >{(props.disabled && isSelected) && (isCorrect ? 
                    <AiFillCheckCircle size="1.7em" className='inline text-lime-100 mr-2 ml-[-4px]'/> :
                    <AiFillCloseCircle size="1.7em" className='inline text-rose-100 mr-2 ml-[-4px]'/>)}
                    {he.decode(choice)}
                </label>
            </div>
        )
    })

  return (
    <div className='px-8 text-center bg-white py-6 rounded-2xl'>

        <p className='text-textBlue text-xl my-8 px-12'>{he.decode(props.question)}</p>
        
        <fieldset id={props.index}
        className='my-6'>

            <div className='flex flex-wrap justify-center gap-4'
            >{choicesElements}</div>
        
        </fieldset>

    </div>
  )
}
