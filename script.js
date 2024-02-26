const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const $sprite = document.querySelector("#sprite");
const $bricks = document.querySelector("#bricks");

// Resolución
canvas.width = 448;
canvas.height = 500;

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

/* Variables de los ladrillos */
const brickRowsCount = 6;
const brickColumnCount = 13;
const brickWidth = 32;
const brickHeight = 20;
const brickPadding = 1;
const brickOffsetTop = 60;
const brickOffsetLeft = 10;
const bricks = [];

const BRICK_STATUS = {
  NEW: 2,
  DAMAGED: 1,
  BROKEN: 0,
};

for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = []; // Inicia con array vacío
  for (let r = 0; r < brickRowsCount; r++) {
    // Calculamos la posición del ladrillo en el canvas
    const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
    const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
    // Asignar un color aleatorio a cada ladrillo
    const random = Math.floor(Math.random() * 8);
    // Guardamos la información de cada ladrillo
    bricks[c][r] = {
      x: brickX,
      y: brickY,
      hits: 0,
      status: BRICK_STATUS.NEW,
      color: random,
    };
  }
}

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

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowsCount; r++) {
      const currentBrick = bricks[c][r];
      // Saltar a la siguente iteración si esta destruido
      if (currentBrick.status === BRICK_STATUS.BROKEN) continue;

      const clipY = currentBrick.color * 32;

      ctx.drawImage(
        $sprite,
        448,
        clipY,
        64,
        32,
        currentBrick.x,
        currentBrick.y,
        brickWidth,
        brickHeight
      );

      if (currentBrick.status === BRICK_STATUS.DAMAGED) {
        const clipY = currentBrick.color * 32;

        ctx.drawImage(
          $sprite,
          576,
          clipY,
          64,
          32,
          currentBrick.x,
          currentBrick.y,
          brickWidth,
          brickHeight
        );
      }
    }
  }
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowsCount; r++) {
      const currentBrick = bricks[c][r];
      // Saltar a la siguente iteración si esta destruido
      if (currentBrick.status === BRICK_STATUS.BROKEN) continue;

      const isBallSameXAsBrick =
        x > currentBrick.x && x < currentBrick.x + brickWidth;

      const isBallSameYAsBrick =
        y > currentBrick.y + brickPadding + ballRadius &&
        y < currentBrick.y + brickHeight + brickPadding + ballRadius;

      if (isBallSameXAsBrick && isBallSameYAsBrick) {
        dy = -dy;
        currentBrick.hits++;
        if (currentBrick.hits === 1) {
          currentBrick.status = BRICK_STATUS.DAMAGED;
        } else if (currentBrick.hits === 2) {
          currentBrick.status = BRICK_STATUS.BROKEN;
        }
      }
    }
  }
}

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

function winGame() {
  let allBricksBroken = true;

  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowsCount; r++) {
      if (bricks[c][r].status !== BRICK_STATUS.BROKEN) {
        allBricksBroken = false;
        break;
      }
    }
    if (!allBricksBroken) {
      break;
    }
  }

  if (allBricksBroken) {
    document.querySelector("canvas").style.display = "none";
    document.querySelector(".menu").style.display = "flex";
    document.querySelector(".win").style.display = "block";
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

  winGame();

  window.requestAnimationFrame(draw);
}

function menu() {
  document.querySelector("canvas").style.display = "none";
  document.querySelector("#start").addEventListener("click", () => {
    document.querySelector(".menu").style.display = "none";
    document.querySelector("canvas").style.display = "block";
    draw();
  });
}

menu();
initEvents();
