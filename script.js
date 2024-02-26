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

// Velocidad/Dirección de la pelota
let dx = 2; // + para derecha - para izquierda
let dy = -2; // + para abajo - para arriba

/* Variables de la paleta */
const paddleHeight = 10;
const paddleWidth = 50;

let paddleX = (canvas.width - paddleWidth) / 2; // Dibuja la paleta en el centro;
let paddleY = canvas.height - paddleHeight - 10;

/* Funciones */
function drawBall() {
  ctx.beginPath(); // Inicia el trazado
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath(); // Termina el trazado
}

function drawPaddle() {
  ctx.fillStyle = "red";
  ctx.fillRect(
    paddleX, // Coordenada X
    paddleY, // Coordenada Y
    paddleWidth, // Ancho del dibujo
    paddleHeight // Alto del dibujo
  );
}

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

  //Pelota cae al suelo
  if (y + dy > canvas.height - ballRadius) {
    console.log("GAME OVER");
    document.location.reload();
  }

  //Mover la pelota
  x += dx;
  y += dy;
}

function paddleMovement() {}

function cleanCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Se ejecuta en cada frame
function draw() {
  // Limpia el canvas
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
