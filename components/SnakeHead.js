export default {
    props: ['cellSize','grid'],
    data() {
        return {
            controlsStatus: 'normal',
            pos: [0,0],
            direction: 'up'
        }
    },
    methods: {
        keyHandler(event) {
            if (event.code === 'KeyW' || event.code === 'ArrowUp') {
                if (this.controlsStatus === 'normal') this.pressUp();
            } else if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
                if (this.controlsStatus === 'normal') this.pressLeft();
            } else if (event.code === 'KeyS' || event.code === 'ArrowDown') {
                if (this.controlsStatus === 'normal') this.pressDown();
            } else if (event.code === 'KeyD' || event.code === 'ArrowRight') {
                if (this.controlsStatus === 'normal') this.pressRight();
            }
        },
        pressUp() {
            console.table('UP');
        },
        pressLeft() {
            console.table('LEFT');
        },
        pressDown() {
            console.table('DOWN');
        },
        pressRight() {
            console.table('RIGHT');
        },
        setStartPos() {
            this.pos[0] = Math.ceil(this.grid[0] / 2);
            this.pos[1] = Math.ceil(this.grid[1] / 2);
        },
        placeAtPosition() {
            // console.log(this.$refs['snake-head']);
            // node.style.left = `${pos[0]}px`;
            // node.style.top = `${pos[1]}px`;
        }
    },
    beforeMount() {
        document.addEventListener('keydown', this.keyHandler);
    },
    mounted() {},
    template:/* html */
    `
        <div ref="snake-head" id="snake-head" class="up" :style="{width: this.cellSize + 'px'}"></div>
    `
}