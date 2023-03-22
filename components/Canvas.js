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
            for (let i = 2; i > -1; i--) {
                this.addTail(this.$refs.SnakeHead.pos[0], this.$refs.SnakeHead.pos[1] + (i));
            }
        },
        addTail(x, y) {
            const tailId = this.tail.length === 0 ? 0 : this.tail[this.tail.length - 1].id + 1;
            this.tail.push({
                id: tailId,
                x: x,
                y: y
            });
        },
        updateTail() {
            this.addTail(this.$refs.SnakeHead.pos[0], this.$refs.SnakeHead.pos[1]);
            this.removeTailEnd();
        },
        removeTailEnd() {
            this.tail.shift();
        },
        removeTail() {
            if(!this.$refs.tailPart) return

            for (let t = 0; t < this.$refs.tailPart.length; t++) {
                this.tail.pop();
            }
        },
        addObstacles() {
            // add more obstacles depending on screen width and difficulty level
            const t0 = performance.now();
            let numberOfObstacles = Math.ceil((Math.floor(this.grid[0] / 20) * this.difficulty) / 2) + 1;
            for (let i = 0; i < numberOfObstacles; i++) {
                this.addObstacle();
                console.table(`Loading: ${i}/${numberOfObstacles}`);
            }
            const t1 = performance.now();
            console.table(`Adding obstacles took ${t1 - t0} milliseconds.`);
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
        removeObstacles() {
            console.log(this.$refs.obstacle);
            if(!this.$refs.obstacle) return

            for (let o = 0; o < this.$refs.obstacle.length; o++) {
                this.obstacles.pop();
            }
        },
        calcAvailableCells() {

            const tempObstaclesArr = [...this.obstacles],
            tempTailArr = [...this.tail];

            for (let i = 0; i < this.cells.length; i++) {
                const cell = this.cells[i];

                let cellIsOccupied = false; 

                // check if there is already an obstacle at that coor
                const obstacleContainsCoor = tempObstaclesArr.some((coordinate) => coordinate.x === cell[0] && coordinate.y === cell[1]);
                if(obstacleContainsCoor) cellIsOccupied = true;

                // check if there is a tail at that coor
                const tailContainsCoor = tempTailArr.some((coordinate) => coordinate.x === cell[0] && coordinate.y === cell[1]);
                if(tailContainsCoor) cellIsOccupied = true;
                
                // don't place anything on the same row or column as snake head
                if(this.$refs.SnakeHead.pos[0] === cell[0] || this.$refs.SnakeHead.pos[1] === cell[1]) cellIsOccupied = true;

                if(!cellIsOccupied) continue

                this.cells.splice(i, 1);
            }

            return

            for (let r = 2; r <= this.grid[1]-2; r++) {
                for (let c = 2; c <= this.grid[0]-2; c++) {
                    let cellIsOccupied = false;
                    
                    /**
                    // check if there is already an obstacle at that coor
                    this.obstacles.map((obs) => {
                        if(obs.x === c && obs.y === r) cellIsOccupied = true;
                    });
                    /**/
    
                    /**
                    // check if there is already a fruit at that coor
                    // data.fruit.map((fruit) => {
                    //     if(fruit.x === c && fruit.y === r) cellIsOccupied = true;
                    // });
                    /**/
    
                    /**
                    // check if there is a tail at that coor
                    this.tail.map((tail) => {
                        if(tail.x === c && tail.y === r) cellIsOccupied = true;
                    });
                    /**/
    
                    // don't place anything on the same row or column as snake head
                    if(this.$refs.SnakeHead.pos[0] === c || this.$refs.SnakeHead.pos[1] === r) cellIsOccupied = true;
                    
                    if(cellIsOccupied) continue
    
                    this.cells.push([c,r]);
                }
            }
        },
        createCells(cols, rows) {
            this.cells = [];
            for (let r = 2; r <= rows-2; r++) {
                for (let c = 2; c <= cols-2; c++) {
                    this.cells.push([c,r]);
                }
            }
        },
        changeSnakeDirection(direction) {
            this.$refs.SnakeHead.changeDirection(direction);
        },
        setControlStatus(status) {
            this.$refs.SnakeHead.setControlStatus(status);
        },
        getSnakeDirection() {
            return this.$refs.SnakeHead.direction;
        },
        getSnakePos() {
            return this.$refs.SnakeHead.pos;
        },
        updateSnakePosAndMove(newPos){
            this.$refs.SnakeHead.placeAtNewPosition(newPos);
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
            <div ref="tailPart" v-for="part in tail" class="tail" 
                :key="part.id"
                :data-id="part.id"
                :style="{left: part.x * this.cellSize + 'px', top: part.y * this.cellSize + 'px', width: this.cellSize + 'px', height: this.cellSize + 'px'}"
            ></div>
            <div ref="obstacle" v-for="obs in obstacles" class="obstacle"
                :class="obs.type"
                :style="{left: obs.x * this.cellSize + 'px', top: obs.y * this.cellSize + 'px', width: this.cellSize + 'px',}"
            ></div>
        </div>
    `
}