const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Resolución
canvas.width = 448;
canvas.height = 400;

/* Variables de la pelota */
const ballRadius = 3;

// Posición de la pelota
let x = canvas.width / 2;
let y = canvas.height - 30;

// Velocidad de la pelota
let dx = 2;
let dy = -2; // + para abajo - para arriba

/* Funciones */
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {}
function drawBricks() {}

function collisionDetection() {}

function ballMovement() {
  //Rebote de la pelota lateral
  if (
    x + dx > canvas.width - ballRadius || // Pared derecha
    x + dx < ballRadius // Pared izquierda
  ) {
    dx = -dx;
  }

  //Rebote de la pelota arriba
  if (y + dy < ballRadius) {
    dy = -dy;
  }

  if (y + dy > canvas.height - ballRadius) {
    console.log("GAME OVER");
    document.location.reload();
  }

  x += dx;
  y += dy;
}

function paddleMovement() {}

function cleanCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  // Limpia el canvas en cada frame
  cleanCanvas();
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

draw();
