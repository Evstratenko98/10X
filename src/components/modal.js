import React from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import RefreshIcon from '@material-ui/icons/Refresh';

export default function SimpleModal({ open, handleClose, callBackFunction, startWindow, data }) {
	const startGame = () => {
		callBackFunction()
		handleClose()
	}
	return (
		<Modal 
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {startWindow.current ? 
        	<Fade in={open} className="fade">
	        	<div>
	            	<h2>Добро пожаловать в <span className='title'>10X</span></h2>
	            	<p>Решение математических примеров с увеличением сложности</p>
	            	<p>10 секунд на решение</p>
	            	<p>3 варианта ответа</p>
	            	<p>Соревнуйся с друзьями и развивай свое мышление!</p>
	            	<button className="startButton" onClick={startGame}>Начать</button>
	          	</div>
	        </Fade> 
	        : 
	        <Fade in={open} className="fade fadeRe">
		        <div>
		        	<h2>Поздравляем, ваш результат: <span style={{color: 'green'}}>{data.current[0]}</span></h2>
		        	<h2 className="secondText">Продолжайте улучшать показатели!</h2>
		        	{data.current.length > 1 ?
		        		<p>
		        			Последний пример:
		        			<br/>
			        		{data.current[1]} = ?
			        		<br/>
			        		Правильный ответ: <span style={{color: 'green'}}>{data.current[2]}</span>
			        		<br/>
			        		Ваш ответ: <span style={{color: 'red'}}>{data.current[3]}</span>
		        		</p>
		        		:
		        		<p>К сожалению, время на решение задачи вышло</p>
		        	}
	        		<p>Начать заново?</p>
		        	<button className="startButton iconContainer" onClick={startGame}>
		        		<RefreshIcon style={{ fontSize: 35}}/>
		        	</button>
		        </div>
	        </Fade>
	    }
      </Modal>
	)
}