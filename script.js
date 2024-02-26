const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const $sprite = document.querySelector("#sprite");
const $bricks = document.querySelector("#bricks");

// Resolución
canvas.width = 448;
canvas.height = 400;

/* Variables de la pelota */
const ballRadius = 3;

// Posición de la pelota
let x = canvas.width / 2;
let y = canvas.height - 30;

// Velocidad/Dirección de la pelota
let dx = 3; // + para derecha - para izquierda
let dy = -3; // + para abajo - para arriba

/* Variables de la paleta */
const paddleHeight = 10;
const paddleWidth = 50;

let paddleX = (canvas.width - paddleWidth) / 2; // Dibuja la paleta en el centro;
let paddleY = canvas.height - paddleHeight - 10;

let rightPressed = false;
let leftPressed = false;

// Sensibilidad paleta
const PADDLE_SENSITIVITY = 7;

/* Funciones */
function drawBall() {
  ctx.beginPath(); // Inicia el trazado
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath(); // Termina el trazado
}

function drawPaddle() {
  ctx.drawImage(
    $sprite, // Imagen a dibujar
    40,
    400,
    paddleWidth,
    paddleHeight,
    paddleX,
    paddleY,
    paddleWidth,
    paddleHeight
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

  const isBallSameXAsPaddle = x > paddleX && x < paddleX + paddleWidth; //Si la pelota esta en la misma x que la paleta

  const isBallTouchingPaddle = y + dy > paddleY; //Si la pelota toca la paleta

  //Pelota toca la paleta
  if (isBallTouchingPaddle && isBallSameXAsPaddle) {
    dy = -dy; //Rebote
  } else if (
    //Pelota cae al suelo
    y + dy >
    canvas.height - ballRadius
  ) {
    console.log("GAME OVER");
    document.location.reload();
  }

  //Mover la pelota
  x += dx;
  y += dy;
}

//Movimiento paleta y colisión con canvas
function paddleMovement() {
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += PADDLE_SENSITIVITY;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= PADDLE_SENSITIVITY;
  }
}

function cleanCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function initEvents() {
  document.addEventListener("keydown", keyDownHandler);
  document.addEventListener("keyup", keyUpHandler);

  // Apreta una tecla
  function keyDownHandler(event) {
    const { key } = event;
    if (key === "Right" || key === "ArrowRight" || key === "d") {
      rightPressed = true;
    } else if (key === "Left" || key === "ArrowLeft" || key === "a") {
      leftPressed = true;
    }
  }

  // Suelta una tecla
  function keyUpHandler(event) {
    const { key } = event;
    if (key === "Right" || key === "ArrowRight" || key === "d") {
      rightPressed = false;
    } else if (key === "Left" || key === "ArrowLeft" || key === "a") {
      leftPressed = false;
    }
  }
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
initEvents();
