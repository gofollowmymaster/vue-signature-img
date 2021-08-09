import Point from   './point.js'
export default class converter{

  static init(canvas){
    this.canvas=canvas
  }

  static fromDataURL(dataUrl, options = {}, callback) {
    const image = new Image();
    const ratio = options.ratio || window.devicePixelRatio || 1;
    const width = options.width || this.canvas.width / ratio;
    const height = options.height || this.canvas.height / ratio;
    this._reset();
    image.onload = () => {
      this._ctx.drawImage(image, 0, 0, width, height);
      if (callback) {
        callback();
      }
    };
    image.onerror = (error) => {
      if (callback) {
        callback(error);
      }
    };
    image.src = dataUrl;

  }
  static toDataURL(type = 'image/png', encoderOptions) {
    switch (type) {
      default:
        return this.canvas.toDataURL(type, encoderOptions);
    }
  }


  fromData(pointGroups, pen) {
    debugger
    for (const group of pointGroups) {
      const { penOptions,points } = group;

      let ratio=  penOptions.boardScale/pen.boardScale

      Object.keys(penOptions).forEach((option)=>{
        if(option!=='boardScale'){
          if(['minWidth','maxWidth','minDistance','dotSize'].includes(option)){
          pen.setOption(option,penOptions[option]*ratio)

          }else{
          pen.setOption(option,penOptions[option])

          }
        }
      })
      debugger
      if (points.length > 1) {
        for (let j = 0; j < points.length; j += 1) {
          const basicPoint = points[j];
          const point = new Point(basicPoint.x*ratio, basicPoint.y*ratio, basicPoint.time);
          if (j === 0) {
            pen.newOperation();
          }
          const curve = pen.addPoint(point);
          if (curve) {
            pen.drawCurve (curve );
          }
        }
      }
      else {
        pen.newOperation();
        pen.drawDot(
          points[0]
        );
      }
    }
  }


}
