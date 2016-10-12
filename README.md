# Game Time - Tag Pro

## Objective

The objective of the Game Time project was to develop a game using only front-end javascript (no Rails!). To complete the project, game should:
* Indicate when the game is over and won or lost
* Allow the user to start a new game
* Include a clean UI surrounding the actual game interface itself
* Score Tracking: How this works will vary by game, but at the end of the game, generate a score for the winning player
* Scoreboard -- track scores across multiple game sessions. Since we aren't incorporating a server for our games, client-side storage like a cookie or LocalStorage will suffice.
* Create multiple rounds of difficulty. (consider increasing factors such as game speed, randomness of starting setup, etc)

## Game Play

We chose to replicate an existing game called [Slime Volleyball](https://clay.io/game/slime). It is essentially a 1 v 1 2D volleyball game.

Our game is limited to two players. The Green Slime uses the arrow keys to move, and the Red Slime uses WASD keys to move. There is no time limit for game play. The first team to score 7 points wins.

[Link to Production Application]()

## Repo Setup

To install the dependencies:

```
npm install
```

To fire up a development server:

```
npm start
```

Once the server is running, you can visit:

* `http://localhost:8080/webpack-dev-server/` to run your application.
* `http://localhost:8080/webpack-dev-server/test.html` to run your test suite in the browser.

To build the static files:

```js
npm run build
```

To run tests in Node:

```js
npm test
```
