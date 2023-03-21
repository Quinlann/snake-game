export default {
    props: ['cellSize','grid'],
    components: ['SnakeHead'],
    data() {
        return {
            tail: []
        }
    },
    methods: {
        placeSnakeStartPos() {
            const startPos = [Math.ceil(this.grid[0] / 2), Math.ceil(this.grid[1] / 2)];
            this.placeSnakeAtPos(startPos);
        },
        placeSnakeAtPos(pos) {
            this.$refs.SnakeHead.placeAtNewPosition(pos);
        },
        addStartTail() {
            this.$refs.SnakeHead.addStartTail();
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
        <div id="canvas" 
            ref="canvas" 
            :style="{backgroundSize: this.cellSize + 'px'}"
        >
            <SnakeHead 
                ref="SnakeHead"
                :cellSize="cellSize"
                :tail="tail"
            />
            <div v-for="part in tail" class="tail" :key="part.id" :style="{left: part.x * this.cellSize + 'px', top: part.y * this.cellSize + 'px', width: this.cellSize + 'px', height: this.cellSize + 'px'}"></div>
        </div>
    `
}