class Game {

  constructor(
    canvas,
    board_width,
    board_height,
    block_drop_speed
  ) {
    this.board = new Board(
      this,
      canvas,
      board_width,
      board_height,
    );

    this.score_area = new ScoreArea();
    this.block_manager = new BlockManager(this, block_drop_speed);

    this.input_area = new InputArea(this, innerWidth * 0.4, innerHeight * 0.9, 300);
    this.item_bag = new ItemBag();
  }

  reset() {
    this.block_manager.reset();
    this.input_area.reset();
    this.score_area.reset();
    this.item_bag.reset();
  }

  run() {
    if (this.score_area.score < 0) {
      this.gameover();
    }
    else {
      this.board.draw();
      this.item_bag.draw();

      this.block_manager.drop_from_the_sky();
      let hit_bottom = this.block_manager.update_and_draw();
      if (hit_bottom) {
        this.score_area.add_score(-100);
      }
      this.score_area.draw();
    }
  }

  gameover() {
    rectMode(CENTER);
    fill(100);
    rect(500, 500, 300, 200);
    
    fill(255, 255, 255);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(
        "game over. refresh the page to restart",
        500,
        500,
    );
  }

  key_handler(key_code) {
    if (key_code == ENTER) {
      let num_broken_blocks = this.input_area.check_if_user_enter_right_word();
      if (num_broken_blocks > 0) {
        this.score_area.add_score(100 * num_broken_blocks);
      }
    }
  }
}

let game = undefined;

// The statements in the setup() function
// execute once when the program begins
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('display', 'block');
  frameRate(60);


  let block_drop_speed = get_game_level_from_url()

  game = new Game(
    canvas,
    windowWidth,
    windowHeight,
    block_drop_speed
  );
  game.reset();

}

function draw() {
  game.run();
}

function keyPressed() {
  game.key_handler(keyCode);
}

function get_game_level_from_url() {
  let params = getURLParams();;
  let level = params['level'] || 'easy';

  if (level === 'easy') {
    return 3;
  }
  else if (level === "medium") {
    return 2;
  }
  else {
    return 1;
  }
}


function get_score_list() {
  return JSON.parse(localStorage.getItem('scoreList'));
}

function add_to_score_list(score) {
  let arr = get_score_list();
  arr.push(score);
  arr.sort();
  localStorage.setItem('scoreList', JSON.stringify(arr));
}

function make_score_list() {
  let scoreList = localStorage.getItem('scoreList');
  if (scoreList === null) {
    localStorage.setItem('scoreList', JSON.stringify([]));
  }
}