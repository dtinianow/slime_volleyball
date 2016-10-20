# Slime Volleyball

## Game Play

![](http://g.recordit.co/p24Lw2IgF3.gif)

We built a modern version of the classic 2D game, Slime Volleyball.  It is a single page, client-side web application built in JavaScript and utilizing [Webpack] (https://github.com/webpack/webpack).

Slime Volleyball is a two player game. The slime on the right of the screen is controlled using the arrow keys, and the slime on the left of the screen is controlled using the WASD keys. There is no time limit for game play. The first slime to score 7 points wins!

The game features two modes of play: normal mode and insane mode.  Press `n` from the main menu to activate normal mode and `i` to activate insane mode.  During normal mode, the user can change the background of the slime arena by typing any key from `1-9`.

![](http://g.recordit.co/JWsE6fDh1G.gif)

At the end of each match, a player sees a Game Over screen where the score of all matches is displayed.  The players then have the option to either play again, clear the match score, or return to the main menu.  Match scores are retained using `localStorage`, and can be reset on the Game Over screen by typing `m`.  Refreshing the game on your machine will not reset your match score.

Have fun!



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

## Collaborators
[David Tinianow] (https://www.github.com/dtinianow)
[Matt Campbell] (https://www.github.com/matthewecampbell)
