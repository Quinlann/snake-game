import nodes from './nodes.js'
import data from './data.js'

const game = {
    start: () => {
        game.setSnakeSize();
        game.placeAtPosition(nodes.snakeHead, [data.snake.x * data.cellSize, data.snake.y * data.cellSize]);
        game.addObstacles();
        game.renderObstacles();
        game.addControls();
        game.startTicks();
    },
    setSnakeSize: () => {
        nodes.snakeHead.style.width = `${data.cellSize}px`;
    },
    placeAtPosition: (node, pos) => {
        node.style.left = `${pos[0]}px`;
        node.style.top = `${pos[1]}px`;
    },
    addControls: () => {
        document.addEventListener('keydown', (event) => {
            if(event.code === 'KeyW' || event.code === 'ArrowUp' ) game.pressUp();
            else if(event.code === 'KeyA' || event.code === 'ArrowLeft' ) game.pressLeft();
            else if(event.code === 'KeyS' || event.code === 'ArrowDown' ) game.pressDown();
            else if(event.code === 'KeyD' || event.code === 'ArrowRight' ) game.pressRight();
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
                game.placeAtPosition(nodes.snakeHead, [data.snake.x * data.cellSize, data.snake.y * data.cellSize]);
                break;

            case 'left':
                if (game.checkCollision(data.snake.x - 1, data.snake.y)) return;
                data.snake.x--;
                game.placeAtPosition(nodes.snakeHead, [data.snake.x * data.cellSize, data.snake.y * data.cellSize]);
                break;

            case 'down':
                if (game.checkCollision(data.snake.x, data.snake.y + 1)) return;
                data.snake.y++
                game.placeAtPosition(nodes.snakeHead, [data.snake.x * data.cellSize, data.snake.y * data.cellSize]);
                break;

            case 'right':
                if (game.checkCollision(data.snake.x + 1, data.snake.y)) return;
                data.snake.x++
                game.placeAtPosition(nodes.snakeHead, [data.snake.x * data.cellSize, data.snake.y * data.cellSize]);
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
    },
    addObstacles: () => {
        data.obstacles.push({
            type: data.obstacleTypes[0],
            x: Math.floor(Math.random() * data.grid[0]),
            y: Math.floor(Math.random() * data.grid[1])
        });
    },
    renderObstacles: () => {
        data.obstacles.map((obs) => {
            const obsNode = document.createElement('div');
            obsNode.classList.add(obs.type);
            obsNode.style.left
        });
    }
}

export default game