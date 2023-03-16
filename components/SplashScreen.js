export default {
    props: ['updateUserName'],
    data() {
        return {}
    },
    methods: {
        startGameBtn() {
            console.log('START GAME');
        },
        highScoreBtn() {
            console.log('HIGH SCORE');
        },
        handleUserName(inputEvent) {
            this.updateUserName(inputEvent.target.value);
        }
    },
    template: /* html */
    `
        <div id="splashscreen-container">
            <div id="splashscreen">
                <h1 id="splash-header">PEARL PLATE PYTHON</h1>
                <div id="splash-controls-container">
                    <input @input="handleUserName" type="text" id="username-input" placeholder="Enter your username"/>
                    <button id="splash-start-game-btn" @click="startGameBtn">START</button>
                    <button id="splash-highscore-btn" @click="highScoreBtn">HIGH SCORE</button>
                </div>
            </div>
        </div>
    `
}