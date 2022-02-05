import React from 'react'
import { nanoid } from "nanoid"


export default function Question({ question, selectAnswer, isHeld }) {

    const answerElements = question.options.map(option => {
        return <div className="answer-option" key={nanoid}>
        {option}
        </div>
    })

    const styles = {
        backgroundColor: isHeld ? "#59E391" : ""
    }

    return (
        <div className="quiz-wrapper">
            <div className="question" key={nanoid}>
                {question.question}
            </div>

            <div className="answer-options-wrapper"
                onClick={selectAnswer}
                style={styles}
                >
                {answerElements}
            </div>
            
            <hr className="divider" />
        </div>
    )
}