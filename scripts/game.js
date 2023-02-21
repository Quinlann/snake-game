import nodes from './nodes.js'
import data from './data.js'

const game = {
    initialize: () => {
        game.setSnakeSize();
        game.addControls();
        game.loadUserCookie();
        game.setupSplashScreenBtns();
        game.setupUsernameInput();
        game.showSplash();
    },
    showSplash: () => {
        nodes.splashContainer.classList.remove('inactive');
    },
    hideSplash: () => {
        nodes.splashContainer.classList.add('inactive');
    },
    setupSplashScreenBtns: () => {
        nodes.splashStartBtn.addEventListener('click', () => {
            if (!data.user.name) return
            game.resetGame();
            game.startGame();
        });

        nodes.splashHighScoreBtn.addEventListener('click', () => {
            game.hideSplash();
            game.calcUserScore();
            data.renderScores();
            game.showHighScores();
        });
    },
    setSnakeSize: () => {
        nodes.snakeHead.style.width = `${data.cellSize}px`;
        nodes.canvas.style.backgroundSize = `${data.cellSize}px`;
    },
    placeAtPosition: (node, pos) => {
        node.style.left = `${pos[0]}px`;
        node.style.top = `${pos[1]}px`;
    },
    addStartTail: () => {
        for (let i = 0; i < 3; i++) {
            const [tailId, x, y] = [data.tail.length, data.snake.x, data.snake.y - (i + 1)];
            data.tail.push({
                id: tailId,
                x: x,
                y: y
            });
            game.renderTail(x, y, tailId);
        }
    },
    updateTail: () => {
        game.addTail(data.snake.x, data.snake.y);
        game.removeTailEnd();
    },
    extendTail: () => {
        game.addTail(data.snake.x, data.snake.y);
    },
    addTail: (x, y) => {
        const tailId = data.tail.length === 0 ? 0 : data.tail[data.tail.length - 1].id + 1;
        data.tail.push({
            id: tailId,
            x: x,
            y: y
        });
        game.renderTail(x, y, tailId);
    },
    removeTailEnd: () => {
        const removedTailEnd = data.tail.shift(),
            tailEndNode = document.querySelector(`.tail[data-tail-id="${removedTailEnd.id}"]`);
        tailEndNode.parentNode.removeChild(tailEndNode);
    },
    renderTail: (x, y, id) => {
        const tailNode = document.createElement('div');
        tailNode.classList.add('tail');
        tailNode.setAttribute('data-tail-id', id);
        tailNode.style.left = `${x * data.cellSize}px`;
        tailNode.style.top = `${y * data.cellSize}px`;
        tailNode.style.width = `${data.cellSize}px`;
        tailNode.style.backgroundSize = `${data.cellSize}px`;

        nodes.canvas.appendChild(tailNode);
    },
    removeTail: () => {
        const allTailNodes = document.querySelectorAll('.tail');

        for (let t = 0; t < allTailNodes.length; t++) {
            const tailNode = allTailNodes[t];
            tailNode.parentNode.removeChild(tailNode);
        }
        data.tail.length = 0;
    },
    addControls: () => {
        document.addEventListener('keydown', (event) => {
            if (event.code === 'KeyW' || event.code === 'ArrowUp') {
                if (data.controlsStatus === 'normal') game.pressUp();
            } else if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
                if (data.controlsStatus === 'normal') game.pressLeft();
            } else if (event.code === 'KeyS' || event.code === 'ArrowDown') {
                if (data.controlsStatus === 'normal') game.pressDown();
            } else if (event.code === 'KeyD' || event.code === 'ArrowRight') {
                if (data.controlsStatus === 'normal') game.pressRight();
            }
        });
    },
    pressUp: () => {
        if (game.checkValidInput('up')) game.changeDirection('up');
    },
    pressLeft: () => {
        if (game.checkValidInput('left')) game.changeDirection('left');
    },
    pressDown: () => {
        if (game.checkValidInput('down')) game.changeDirection('down');
    },
    pressRight: () => {
        if (game.checkValidInput('right')) game.changeDirection('right');
    },
    changeDirection: (direction) => {
        data.snake.direction = direction;
        nodes.snakeHead.classList.remove('up', 'left', 'down', 'right');
        nodes.snakeHead.classList.add(data.snake.direction);

        // emmidiate response on key stroke, not wait for next tick
        game.stopTicks();
        game.tick();
        game.startTicks();
    },
    checkValidInput: (direction) => {
        if (data.snake.direction === direction) return false
        if (direction === 'up' && data.snake.direction === 'down') return false
        if (direction === 'left' && data.snake.direction === 'right') return false
        if (direction === 'down' && data.snake.direction === 'up') return false
        if (direction === 'right' && data.snake.direction === 'left') return false
        return true
    },
    tick: () => {
        switch (data.snake.direction) {
            case 'up':
                if (game.checkCollision(data.snake.x, data.snake.y - 1)) {
                    game.stopGame();
                    return
                }
                data.snake.y--;
                game.placeAtPosition(nodes.snakeHead, [data.snake.x * data.cellSize, data.snake.y * data.cellSize]);
                game.updateTail();
                break;

            case 'left':
                if (game.checkCollision(data.snake.x - 1, data.snake.y)) {
                    game.stopGame();
                    return
                }
                data.snake.x--;
                game.placeAtPosition(nodes.snakeHead, [data.snake.x * data.cellSize, data.snake.y * data.cellSize]);
                game.updateTail();
                break;

            case 'down':
                if (game.checkCollision(data.snake.x, data.snake.y + 1)) {
                    game.stopGame();
                    return
                }
                data.snake.y++
                game.placeAtPosition(nodes.snakeHead, [data.snake.x * data.cellSize, data.snake.y * data.cellSize]);
                game.updateTail();
                break;

            case 'right':
                if (game.checkCollision(data.snake.x + 1, data.snake.y)) {
                    game.stopGame();
                    return
                }
                data.snake.x++
                game.placeAtPosition(nodes.snakeHead, [data.snake.x * data.cellSize, data.snake.y * data.cellSize]);
                game.updateTail();
                break;

            default:
                break;
        }
    },
    startGame: () => {
        game.hideHighScores();
        game.hideSplash();
        data.setStartPos();
        game.placeAtPosition(nodes.snakeHead, [data.snake.x * data.cellSize, data.snake.y * data.cellSize]);
        game.addStartTail();
        game.addObstacles();
        game.renderObstacles();
        game.startTicks();
        game.changeDirection('up');
        data.controlsStatus = 'normal';
        game.startClock();
    },
    stopGame: () => {
        data.controlsStatus = 'inactive';
        game.stopClock();
        game.calcUserScore();
        data.renderScores();
        game.showHighScores();
    },
    resetGame: () => {
        game.removeObstacles();
        game.removeTail();
        game.resetFruitCounter();
    },
    startTicks: () => {
        game.gameTick = setInterval(() => {
            game.tick();
        }, data.speed);
    },
    stopTicks: () => {
        clearInterval(game.gameTick);
    },
    gameTick: null,
    checkCollision: (x, y) => {
        let collision = false;

        // collision with canvas walls
        if (x === data.grid[0]) {
            game.stopTicks();
            collision = true;
        } else if (x === 0) {
            game.stopTicks();
            collision = true;
        } else if (y === data.grid[1]) {
            game.stopTicks();
            collision = true;
        } else if (y === 0) {
            game.stopTicks();
            collision = true;
        }

        // collision with obstacles
        data.obstacles.map((obs) => {
            if (x === obs.x && y === obs.y) {
                game.stopTicks();
                collision = true;
            }
        });

        // collision with tail
        for (let t = 1; t < data.tail.length; t++) {
            const tailPart = data.tail[t];
            if (x === tailPart.x && y === tailPart.y) {
                game.stopTicks();
                collision = true;
            }
        }

        // collision with fruit
        data.fruit.map((fruit) => {
            if (x === fruit.x && y === fruit.y) {
                game.removeFruit(fruit.id, true);
                game.extendTail();
            }
        });

        return collision
    },
    addObstacles: () => {
        // add more obstacles depending on screen width and difficulty level
        let numberOfObstacles = Math.ceil((Math.floor(data.grid[0] / 20) * data.difficulty) / 2) + 1
        for (let i = 0; i < numberOfObstacles; i++) game.addObstacle();
    },
    addObstacle: () => {
        data.calcAvailableCells();
        let chosenCell = data.cells[Math.floor(Math.random() * data.cells.length)];
        data.obstacles.push({
            type: data.obstacleTypes[0],
            x: chosenCell[0],
            y: chosenCell[1]
        });
    },
    renderObstacles: () => {
        data.obstacles.map((obs) => {
            const obsNode = document.createElement('div');
            obsNode.classList.add('obstacle', obs.type);
            obsNode.style.left = `${obs.x * data.cellSize}px`;
            obsNode.style.top = `${obs.y * data.cellSize}px`;
            obsNode.style.width = `${data.cellSize}px`;
            obsNode.style.backgroundSize = `${data.cellSize}px`;

            nodes.canvas.appendChild(obsNode);
        });
    },
    removeObstacles: () => {
        const obstacleNodes = document.querySelectorAll('.obstacle');
        for (let o = 0; o < obstacleNodes.length; o++) {
            const obsNode = obstacleNodes[o];
            obsNode.parentNode.removeChild(obsNode);
        }
        data.obstacles.length = 0;
    },
    showHighScores: () => {
        nodes.highScoresContainer.classList.remove('inactive');
    },
    hideHighScores: () => {
        nodes.highScoresContainer.classList.add('inactive');
    },
    calcUserScore: () => {
        const exisitingScore = data.scores.find(x => x.name === data.user.name);

        data.user.score = data.user.time + (data.user.fruit * 5);

        if (!exisitingScore) data.scores.push(Object.assign({}, data.user));
        else if (exisitingScore && data.user.score > exisitingScore.score) {
            Object.assign(exisitingScore, data.user);
        }

        game.saveUserCookie(data.user);

        data.scores.sort((a, b) => b.score - a.score);
    },
    clock: null,
    startClock: () => {
        data.user.time = -1;
        game.updateClock();
        game.clock = setInterval(() => {
            game.updateClock();
        }, 1000);
    },
    stopClock: () => {
        clearInterval(game.clock);
    },
    updateClock: () => {
        data.user.time++;
        nodes.timeStatus.innerText = `Time: ${data.user.time}`;

        if (data.user.time % 4 === 0) {
            const addedFruitNum = Math.floor(data.grid[0] / 10);
            for (let f = 0; f < addedFruitNum; f++) game.addFruit();
        }
    },
    addFruit: () => {
        data.calcAvailableCells();
        let chosenCell = data.cells[Math.floor(Math.random() * data.cells.length)],
            fruitId = 0,
            lifeSpan = (Math.random() * 20) + 10;

        if (data.fruit.length > 0) {
            fruitId = data.fruit[data.fruit.length - 1].id + 1;
        }

        let newFruitObj = {
            id: fruitId,
            type: data.fruitTypes[0],
            x: chosenCell[0],
            y: chosenCell[1]
        }

        data.fruit.push(newFruitObj);

        game.renderFruit(newFruitObj);

        setTimeout(() => {
            game.removeFruit(fruitId, false);
        }, lifeSpan * 1000);

    },
    removeFruit: (fruitId, givePoint) => {
        for (let f = 0; f < data.fruit.length; f++) {
            let fruit = data.fruit[f];
            if (fruitId === fruit.id) {
                data.fruit.splice(f, 1);

                let fruitNode = document.querySelector(`.fruit[data-fruit-id="${fruitId}"]`);
                fruitNode.parentNode.removeChild(fruitNode);

                break
            }
        }

        if (givePoint) {
            data.user.fruit++;
            game.updateFruitConter();
            
            // faster and faster speed, max speed = 100ms pr tick
            if(data.speed <= 100) return
            game.stopTicks();
            data.speed = data.speed - (data.user.fruit * 10);
            if(data.speed < 100) data.speed = 100;
            console.log(data.speed);
            game.startTicks();
        }
    },
    updateFruitConter: () => {
        nodes.fruitStatus.innerText = `Fruit: ${data.user.fruit}`;
    },
    renderFruit: (fruitObj) => {
        const fruitNode = document.createElement('div');
        fruitNode.classList.add('fruit', fruitObj.type);
        fruitNode.setAttribute('data-fruit-id', fruitObj.id);
        fruitNode.style.left = `${fruitObj.x * data.cellSize}px`;
        fruitNode.style.top = `${fruitObj.y * data.cellSize}px`;
        fruitNode.style.width = `${data.cellSize}px`;
        fruitNode.style.backgroundSize = `${data.cellSize}px`;

        nodes.canvas.appendChild(fruitNode);
    },
    removeAllFruit: () => {
        const fruitNodes = document.querySelectorAll('.fruit');
        for (let o = 0; o < fruitNodes.length; o++) {
            const fruitNode = fruitNodes[o];
            fruitNode.parentNode.removeChild(fruitNode);
        }
        data.fruit.length = 0;
    },
    resetFruitCounter: () => {
        data.user.fruit = 0;
        game.updateFruitConter();
    },
    setupUsernameInput: () => {
        nodes.usernameInput.addEventListener('input', (e) => {
            data.user.name = e.target.value;
            game.updateUsernameHud();
        });
    },
    updateUsernameHud: () => {
        nodes.username.innerText = data.user.name;
    },
    saveUserCookie: (user) => {
        document.cookie = `user_${data.user.name}=${JSON.stringify(user)}; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/`;
    },
    loadUserCookie: () => {
        const cookieValues = document.cookie.split('; ').filter(row => row.startsWith('user_'));
        
        if (cookieValues) {
            cookieValues.map((cookieValue) => {
                const userObj = JSON.parse(cookieValue.split('=')[1]);
                data.scores.push(Object.assign({},userObj));
            });
        } else {
            return null;
        }
    }
}

export default game