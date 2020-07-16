import React,{Component, useState} from 'react';
import axios from 'axios';
import BattleShip from './BattleShip';
import './App.css';
import testString from './testString';
import tableComponent from './tableComponent';
import Tablero from './ex web'


//Hardcodeado por mientras. Obtenido con postman
const apiUrl = "https://battleship.iic2513.phobos.cl";
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1yc2NodWRlY2tAdWMuY2wiLCJzdHVkZW50TnVtYmVyIjoiMTY2Mzg1MzAiLCJpYXQiOjE1OTQ5MzEzNTl9.fhMW_NC3V2J-AXWvjcmWKBsYAAhB_IXrrgi6S6sX2Qk'
const email = 'mrschudeck@uc.cl'
const numeroAlumno = '16638530'


function App (){

	const testStringApp = testString;
	let tablero6 = new Tablero();
	tablero6.tableReady();

	const [data, setData] = useState({ 'gameid':''});
	let result;
		
	React.useEffect(() =>{
		const fetchData = async() => {
			result = await fetch("https://battleship.iic2513.phobos.cl/games",{
				method:'POST',
				body:JSON.stringify({}),
				headers:{
					"Authorization": `Bearer ${accessToken}`,
					"Content-Type": "application/json"
				}
			}).then(console.log("awa owo")).then(result=>console.log(result.json()));

		};
		fetchData();
	},[]);

	
	return (
    	<div className="App">
			<h1>{testStringApp}</h1>
			<h1>{result}</h1>
			<h1>holi test</h1>
			<BattleShip tablero = {tablero6}
						accessToken = {accessToken}/>
	      	
		</div>
	);
	
}

export default App;
