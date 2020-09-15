import React, {useState, useEffect, useRef } from 'react'
import './App.scss'

import GameButtons from './components/gameButtons'
import ProgressBar from './components/progressBar'
import SimpleModal from './components/modal'

import _ from 'lodash'

const randomInteger = (min, max) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    return Math.round(rand)
}
const data = (length) => {
	const signsArr = ['+', '-']
	const firstArr = new Array(length).fill('').map( ( _ , i ) => {
		if((i+1)%2 === 0) return signsArr[randomInteger(0,1)]
		else return randoInteger(1,9)
	})
    const task = _.join(firstArr, ' ')
    return task
}

function App() {
	// Game State
	const [startGame, setStartGame] = useState(false)
	const [counter, setCounter] = useState(0) 
	const [task, setTask] = useState('')
	const [answer, setAnswer] = useState('')
	const [answerArr, setAnswerArr] = useState([])
	const [perem, setPerem] = useState(3)
	// ProgressBar State
	const [completed, setCompleted] = useState(0);
	// Final Data
	const finalData = useRef([])
    // Modal
    const [open, setOpen] = useState(true)
    const startWindow = useRef(true)
	const handleOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}
	// End Game
    const endGame = () => {
    	clear()
		setCounter(0)
		setTask('')
		setAnswer('')
		setStartGame(false)
		setAnswerArr([])
		setPerem(3)
		startWindow.current = false
		handleOpen()
    }
    // Timer
	const timer = useRef(null)
	const clear = () => clearInterval(timer.current)

    useEffect(() => {
    	if(startGame) {
    		if (counter !== 0 && counter%5 === 0) setPerem(prev => prev+2)
    		setTask(data(perem))
    	
			let timeStartRound = Date.now()
	    			
			timer.current = setInterval(() => {
				let timer = Date.now()
				let subtraction = timer - timeStartRound
				if (subtraction >= 10000) {
					finalData.current = [counter]
					endGame()
				}
				setCompleted(() => subtraction/100)
			}, 10)
		
			// 
    	}
    }, [counter, startGame])

    useEffect(() => {
    	if(task) {
    		setAnswer(eval(task))
    	}
    }, [task])

    useEffect(() => {
    	let arr = new Array(3).fill('').map(i => answer + randomInteger(-10,10))
    	arr[randomInteger(0,2)] = answer 
    	setAnswerArr(arr)
    }, [answer])

    const userAnswer = (e) => {
    	let userValue = Number(e.target.value)
    	if(userValue === answer) {
    		clear()
    		setCompleted(0)
	    	setCounter(prev => prev + 1)
    	}
    	else {
    		finalData.current = [ counter, task, answer, userValue ]
    		endGame()
    	}
    }

    // onKeyPress


    return (
        <div className="App">
            <div className="mobileContent">
	            <h2>Ваш счет: {counter}</h2>
	            {task ? <h2>{task} = ?</h2> : <h2>x + y = ?</h2>}
	            <ProgressBar completed={completed} />
	            {task && <GameButtons 
	            			 values = {answerArr}
	                         callBackFunction = {userAnswer}                        
	            />}
	            <SimpleModal handleClose={handleClose} 
	            			 open={open} 
	            			 data={finalData}
	            			 callBackFunction={() => setStartGame(true)}
	            			 startWindow={startWindow}
			 	/>
		 	</div>
        </div>
  )
}

export default App