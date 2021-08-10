import Bezier from "../bezier.js"
export default class Pen {
  constructor(options) {
    this.reset(options)
  }
  reset({ touchsStrategy = 'mix', parmFilterWeight = 0.7, defaultLastVelocity = 0,  minWidth = 0.5, maxWidth = 2.5, ctx, boardScale = 1,lastWidth = (minWidth + maxWidth) / 10, minDistance = 5, dotSize = 0.2, penColor = 'black' }) {
    this.touchsStrategy = touchsStrategy
    this.parmFilterWeight = parmFilterWeight
    this.defaultLastVelocity = this.lastVelocity = defaultLastVelocity
    this.lastWidth = lastWidth
    this.maxWidth = maxWidth
    this.minWidth = minWidth
    this.boardScale = boardScale
    this.minDistance = minDistance
    this.dotSize = dotSize
    this.penColor = penColor
    this._lastPoints = []
    this.ctx = ctx

  }
  outputOptions(){
    return {
      touchsStrategy: this.touchsStrategy ,
      parmFilterWeight:this.parmFilterWeight ,
      lastVelocity:this.defaultLastVelocity  ,
      lastWidth: (this.minWidth + this.maxWidth) / 10,
      maxWidth: this.maxWidth,
      minWidth:this.minWidth ,
      boardScale: this.boardScale ,
      minDistance:this.minDistance ,
      dotSize: this.dotSize,
      penColor:this.penColor,

    }
  }
  newOperation() {
    this._lastPoints = [];
    this.lastVelocity = this.defaultLastVelocity;
    this.lastWidth = (this.minWidth + this.maxWidth) / 10;
    this.ctx.fillStyle = this.penColor;
  }
  setOption(key, value) {
    this[key] = value
  }
  draw(point) {
    console.log('--point--',point)
    const curve = this.addPoint(point);
    if (point.type === 'start') {
      this.drawDot(point);
    }
    else if (curve) {
      this.drawCurve(curve);
    }
  }
  addPoint(point) {
    const { _lastPoints } = this;

    _lastPoints.push(point);
    if (_lastPoints.length > 2) {
      if (_lastPoints.length === 3) {
        _lastPoints.unshift(_lastPoints[0]);
      }
      const widths = this.calculateCurveWidths(_lastPoints[1], _lastPoints[2],point);
      const curve = Bezier.fromPoints(_lastPoints, widths);

      _lastPoints.shift();
      return curve;
    }

    return null;
  }
  calculateCurveWidths(startPoint, endPoint,currentPoint) {
    let param = 1
    let pressure = currentPoint.pressure, isEnd = (currentPoint.type == 'end')
    if (this.touchsStrategy == 'pressure' && pressure) {
      pressure = pressure * pressure;
      param = pressure;
    }
    else if (this.touchsStrategy == 'mix' && pressure) {
      let velocity=endPoint.velocityFrom(startPoint)
      pressure =  pressure /2 ;
      param = pressure / ((this.parmFilterWeight * Math.pow(velocity,2) +
        (1 - this.parmFilterWeight) * this.lastVelocity) + 1);
    } else {
      let velocity=endPoint.velocityFrom(startPoint)
      param = 1 / ((this.parmFilterWeight *Math.pow(velocity,2) +
        (1 - this.parmFilterWeight) * this.lastVelocity) + 1);

    }
    console.log('--speed',pressure,this.touchsStrategy, endPoint.velocityFrom(startPoint) , this.parmFilterWeight,this.lastVelocity,param)

    const newWidth = isEnd ? this.minWidth : this.strokeWidth(param);
    const widths = {
      end: newWidth,
      start: this.lastWidth,
    };
    this.lastVelocity = param;
    this.lastWidth = newWidth;
    return widths;
  }

  strokeWidth(param) {
    return Math.max(this.maxWidth * param, this.minWidth);
  }
  drawCurveSegment(x, y, width) {
    const ctx = this.ctx;
    ctx.moveTo(x, y);
    ctx.arc(x, y, width, 0, 2 * Math.PI, false);
  }
  drawCurve(curve) {
    const ctx = this.ctx;
    const widthDelta = curve.endWidth - curve.startWidth;

    const drawSteps = Math.ceil(curve.length() * 2.5);
    ctx.beginPath();
    ctx.fillStyle = this.penColor;
    for (let i = 0; i < drawSteps; i += 1) {
      const t = i / drawSteps;
      const tt = t * t;
      const ttt = tt * t;
      const u = 1 - t;
      const uu = u * u;
      const uuu = uu * u;
      let x = uuu * curve.startPoint.x;
      x += 3 * uu * t * curve.control1.x;
      x += 3 * u * tt * curve.control2.x;
      x += ttt * curve.endPoint.x;
      let y = uuu * curve.startPoint.y;
      y += 3 * uu * t * curve.control1.y;
      y += 3 * u * tt * curve.control2.y;
      y += ttt * curve.endPoint.y;
      const width = Math.min(curve.startWidth + t * widthDelta, this.maxWidth);
      this.drawCurveSegment(x, y, width);
    }
    ctx.closePath();
    ctx.fill();
  }
  drawDot(point) {
    const ctx = this.ctx;
    const width = typeof this.dotSize === 'function' ? this.dotSize() : this.dotSize;
    ctx.beginPath();
    this.drawCurveSegment(point.x, point.y, width);
    ctx.closePath();
    ctx.fillStyle = this.penColor;
    ctx.fill();
  }


}
