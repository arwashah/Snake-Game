# Snake-Game
One of the first full-stack projects I built while learning web development. 
I wanted to go beyond just following tutorials and actually build something 
from scratch that has a real frontend, a real backend, and they talk to each other.

The game is simple — you're a snake, you eat food, you grow, you try not to 
die. But under the hood there's a Node.js server running that saves every 
score to a leaderboard, so you're always competing against previous runs.

## How to Play
Use the arrow keys to move. Eat the red squares to grow and earn points. 
Hit a wall or yourself and it's game over. Enter your name and your score 
gets saved to the leaderboard permanently.

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Data Storage:** JSON file
- **API:** REST (GET and POST endpoints)

## Running it Locally
1. Clone the repo
2. Install dependencies — `npm install`
3. Start the server — `node server.js`
4. Open `http://localhost:3000/snake.html` in your browser
