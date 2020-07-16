import React,{Component} from 'react';
import axios from 'axions';
import BattleShip from './BattleShip';
import './App.css';
import testString from './testString';
import tableComponent from './tableComponent';
import Tablero from './ex web'

const apiUrl = 'https://battleship.iic2513.phobos.cl';
const accessToken = '';


const authAxios = axios.create({
	baseURL: apiUrl,
	headers:{
		Authorization: `Bearer ${accessToken}`,
		Content-Type: 'JSON'
	}
})


function App() {

	let table6 = new Tablero();
	table6.tableReady()
	table6.printMatrix();

	const fetchData = React.useCallback(async()=>{
		try{
			const result = await authAxios.post('/games')
		}
	})
	let testStringApp = testString;

  return (
    <div className="App">
			<h1>{testStringApp}</h1>
			<BattleShip tablero={table6}/>
      
		</div>
  );
}

export default App;
