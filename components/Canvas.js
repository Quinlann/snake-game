import SnakeHead from './SnakeHead.js'

export default {
    components: [SnakeHead],
    data() {
        return {
            canvasNode: null
        }
    },
    mounted() {
        this.canvasNode = document.getElementById('canvas');

        // $emit
        this.$emit('emit-canvas-width', this.canvasNode.getBoundingClientRect().width);
        this.$emit('emit-canvas-height', this.canvasNode.getBoundingClientRect().height);
    },
    emits: ['emit-canvas-width','emit-canvas-height'],
    template: /* html */
    `
        <div id="canvas">
            <SnakeHead/>
        </div>
    `
}