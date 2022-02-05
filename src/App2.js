import './App.css';
import React from "react"
import { nanoid } from "nanoid"
import Intro from './components/Intro'
import Question from './components/Question';

function App() {

  const [questions, setQuestions] = React.useState([]);
  const [isOver, setisOver] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {   
    fetch('https://opentdb.com/api.php?amount=5')
        .then(res => res.json())
        .then(data => { 
            setQuestions(getNewQuestions(data.results))
        })
}, [])  

// decode html characters to normal strings
function decodeString(str) {
  const textArea = document.createElement('textArea');
  textArea.innerHTML = str;
  return textArea.value
}

function getNewQuestions(listofQuestions) {
  const newSetOfQuestions = listofQuestions.map(question => {
    return ({
      id: nanoid(),
      question: question.question,
      correctAnswer: question.correct_answer,
      answers: decodeString(settingAnswers(randomizeAnswers([...question.incorrect_answers, question.correct_answer]), question.correct_answer))
    })
  })
  return newSetOfQuestions
}

function settingAnswers(listOfAnswers, correctAnswer) {
  return listOfAnswers.map(answer => {
    return ({
      isHeld: false,
      answer: answer,
      isCorrect: answer === correctAnswer ? true : false,
      id: nanoid(),
      heldCorrect: false,
      heldIncorrect: false,
      checked: false
    })
  })
}

function randomizeAnswers(listOfAnswers) {
  return listOfAnswers.sort(() => Math.random() - 0.5)
}

const questionElements = questions.map(question => (
  <Question
    id={question.id}
    key={question.id}
    question={question.question}
    answers={question.answers}
    // runHold={runHold}
  />
))

return (
        <div className="wrapper">

          <div className="quiz-wrapper">
            {questionElements}
          </div>
          <div className="bottom">
            <p>You scored 5/5!</p>
            <button className="check-answers"
            // onClick={checkAnswers}
            >Check Answers</button>
          </div>
        </div>
      )
    }

export default App;
