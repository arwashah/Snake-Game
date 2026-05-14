const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 1, y: 0 };

let food = {
  x: Math.floor(Math.random() * (canvas.width / gridSize)),
  y: Math.floor(Math.random() * (canvas.height / gridSize))
};
let score = 0;

function drawSnake() {
  ctx.fillStyle = 'green';
  snake.forEach(segment => {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
  });
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

function moveSnake() {
  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  };
  snake.unshift(head);
  snake.pop();
}

function checkCollision() {
  const head = snake[0];
  if (head.x < 0 || head.x >= canvas.width / gridSize ||
      head.y < 0 || head.y >= canvas.height / gridSize) {
    return true;
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowUp' && direction.y === 0) {
    direction = { x: 0, y: -1 };
  } else if (event.key === 'ArrowDown' && direction.y === 0) {
    direction = { x: 0, y: 1 };
  } else if (event.key === 'ArrowLeft' && direction.x === 0) {
    direction = { x: -1, y: 0 };
  } else if (event.key === 'ArrowRight' && direction.x === 0) {
    direction = { x: 1, y: 0 };
  }
});

setInterval(async () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  moveSnake();
  checkFood();
  if (checkCollision()) {
    const playerName = prompt('Game Over! Your score: ' + score + '\nEnter your name:');
    if (playerName) {
        await submitScore(playerName);
        await loadLeaderboard();
  }
    location.reload();
}
  drawSnake();
  drawFood();
}, 200);

function checkFood() {
  const head = snake[0];
  if (head.x === food.x && head.y === food.y) {
    snake.push({});
    food = {
      x: Math.floor(Math.random() * (canvas.width / gridSize)),
      y: Math.floor(Math.random() * (canvas.height / gridSize))
    };
    score += 10;
    document.getElementById('score').textContent = 'Score: ' + score;
  }
}
async function submitScore(playerName) {
  await fetch('http://localhost:3000/scores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: playerName, score: score })
  });
}
async function loadLeaderboard() {
  const response = await fetch('http://localhost:3000/scores');
  const scores = await response.json();
  const list = document.getElementById('score-list');
  list.innerHTML = '';
  scores.forEach((s, index) => {
    const item = document.createElement('li');
    item.textContent = `${s.name} - ${s.score}`;
    list.appendChild(item);
  });
}

loadLeaderboard();