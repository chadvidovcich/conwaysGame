let gridCells;
const fps = 6
const cellDiam = 6
const startingDensity = 12 //5-100
let stagnantCounter = 0
let stagnantCellsMemory = 0
const cellColorStart = [55,220,110]

class Cell {
  constructor(x,y) {
    this.isAlive = true
    this.nextState = true
    this.prevState = true
    this.prev2State = true
    this.xLoc = x
    this.yLoc = y
    this.color = cellColorStart
  }

  drawCell(x,y){
    fill(this.color[0],this.color[1],this.color[2])
    stroke(0)
    circle(x+cellDiam/2,y+cellDiam/2,cellDiam-1.2)
  }

  randomIsAlive(){
    this.isAlive = Boolean(Math.floor((Math.random() * (startingDensity/100+1))))
  }

  age(){
    this.color = this.color.map((val,ind)=>{
      let minDark = 0.3
      let darkRate = 0.02
      if (val < minDark * cellColorStart[ind]) {
        return minDark * cellColorStart[ind]
      } else {return val * (1-darkRate)}
    })
  }

}

function makeEmpty2DArray(col,row){
  let arr = new Array(col)
 for (let i = 0; i < arr.length; i++) {
  arr[i] = new Array(row)
 }
  return arr
}

function fillArrWthRandCells(arr){
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      arr[i][j] = new Cell(i,j)
      arr[i][j].randomIsAlive()
    } 
  }
}

function drawGrid(gridCells) {
  for (let i = 0; i < gridCells.length; i++) {
    for (let j = 0; j < gridCells[0].length; j++) {
      if (gridCells[i][j].isAlive == true) {
        let x = i * cellDiam
        let y = j * cellDiam
        gridCells[i][j].drawCell(x,y)
      }
    }
  }
}

function nextGrid(gridCells) {

  //counts live neighbors of cell
  function countNeighbs(cell,gridCells) {
    let count = 0
    for (let i = -1; i < 2; i++){
      for (let j = -1; j < 2; j++){
        count += gridCells[cell.xLoc+i][cell.yLoc+j].isAlive
      }
    }
    count -= gridCells[cell.xLoc][cell.yLoc].isAlive
    return count
  }



//conways rules
  let cell
  let liveCells = 0, deadCells = 0, stagnantCells = 0

  for (let i = 0; i < gridCells.length; i++) {
    for (let j = 0; j < gridCells[0].length; j++) {
      cell = gridCells[i][j]
      cell.isAlive ? liveCells++ : deadCells++

      if (i == 0 || i == gridCells.length - 1 || j == 0 || j == gridCells[0].length - 1) {
        cell.nextState = false
      }
      else if (cell.isAlive) {
        if (countNeighbs(cell,gridCells) < 2) {
          cell.nextState = false
        }
        else if (countNeighbs(cell,gridCells) == 2 || countNeighbs(cell,gridCells) == 3) {
          cell.nextState = true
          cell.age()
      }
        else if (countNeighbs(cell,gridCells) > 3) {
          cell.nextState = false
        }
      }
      else if (!cell.isAlive && countNeighbs(cell,gridCells) == 3) {
        cell.color = cellColorStart
        cell.nextState = true
      }
      else {
        cell.nextState = false
      }
      if (cell.prevState == cell.nextState || cell.isAlive == cell.nextState || cell.prev2State == cell.nextState) {
        stagnantCells++
      }
    }
  }

  if (stagnantCells == stagnantCellsMemory) {
    stagnantCounter++
  }
  else {
    stagnantCellsMemory = stagnantCells
  }
  
  //state machine
  for (let i = 0; i < gridCells.length; i++) {
    for (let j = 0; j < gridCells[0].length; j++) {
      cell = gridCells[i][j]
      cell.prev2State = cell.prevState
      cell.prevState = cell.isAlive
      cell.isAlive = cell.nextState
    }
  }

  if (stagnantCounter > 3 * fps) {
    setup()
  }
}



function setup() {
  const calcArrWidth = windowWidth/cellDiam
  const calcArrHeight = (windowHeight-5)/cellDiam
  stagnantCounter = 0
  stagnantCellsMemory = 0

  createCanvas(windowWidth,windowHeight-5)
  frameRate(fps)
  gridCells = makeEmpty2DArray(Math.floor(calcArrWidth),Math.floor(calcArrHeight))
  fillArrWthRandCells(gridCells)
  background(50)
}

function draw() {
  background(50)
  nextGrid(gridCells)
  drawGrid(gridCells)
}

function windowResized() {
  resizeCanvas(windowWidth,windowHeight);
  setup()
}