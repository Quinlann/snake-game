export default {
    props: ['cellSize'],
    components: ['SnakeHead'],
    data() {
        return {}
    },
    methods: {},
    mounted() {
        // $emit
        this.$emit('emit-canvas-width', this.$refs.canvas.getBoundingClientRect().width);
        this.$emit('emit-canvas-height', this.$refs.canvas.getBoundingClientRect().height);
    },
    emits: ['emit-canvas-width','emit-canvas-height'],
    template: /* html */
    `
        <div id="canvas" ref="canvas" 
            :style="{backgroundSize: this.cellSize + 'px'}"
        >
            <SnakeHead 
                :cellSize="cellSize"
            />
        </div>
    `
}