import nodes from './nodes.js'
import data from './data.js'

const game = {
    initialize: () => {
        game.setSnakeSize();
        game.moveToPosition();
    },
    setSnakeSize: () => {
        nodes.snakeHead.style.width = `${data.snakeSize}px`;
    },
    moveToPosition: () => {
        console.log(data.snakePosition);
        nodes.snakeHead.style.left = `${data.snakePosition.x * data.cellSize}px`;
        nodes.snakeHead.style.top = `${data.snakePosition.y * data.cellSize}px`;
    }
}

export default game