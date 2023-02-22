# Pearl Plate Python

This is a classic snake game remade using HTML5, CSS3, and JavaScript. The game was developed in 7 hours (excluding graphics) and is playable online, hosted at Google Firebase [here](https://snake-game-cb161.web.app).

The snake is controlled using either the arrow keys or the WASD keys.

The codebase can be found on GitHub [here](https://github.com/Quinlann/snake-game).

## Features

- Fruits are placed randomly on the map and disappear after a random amount of time.
- Random obstacles are added at the start of every new game.
- Neither obstacles nor fruit will be placed directly in front of the snake to prevent the snake from running into an obstacle immediately after the game starts.
- The number of obstacles and fruit will vary according to screen width and difficulty level (the difficulty level is not yet editable by the player, but can be found in the data object).
- Username, current time, and the number of fruit eaten are displayed at the bottom of the screen at all times.
- The game ends when the snake hits either an obstacle, the sides of the map, or its tail.

## Start Screen

- Start screen with a title and the ability to type in your username.
- The start screen features a start-game button and a high score button.
- If you type in a new username, the game will store the score to that username in a cookie and display it on the high score page.
- By typing an existing username, you can improve the score.

## High Score Screen

- The high score screen has a try again and a main menu button.
- High scores are remembered from session to session via cookies.
- The high score screen has a list of all players who have played the game, and it's sorted by their calculated scores.
- The score is calculated as follows: every second in the game is worth one point, and every fruit is worth five points.

## Game Mechanics

- The game runs on ticks, every tick the snake checks if it hits anything and moves, meaning that the time between ticks determines the speed of the snake.
- When the user hits a navigational button on the keyboard, a tick is immediately evoked to remove waiting time between user interaction and the next tick.
- The aesthetics of the game are created by and inspired by my girls' work with perl plates, and the font used is inspired by retro gaming.

## Future Features

Here are some features that were planned, but not implemented due to time constraints:

- Reading up on Vue.js and using it to insert obstacles, fruit, and the snake's trail.
- Sound effects.
- Rewarding/punishing animation of flying particles with GSAP when the user eats fruit or dies.
- The snake moving faster and faster as fruits are picked up.
- Fruit that gives more points but boosts the speed for a few seconds.