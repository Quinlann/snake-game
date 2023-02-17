import nodes from './nodes.js'
import data from './data.js'

const game = {
    initialize: () => {
        game.setSnakeSize();
    },
    setSnakeSize: () => {
        nodes.snakeHead.style.width = `${data.snakeSize}px`;
    }
}

export default game