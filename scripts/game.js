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
        if(data.snake.direction === direction) return
        if(direction === 'up' && data.snake.direction === 'down') return
        if(direction === 'left' && data.snake.direction === 'right') return
        if(direction === 'down' && data.snake.direction === 'up') return
        if(direction === 'right' && data.snake.direction === 'left') return
        
        data.snake.direction = direction;
        nodes.snakeHead.classList.remove('up', 'left', 'down', 'right');
        nodes.snakeHead.classList.add(data.snake.direction);
    },
    tick: () => {
        
        switch (data.snake.direction) {
            case 'up':
                data.snake.y--;
                game.moveToPosition();
                break;
        
            case 'left':
                data.snake.x--;
                game.moveToPosition();
                break;
        
            case 'down':
                data.snake.y++
                game.moveToPosition();
                break;
        
            case 'right':
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
    gameTick: null
}

export default game