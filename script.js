const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Resolución
canvas.width = 448;
canvas.height = 400;

function drawBall() {}
function drawPaddle() {}
function drawBricks() {}

function collisionDetection() {}
function ballMovement() {}
function paddleMovement() {}

function draw() {
  //Dibujar elementos
  drawBall();
  drawPaddle();
  drawBricks();
  //drawScore();

  //Colisiones y Movimientos
  collisionDetection();
  ballMovement();
  paddleMovement();

  window.requestAnimationFrame(draw);
}
