import nodes from './nodes.js'

const data = {
    createGrid: () => {
        data.canvasWidth = nodes.canvas.getBoundingClientRect().width;
        data.canvasHeight = nodes.canvas.getBoundingClientRect().height;
        data.columns = Math.floor(data.canvasWidth / data.snakeSize);
        data.rows = Math.floor(data.canvasHeight / data.snakeSize);

        console.log(data.columns,data.rows);
    },
    grid: [],
    snakeSize: 50,
    canvasWidth: null,
    canvasHeight: null,
    snakePosition: {
        x: 5,
        y: 5
    },
    columns: 0,
    rows: 0
}

export default data