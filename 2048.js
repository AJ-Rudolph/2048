//make sure the webpage is fully loaded
window.onload=function() {
    //gets the canvas we'll draw to 
    let canvas =document.getElementById("2048");
    //graphics element we will draw with
    let g = canvas.getContext("2d");



    window.addEventListener("keydown", function(event) {
           
        switch(event.keyCode) {
            //left arrow
            case 37: {
                this.console.log("left");
                break;
            }
            //up arrow
            case 38: {
                this.console.log("up");
                break;
            }
            //right arrow
            case 39: {
                this.console.log("right");
                break;
            }
            //down arrow
            case 40: {
                this.console.log("down");
                break;
            }
        }
    });




    class Tile {
        constructor() {
            this.color= '#EEE3DA';
            this.value=2;
        }
        
        render(x,y) {
            //update coordinates to proper location
            x=15+x*100;
            y=15+y*100;
            g.beginPath();

            g.fillStyle =this.color;
            g.fillRect(x,y,100,100);

            g.font= '50px Arial';
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
                [new Tile(),null,null,null],
                [null,null,null,null],
                [null,null,null,null],
                [null,null,null,null],
            ];
        }

        input() {
            // moving right
            for (let i=0;i<this.board.length;i++) {
                for(let j=0; j<this.board.length;j++) {
                    //merge
                        

                    //move to the correct position
                }
            }
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
            for(let i=0; i<this.board.length;i++) {
                for(let j=0; j<this.board[i].length; j++) {
                    let tile = this.board[j][i];
                    if(tile === null) continue;
                    else  tile.render(i,j);
                    
                    

                }
            }
            g.closePath(); //stop drawing
        }

    

    }

    let board= new Board;






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