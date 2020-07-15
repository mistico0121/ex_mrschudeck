function Player(){
    this.boteF1 = new boatF(1);
    this.boteF2 = new boatF(2);
    this.boteF3 = new boatF(3);
    this.boteF4 = new boatF(4);

    this.boteC1 = new boatC(1);
    this.boteC2 = new boatC(2);
    this.boteC3 = new boatC(3);

    this.boteD1 = new boatD(1);
    this.boteD2 = new boatD(2);

    this.boteP1 = new boatP(1);
    
    this.boatCount = 10;
    // ESTO DETERMINA SI UN USUARIO PIERDE
    
    this.boatIndex = {'F1': 0, 'F2':1, 'F3':2, 'F4':3,'C1':4, 'C2':5, 'C3': 6, 'D1':7, 'D2':8, 'D3':9}
    this.boatList = [this.boteF1, this.boteF2,this.boteF3,this.boteF4, this.boteC1, this.boteC2 ,\
        this.boteC3, this.boteD1, this.boteD2, this.boteP1];
}

function Boat(id){
    this.id = id;//POR EJEMPLO, B, F, ETC
    this.currentPositionX = 0
    this.currentPositionY = 0

    this.moveRange = 0;
    this.shotRange = 0;
    
    //1 = alive, 0 = dead
    this.status = 1;
    
}

function boatF(number){
    Boat.call(this,`F${number}`);
    this.moveRange = 4;
    this.shotRange = 2;
}

function boatC(number){
    Boat.call(this,`C${number}`);
    this.moveRange = 3;
    this.shotRange = 2;
}

function boatD(number){
    Boat.call(this,`D${number}`);
    this.moveRange = 2;
    this.shotRange = 3;
}

function boatP(number){
    Boat.call(this,`P1`);
    this.moveRange = 1;
    this.shotRange = 5;
}

function Celda(x,y){
    this.x = x;
    this.y = y;
    
    this.boatP1 = '0';
    this.boatP2 = '0';

}

function Tablero(){
    
    this.matriz = [["."]];
    this.player1 = new Player();
    this.globalBoatDict = {};
    //this.player2 = new Player();
    
    this.setUpBoat = function(boat, posX, posY){
        boat.currentPositionX = posX;
        boat.currentPositionY = posY;
        this.matriz[posX][posY] = boat.id;
        this.globalBoatDict[boat.id] = boat;
    }
    
    this.setUpBoats = function(){
        let p;
        
        for (p = 0; p<3; p++){
            
            this.setUpBoat(this.player1.boatList[p], p+1, p+1);
        }
    }
    
    this.moveBoat = function(boat, posX, posY){
        console.log(`mover el bote ${boat.id} a posicion (${posX}, ${posY} )`)
        console.log(`El bote ${boat.id} se encuentra actualmente en (${boat.currentPositionX}, ${boat.currentPositionY} )`)

        
        
        let valid = 0;
        let movePos = this.matriz[posX][posY];
        if (posX == boat.currentPositionX && posY !=boat.currentPositionY){
            let dif = Math.abs(boat.currentPositionY - posY);
            
            if (dif > boat.moveRange){
                valid = 0;
            } else {
                valid = 1;
            }
        } else if (posY ==boat.currentPositionY && posX !=boat.currentPositionX){
            let dif = Math.abs(boat.currentPositionX - posX);
            
            if (dif > boat.moveRange){
                valid = 0;
            } else {
                valid = 1;
            }
        } else if (posY == boat.currentPositionY && posX == boat.currentPositionX){
            valid = 0
        }
        if (valid){
            if (movePos == 0){
                this.matriz[boat.currentPositionX][boat.currentPositionY] = 0;
        
                boat.currentPositionX = posX;
                boat.currentPositionY = posY;
                this.matriz[posX][posY] = boat.id;

            } else {
                console.log("casilla ocupada");
            }
        } else {
            console.log("movimiento no valido :(")
        }
        
    
    }
    
    this.shootArrow = function(boat, posX, posY){
        console.log(`el bote ${boat.id} que se encuenta en  posicion (${boat.currentPositionX}, ${String.fromCharCode(64+boat.currentPositionY)} )`);
        console.log(`Intenta disparar a posición (${posX}, ${String.fromCharCode(64+posY)})`);
        let valid = 0;
        let shotPos = this.matriz[posX][posY];
        if (posX == boat.currentPositionX && posY !=boat.currentPositionY){
            let dif = Math.abs(boat.currentPositionY - posY);
            
            if (dif > boat.shotRange){
                valid = 0;
            } else {
                valid = 1;
            }
        } else if (posY ==boat.currentPositionY && posX !=boat.currentPositionX){
            let dif = Math.abs(boat.currentPositionX - posX);
            
            if (dif > boat.shotRange){
                valid = 0;
            } else {
                valid = 1;
            }
        } else if (posY == boat.currentPositionY && posX == boat.currentPositionX){
            valid = 0
        }
        if (valid){
            if (shotPos != 0){
                console.log("LE HAS DISPARADO A UN BOTE ENEMIGO :o");
                let shotId = this.globalBoatDict[shotPos].id;
                let shotBoatIndex = this.player1.boatIndex[shotId];
                console.log(`el bote era ${shotId}`);
                this.globalBoatDict[shotPos].status = 0;
                console.log(`el status del bote enemigo es ${this.player1.boatList[shotBoatIndex].status}`);

                this.matriz[posX][posY] = 'Z';
                this.player1.boatCount--;

            } else {
                console.log("haz fallado tu disparo :(");
            }
        } else {
            console.log("disparo no valido :(")
        }
        
    }
    
    this.printMatrix = function() {
        let n;
        for (n = 0; n<10; n++){
            console.log(`${this.matriz[n]}`);
        }
    };
    
    this.tableReady = function(){
        console.log("acá");
        var i;
        var s = "";
        var k;
        for (k = 0; k<10; k++){
            this.matriz[0].push(String.fromCharCode(65+k));
        }

        for (i = 0; i<10; i++){
            let row = [i+1]

            let j;
            for (j = 0; j<10; j++){
                //var c = new Celda(i,j);
                row.push((0));
                //console.log(c.x);

            }

            this.matriz.push(row);

        }
        console.log("allá");
    };
    
    
       
}
//let
//table6 = new Tablero();

//table4.matriz[1][1].boatP1 = b;
//table6.tableReady();
//table6.setUpBoats();
export default Tablero;
