import nodes from './scripts/nodes.js'
import data from './scripts/data.js'
import game from './scripts/game.js'

window.onload = () => {
    nodes.initialize();
    data.initialize();
    game.initialize();
}