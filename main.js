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
        }
    },
    methods: {
        handleCanvasWidth(canvasWidth) {
            this.canvasWidth = canvasWidth;
        },
        handleCanvasHeight(canvasHeight) {
            this.canvasHeight = canvasHeight;
        }
    },
    mounted() {
        this.grid = [Math.floor(this.canvasWidth / this.snakeSize), Math.floor(this.canvasHeight / this.snakeSize)]
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