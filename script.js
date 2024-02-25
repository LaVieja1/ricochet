const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Resolución
canvas.width = 448;
canvas.height = 400;

/* Variables de la pelota */
const ballRadius = 4;

// Posición de la pelota
let x = canvas.width / 2;
let y = canvas.height - 30;

// Velocidad de la pelota
let dx = 2;
let dy = -2; // - para abajo + para arriba

/* Funciones */
function drawBall() {
  ctx.beginPath();
}

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
