export default class Picker {
  constructor(p, debug) {
    this.p = p;
    this.debug = debug;
    
    this.initBuffer();
  }
  
  initBuffer() {
  const p = this.p;
	let cnv_div = document.getElementById("cnv_div");
    const buffer = p.createGraphics(this.debug ? p.windowWidth / 2 : cnv_div.offsetWidth, p.windowHeight * 0.9, p.WEBGL);
    buffer.pixelDensity(1);
    buffer.frameRate(60);
    
    if (this.debug) {
      buffer.show();
    }
    this.buffer = buffer;
  }
  
  getColor(x, y) {
    const p = this.p;
    if (x > p.width || y > p.height || p.width < 0 || p.height < 0) {
      return 0;
    }
	
    const gl = this.buffer.elt.getContext('webgl');	
	let cnv_div = document.getElementById("cnv_div");
	const colorArr = p.get(x, y);
	return colorArr;	


    // **************** original
	const pix = this.getPixels();
    const i = 4 * ((gl.drawingBufferHeight - y) * gl.drawingBufferWidth + x);
    if (!pix[i]) {
      return 0;
    }
    
    return p.color([pix[i], pix[i + 1], pix[i + 2], pix[i + 3]]);
  }
  
  getPixels() {
    const gl = this.buffer.elt.getContext('webgl');
    const pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
    gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
      
    return pixels;
  }
}