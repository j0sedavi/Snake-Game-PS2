//Snake Game PlayStation 2
var canva = Screen.getMode();
var font = new Font()
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
var delay = 15;
const randomNumber = (min,max) => { return Math.round(Math.random() * (max - min) + min) }
const randomPosition = (size,max) => {
  const numb = randomNumber(0,max - size)
  return Math.round(numb/size) * size
}
const randomColor = () => {
  const cores = [Colors.Yellow,Colors.Red,Colors.Green,Colors.Blue,Colors.Pink,Colors.LightBlue];
  return cores[randomNumber(0,cores.length - 1)]
}
class game_snake{
  constructor(){
    this.size = 32;
    this.direction = "right"
    this.pad = Pads.get();
    this.snake = [{x:160,y:160},{x:192,y:192}];
    this.food = {x:randomPosition(this.size,640),y:randomPosition(this.size,448),color:randomColor()};
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
  this.snake.shift();
  if(this.pad.pressed(Pads.UP) && this.direction !== "down") {
    this.direction = "up"
  } else if(this.pad.pressed(Pads.DOWN) && this.direction !== "up") {
    this.direction = "down"
  } else if(this.pad.pressed(Pads.LEFT) && this.direction !== "right") {
    this.direction = "left"
  } else if(this.pad.pressed(Pads.RIGHT) && this.direction !== "left") {
    this.direction = "right"
  }
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
  }
  drawFood() {
    font.print(0,0,`X: ${this.food.x},Y: ${this.food.y}  `)
    Draw.rect(this.food.x, this.food.y, this.size, this.size, this.food.color);
  }
  checkCollision() {
    let head = this.snake[this.snake.length - 1];
    let neckSnake = this.snake.length - 2;
    if(head.x == this.food.x && head.y == this.food.y) {
      this.snake.push(head)
      let x_t = randomPosition(this.size,640)
      let y_t = randomPosition(this.size,448)
      while (this.snake.find((position) => position.x == x_t && position.y == y_t)) {
            x_t = randomPosition(this.size,640)
            y_t = randomPosition(this.size,448)
        }
        this.food.x = x_t;
        this.food.y = y_t;
        this.food.color = randomColor();
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
    this.direction = "right";
    this.food = {x:randomPosition(this.size,640),y:randomPosition(this.size,448),color:randomColor()};
    this.snake = [{x:160,y:160},{x:192,y:192}];
  }
}
const main = new game_snake();
var loop = () => { main.game() }
Screen.displayFunc(loop);
os.setInterval(() => {
 Screen.display(); 
},delay)