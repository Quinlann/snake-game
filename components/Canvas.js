export default {
    props: ['cellSize','grid','difficulty'],
    components: ['SnakeHead'],
    data() {
        return {
            tail: [],
            obstacles: [],
            cells: [],
            obstacleTypes: ['wall'],
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
        },
        addObstacles() {
            // add more obstacles depending on screen width and difficulty level
            let numberOfObstacles = Math.ceil((Math.floor(this.grid[0] / 20) * this.difficulty) / 2) + 1;
            for (let i = 0; i < numberOfObstacles; i++) {
                this.addObstacle();
                console.log(`${i}/${numberOfObstacles}`);
            }
        },
        addObstacle() {
            this.calcAvailableCells();

            let chosenCell = this.cells[Math.floor(Math.random() * this.cells.length)];
            this.obstacles.push({
                type: this.obstacleTypes[0],
                x: chosenCell[0],
                y: chosenCell[1]
            });
        },
        calcAvailableCells() {
            this.cells.length = 0;
            for (let r = 2; r <= this.grid[1]-2; r++) {
                for (let c = 2; c <= this.grid[0]-2; c++) {
                    let cellIsOccupied = false;
                    
                    // check if there is already an obstacle at that coor
                    this.obstacles.map((obs) => {
                        if(obs.x === c && obs.y === r) cellIsOccupied = true;
                    });
    
                    // check if there is already a fruit at that coor
                    // data.fruit.map((fruit) => {
                    //     if(fruit.x === c && fruit.y === r) cellIsOccupied = true;
                    // });
    
                    // check if there is a tail at that coor
                    this.tail.map((tail) => {
                        if(tail.x === c && tail.y === r) cellIsOccupied = true;
                    });
    
                    // don't place anything on the same row or column as snake head
                    if(this.$refs.SnakeHead.pos[0] === c || this.$refs.SnakeHead.pos[1] === r) cellIsOccupied = true;
                    
                    if(cellIsOccupied) continue
    
                    this.cells.push([c,r]);
                }
            }
        },
        changeSnakeDirection(direction) {
            this.$refs.changeDirection(direction);
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
            <div v-for="obs in obstacles" class="obstacle" :class="obs.type" :style="{left: obs.x * this.cellSize + 'px', top: obs.y * this.cellSize + 'px', width: this.cellSize + 'px',}"></div>
        </div>
    `
}