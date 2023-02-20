import nodes from './nodes.js'
import game from './game.js'

const data = {
    initialize: () => {
        data.setupScoreBtns();
        data.createGrid();
    },
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
    calcAvailableCells: () => {
        data.cells.length = 0;
        for (let r = 1; r <= data.grid[1]-1; r++) {
            for (let c = 1; c <= data.grid[0]-1; c++) {
                let cellIsOccupied = false;
                // check if there is already an obstacle at that coor
                data.obstacles.map((obs) => {
                    if(obs.x === c && obs.y === r) cellIsOccupied = true;
                });
                // check if coor is occupied by snake head
                if(data.snake.x === c && data.snake.y === r) cellIsOccupied = true;
                
                if(cellIsOccupied) continue

                data.cells.push([c,r]);
            }
        }
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
    obstacles: [],
    difficulty: 10,
    cells: [],
    scores: [
        {
            name: 'David Hayter',
            fruit: 19,
            time: 20,
            score: 39
        },
        {
            name: 'John Doe',
            fruit: 12,
            time: 12,
            score: 24
        },
        {
            name: 'Sree Martyn',
            fruit: 10,
            time: 10,
            score: 20
        },
    ],
    renderScores: () => {
        nodes.scoresList.innerHTML = '';
        data.scores.map((user) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<span>${user.name}</span> <span>Fruit: ${user.fruit}</span> <span>Time: ${user.time}</span> <span>SCORE: ${user.score}</span>`
            
            nodes.scoresList.appendChild(listItem);            
        });
    },
    controlsStatus: 'normal',
    setupScoreBtns: () => {
        nodes.scoresTryAgain.addEventListener('click', () => {
            game.startGame();
        });
        nodes.scoresMainMenu.addEventListener('click', () => {
            console.log('main menu');
        });
    }
}

export default data