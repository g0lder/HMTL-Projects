/**
 * Updated Snake AI with enhanced error handling and debugging.
 * This version penalizes moves that result in immediate collisions and logs errors if they occur.
 */
function SnakeAI(game) {
  if (!game) {
    console.error("No game object provided to SnakeAI.");
  }
  this.game = game; // the game object should contain snake, food, board dimensions, etc.
}

// Returns the next move: 'left', 'right', 'up', or 'down'.
SnakeAI.prototype.getNextMove = function() {
  try {
    var possibleMoves = ['left', 'right', 'up', 'down'];
    var bestMove = null;
    var bestScore = -Infinity;
    
    for (var i = 0; i < possibleMoves.length; i++) {
      var move = possibleMoves[i];
      var newHead = this.simulateMove(move);
      var score = this.evaluateMove(newHead);

      // Debugging: log each move's score
      // console.log("Move: " + move + ", Score: " + score);

      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    
    if (bestMove === null) {
      console.error("No valid moves found!");
    }
    return bestMove;
  } catch (e) {
    console.error("Error in getNextMove:", e);
    return null;
  }
};

// Simulate a move and return the new head coordinates.
SnakeAI.prototype.simulateMove = function(move) {
  try {
    if (!this.game || !this.game.snake || !this.game.snake.length) {
      throw new Error("Game snake state is not defined correctly.");
    }
    // Assume the snake's head is the first element in this.game.snake
    var head = { x: this.game.snake[0].x, y: this.game.snake[0].y };

    switch (move) {
      case 'left':
        head.x--;
        break;
      case 'right':
        head.x++;
        break;
      case 'up':
        head.y--;
        break;
      case 'down':
        head.y++;
        break;
      default:
        console.error("Invalid move: " + move);
    }
    
    return head;
  } catch (e) {
    console.error("Error in simulateMove for move '" + move + "':", e);
    // Return the original head if simulation fails
    return { x: this.game.snake[0].x, y: this.game.snake[0].y };
  }
};

// Evaluate a move given the new head position. Lower score for suicidal moves.
SnakeAI.prototype.evaluateMove = function(newHead) {
  try {
    // If the move results in a collision, immediately return a very low score.
    if (this.checkCollision(newHead)) {
      return -Infinity;
    }

    // Survival bonus: reward for making a move that doesn't kill the snake.
    const SURVIVAL_BONUS = 10;  // You can adjust this value to fine-tune the survival incentive.
    var score = SURVIVAL_BONUS;

    if (!this.game.food) {
      throw new Error("Food object is not defined in the game.");
    }
    
    // Compute Manhattan distance from the new head position to the food.
    var distance = Math.abs(newHead.x - this.game.food.x) + Math.abs(newHead.y - this.game.food.y);
    // A lower distance means a higher score; here 100 - distance encourages moving closer to the food.
    score += 100 - distance;
    
    // Additional bonus: reward moves with more safe neighboring cells.
    var safeNeighbors = this.countSafeNeighbors(newHead);
    score += safeNeighbors * 10;  // Adjust the weight of this bonus as needed.

    return score;
  } catch (e) {
    console.error("Error in evaluateMove:", e);
    return -Infinity;
  }
};


// Check for collision with walls or the snake's own body.
SnakeAI.prototype.checkCollision = function(point) {
  try {
    if (!this.game) {
      throw new Error("Game state is missing.");
    }
    
    var boardWidth = this.game.boardWidth;
    var boardHeight = this.game.boardHeight;

    // Wall collision.
    if (point.x < 0 || point.x >= boardWidth || point.y < 0 || point.y >= boardHeight) {
      return true;
    }
    
    // Check collision with snake body.
    if (!this.game.snake || !this.game.snake.length) {
      throw new Error("Snake array is not defined.");
    }
    for (var i = 0; i < this.game.snake.length; i++) {
      if (this.game.snake[i].x === point.x && this.game.snake[i].y === point.y) {
        return true;
      }
    }
    return false;
  } catch (e) {
    console.error("Error in checkCollision:", e);
    return true; // Default to a collision on error.
  }
};

// Count how many neighboring cells around a given point are safe.
SnakeAI.prototype.countSafeNeighbors = function(point) {
  var safeCount = 0;
  var directions = [
    { x: 1,  y: 0 },
    { x: -1, y: 0 },
    { x: 0,  y: 1 },
    { x: 0,  y: -1 }
  ];

  for (var i = 0; i < directions.length; i++) {
    var neighbor = {
      x: point.x + directions[i].x,
      y: point.y + directions[i].y
    };
    if (!this.checkCollision(neighbor)) {
      safeCount++;
    }
  }
  return safeCount;
};

// Example integration: use a timer to update the snake's direction based on the AI decision.
SnakeAI.prototype.run = function() {
  var self = this;
  setInterval(function() {
    try {
      var nextMove = self.getNextMove();
      if (nextMove && self.game && typeof self.game.setDirection === "function") {
        self.game.setDirection(nextMove);
      } else {
        console.error("Invalid nextMove or game.setDirection is not defined.");
      }
    } catch (e) {
      console.error("Error during AI run loop:", e);
    }
  }, 100); // Adjust the interval as needed.
};
