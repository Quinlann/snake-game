export default {
    props: ['scores','showSplashScreen','startGame','resetGame'],
    data() {
        return {
            showingHighScore: false
        }
    },
    methods: {
        mainMenuBtn() {
            this.hideHighScores();
            this.showSplashScreen();
        },
        tryAgainBtn() {
            this.resetGame();
            this.startGame();
        },
        hideHighScores() {
            this.showingHighScore = false;
        },
        showHighScores() {
            this.showingHighScore = true;
        }
    },
    template: /* html */
    `
    <div id="highscores-container" v-show="showingHighScore">
        <div id="highscores">
        <h1 id="highscores-header">High Scores</h1>
        <div id="highscores-list-container">
            <ol id="highscores-list">
                <li v-for="(user, index) in scores" :key="index">
                    <span>{{ user.name }}</span> | <span>Fruit: {{ user.fruit }}</span> | <span>Time: {{ user.time }}</span> | <span>SCORE: {{ user.score }}</span>
                </li>
            </ol>
        </div>
        <footer id="highscores-footer">
            <button id="highscores-try-again-btn" @click="tryAgainBtn">Try Again</button>
            <button id="highscores-main-menu-btn" @click="mainMenuBtn">Main Menu</button>
        </footer>
        </div>
    </div>
    `
}