import React from 'react'

const GameButtons = ({ values, callBackFunction }) => {
	return (
		<div className="gameButtons">
			{values.map((key, index) => 
				<button className="answerButton" onClick={callBackFunction} key={index} value={key}>{key}</button>
			)}
      	</div>
)}

export default GameButtons