export default {
    props: ['fruit', 'time'],
    template: /* html */
    `
    <div id="game-stats-container">
        <div id="fruit-status" class="game-stat">Fruit: {{ this.fruit }}</div>
        <div id="time-status" class="game-stat">Time: {{ this.time }}</div>
    </div>
    `
}