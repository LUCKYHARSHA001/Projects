const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const gameOverElement = document.getElementById('gameOver');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let speed = 5;
let score = 0;
let highScore = 0;
let gameLoop;

function drawGame() {
  clearCanvas();
  moveSnake();
  drawSnake();
  drawFood();
  
  if (checkCollision()) {
    handleGameOver();
    return;
  }
  
  if (snake[0].x === food.x && snake[0].y === food.y) {
    growSnake();
    moveFood();
    increaseScore();
  }
  
  gameLoop = setTimeout(drawGame, 1000 / speed);
}

function clearCanvas() {
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = '#4ade80';
  snake.forEach((segment, index) => {
    ctx.fillRect(
      segment.x * gridSize,
      segment.y * gridSize,
      gridSize - 2,
      gridSize - 2
    );
    
    // Draw snake eyes on head
    if (index === 0) {
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(
        segment.x * gridSize + 4,
        segment.y * gridSize + 4,
        3,
        3
      );
      ctx.fillRect(
        segment.x * gridSize + 12,
        segment.y * gridSize + 4,
        3,
        3
      );
      ctx.fillStyle = '#4ade80';
    }
  });
}

function drawFood() {
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(
    food.x * gridSize + gridSize/2,
    food.y * gridSize + gridSize/2,
    gridSize/2 - 2,
    0,
    Math.PI * 2
  );
  ctx.fill();
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  snake.pop();
}

function growSnake() {
  const tail = { ...snake[snake.length - 1] };
  snake.push(tail);
}

function moveFood() {
  food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  };
  // Ensure food doesn't spawn on snake
  while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
    food = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
  }
}

function checkCollision() {
  // Wall collision
  if (
    snake[0].x < 0 ||
    snake[0].x >= tileCount ||
    snake[0].y < 0 ||
    snake[0].y >= tileCount
  ) {
    return true;
  }
  
  // Self collision
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  
  return false;
}

function handleGameOver() {
  clearTimeout(gameLoop);
  gameOverElement.classList.remove('hidden');
  if (score > highScore) {
    highScore = score;
    highScoreElement.textContent = highScore;
  }
}

function increaseScore() {
  score++;
  scoreElement.textContent = score;
  speed = Math.min(speed + 0.5, 15);
}

function handleKeyPress(e) {
  switch (e.key.toLowerCase()) { // Convert key to lowercase for consistency
    case 'arrowup':
    case 'w':
      if (dy !== 1) { dx = 0; dy = -1; }
      break;
    case 'arrowdown':
    case 's':
      if (dy !== -1) { dx = 0; dy = 1; }
      break;
    case 'arrowleft':
    case 'a':
      if (dx !== 1) { dx = -1; dy = 0; }
      break;
    case 'arrowright':
    case 'd':
      if (dx !== -1) { dx = 1; dy = 0; }
      break;
  }
}


function startGame() {
  snake = [{ x: 10, y: 10 }];
  food = { x: 15, y: 15 };
  dx = 0;
  dy = 0;
  speed = 7;
  score = 0;
  scoreElement.textContent = '0';
  gameOverElement.classList.add('hidden');
  clearTimeout(gameLoop);
  drawGame();
}

window.addEventListener('keydown', handleKeyPress);
startGame();