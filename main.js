import Canvas from './components/Canvas.js';
import SnakeHead from './components/SnakeHead.js';
import SplashScreen from './components/SplashScreen.js';
import HighScores from './components/HighScores.js';
import LoadingScreen from './components/LoadingScreen.js';
import GameStats from './components/GameStats.js';
import UsernameStat from './components/UsernameStat.js';

const app = Vue.createApp({
    components: ['Canvas','SplashScreen','HighScores','LoadingScreen','GameStats','UsernameStat'],
    data() {
        return {
            loadingStart: 0,
            loadingEnd: 0,
            loadingCurrentNum: 0,
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
            clock: null,
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

            this.$refs.canvas.createCells(this.grid[0], this.grid[1]);
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
            this.calcUserScore();
            this.$refs.HighScores.showHighScores();
        },
        updateUserName(name) {
            this.user.name = name;
        },
        startGame() {
            this.$refs.SplashScreen.hideSplashScreen();
            this.$refs.HighScores.hideHighScores();
            
            this.startLoading();
        },
        startLoading() {
            this.loadingStart = performance.now();
            this.$refs.LoadingScreen.showLoading();
        },
        loadingIsShowing() {
            this.$refs.canvas.placeSnakeStartPos();
            this.$refs.canvas.addStartTail();
            this.$refs.canvas.addObstacles();
            this.$refs.canvas.changeSnakeDirection('up');
            this.$refs.canvas.setControlStatus('normal');
            this.$refs.LoadingScreen.hideLoading();

            this.startTicks();
            this.startClock();

        },
        stopGame() {
            this.$refs.canvas.setControlStatus('inactive');
            this.stopClock();
            this.calcUserScore();
            this.showHighScores();
        },
        resetGame() {
            this.$refs.canvas.createCells(this.grid[0], this.grid[1]);
            this.$refs.canvas.removeObstacles();
            this.$refs.canvas.removeTail();

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
            clearInterval(this.gameTick);
        },
        tick() {
            const snakePos = this.$refs.canvas.getSnakePos();

            switch (this.$refs.canvas.getSnakeDirection()) {
                case 'up':
                    if (this.checkCollision(snakePos[0], snakePos[1] - 1)) {
                        this.stopGame();
                        return
                    }
                    this.$refs.canvas.updateSnakePosAndMove([snakePos[0], snakePos[1] - 1]);
                    this.$refs.canvas.updateTail();
                    break;
    
                case 'left':
                    if (this.checkCollision(snakePos[0] - 1, snakePos[1])) {
                        this.stopGame();
                        return
                    }
                    this.$refs.canvas.updateSnakePosAndMove([snakePos[0] - 1, snakePos[1]]);
                    this.$refs.canvas.updateTail();
                    break;

                case 'down':
                    if (this.checkCollision(snakePos[0], snakePos[1] + 1)) {
                        this.stopGame();
                        return
                    }
                    this.$refs.canvas.updateSnakePosAndMove([snakePos[0], snakePos[1] + 1]);
                    this.$refs.canvas.updateTail();
                    break;

                case 'right':
                    if (this.checkCollision(snakePos[0] + 1, snakePos[1])) {
                        this.stopGame();
                        return
                    }
                    this.$refs.canvas.updateSnakePosAndMove([snakePos[0] + 1, snakePos[1]]);
                    this.$refs.canvas.updateTail();
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
            this.$refs.canvas.fruit.map((fruit) => {
                if (x === fruit.x && y === fruit.y) {
                    this.$refs.canvas.removeFruit(fruit.id, true);
                    this.$refs.canvas.extendTail();
                }
            });
    
            return collision
        },
        handleEndLoading() {
            this.loadingEnd = performance.now();
            console.table(`Loading took ${this.loadingEnd - this.loadingStart} milliseconds.`);
        },
        startClock() {
            this.user.time = -1;
            
            this.updateClock();
            
            this.clock = setInterval(() => {
                this.updateClock();
            }, 1000);
        },
        stopClock() {
            clearInterval(this.clock);
        },
        updateClock() {
            this.user.time++;
            // nodes.timeStatus.innerText = `Time: ${data.user.time}`;
    
            if (this.user.time % 4 === 0) {
                const addedFruitNum = Math.floor(this.grid[0] / 10);
                for (let f = 0; f < addedFruitNum; f++) this.$refs.canvas.addFruit();
            }
        },
        handleFruitPoint() {
            this.user.fruit++;
        },
        calcUserScore() {
            const exisitingScore = this.scores.find(x => x.name === this.user.name);
    
            this.user.score = this.user.time + (this.user.fruit * 5);
    
            if (!exisitingScore) this.scores.push(Object.assign({}, this.user));
            else if (exisitingScore && this.user.score > exisitingScore.score) {
                Object.assign(exisitingScore, this.user);
            }
    
            this.saveUserCookie(this.user);
    
            this.scores.sort((a, b) => b.score - a.score);
        },
        saveUserCookie(user) {
            document.cookie = `user_${this.user.name}=${JSON.stringify(user)}; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/`;
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
            @emit-end-loading="handleEndLoading"
            @emit-add-fruit-point="handleFruitPoint"
            :cellSize="cellSize"
            :grid="grid"
            :difficulty="difficulty"
            :tick="tick"
            :startTicks="startTicks"
            :stopTicks="stopTicks"
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
        <LoadingScreen
            ref="LoadingScreen"
            @emit-loading-showing="loadingIsShowing"
        />
        <GameStats
            :fruit="user.fruit"
            :time="user.time"
        />
        <UsernameStat 
            :userName="user.name"
        />
    `
});

app.component('Canvas', Canvas);
app.component('SnakeHead', SnakeHead);
app.component('SplashScreen', SplashScreen);
app.component('HighScores', HighScores);
app.component('LoadingScreen', LoadingScreen);
app.component('GameStats', GameStats);
app.component('UsernameStat', UsernameStat);

app.mount('#app');