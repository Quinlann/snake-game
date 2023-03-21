export default {
    props: ['cellSize','grid'],
    components: ['SnakeHead'],
    data() {
        return {}
    },
    methods: {
        setSnakeStartPos() {
            this.$refs.snakeHead.setStartPos();
        },
        placeSnakeAtPos() {
            this.$refs.snakeHead.placeAtPosition();
        }
    },
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
                ref="snakeHead"
                :cellSize="cellSize"
                :grid="grid"
            />
        </div>
    `
}