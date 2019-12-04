export class ColorMetaData {
  rn: number;
  gn: number;
  bn: number;
  an: number;
  constructor(rn: number = 255, gn: number = 255, bn: number = 255, an: number = 1.0) {
    this.rn = rn;
    this.gn = gn;
    this.bn = bn;
    this.an = an;
  }
  getRandomColor() {
    this.rn = Math.random() * 256 | 0;
    this.gn = Math.random() * 256 | 0;
    this.bn = Math.random() * 256 | 0;
  }
  SetDefaultBGcolor() {
    this.rn = 255;
    this.gn = 128;
    this.bn = 128;
    this.an = 0.8;
  }
  SetDefatulFGColor() {
    this.rn = 3;
    this.gn = 104;
    this.bn = 3;
    this.an = 1.0;
  }
  /**
   * RGBA轉Hex
   *
   * @param {*} r
   * @param {*} g
   * @param {*} b
   * @returns
   * @memberof ColorUtil
   */
  RGBAToHexA() {
    let r = this.rn.toString(16);
    let g = this.gn.toString(16);
    let b = this.bn.toString(16);
    let a = Math.round(this.an * 255).toString(16);

    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
    if (a.length == 1)
      a = "0" + a;

    return "#" + r + g + b + a;
  }
}
