export default {
    props: ['updateUserName','showHighScores', 'startGame','resetGame'],
    data() {
        return {
            splashShowing: true
        }
    },
    methods: {
        startGameBtn() {
            this.resetGame();
            this.startGame();
        },
        highScoreBtn() {
            this.hideSplashScreen();
            this.showHighScores();
        },
        hideSplashScreen() {
            this.splashShowing = false;
        },
        showSplashScreen() {
            this.splashShowing = true;
        },
        handleUserName(inputEvent) {
            this.updateUserName(inputEvent.target.value);
        }
    },
    template: /* html */
    `
    <div v-show="splashShowing" id="splashscreen-container">
        <div id="splashscreen">
            <h1 id="splash-header">PEARL PLATE PYTHON</h1>
            <div id="splash-controls-container">
                <input @input="handleUserName" type="text" id="username-input" placeholder="Enter your username" value="Player 1"/>
                <button id="splash-start-game-btn" @click="startGameBtn">START</button>
                <button id="splash-highscore-btn" @click="highScoreBtn">HIGH SCORE</button>
            </div>
        </div>
    </div>
    `
}