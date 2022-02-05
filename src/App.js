import './App.css';
import React from "react"
import { nanoid } from "nanoid"
import Intro from './components/Intro'
import Question from './components/Question';

function App() {

  const [questions, setQuestions] = React.useState([]);
  const [isOver, setisOver] = React.useState(false);
  const [score, setScore] = React.useState(0)

  React.useEffect(() => {   
    fetch('https://opentdb.com/api.php?amount=1')
        .then(res => res.json())
        .then(data => { 
          setQuestions(data.results.map(questionItem => {
            const answer = decodeString(questionItem.correct_answer)
            const options = [
              ...questionItem.incorrect_answers.map(incorrectAnswer => decodeString(incorrectAnswer)),
              answer
            ]
            const randomSort = options.sort(() => Math.random() - 0.5)

            return {      
              id: nanoid(),
              question: decodeString(questionItem.question),
              answer: answer,
              options: randomSort,
              isHeld: false
            }
          }))

    })      
}, [])  


//decode html characters to normal strings
function decodeString(str) {
  const textArea = document.createElement('textArea');
  textArea.innerHTML = str;
  return textArea.value
}

function selectAnswer(id) {
  setQuestions(oldQuestions => oldQuestions.map(question => {
    return question.id === id ? 
      {...question, isHeld: !question.isHeld} :
      question
  }))
}

const questionElements = questions.map(question => (
  <Question
  question={question} 
  key={nanoid()}
  selectAnswer={() => selectAnswer(question.id)}
  />
))

return (
        <div className="wrapper">

          <div className="quiz-wrapper">
            {questionElements}
          </div>
          <div className="bottom">
            <p>You scored {score}/5!</p>
            <button className="check-answers"
            // onClick={checkAnswers}
            >Check Answers</button>
          </div>
        </div>
      )
    }

export default App;
