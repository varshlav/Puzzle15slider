import { Component, VERSION, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'puzzle15';

  name = 'Angular ' + VERSION.major;
  successMsg = 'All the Best';
  startTime = +new Date();
  puzzle = [
	[1,2,3,4],
  [5,6,7,8],
  [9,10,11,12],
  [13,14,15,0]
];

zeroPos = [3,3];

ngOnInit() {
 this.randowPuzzleGeerator();
}
makeMove(x =0, y=0){
  let temp =0;
  if(x === this.zeroPos[0] ||  y === this.zeroPos[1]){
  		if (x === this.zeroPos[0] &&  y === this.zeroPos[1]) {
      	// do Nothing
      } else {
        //this.puzzle[x][y] = 0;
        //this.zeroPos = [x,y];
        if(x === this.zeroPos[0]) {
          if(y < this.zeroPos[1]){
            for(let i = this.zeroPos[1]; i > y; i--){
              this.puzzle[x][i] = this.puzzle[x][i-1];
            }
            this.puzzle[x][y] = 0;
            this.zeroPos = [x,y];
          } else {
            for(let i = this.zeroPos[1]; i < y; i++){
              this.puzzle[x][i] = this.puzzle[x][i+1];
            }
            this.puzzle[x][y] = 0;
            this.zeroPos = [x,y];
          }
        } else {
          if(x < this.zeroPos[0]){
            for(let i = this.zeroPos[0]; i > x; i--){
              this.puzzle[i][y] = this.puzzle[i-1][y];
            }
            this.puzzle[x][y] = 0;
            this.zeroPos = [x,y];
          } else {
            for(let i = this.zeroPos[0]; i < x; i++){
              this.puzzle[i][y] = this.puzzle[i+1][y];
            }
            this.puzzle[x][y] = 0;
            this.zeroPos = [x,y];
          }
        }
      }
  } 
  this.verifyAnswer();
}

verifyAnswer() {
  if(this.puzzle.join('').replace(/\,/g, "") === '1234567891011121314150'){
    let endTime = +new Date();
    let timetaken = Math.floor((endTime-this.startTime)/1000);
    this.successMsg = "Hurray you completed this quiz in " + timetaken + "seconds";
  } else if(this.puzzle.join('').replace(/\,/g, "") === '1234567891011121315140'){
    let endTime = +new Date();
    let timetaken = Math.floor((endTime-this.startTime)/1000);
    this.successMsg = "Sorry! this puzzle was unsolvable, but full marks for trying, please Generate a New Game";
  }
}

randowPuzzleGeerator() {
 let sequence = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

  let random: number;

  for(let row = 0; row < 4; row++){
    for(let col = 0; col < 4; col++){
      random = Math.floor(Math.random() * sequence.length);
      this.puzzle[row][col] = sequence.splice(random,1)[0];
    }
  }
  this.puzzle[3][3] = 0;
  this.startTime = +new Date();

}

reload(){
  location.reload();
}

}
