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
            gameTick: null,
            speed: 200,
        }
    },
    methods: {
        handleCanvasWidth(canvasWidth) {
            this.canvasWidth = canvasWidth;
        },
        handleCanvasHeight(canvasHeight) {
            this.canvasHeight = canvasHeight;
        },
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

            this.startTicks();


            // game.startClock();
            console.log('startGame');
        },
        stopGame() {
            console.log('stop game');
        },
        resetGame() {
            // game.removeObstacles();
            // game.removeTail();
            // game.resetFruitCounter();
            // data.resetTickSpeed();
            console.log('reset');
        },
        startTicks() {
            this.gameTick = setInterval(() => {
                this.tick();
            }, this.speed);
        },
        stopTicks() {
            console.log('stopTicks');
        },
        tick() {
            console.log('tick');
            const snakePos = this.$refs.canvas.getSnakePos();

            switch (this.$refs.canvas.getSnakeDirection()) {
                case 'up':
                    if (this.checkCollision(snakePos[0], snakePos[1] - 1)) {
                        this.stopGame();
                        return
                    }
                    this.$refs.canvas.updateSnakePosAndMove([snakePos[0], snakePos[1] - 1]);
                    // game.updateTail();
                    break;
    
                case 'left':
                    if (this.checkCollision(snakePos[0] - 1, snakePos[1])) {
                        this.stopGame();
                        return
                    }
                    this.$refs.canvas.updateSnakePosAndMove([snakePos[0] - 1, snakePos[1]]);
                    // game.updateTail();
                    break;

                case 'down':
                    if (this.checkCollision(snakePos[0], snakePos[1] + 1)) {
                        this.stopGame();
                        return
                    }
                    this.$refs.canvas.updateSnakePosAndMove([snakePos[0], snakePos[1] + 1]);
                    // game.updateTail();
                    break;

                case 'right':
                    if (this.checkCollision(snakePos[0] + 1, snakePos[1])) {
                        this.stopGame();
                        return
                    }
                    this.$refs.canvas.updateSnakePosAndMove([snakePos[0] + 1, snakePos[1]]);
                    // game.updateTail();
                    break;
    
                default:
                    break;
            }
        },
        checkCollision(x, y) {
            let collision = false;
    
            // collision with canvas walls
            if (x === this.grid[0]) {
                this.stopTicks();
                collision = true;
            } else if (x === 0) {
                this.stopTicks();
                collision = true;
            } else if (y === this.grid[1]) {
                this.stopTicks();
                collision = true;
            } else if (y === 0) {
                this.stopTicks();
                collision = true;
            }
    
            // collision with obstacles
            this.$refs.canvas.obstacles.map((obs) => {
                if (x === obs.x && y === obs.y) {
                    this.stopTicks();
                    collision = true;
                }
            });
    
            // collision with tail
            for (let t = 1; t < this.$refs.canvas.tail.length; t++) {
                const tailPart = this.$refs.canvas.tail[t];
                if (x === tailPart.x && y === tailPart.y) {
                    this.stopTicks();
                    collision = true;
                }
            }
    
            // collision with fruit
            // data.fruit.map((fruit) => {
            //     if (x === fruit.x && y === fruit.y) {
            //         game.removeFruit(fruit.id, true);
            //         game.extendTail();
            //     }
            // });
    
            return collision
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