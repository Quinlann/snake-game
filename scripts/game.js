import nodes from './nodes.js'
import data from './data.js'

const game = {
    start: () => {
        game.setSnakeSize();
        game.moveToPosition();
        game.addControls();
        game.startTicks();
    },
    setSnakeSize: () => {
        nodes.snakeHead.style.width = `${data.cellSize}px`;
    },
    moveToPosition: () => {
        console.log(data.grid[0]);
        console.log(data.snake.x);

        nodes.snakeHead.style.left = `${data.snake.x * data.cellSize}px`;
        nodes.snakeHead.style.top = `${data.snake.y * data.cellSize}px`;
    },
    addControls: () => {
        document.addEventListener('keydown', (event) => {
            switch (event.code) {
                case 'KeyW':
                    game.pressUp();
                    break;

                case 'ArrowUp':
                    game.pressUp();
                    break;

                case 'KeyA':
                    game.pressLeft();
                    break;

                case 'ArrowLeft':
                    game.pressLeft();
                    break;

                case 'KeyS':
                    game.pressDown();
                    break;

                case 'ArrowDown':
                    game.pressDown();
                    break;

                case 'KeyD':
                    game.pressRight();
                    break;

                case 'ArrowRight':
                    game.pressRight();
                    break;

                default:
                    break;
            }
        });
    },
    pressUp: () => {
        game.changeDirection('up');
    },
    pressLeft: () => {
        game.changeDirection('left');
    },
    pressDown: () => {
        game.changeDirection('down');
    },
    pressRight: () => {
        game.changeDirection('right');
    },
    changeDirection: (direction) => {
        if (data.snake.direction === direction) return
        if (direction === 'up' && data.snake.direction === 'down') return
        if (direction === 'left' && data.snake.direction === 'right') return
        if (direction === 'down' && data.snake.direction === 'up') return
        if (direction === 'right' && data.snake.direction === 'left') return

        data.snake.direction = direction;
        nodes.snakeHead.classList.remove('up', 'left', 'down', 'right');
        nodes.snakeHead.classList.add(data.snake.direction);
    },
    tick: () => {
        switch (data.snake.direction) {
            case 'up':
                if (game.checkCollision(data.snake.x, data.snake.y - 1)) return;
                data.snake.y--;
                game.moveToPosition();
                break;

            case 'left':
                if (game.checkCollision(data.snake.x - 1, data.snake.y)) return;
                data.snake.x--;
                game.moveToPosition();
                break;

            case 'down':
                if (game.checkCollision(data.snake.x, data.snake.y + 1)) return;
                data.snake.y++
                game.moveToPosition();
                break;

            case 'right':
                if (game.checkCollision(data.snake.x + 1, data.snake.y)) return;
                data.snake.x++
                game.moveToPosition();
                break;

            default:
                break;
        }

    },
    startTicks: () => {
        game.gameTick = setInterval(() => {
            game.tick();
        }, data.speed);
    },
    gameTick: null,
    checkCollision: (x, y) => {
        if (x >= data.grid[0]) {
            console.log('hit right wall');
            return true
        } else if (x <= 0) {
            console.log('hit left wall');
            return true
        } else if (y >= data.grid[1]) {
            console.log('hit bottom wall');
            return true
        } else if (y <= 0) {
            console.log('hit top wall');
            return true
        }
    }
}

export default game