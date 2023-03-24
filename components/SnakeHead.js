export default {
    props: ['cellSize','tick','startTicks','stopTicks'],
    data() {
        return {
            controlsStatus: 'inactive',
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
            if (this.checkValidInput('up')) this.changeDirection('up');
        },
        pressLeft() {
            if (this.checkValidInput('left')) this.changeDirection('left');
        },
        pressDown() {
            if (this.checkValidInput('down')) this.changeDirection('down');
        },
        pressRight() {
            if (this.checkValidInput('right')) this.changeDirection('right');
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
        },
        changeDirection(direction) {
            this.direction = direction;
            this.$refs['snake-head'].classList.remove('up', 'left', 'down', 'right');
            this.$refs['snake-head'].classList.add(this.direction);

            // emmidiate response on key stroke, not wait for next tick
            // buggy.... snake gets too fast for some reason
            // this.stopTicks();
            // this.tick();
            // this.startTicks();
        },
        checkValidInput(direction) {
            if (this.direction === direction) return false
            if (direction === 'up' && this.direction === 'down') return false
            if (direction === 'left' && this.direction === 'right') return false
            if (direction === 'down' && this.direction === 'up') return false
            if (direction === 'right' && this.direction === 'left') return false
            return true
        },
        setControlStatus(status) {
            this.controlsStatus = status;
        },
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