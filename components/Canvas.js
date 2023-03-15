import SnakeHead from './SnakeHead.js'

export default {
    components: [SnakeHead],
    data() {
        return {
            canvasWidth: 0
        }
    },
    mounted() {
        this.canvasWidth = document.getElementById('canvas').getBoundingClientRect().width;
    },
    template: /* html */
    `
        <div id="canvas">
            <SnakeHead/>
        </div>
    `
}