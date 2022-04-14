function make2DArray(col,row){
  let arr = new Array(col)
 for (let i = 0; i < arr.length; i++) {
  arr[i] = new Array(row)
 }
  return arr
}

function randomizeGrid(grid){
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      grid[i][j] = Math.floor(Math.random()*2)
    } 
  }
}

let grid;
const canvasWidth = 200
const canvasHeight = 200
const resolution = 10
const fps = 2

function setup() {
  createCanvas(canvasWidth,canvasHeight)
  frameRate(fps)
  grid = make2DArray(Math.floor(canvasWidth/resolution),Math.floor(canvasHeight/resolution))
  randomizeGrid(grid)
}

function draw() {
  randomizeGrid(grid)
  background(50)
  for (let i = 0; i < canvasWidth/resolution; i++) {
    for (let j = 0; j < canvasHeight/resolution; j++) {
      let x = i * resolution
      let y = j * resolution
      if (grid[i][j] == 1) {
        fill(0, 239, 172)
        stroke(0)
        circle(x+resolution/2,y+resolution/2,resolution-1,resolution-1)
        // rect(x,y,resolution,resolution)
      }
    }
  }

}