import React,{Component, useState} from 'react';
import axios from 'axios';
import BattleShip from './BattleShip';
import './App.css';
import testString from './testString';
import tableComponent from './tableComponent';
import Tablero from './ex web'


//Hardcodeado por mientras. Obtenido con postman
const apiUrl = 'https://battleship.iic2513.phobos.cl';
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1yc2NodWRlY2tAdWMuY2wiLCJzdHVkZW50TnVtYmVyIjoiMTY2Mzg1MzAiLCJpYXQiOjE1OTQ5MTk2Mjd9.5w7ynhq3sF1xZMwrF3iqKDmD0pQRZrokvPLpDC-CD04";
const email = 'mrschudeck@uc.cl'
const numeroAlumno = '16638530'


const authAxios = axios.create({
	baseURL: apiUrl,
	headers:{
		'Content-Type': 'application/json'
	},
	body:{
	    "email": {email},
	    "studentNumber": {numeroAlumno}
	}

})

async function postToApi(baseURL, mode, data){
	return (await fetch(`${apiUrl}${mode}`),{
		method:'post',
		headers:{
			'Authorization': `Bearer ${accessToken}`,
			'Content-Type': 'application/json'
		},
		body: data
	});
}


function App() {

	const [requestError, setRequestError] = useState();


	let table6 = new Tablero();
	table6.tableReady()

	let testStringApp = testString;

	const fetchData = React.useCallback(async()=>{
		try{
			console.log('estoy acá owo')

			const result = await authAxios.put('/auth');
			testStringApp = result;
		} catch (err){
			console.log('o quizas estoy aca')

			setRequestError(err.message);

			testStringApp = err.message;
		}
	});

  return (
    <div className="App">
			<h1>{testStringApp}</h1>
			<h1>holi {requestError}</h1>
			<BattleShip tablero={table6}/>
      
		</div>
  );
}

export default App;
