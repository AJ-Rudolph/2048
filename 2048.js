window.onload=function() {
    
    let canvas = document.getElementById("2048");
    let g = canvas.getContext("2d");

    window.addEventListener("keydown", function(event) {
           
        switch(event.keyCode) {
            //left arrow
            case 37: {
                board.mergeLeft();
                board.spawnTile();
                break;
            }
            //up arrow
            case 38: {
                board.mergeUp();
                board.spawnTile();
                break;
            }
            //right arrow
            case 39: {
                board.mergeRight();
                board.spawnTile();
                break;
            }
            //down arrow
            case 40: {
                board.mergeDown();
                board.spawnTile();
                break;
            }
        }
    });

    class Tile {

        constructor(value) {
            this.color = '#EEE3DA';
            this.value = value || 2;
            this.moved = false;
        }

        doubleValue() {
            this.value *= 2;
        }

        render(x,y) {
            //update coordinates to proper location
            x = 15+x*115;
            y = 15+y*115;

            g.beginPath();

            g.fillStyle =this.color;
            g.fillRect(x,y,100,100);

            g.font = '50px Arial';
            g.fillStyle = "black";
            g.fillText(""+ this.value,x+35,y+68);

            g.closePath();
        }
    }

    class Board {
        
        constructor(){
            
            this.width = 4;
            this.height = 4;
            this.board = [
                [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null],
                [null, null, null, null]
            ];
            //spawn first two tiles
            this.spawnTile(1);
            this.spawnTile(1);
        }
        spawnTile(val) {
            //generate random tile value
            let max = 2;
            let min = 1;
            let ranVal = val || Math.floor(Math.random() * (max-min) + min); 
            let ranTile = new Tile(ranVal*2);

            //generate random position
            let gridMin = 0;
            let gridMax = this.board.length;
            while(true) {
                let ranX = Math.floor(Math.random() * (gridMax - gridMin) + gridMin);
                let ranY = Math.floor(Math.random() *  (gridMax-gridMin) + gridMin);      
                
                if(this.board[ranX][ranY] == null) {
                    this.board [ranX][ranY] = ranTile;
                    break;
                }
            
            }
        }
        

        mergeRight() {
            for (let x=0; x<this.board.length; x++) {
                let merge = 3;
                let tail = 0;
                while (tail < merge) {

                    // if the two values looking to be merged are both numbers
                    if (this.board[x][merge] !== null && this.board[x][merge-1] !== null) {

                        // if the numbers are equal
                        if (this.board[x][merge].value === this.board[x][merge-1].value) {
                            this.board[x][merge].doubleValue();
                            this.board[x][merge-1] = null;
                        }

                        merge -= 1;
                        continue;
                    }

                    // move everything over to right up until the value just merged
                    for (let i = (this.board[x][merge] !== null) ? merge-1 : merge; i>tail; i--) {
                        this.board[x][i] = this.board[x][i-1];
                    }
                    this.board[x][tail] = null;
                    tail += 1;
                }
            }
        }

        mergeLeft() {
            for(let x=0; x<this.board.length; x++) {
                let merge = 0;
                let tail = 3;
                while(merge < tail) {

                    // if the two values looking to be merged are both numbers
                    if (this.board[x][merge] !== null && this.board[x][merge+1] != null) {

                        // if the numbers are equal
                        if(this.board[x][merge].value === this.board[x][merge+1].value) {
                            this.board[x][merge].doubleValue();
                            this.board[x][merge+1] = null;
                        }

                        merge += 1;
                        continue;
                    }

                    // move everything over to left up until the value just merged
                    for (let i = (this.board[x][merge] != null) ? merge+1: merge; i<tail; i++) {
                        this.board[x][i] = this.board[x][i+1];
                    }
                    this.board[x][tail] = null;
                    tail -= 1;
                }
            }
        }

        mergeUp() {
            for(let x=0; x<this.board.length; x++) {
                let merge = 0;
                let tail = 3;
                while(merge < tail) {

                    // if the two values looking to be merged are both numbers
                    if (this.board[merge][x] !== null && this.board[merge+1][x] !== null) {

                        // if the numbers are equal
                        if(this.board[merge][x].value === this.board[merge+1][x].value) {
                            this.board[merge][x].doubleValue();
                            this.board[merge+1][x] = null;
                        }

                        merge += 1;
                        continue;
                    }

                    // move everything over to left up until the value just merged
                    for (let i = (this.board[merge][x] != null) ? merge+1: merge; i<tail; i++) {
                        this.board[i][x] = this.board[i+1][x];
                    }
                    this.board[tail][x] = null;
                    tail -= 1;
                }
            }
        }

        mergeDown() {
            for(let x=0; x<this.board.length; x++) {
                let merge = 3;
                let tail = 0;
                while(tail < merge) {

                    // if the two values looking to be merged are both numbers
                    if (this.board[merge][x] !== null && this.board[merge-1][x] != null) {

                        // if the numbers are equal
                        if(this.board[merge][x].value === this.board[merge-1][x].value) {
                            this.board[merge][x].doubleValue();
                            this.board[merge-1][x] = null;
                        }

                        merge -= 1;
                        continue;
                    }

                    // move everything over to left up until the value just merged
                    for (let i = (this.board[merge][x] != null) ? merge-1: merge; i>tail; i--) {
                        this.board[i][x] = this.board[i-1][x];
                    }
                    this.board[tail][x] = null;
                    tail += 1;
                }
            }
        }


        print() {
            let rows = [];

            for (let i=0; i<this.board.length; i++) {
                let rowStr = "";

                for (let j=0; j<this.board[i].length; j++) {
                    if (this.board[i][j] !== null)
                        rowStr += "[" + ""+this.board[i][j].value + "]";
                    else 
                        rowStr += "[ ]";
                }

                rows.push(rowStr);
            }

            const label = 'board';
            console.group(label);
            rows.forEach(function(row) { console.log(row); });
            console.groupEnd(label);
        }

        render() {
            g.beginPath(); //start drawing
            //draw buffer rectangles
            g.fillStyle = "#BCAD9F";
            for (let i=0; i<=5;i++){
                g.fillRect(i*115,0,15,canvas.height);
            }
            for (let i=0; i<=5;i++){
                g.fillRect(0,i*115,canvas.width,15);
            }

            //draw tiles
            for (let i=0; i<this.board.length;i++) {
                for (let j=0; j<this.board[i].length; j++) {
                    let tile = this.board[i][j];
                    if (tile == null) 
                        continue;
                    else 
                        tile.render(j, i);
                }
            }
            g.closePath(); //stop drawing
        }
    }


    let board = new Board();
    
    function render() {
        //clerar the window buffer
        g.clearRect(0,0, canvas.width, canvas.height)
        
        //update the frame
        //draw the next frame
        board.render();

        //loop
        setInterval(render,15);
    }
    //start running the program
    render();
}