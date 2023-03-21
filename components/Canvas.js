export default {
    props: ['cellSize','grid'],
    components: ['SnakeHead'],
    data() {
        return {}
    },
    methods: {
        placeSnakeStartPos() {
            const startPos = [Math.ceil(this.grid[0] / 2), Math.ceil(this.grid[1] / 2)];
            this.placeSnakeAtPos(startPos);
        },
        placeSnakeAtPos(pos) {
            this.$refs.SnakeHead.placeAtNewPosition(pos);
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
                ref="SnakeHead"
                :cellSize="cellSize"
                :grid="grid"
            />
        </div>
    `
}