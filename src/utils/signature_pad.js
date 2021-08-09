/*!
 * Signature Pad v3.0.0-beta.4 | https://github.com/szimek/signature_pad
 * (c) 2020 Szymon Nowak | Released under the MIT license
 */
import Pen from  './pen/pen.js'
import Point  from './point.js'

import Converter  from './converter.js'




function throttle(fn, wait = 250) {
  let previous = 0;
  let timeout = null;
  let result;
  let storedContext;
  let storedArgs;
  const later = () => {
    previous = Date.now();
    timeout = null;
    result = fn.apply(storedContext, storedArgs);
    if (!timeout) {
      storedContext = null;
      storedArgs = [];
    }
  };
  return function wrapper(...args) {
    const now = Date.now();
    const remaining = wait - (now - previous);
    storedContext = this;
    storedArgs = args;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = fn.apply(storedContext, storedArgs);
      if (!timeout) {
        storedContext = null;
        storedArgs = [];
      }
    }
    else if (!timeout) {
      timeout = window.setTimeout(later, remaining);
    }
    return result;
  };
}

class SignaturePad {
  constructor(canvas,{ parmFilterWeight =0.7,minWidth=0.5,maxWidth=2.5 ,throttleTime=16,minDistance=5,dotSize=(minWidth +  maxWidth) / 2 ,penColor='black',touchsStrategy="mix",boardScale=1.5,onBegin=()=>{},onEnd=()=>{},backgroundColor='rgba(0,0,0,0)'}) {
    this.canvas = canvas;
    this.onBegin = onBegin;
    this.onEnd = onEnd;
    this.backgroundColor = backgroundColor;

    this._strokeMoveUpdate = throttleTime > 0 ? throttle(SignaturePad.prototype._strokeUpdate, throttleTime) : SignaturePad.prototype._strokeUpdate ;
    touchsStrategy = ( ['pressure','mix'].includes(touchsStrategy) &&( 'ontouchstart' in window ||'PointerEvent' in window)) ? touchsStrategy : 'speed'

    let ctx=canvas.getContext('2d');
    this._ctx =ctx;



   this.penOptions={ctx, parmFilterWeight ,minWidth,maxWidth ,minDistance,dotSize ,penColor,touchsStrategy,boardScale,}
    this.pen=new Pen(this.penOptions)
    this.converter=new Converter( canvas)



    this._handleMouseDown = (event) => {
      console.log('_handleMouseDown',event)
      if (event.which === 1|| !this._pointerId) {
        this._pointerId=event.pointerId||1
        this._strokeBegin(event);
      }
    };
    this._handleMouseMove = (event) => {
      event.pointerId==event.pointerId||1
      if (this._pointerId==event.pointerId) {
        //防止多点触控线条乱连bug
        this._lastTouch = { x: event.clientX, y: event.clientY }
        this._strokeMoveUpdate(event);
      }
    };
    this._handleMouseUp = (event) => {
      console.log('_handleMouseUp',event)
      event.pointerId==event.pointerId||1
      if (event.which === 1 && this._pointerId==event.pointerId) {
        this._pointerId = null;
        if (this._lastTouch.x == event.clientX && this._lastTouch.y == event.clientY) {
          //保证移动和结束是同一根手指
          this._strokeEnd(event);
        }
      }
    };
    this._handleTouchStart = (event) => {

      event.preventDefault();
      if (event.targetTouches.length === 1) {
        this._touchStarted = true;
        const touch = event.changedTouches[0];
        this._lastTouch = { x: touch.clientX, y: touch.clientY }
        this._strokeBegin(touch);
      }
      console.log('---_handleTouchStart--', event, this._lastTouch)

    };
    this._handleTouchMove = (event) => {
      // console.log('---_handleTouchMove--',event)
      event.preventDefault();
      if (this._touchStarted) {
        const touch = event.targetTouches[0];
        this._lastTouch = { x: touch.clientX, y: touch.clientY }

        this._strokeMoveUpdate(touch);
      }
    };
    this._handleTouchEnd = (event) => {
      // console.log('---_handleTouchEnd--', event)
      const wasCanvasTouched = event.target === this.canvas;
      if (wasCanvasTouched) {
        if (this._touchStarted) {
          event.preventDefault();
          let touch = event.changedTouches[0];
          console.log('---_handleTouchEnd--', touch, this._lastTouch)
          if (this._lastTouch.x == touch.clientX && this._lastTouch.y == touch.clientY) {
            this._strokeEnd(touch);
            this._touchStarted = false;
          }
        }
      }
    };

    this.clear();
    this.on();
  }
  setPenOption(key,value){
    this.pen.setOption(key,value)
  }
  clear() {
    const { _ctx: ctx, canvas } = this;
    ctx.fillStyle = this.backgroundColor;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this._data = [];
    this.pen.reset(this.penOptions);
    this._isEmpty = true;
  }

  on() {
    this.canvas.style.touchAction = 'none';
    this.canvas.style.msTouchAction = 'none';
    this._ctx.globalCompositeOperation = "source-over";
    debugger
    if (window.PointerEvent) {
      this._handlePointerEvents();
  } else {
      this._handleMouseEvents();
      if ('ontouchstart' in window) {
          this._handleTouchEvents();
      }
  }
  }
  off() {
    this._ctx.globalCompositeOperation = "source-over";
    this.canvas.style.touchAction = 'auto';
    this.canvas.style.msTouchAction = 'auto';
    this.canvas.removeEventListener('pointerdown', this._handleMouseDown);
    this.canvas.removeEventListener('pointermove', this._handleMouseMove);
    document.removeEventListener('pointerup', this._handleMouseUp);
    this.canvas.removeEventListener('mousedown', this._handleMouseDown);
    this.canvas.removeEventListener('mousemove', this._handleMouseMove);
    document.removeEventListener('mouseup', this._handleMouseUp);
    this.canvas.removeEventListener('touchstart', this._handleTouchStart);
    this.canvas.removeEventListener('touchmove', this._handleTouchMove);
    this.canvas.removeEventListener('touchend', this._handleTouchEnd);
  }
  isEmpty() {
    return this._isEmpty;
  }


  switchToEraser() {
    this._ctx.globalCompositeOperation = "destination-out";
    this.pen.setOption('minWidth',10)
    this.pen.setOption('maxWidth',10)
  }
  _strokeBegin(event) {
    const newPointGroup = {
      // color: this.pen.penColor,
      // ratio:this.pen.boardScale,
      penOptions:this.pen.outputOptions(),
      points: [],
    };
    if (typeof this.onBegin === 'function') {
      this.onBegin(event);
    }
    this._data.push(newPointGroup);
    this.pen.newOperation()
    this._strokeUpdate(event);
    this._isEmpty = false;

  }
  _strokeUpdate(event, isEnd = false) {
    // console.log('--_strokeUpdate---',this._data, event)

    if (this._data.length === 0) {
      this._strokeBegin(event);
      return;
    }
    const x = event.clientX;
    const y = event.clientY;

    const lastPointGroup = this._data[this._data.length - 1];
    const lastPoints = lastPointGroup.points;
    const lastPoint = lastPoints.length > 0 && lastPoints[lastPoints.length - 1];
    const point = this._createPoint(x, y);
    point.pressure =  event.pressure||(event.force)
    point.type = this._setPointType(isEnd,lastPoint)
    point.isLastPointTooClose = lastPoint
      ? point.distanceTo(lastPoint) <= this.minDistance
      : false;
    const color = lastPointGroup.color;
    if (this._isNeedDraw(point)) {
      this.pen.draw(point)
      lastPoints.push({
        time: point.time,
        x: point.x,
        y: point.y,
      });
    }

  }
  _isNeedDraw(point){
  return point.type==='start' || !(point.type!=='start' && point.isLastPointTooClose) || point.type!=='end'
  }
  _setPointType(isEnd,lastPoint){
    return (isEnd&& this._data[this._data.length - 1].points.length > 5)?'end':(!lastPoint?'start':'common')
    }
  _strokeEnd(event) {

    this._strokeUpdate(event, true);
    if (typeof this.onEnd === 'function') {
      this.onEnd(event);
    }
  }
  _handlePointerEvents() {
    this._mouseButtonDown = false;
    this.canvas.addEventListener('pointerdown', this._handleMouseDown);
    this.canvas.addEventListener('pointermove', this._handleMouseMove);
    document.addEventListener('pointerup', this._handleMouseUp);
  }
  _handleMouseEvents() {
    this._mouseButtonDown = false;
    this.canvas.addEventListener('mousedown', this._handleMouseDown);
    this.canvas.addEventListener('mousemove', this._handleMouseMove);
    document.addEventListener('mouseup', this._handleMouseUp);
  }
  _handleTouchEvents() {
    this.canvas.addEventListener('touchstart', this._handleTouchStart);
    this.canvas.addEventListener('touchmove', this._handleTouchMove);
    this.canvas.addEventListener('touchend', this._handleTouchEnd);
  }

  _createPoint(x, y) {
    const rect = this.canvas.getBoundingClientRect();
    return new Point(x - rect.left, y - rect.top, new Date().getTime());
  }


  fromDataURL(dataUrl, options = {}, callback) {
    this.converter.fromDataURL(dataUrl, options = {}, callback)
    this._isEmpty = false;
  }
  toDataURL(type = 'image/png', encoderOptions) {
    this.converter.toDataURL(type , encoderOptions)

  }

  fromData(pointGroups) {
    this.clear();
    // this.converter.fromData(pointGroups)
    this.converter.fromData(pointGroups, this.pen);
    this._data = pointGroups;
    this._isEmpty = false;
  }
  toData() {
    return this._data;
  }

}

export default SignaturePad;
//# sourceMappingURL=signature_pad.js.map
