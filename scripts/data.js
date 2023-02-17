import nodes from './nodes.js'

const data = {
    createGrid: () => {
        data.canvasWidth = nodes.canvas.getBoundingClientRect().width;
        data.canvasHeight = nodes.canvas.getBoundingClientRect().height;
        data.grid[0] = Math.floor(data.canvasWidth / data.snakeSize);
        data.grid[1] =Math.floor(data.canvasHeight / data.snakeSize);
        // make sure the grid has odd number of columns and rows > snake starts at center
        if(data.grid[0] % 2==0) data.grid[0]--;
        if(data.grid[1] % 2==0) data.grid[1]--;

        data.cellSize = data.canvasWidth /  data.grid[0];

        data.setStartPos();
    },
    setStartPos: () => {
        data.snake.x = Math.ceil(data.grid[0] / 2);
        data.snake.y = Math.ceil(data.grid[1] / 2);
    },
    grid: [],
    cellSize: 0,
    snakeSize: 25,
    canvasWidth: null,
    canvasHeight: null,
    snakePosition: {
        x: 0,
        y: 0
    },
    columns: 0,
    rows: 0,
    snake: {
        x: 0,
        y: 0,
        direction: 'up'
    },
    speed: 250,
    obstacleTypes: ['wall'],  
    obstacles: []  
}

export default data