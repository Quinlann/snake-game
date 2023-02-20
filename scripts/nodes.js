const nodes = {
    initialize: () => {
        nodes.canvas = document.getElementById('canvas');
        nodes.snakeHead = document.getElementById('snake-head');
        nodes.scoresList = document.getElementById('scores-list');
        nodes.scoresContainer = document.getElementById('high-scores-container');
        nodes.scoresTryAgain = document.getElementById('scores-try-again-btn');
        nodes.scoresMainMenu = document.getElementById('scores-main-menu-btn');
    }
}  

export default nodes