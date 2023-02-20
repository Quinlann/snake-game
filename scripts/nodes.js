const nodes = {
    initialize: () => {
        nodes.canvas = document.getElementById('canvas');
        nodes.snakeHead = document.getElementById('snake-head');
        nodes.highScoresList = document.getElementById('highscores-list');
        nodes.highScoresContainer = document.getElementById('highscores-container');
        nodes.hightScoresTryAgain = document.getElementById('highscores-try-again-btn');
        nodes.highScoresMainMenu = document.getElementById('highscores-main-menu-btn');
        nodes.timeStatus = document.getElementById('time-status');
    }
}

export default nodes