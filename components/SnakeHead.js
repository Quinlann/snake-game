export default {
    props: ['cellSize'],
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
        updatePosition(newPos) {
            this.pos = newPos;
        },
        placeAtNewPosition(newPos) {
            this.updatePosition(newPos);
            this.placeAtPosition();
        },
        placeAtPosition() {
            this.$refs['snake-head'].style.left = `${this.pos[0] * this.cellSize}px`;
            this.$refs['snake-head'].style.top = `${this.pos[1] * this.cellSize}px`;
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