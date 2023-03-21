import Canvas from './components/Canvas.js';
import SnakeHead from './components/SnakeHead.js';
import SplashScreen from './components/SplashScreen.js';
import HighScores from './components/HighScores.js';

const app = Vue.createApp({
    data() {
        return {
            grid: [0,0],
            canvasWidth: 0,
            canvasHeight: 0,
            snakeSize: 30,
            cellSize: 0,
            scores: [
                {
                    name: 'David Hayter',
                    fruit: 4,
                    time: 10,
                    score: 30
                },
                {
                    name: 'John Doe',
                    fruit: 2,
                    time: 6,
                    score: 16
                },
                {
                    name: 'Salazar Slytherin',
                    fruit: 11,
                    time: 67,
                    score: 122
                }
            ],
            user: {
                name: 'Player 1',
                time: 0,
                score: 0,
                fruit: 0
            },
            difficulty: 75,
        }
    },
    methods: {
        createGrid() {
            this.grid = [Math.floor(this.canvasWidth / this.snakeSize), Math.floor(this.canvasHeight / this.snakeSize)];    

            if(this.grid[0] % 2==0) this.grid[0]--;
            if(this.grid[1] % 2==0) this.grid[1]--;

            this.cellSize = this.canvasWidth / this.grid[0];
        },
        loadUserCookie() {
            const cookieValues = document.cookie.split('; ').filter(row => row.startsWith('user_'));
        
            if (cookieValues) {
                cookieValues.map((cookieValue) => {
                    const userObj = JSON.parse(cookieValue.split('=')[1]);
                    this.scores.push(Object.assign({},userObj));
                });
            } else {
                return null;
            }
        },
        showSplashScreen() {
            this.$refs.SplashScreen.showSplashScreen();
        },
        showHighScores() {
            this.$refs.HighScores.showHighScores();
        },
        updateUserName(name) {
            this.user.name = name;
        },
        startGame() {
            this.$refs.SplashScreen.hideSplashScreen();
            this.$refs.HighScores.hideHighScores();
            this.$refs.canvas.placeSnakeStartPos();
            this.$refs.canvas.addStartTail();
            this.$refs.canvas.addObstacles();
            this.$refs.canvas.changeSnakeDirection('up');
            this.$refs.canvas.setControlStatus('normal');
            

            // game.startTicks();
            // game.startClock();
            console.log('startGame');
        },
        resetGame() {
            // game.removeObstacles();
            // game.removeTail();
            // game.resetFruitCounter();
            // data.resetTickSpeed();
            console.log('reset');
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
        this.loadUserCookie();
    },
    template: /* html */
    `
        <Canvas 
            ref="canvas"
            @emit-canvas-width="handleCanvasWidth"
            @emit-canvas-height="handleCanvasHeight"
            :cellSize="cellSize"
            :grid="grid"
            :difficulty="difficulty"
        />
        <SplashScreen
            ref="SplashScreen"
            :updateUserName="updateUserName"
            :showHighScores="showHighScores"
            :startGame="startGame"
            :resetGame="resetGame"
        />
        <HighScores
            ref="HighScores"
            :scores="scores"
            :showSplashScreen="showSplashScreen"
            :startGame="startGame"
            :resetGame="resetGame"
        />
    `
});

app.component('Canvas', Canvas);
app.component('SnakeHead', SnakeHead);
app.component('SplashScreen', SplashScreen);
app.component('HighScores', HighScores);

app.mount('#app');