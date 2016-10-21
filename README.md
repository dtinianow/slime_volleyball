# Slime Volleyball

[Play Slime Volleyball!](https://dtinianow.github.io/slime_volleyball/)

## Game Play

![](http://g.recordit.co/p24Lw2IgF3.gif)

We built a modern version of the classic 2D game, Slime Volleyball.  It is a single page, client-side web application built in JavaScript and utilizing [Webpack] (https://github.com/webpack/webpack).

Slime Volleyball can be played as either a single-player or two-player game. 

Single-player controls: If a player chooses to play in single-player mode, the player's slime is controlled on the left side of the screen using the WASD keys.  

Two-player controls: If the game mode features two players, the slime on the left of the screen is controlled using the WASD keys, and the slime on the right is controlled using the arrow keys.

There is no time limit for game play. The first slime to score 7 points wins!

The game features two modes of play: normal mode and insane mode.  

- Press `n` from the main menu to activate normal two-player mode
- Press `i` from the main menu to activate insane two-player mode.  
- Press `z` from the main menu to activate normal single-player mode
- Press `x` from the main menu to activate insane single-player mode.  
- During either single-player or two-player normal mode, the user can change the background of the slime arena by typing any key from `1-9`.

![](http://g.recordit.co/NLIEi4Jox9.gif)

At the end of each match, a player sees a Game Over screen where the score of all matches is displayed.  The players then have the option to either play again, clear the match score, or return to the main menu.  Match scores are retained using `localStorage`, and can be reset on the Game Over screen by typing `m`.  Refreshing the game on your machine will not reset your match score.

Have fun!


![](http://g.recordit.co/TLR1tievDg.gif)


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
