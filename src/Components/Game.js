import React, { useEffect, useState } from 'react'
import Question from './Question'


export default function Game(props) {

    const [questionsData, setQuestionsData] = useState([])
    const [quizEnded, setQuizEnded] = useState(false)

    useEffect(function() {
        fetch(
`https://opentdb.com/api.php?amount=10&category=${props.category}&difficulty=${props.difficulty}&type=multiple`)
// https://opentdb.com/api_config.php
            .then(res => res.json())
            .then(data => setQuestionsData(data.results))
    }, [])

    let handleAnswer = (event) => {
        setQuestionsData(prevQuestions => {
            return  prevQuestions.map((val, index, arr) => {
                return {
                ...val,
                givenAnswer:index == event.target.name ? event.target.value : val.givenAnswer
                }
            })

        })
    }

    const endQuiz = () => setQuizEnded(true)

    const resultsCheck = questionsData.map((val, index, arr) => {
        return val.correct_answer === val.givenAnswer && true })
    const correctAnswers = resultsCheck.filter(result => result)    

    const questionElements = questionsData.map((x, index) => {
        const choicesArr = x.incorrect_answers.concat(x.correct_answer)
        return <Question    question={x.question}
                            choices={choicesArr}
                            handleAnswer={handleAnswer}
                            index={index}
                            key={index}
                            givenAnswer={x.givenAnswer}
                            correctAnswer={x.correct_answer}
                            disabled={quizEnded}
                           />
    })


    return (
    <div className='flex flex-col p-10 gap-16'>

        <h1 className=' text-center text-4xl text-textBlue mt-10'>Questions</h1>

        <div className='flex flex-col gap-10'>
            {questionElements}
        </div>

        {quizEnded ? 
         <>   
            <div className='text-center text-xl bg-indigo-100 rounded-2xl py-10'>
                {`You scored ${correctAnswers.length}/10 correct answers.`}
            </div>
            <button
                className='text-white font-bold bg-indigo-700 hover:bg-indigo-600
                text-3xl self-center px-4 py-8 mb-20 w-full
                rounded-2xl active:translate-y-[-3px]'
                onClick={props.startGame}
            >Play Again</button>
        </> :      
            <button
                className='text-white font-bold bg-orange-500 hover:bg-orange-600
                    text-3xl self-center px-4 py-8 mb-20 w-full
                    rounded-2xl active:translate-y-[-3px]'
                onClick={endQuiz}
            >Check Answers</button>}
    </div>
  )
}
