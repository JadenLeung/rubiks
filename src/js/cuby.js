export default class Cuby {
  constructor(size, x, y, z, buff, picker, p) {
    this.cubysize = size;
    this.x = x;
    this.y = y;
    this.z = z;
    this.picker = picker;
    this.p = p;

    this.colors = {
      def: p.color(25, 25, 25),
      white: p.color(250, 250, 250),
      red: p.color(219, 18, 18),
      blue: p.color(18, 105, 219),
      orange: p.color(219, 125, 18),
      green: p.color(18, 219, 31),
      yellow: p.color(209, 219, 18),
    };

    this.top = this.colors.white;
    this.bottom = this.colors.yellow;
    this.front = this.colors.red;
    this.right = this.colors.blue;
    this.back = this.colors.orange;
    this.left = this.colors.green;
    
    this.buff_top = buff[2];
    this.buff_bottom = buff[3];
    this.buff_front = buff[0];
    this.buff_back = buff[1];
    this.buff_left = buff[4];
    this.buff_right = buff[5];
  }
  
  get(foo) {
    if (foo === 'x') {
      return this.x;
    }
    if (foo === 'y') {
      return this.y;
    }
    if (foo === 'z') {
      return this.z;
    }
  }
  
  animating() {
    return Boolean(this.anim_axis && this.anim_angle && this.dir);
  }
  
  debug() {
    this.debugging = true;
    
    this.front = COLORS.def;
    this.back = COLORS.def;
    this.top = COLORS.def;
    this.bottom = COLORS.def;
    this.left = COLORS.def;
    this.right = COLORS.def;
  }
  
  syncColors(cuby) {   
    this.front = cuby.front;
    this.back = cuby.back;
    this.top = cuby.top;
    this.bottom = cuby.bottom;
    this.left = cuby.left;
    this.right = cuby.right;
    
    this.buff_front = cuby.buff_front;
    this.buff_back = cuby.buff_back;
    this.buff_top = cuby.buff_top;
    this.buff_bottom = cuby.buff_bottom;
    this.buff_left = cuby.buff_left;
    this.buff_right = cuby.buff_right;
  }
  
  rotateX(dir) { // switch all but LEFT / RIGHT
    const tmp = this.front;
    const buff_tmp = this.buff_front;
    
    if (dir === -1) {
      this.front = this.bottom;
      this.bottom = this.back;
      this.back = this.top;
      this.top = tmp;
      
      this.buff_front = this.buff_bottom;
      this.buff_bottom = this.buff_back;
      this.buff_back = this.buff_top;
      this.buff_top = buff_tmp;
    } else {
      this.front = this.top;
      this.top = this.back;
      this.back = this.bottom;
      this.bottom = tmp;
      
      this.buff_front = this.buff_top;
      this.buff_top = this.buff_back;
      this.buff_back = this.buff_bottom;
      this.buff_bottom = buff_tmp;
    }
  }

  rotateY(dir) { // switch all but TOP / BOTTOM by it's predecessor..
    const tmp = this.front;
    const buff_tmp = this.buff_front;
    
    if (dir === -1) {
      this.front = this.right;
      this.right = this.back;
      this.back = this.left;
      this.left = tmp;
      
      this.buff_front = this.buff_right;
      this.buff_right = this.buff_back;
      this.buff_back = this.buff_left;
      this.buff_left = buff_tmp;
    } else {
      this.front = this.left;
      this.left = this.back;
      this.back = this.right;
      this.right = tmp;
      
      this.buff_front = this.buff_left;
      this.buff_left = this.buff_back;
      this.buff_back = this.buff_right;
      this.buff_right = buff_tmp;
    }
  }
  
  rotateZ(dir) { // switch all but FRONT / BACK
    const tmp = this.top;
    const buff_tmp = this.buff_top;
    
    if (dir === -1) {
      this.top = this.right;
      this.right = this.bottom;
      this.bottom = this.left;
      this.left = tmp;
      
      this.buff_top = this.buff_right;
      this.buff_right = this.buff_bottom;
      this.buff_bottom = this.buff_left;
      this.buff_left = buff_tmp;
    } else {
      this.top = this.left;
      this.left = this.bottom;
      this.bottom = this.right;
      this.right = tmp;
      
      this.buff_top = this.buff_left;
      this.buff_left = this.buff_bottom;
      this.buff_bottom = this.buff_right;
      this.buff_right = buff_tmp;
    }
  }
  
  // -1 / +1 because for some reasons the buffer does not have the exact same r,g,b values ? like whaaaatt
  hasColorFace(arr1) {
    let arr2;
    let face;
    
    arr1 = arr1.levels;
    
    for (let j = 0; j < 6; j++) {
      if (j === 0) {
        arr2 = this.buff_top.levels;
        face = 'top';
      } else if (j === 1) {
        arr2 = this.buff_bottom.levels;
        face = 'bottom';
      } else if (j === 2) {
        arr2 = this.buff_front.levels;
        face = 'front';
      } else if (j === 3) {
        arr2 = this.buff_back.levels;
        face = 'back';
      } else if (j === 4) {
        arr2 = this.buff_left.levels;
        face = 'left';
      } else {
        arr2 = this.buff_right.levels;
        face = 'right';
      }
      
      if ((arr1[0] === arr2[0] || arr1[0] === arr2[0] + 1 || arr1[0] === arr2[0] - 1) &&
          (arr1[1] === arr2[1] || arr1[1] === arr2[1] + 1 || arr1[1] === arr2[1] - 1) &&
          (arr1[2] === arr2[2] || arr1[2] === arr2[2] + 1 || arr1[2] === arr2[2] - 1)) {
        return face;
      }
    }
    
    return false
  }
  
  getMove(to, f2) {
    const from = this;
    const f1 = from.selected_face;
    
    let axe;    
    let row;
    let dir;
    
    // quick and dirty
    if (from === to && f1 !== f2) {  
      if ((f1 === 'front' && f2 === 'bottom') ||
          (f1 === 'bottom' && f2 === 'back') ||
          (f1 === 'back' && f2 === 'top') ||
          (f1 === 'top' && f2 === 'front')) {
        axe = 'x';
        row = from.x;
        dir = 1;
      } else if ((f1 === 'front' && f2 === 'top') ||
                 (f1 === 'top' && f2 === 'back') ||
                 (f1 === 'back' && f2 === 'bottom') ||
                 (f1 === 'bottom' && f2 === 'front')) {
        axe = 'x';
        row = from.x;
        dir = -1;
      } else if ((f1 === 'front' && f2 === 'right') ||
          (f1 === 'right' && f2 === 'back') ||
          (f1 === 'back' && f2 === 'left') ||
          (f1 === 'left' && f2 === 'front')) {
        axe = 'y';
        row = from.y;
        dir = 1;
      } else if ((f1 === 'front' && f2 === 'left') ||
          (f1 === 'left' && f2 === 'back') ||
          (f1 === 'back' && f2 === 'right') ||
          (f1 === 'right' && f2 === 'front')) {
        axe = 'y';
        row = from.y;
        dir = -1;
      } else if ((f1 === 'top' && f2 === 'right') ||
                (f1 === 'right' && f2 === 'bottom') ||
                (f1 === 'bottom' && f2 === 'left') ||
                (f1 === 'left' && f2 === 'top')) {
        axe = 'z';
        row = from.z;
        dir = 1;
      } else if ((f1 === 'top' && f2 === 'left') ||
                (f1 === 'left' && f2 === 'bottom') ||
                (f1 === 'bottom' && f2 === 'right') ||
                (f1 === 'right' && f2 === 'top')) {
        axe = 'z';
        row = from.z;
        dir = -1;
      }
    } else if (from !== to && f1 === f2) {    
      if (f1 === 'front' || f1 === 'back') {
        if (from.y !== to.y) {
          axe = 'x';
          row = from.x;
          dir = ((from.y > to.y && f1 === 'front') || (from.y < to.y && f1 === 'back')) ? 1 : -1;
        } else {
          axe = 'y';
          row = from.y;
          dir = ((from.x > to.x && f1 === 'front') || (from.x < to.x && f1 === 'back')) ? 1 : -1;
        }
      } else if (f1 === 'left' || f1 === 'right') {
        if (from.y !== to.y) {
          axe = 'z';
          row = from.z;
          dir = ((from.y > to.y && f1 === 'right') || (from.y < to.y && f1 === 'left')) ? 1 : -1;
        } else {
          axe = 'y';
          row = from.y;
          dir = ((from.z > to.z && f1 === 'right') || (from.z < to.z && f1 === 'left')) ? 1 : -1;
        }
      } else {
        if (from.z !== to.z) {
          axe = 'x';
          row = from.x;
          dir = ((from.z > to.z && f1 === 'bottom') || (from.z < to.z && f1 === 'top')) ? 1 : -1;
        } else {
          axe = 'z';
          row = from.z;
          dir = ((from.x > to.x && f1 === 'top') || (from.x < to.x && f1 === 'bottom')) ? 1 : -1;
        }
      }
    }
    
    return axe ? [axe, row, dir] : false;
  }
  
  show() {
    let r = this.cubysize / 2;
    this.p.push();
    
      this.p.translate(this.x, this.y, this.z);
      this.p.strokeWeight(3);
        
      // p1, p2, p3, p4 coordinates
      this.p.fill(this.back);
      this.p.quad(-r, -r, -r, r, -r, -r, r, r, -r, -r, r, -r);
      this.p.fill(this.front);
      this.p.quad(-r, -r, r, r, -r, r, r, r, r, -r, r, r);
      this.p.fill(this.bottom);
      this.p.quad(-r, -r, -r, r, -r, -r, r, -r, r, -r, -r, r);
      this.p.fill(this.top);
      this.p.quad(-r, r, -r, r, r, -r, r, r, r, -r, r, r);
      this.p.fill(this.right);
      this.p.quad(-r, -r, -r, -r, r, -r, -r, r, r, -r, -r, r);
      this.p.fill(this.left);
      this.p.quad(r, -r, -r, r, r, -r, r, r, r, r, -r, r);
      this.p.pop();
    
    this.picker.buffer.push();
      
      this.picker.buffer.strokeWeight(0);
      this.picker.buffer.translate(this.x, this.y, this.z);
      this.picker.buffer.fill(this.buff_back);
      this.picker.buffer.quad(-r, -r, -r, r, -r, -r, r, r, -r, -r, r, -r);
      this.picker.buffer.fill(this.buff_front);
      this.picker.buffer.quad(-r, -r, r, r, -r, r, r, r, r, -r, r, r);
      this.picker.buffer.fill(this.buff_bottom);
      this.picker.buffer.quad(-r, -r, -r, r, -r, -r, r, -r, r, -r, -r, r);
      this.picker.buffer.fill(this.buff_top);
      this.picker.buffer.quad(-r, r, -r, r, r, -r, r, r, r, -r, r, r);
      this.picker.buffer.fill(this.buff_right);
      this.picker.buffer.quad(-r, -r, -r, -r, r, -r, -r, r, r, -r, -r, r);
      this.picker.buffer.fill(this.buff_left);
      this.picker.buffer.quad(r, -r, -r, r, r, -r, r, r, r, r, -r, r);
    
    this.picker.buffer.pop();
  }
}