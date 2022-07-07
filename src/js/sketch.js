import 'src/js/lib/p5.easycam.js';
import Picker from 'src/js/picker';
import Cuby from 'src/js/cuby';

export default function (p) {
  const CUBYESIZE = 50;
  const DEBUG = false;

  let CAM;
  let CAM_PICKER;
  let PICKER;
  let CUBE = {};
  let RND_COLORS;
  let GAP = 0;
  let SIZE = 3;
  let SIZE_SLIDER;
  let GAP_SLIDER;
  let BACKGROUND_COLOR = 230;
  p5.disableFriendlyErrors = DEBUG ? false : true;

  p.setup = () => {
    p.createCanvas(DEBUG ? p.windowWidth / 2 : p.windowWidth, p.windowHeight, p.WEBGL);
    p.pixelDensity(1);
    p.frameRate(60);
    p.smooth();

    PICKER = new Picker(p, DEBUG);
    CAM = p.createEasyCam(p._renderer);
    CAM_PICKER = p.createEasyCam(PICKER.buffer._renderer);

    CAM.rotateX(-p.PI / 4);
    CAM.rotateY(-p.PI / 5);
    CAM.rotateZ(-p.PI / 2);

    reSetup();

    SIZE_SLIDER = p.createSlider(2, 5, 3, 1);
    SIZE_SLIDER.input(sliderUpdate);
    SIZE_SLIDER.style('top', '80px');

    GAP_SLIDER = p.createSlider(0, 100, 0, 1);
    GAP_SLIDER.input(sliderUpdate);
    GAP_SLIDER.style('top', '100px');
    
    const suffle_btn = p.createButton('Shuffle');
    suffle_btn.position(70, 150);
    suffle_btn.mousePressed(shuffleCube.bind(null, 0));
  }

  function reSetup() {
    CUBE = {};
    RND_COLORS = genRndColors();
    let cnt = 0;

    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        for (let k = 0; k < SIZE; k++) {
          let offset = ((SIZE - 1) * (CUBYESIZE + GAP)) * 0.5;
          let x = (CUBYESIZE + GAP) * i - offset;
          let y = (CUBYESIZE + GAP) * j - offset;
          let z = (CUBYESIZE + GAP) * k - offset;
          CUBE[cnt] = new Cuby(CUBYESIZE, x, y, z, RND_COLORS[cnt], PICKER, p);
          cnt++;
        }
      }
    }
  }

  function sliderUpdate() {
    SIZE = SIZE_SLIDER.value();
    GAP = GAP_SLIDER.value();
    reSetup();
  }

  function genRndColors() {
    let cols = [];
    let res = [];
    let current_color;

    for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
      res[i] = [];
      for (let j = 0; j < 6; j++) {
        current_color = p.color(p.random(255), p.random(255), p.random(255));
        while (cols.includes(current_color)) {
          current_color = p.color(p.random(255), p.random(255), p.random(255));
        }

        res[i].push(current_color);
        cols.push(current_color);
      }
    }

    return res;
  }

  function rotateMatrix(x, y, dir) {
    let xP;
    let yP;

    if (dir === -1) {
      xP = Math.round(Math.cos(p.HALF_PI) * x + Math.sin(p.HALF_PI) * y);
      yP = Math.round(-Math.sin(p.HALF_PI) * x + Math.cos(p.HALF_PI) * y);
    } else {
      xP = Math.round(Math.cos(p.HALF_PI) * x - Math.sin(p.HALF_PI) * y);
      yP = Math.round(Math.sin(p.HALF_PI) * x + Math.cos(p.HALF_PI) * y);
    }

    return {
      x: xP,
      y: yP
    };
  }

  function moveX(row, dir) { // switch `i` cubes and rotate theme..
    let stack = [];
    let primes, found, tmp; // x' y'

    tmp = {};
    for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
      if (CUBE[i].x === row) {
        primes = rotateMatrix(CUBE[i].y, CUBE[i].z, dir);
        tmp[i] = new Cuby(CUBYESIZE, CUBE[i].x, primes.x, primes.y, RND_COLORS[i], PICKER, p);
        tmp[i].syncColors(CUBE[i]);
        tmp[i].rotateX(dir);
        if (CUBE[i].debugging === true) {
          tmp[i].debug();
        }
      }
    }
    for (let [i, cube] of Object.entries(tmp)) {
      CUBE[i] = cube;
    }
  }

  function moveY(row, dir) { // switch `j` cubes and rotate them..
    let stack = [];
    let primes, found, tmp;

    tmp = {};
    for (let i = 0; i < SIZE * SIZE * SIZE; i++) { // foreach cubes
      if (CUBE[i].y === row) { // if cubbie in the 'Y' face
        primes = rotateMatrix(CUBE[i].x, CUBE[i].z, dir); // calculate new position for that cube
        tmp[i] = new Cuby(CUBYESIZE, primes.x, CUBE[i].y, primes.y, RND_COLORS[i], PICKER, p); // buffer theme in a new cubye
        tmp[i].syncColors(CUBE[i]);
        tmp[i].rotateY(dir);
        if (CUBE[i].debugging === true) {
          tmp[i].debug();
        }
      }
    }
    for (let [i, cube] of Object.entries(tmp)) {
      CUBE[i] = cube;
    }
  }

  function moveZ(row, dir) { // switch `z` cubes and rotate them..
    let stack = [];
    let primes, found, tmp;

    tmp = {};
    for (let i = 0; i < SIZE * SIZE * SIZE; i++) { // foreach cubes
      if (CUBE[i].z === row) { // if cubbie in the 'z' face
        primes = rotateMatrix(CUBE[i].x, CUBE[i].y, dir); // calculate new position for that cube
        tmp[i] = new Cuby(CUBYESIZE, primes.x, primes.y, CUBE[i].z, RND_COLORS[i], PICKER, p); // buffer theme in a new cubye
        tmp[i].syncColors(CUBE[i]);
        tmp[i].rotateZ(dir);
        if (CUBE[i].debugging === true) {
          tmp[i].debug();
        }
      }
    }
    for (let [i, cube] of Object.entries(tmp)) {
      CUBE[i] = cube;
    }
  }

  function animate(axis, row, dir) {
    for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
      if (CUBE[i].animating()) {
        // some cube is already in animation
        return;
      }
    }

    for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
      if (CUBE[i].get(axis) === row) {
        CUBE[i].row = row;
        CUBE[i].dir = dir;
        CUBE[i].anim_axis = axis;
        CUBE[i].anim_angle = CUBE[i].dir * 0.01;
      }
    }
  }

  function cleanAllSelectedCubies() {
    for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
      CUBE[i].is_selected = false;
      CUBE[i].selected_face = false;
    }
  }

  function getCubyByColor(arr1) {
    let face;

    for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
      // for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
        face = CUBE[i].hasColorFace(arr1);
        if (face !== false) {
          return [CUBE[i], face];
        }
      // }
    }

    return false;
  }

  function getSelectedCube() {
    for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
      if (CUBE[i].is_selected) {
        return CUBE[i];
      }
    }

    return false;
  }

  function shuffleCube(nb) {
    if (nb < 20) {
      randomMove();
      setTimeout(shuffleCube.bind(null, nb + 1), 100);
    }
  }

  function randomMove() {
    const axes = ['x', 'y', 'z'];
    const dirs = [-1, 1];
    
    const axe = p.random(axes);
    const cuby = p.random(Object.values(CUBE));
    
    animate(axe, cuby.get(axe), p.random(dirs));
  }

  function startAction() {
    const hoveredColor = PICKER.getColor(p.mouseX, p.mouseY);

    if (hoveredColor) {
      
      const res = getCubyByColor(hoveredColor);
      if (res) {
        cleanAllSelectedCubies();
        res[0].is_selected = true;
        res[0].selected_face = res[1];
      }
    }
  }

  p.mousePressed = () => {
    startAction();
  }

  p.touchStarted = () => {
    startAction();
  }

  p.mouseDragged = () => {
    const hoveredColor = PICKER.getColor(p.mouseX, p.mouseY);

    if (hoveredColor) {
      const res = getCubyByColor(hoveredColor);

      if (res) {
        const pk = getSelectedCube();

        if (pk) {
          const move = pk.getMove(res[0], res[1], ((SIZE - 1) * (CUBYESIZE + GAP)) * 0.5);

          if (move) {
            animate(move[0], move[1], move[2]);
            pk.is_selected = false;
            pk.selected_face = false;
          }
        }
      }
    }
  }

  p.windowResized = () => {
    p.resizeCanvas(DEBUG ? (p.windowWidth / 2) : p.windowWidth, p.windowHeight);
    PICKER.buffer.resizeCanvas(DEBUG ? (p.windowWidth / 2) : p.windowWidth, p.windowHeight);
  }

  p.draw = () => {
    const hoveredColor = PICKER.getColor(p.mouseX, p.mouseY);
    if (hoveredColor && getCubyByColor(hoveredColor) && !p.mouseIsPressed) {
      CAM.removeMouseListeners();
    } else {
      CAM.attachMouseListeners();
    }

    CAM_PICKER.setState(CAM.getState(), 0);

    renderCube();
  }

  function renderCube() {
    PICKER.buffer.background(0);
    p.background(BACKGROUND_COLOR);

    for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
      if (CUBE[i].animating()) {
        if (CUBE[i].dir === 1 && CUBE[i].anim_angle < p.HALF_PI ||
          CUBE[i].dir === -1 && CUBE[i].anim_angle > -p.HALF_PI) {
          p.push();
          CUBE[i].anim_angle += CUBE[i].dir * 0.1 * (SIZE / 3);
          if (CUBE[i].anim_axis === 'x') {
            p.rotateX(CUBE[i].anim_angle);
          } else if (CUBE[i].anim_axis === 'y') {
            p.rotateY(CUBE[i].anim_angle * -1);
          } else {
            p.rotateZ(CUBE[i].anim_angle);
          }
          CUBE[i].show();
          p.pop();
        } else {
          if (CUBE[i].anim_axis === 'x') {
            moveX(CUBE[i].row, CUBE[i].dir);
          } else if (CUBE[i].anim_axis === 'y') {
            moveY(CUBE[i].row, CUBE[i].dir);
          } else {
            moveZ(CUBE[i].row, CUBE[i].dir);
          }
          CUBE[i].anim_axis = false;
          CUBE[i].anim_angle = false;
          CUBE[i].show();
        }
      } else {
        CUBE[i].show();
      }
    }
  }
}