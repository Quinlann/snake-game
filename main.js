import Canvas from './components/Canvas.js';
import SnakeHead from './components/SnakeHead.js';
import SplashScreen from './components/SplashScreen.js';

const app = Vue.createApp({
    data() {
        return {
            grid: [0,0],
            canvasWidth: 0,
            canvasHeight: 0,
            snakeSize: 30,
            cellSize: 0,
            snake: {
                x: 0,
                y: 0,
                direction: 'up'
            },
        }
    },
    methods: {
        createGrid() {
            this.grid = [Math.floor(this.canvasWidth / this.snakeSize), Math.floor(this.canvasHeight / this.snakeSize)];    

            if(this.grid[0] % 2==0) this.grid[0]--;
            if(this.grid[1] % 2==0) this.grid[1]--;

            this.cellSize = this.canvasWidth / this.grid[0];
        },
        setStartPos() {
            this.snake.x = Math.ceil(this.grid[0] / 2);
            this.snake.y = Math.ceil(this.grid[1] / 2);
            console.log(this.snake);
        },
        handleCanvasWidth(canvasWidth) {
            this.canvasWidth = canvasWidth;
        },
        handleCanvasHeight(canvasHeight) {
            this.canvasHeight = canvasHeight;
        },
    },
    mounted() {
        this.createGrid();
        this.setStartPos();
    },
    template: /* html */
    `
        <Canvas 
            @emit-canvas-width="handleCanvasWidth"
            @emit-canvas-height="handleCanvasHeight"
        />
        <SplashScreen/>
    `
});

app.component('Canvas', Canvas);
app.component('SnakeHead', SnakeHead);
app.component('SplashScreen', SplashScreen);

app.mount('#app');