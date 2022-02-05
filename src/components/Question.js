import React from 'react'
import { nanoid } from "nanoid"


export default function Question({ question, toggle }) {

    const answerElements = question.options.map(option => {
        return <div className="answer-option" key={nanoid}>
        {option}
        </div>
    })

    return (
        <div className="quiz-wrapper">
            <div className="question" key={nanoid}>
                {question.question}
            </div>

            <div className="answer-options-wrapper">
                {answerElements}
            </div>
            
            <hr className="divider" />
        </div>
    )
}