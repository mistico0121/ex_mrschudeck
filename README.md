This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## EXAMEN IIC2513

Para ejecutar el proyecto, debe usar:

### `yarn install`

y luego:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Modelación

Decidí hacer la app en React, pues me permitía manejar facilmente todos los elementos y guardar estados, así como devolver cosas desde los componentes hijos a sus padres.

La lógica del tablero se encuentra en el archivo 'ex web.js', en el cual se va actualizando una matriz que es atributo de la clase tablero, y esta matriz representa al tablero en sí. A través de la clase tablero, se pueden llamar a todas las funciones relevantes para el funcionamiento del programa, como setear un bote a una posición, mover un bote desde y hacia una posición válida, disparar a una casilla, o indicar que se ha disparado a una casilla de nuestra matriz. Las funciones retornan `true` o `false`, indicando si hubo un cambio en la matriz al momento de introducir una jugada, y esto indica al componente react si debe re-renderear o no. El carácter usado para una posición vacía es '0', mientras que para el de una posición con un bote destruído es 'Z'. El de un bote cualquiera es su boat.ID, mientras que el de la fila y columna del tablero son un carácter de la A-J, o 1-10. Cada tipo de barco está modelado de manera que heredan de un prototipo Boat, y así defino valores como los límites para moverse o disparar.

React actualiza y renderea el tablero que obtiene desde `ex web.js` constantemente. El componente BattleShip, encontrado en Battleship.js, es el componente stateful principal del front-end. El tablero lo recibe de App, y todo el resto del estado, así como las funciones más relevantes, se encuentran en este componente.

También tengo otros 2 componentes React, `TableComponent`, que se encarga de iterar y renderear las celdas, y representa el tablero en sí, y `CellMatrix`, que representa a 1 celda de la matríz, y se encuentra enlazada a la función que le corresponde del tablero. Si retornan true, `CellMatrix` se encarga de avisarle a `Battleship` que setee el estado de nuevo, actualizando de acuerdo a los nuevos valores que se encuentran en tablero.matriz.

## Instrucciones de Uso

### Setear los botes en la grilla.

Para setear los botes en la matriz del tablero, debe hacerle click a uno de los íconos. Los botes representan los barcos tipo F, C, D, y P en orden. Una vez toma uno de los botes, este sale de la lista de imágenes y queda guardado, y para insertarlo solo debe hacer click en el tablero.

Una vez están todos los botes seteados, podrá empezar el juego al presionar el botón que aparecerá.

### Movimiento y Disparos

El programa setea una variable en el state llamada `currentBoat`, y también una variable llamada `currentMove`, que representan la acción a tomar.  Se puede des-seleccionar el movimiento o el bote seleccionado con los botones correspondientes. Una vez que ambas están seleccionadas, al clickear una casilla válida, se procederá a realizar la acción 

Si un barco llegase a morir, aparecerá una casilla con la letra Z, en la cual no se podrá mover dentro de la casilla, pero sí disparar y pasar "por arriba".

### Log
A medida que se desarrolla el juego, el usuario podrá ver como le está yendo gracias al log, el cual crece infinitamente, y registra todos los movimientos del usuario y del computador, así como también los eventos relevantes, como la destrucción de naves.

El log crece infinitamente, y gracias a éste, el usuario puede deducir donde se encuentran las naves del computador enemigo.

### Conexión con API.

La aplicación renderea antes de que se realize la promesa, la cual comienza a realizarse cuando se renderea el componente `Battleship`. Una vez realizada, quedan seteados tanto el token JWS como el gameID al state de la app, los cuales se usarán para acceder a, y autenticar con la API.

El juego es capaz de reconocer los mensajes que le llegan desde la API, y va llevando contadores relevantes en el state, así como muestra en el log lo que ocurre.

Dejé mi nombre y número de alumno "hardodeados" en una variable de `Battleship.js`, para así comprobar que se hace el fetch de la autenticación, y luego la posterior obtención del gameID por medio de promesas.

Cuando se reinicia y se crea un nuevo juego, se obtiene un nuevo gameID, pero no un token JWS, pues ese lo dejo guardado en el state y se lo paso al siguiente estado cuando hago un nuevo juego. Solo se obtiene un nuevo JWT cuando se recarga la página, y se debe renderear `Battleship` por primera vez de nuevo.

### Ganador y perdedor
Una vez le llega al usuario un mensaje indicandole que ha destruído todas las naves, se actualizará la página, se dejaŕá de ver el tablero, y mostrará una pantalla de victoria. Lo mismo si el usuario llegase a perder, o a rendirse.




