//Snake Game PlayStation 2
var canva = Screen.getMode();
var Colors = {
  White: Color.new(255,255,255),
  Black: Color.new(0,0,0),
  Yellow: Color.new(255,255,0),
  Red: Color.new(255,0,0),
  Green: Color.new(0,255,0),
  Blue: Color.new(0,0,255),
  Pink: Color.new(255,0,255),
  LightBlue: Color.new(0,255,255)
}
var delay = 70;
const randomNumber = (min,max) => { return Math.round(Math.random() * (max - min) + min)}
const randomPosition = (size) => {
  const numb = randomNumber(0,canva.width - this.size)
  return Math.round(numb/size) * size
}
const randomColor = () => {
  const cores = [Colors.Yellow,Colors.Red,Colors.Green,Colors.Blue,Colors.Pink,Colors.LightBlue];
  return cores[randomNumber(0,cores.length)]
}
class game_snake{
  constructor(){
    this.size = 32;
    this.direction = "right"
    this.pad = Pads.get();
    this.snake = [{x:297,y:201},{x:342,y:201}];
    this.food = {x:randomPosition(this.size),y:randomPosition(this.size),color:randomColor()};
  }
  game() {
  this.pad.update();
  this.drawBackground();
  this.drawSnake();
  this.moveSnake();
  this.drawFood();
  this.checkCollision();
  }
  drawBackground() {
    Draw.rect(0, 0, 640, 448, Colors.White);
  }
  addPartSnake() {
    let temp;
    let x_temp = this.snake.body[this.snake.body.length - 1].x - 45
    let y_temp = this.snake.body[this.snake.body.length - 1].x - 45
      temp = {x:0,y:0}
      this.snake.push(temp)
  }
  drawSnake(){
    for (let i = 0; i < this.snake.length; i++) {
    Draw.rect(this.snake[i].x, this.snake[i].y,this.size,this.size,Colors.Black);
    }
  }
  moveSnake() {
  let head = this.snake[this.snake.length - 1];
  switch (this.direction) {
    case "right":
      this.snake.push({x:head.x+this.size,y:head.y})
      break;
    case "left":
      this.snake.push({x:head.x-this.size,y:head.y})
      break;
    case "up":
      this.snake.push({x:head.x,y:head.y-this.size})
      break;
    case "down":
      this.snake.push({x:head.x,y:head.y+this.size})
      break;
  }
  this.snake.shift();
  if(this.pad.pressed(Pads.UP) && this.direction !== "down") {
    this.direction = "up"
  }
  if(this.pad.pressed(Pads.DOWN) && this.direction !== "up") {
    this.direction = "down"
  }
  if(this.pad.pressed(Pads.LEFT) && this.direction !== "right") {
    this.direction = "left"
  }
  if(this.pad.pressed(Pads.RIGHT) && this.direction !== "left") {
    this.direction = "right"
  }
  }
  drawFood() {
    Draw.rect(this.food.x, this.food.y, this.food.size, this.size, food.color);
  }
  checkCollision() {
    let head = this.snake[this.snake.length - 1];
    let neckSnake = this.snake.length - 2;
    if(head.x == this.food.x && head.y == this.food.y) {
      this.snake.push(head)
      let x = randomPosition(this.size)
      let y = randomPosition(this.size)
      while(this.snake.find((position) => position.x == x && position.y == y)) {
        x = randomPosition(this.size)
        y = randomPosition(this.size)
      }
        this.food = {x:x,y:y,color:randomColor()};
    }
    const wall_collision = head.y < 0 || head.y  > 416 || head.x < 0 || head.x > 608;
    const self_collision = this.snake.find((position,index) => {
      return index < neckSnake && position.x === head.x && position.y === head.y;
    })
    if(wall_collision || self_collision) {
      this.gameOver()
    }
  }
  gameOver() {
    this.direction = undefined;
    this.snake = [{x:225,y:225}];
    this.food = {x:randomPosition(this.size),y:randomPosition(this.size),color:randomColor()};
  }
}
const main = new game_snake();
var loop = () => {main.game()}
Screen.displayFunc(loop);
os.setInterval(() => {
 Screen.display(); 
},delay)