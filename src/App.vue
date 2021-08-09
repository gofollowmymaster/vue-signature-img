<template>
  <div id="app">
    <section class="board">
      <vueSignature
        ref="signature"
        img="/0.png"
        :customStyle="customStyle"
        :brushWidth="brushWidth"
        :isBrushOn="isBrushOn"
        :options="options"
        @loaded="signatureLoaded"
      />
    </section>

    <section>
      <button @click="openBrush">打开笔刷</button>
      <button @click="closeBrush">关闭笔刷</button>
      <button @click="save">保存</button>
      <button @click="setBrushWidth">宽度+1</button>
      <button @click="setBrushColor">颜色</button>
      <button @click="setEraser">橡皮</button>
    </section>
  </div>
</template>

<script>
import vueSignature from "./components/vueSignature.vue";
import vconsole from "vconsole";
new vconsole();

export default {
  name: "App",
  components: {
    vueSignature,
  },
  data: function () {
    return {
      img: "/0.png",
      customStyle: { width: "100%" },
      options: {
        backgroundColor: "transparent", //背景色
        penColor: "rgb(0,0,0)",
        velocityFilterWeight: 0.7, //上一点(宽度)权重
        throttle: 5, //节流  性能/跟随速度/结束笔锋
        touchsStrategy: "mix", //笔画宽度策略 pressure/speed/mix
      },
      isBrushOn: true,
      brushWidth: 3,
    };
  },
  mounted() {},
  methods: {
    async getImageSize() {
      //  this.size = await naturalDimensions.handle(this.$refs.bgImg)
    },
    openBrush() {
      this.$refs.signature.on();
    },
    signatureLoaded() {
      // let data = [
      //   {
      //     penOptions: {
      //       touchsStrategy: "mix",
      //       parmFilterWeight: 0.7,
      //       lastVelocity: 1,
      //       lastWidth: 0.21866330390920555,
      //       maxWidth: 0.9110970996216897,
      //       minWidth: 0.18221941992433796,
      //       boardScale: 2.7439446366782008,
      //       minDistance: 1.8221941992433794,
      //       dotSize: 0.18221941992433796,
      //       penColor: "rgb(0,0,0)",
      //     },
      //     points: [
      //       { time: 1628239339305, x: 26, y: 26 },
      //       { time: 1628239339357, x: 27, y: 26 },
      //       { time: 1628239339373, x: 31, y: 29 },
      //       { time: 1628239339390, x: 41, y: 38 },
      //       { time: 1628239339407, x: 56, y: 52 },
      //       { time: 1628239339423, x: 77, y: 71 },
      //       { time: 1628239339441, x: 109, y: 100 },
      //       { time: 1628239339457, x: 144, y: 133 },
      //       { time: 1628239339474, x: 180, y: 167 },
      //       { time: 1628239339491, x: 217, y: 204 },
      //       { time: 1628239339508, x: 261, y: 246 },
      //       { time: 1628239339524, x: 307, y: 293 },
      //       { time: 1628239339540, x: 328, y: 310 },
      //       { time: 1628239339556, x: 337, y: 318 },
      //       { time: 1628239339572, x: 348, y: 329 },
      //       { time: 1628239339589, x: 354, y: 335 },
      //       { time: 1628239339606, x: 358, y: 338 },
      //       { time: 1628239339622, x: 361, y: 343 },
      //       { time: 1628239339638, x: 364, y: 349 },
      //       { time: 1628239339656, x: 368, y: 357 },
      //       { time: 1628239339673, x: 371, y: 362 },
      //       { time: 1628239339690, x: 375, y: 366 },
      //       { time: 1628239339708, x: 380, y: 371 },
      //       { time: 1628239339724, x: 389, y: 380 },
      //       { time: 1628239339740, x: 394, y: 384 },
      //       { time: 1628239339757, x: 407, y: 392 },
      //       { time: 1628239339775, x: 414, y: 397 },
      //       { time: 1628239339791, x: 419, y: 400 },
      //       { time: 1628239339808, x: 423, y: 403 },
      //       { time: 1628239339825, x: 429, y: 408 },
      //       { time: 1628239339842, x: 436, y: 413 },
      //       { time: 1628239339860, x: 445, y: 422 },
      //       { time: 1628239339876, x: 450, y: 427 },
      //       { time: 1628239339892, x: 455, y: 432 },
      //       { time: 1628239339908, x: 459, y: 436 },
      //       { time: 1628239339924, x: 465, y: 441 },
      //       { time: 1628239339940, x: 468, y: 444 },
      //       { time: 1628239339956, x: 479, y: 453 },
      //       { time: 1628239339972, x: 486, y: 457 },
      //       { time: 1628239339988, x: 491, y: 460 },
      //       { time: 1628239340004, x: 497, y: 464 },
      //       { time: 1628239340020, x: 501, y: 467 },
      //       { time: 1628239340036, x: 506, y: 469 },
      //       { time: 1628239340052, x: 509, y: 471 },
      //       { time: 1628239340069, x: 511, y: 472 },
      //       { time: 1628239340085, x: 512, y: 473 },
      //       { time: 1628239340102, x: 513, y: 473 },
      //       { time: 1628239340120, x: 514, y: 473 },
      //       { time: 1628239340137, x: 515, y: 473 },
      //       { time: 1628239340154, x: 516, y: 473 },
      //       { time: 1628239340170, x: 517, y: 473 },
      //       { time: 1628239340188, x: 519, y: 473 },
      //       { time: 1628239340204, x: 521, y: 473 },
      //       { time: 1628239340220, x: 523, y: 473 },
      //       { time: 1628239340236, x: 524, y: 473 },
      //       { time: 1628239340253, x: 526, y: 473 },
      //       { time: 1628239340270, x: 527, y: 473 },
      //       { time: 1628239340288, x: 529, y: 473 },
      //       { time: 1628239340305, x: 530, y: 473 },
      //       { time: 1628239340322, x: 532, y: 473 },
      //       { time: 1628239340340, x: 533, y: 473 },
      //       { time: 1628239340355, x: 534, y: 473 },
      //       { time: 1628239340381, x: 535, y: 473 },
      //       { time: 1628239340397, x: 536, y: 473 },
      //       { time: 1628239340415, x: 537, y: 473 },
      //       { time: 1628239340431, x: 538, y: 473 },
      //       { time: 1628239340448, x: 539, y: 473 },
      //       { time: 1628239340466, x: 541, y: 474 },
      //       { time: 1628239340483, x: 542, y: 474 },
      //       { time: 1628239340500, x: 543, y: 474 },
      //       { time: 1628239340516, x: 545, y: 475 },
      //       { time: 1628239340532, x: 546, y: 475 },
      //       { time: 1628239340548, x: 548, y: 476 },
      //       { time: 1628239340564, x: 549, y: 477 },
      //       { time: 1628239340582, x: 550, y: 477 },
      //       { time: 1628239340600, x: 552, y: 478 },
      //       { time: 1628239340617, x: 553, y: 478 },
      //       { time: 1628239340634, x: 554, y: 478 },
      //       { time: 1628239340652, x: 555, y: 479 },
      //       { time: 1628239340668, x: 556, y: 479 },
      //       { time: 1628239340685, x: 557, y: 479 },
      //       { time: 1628239340741, x: 557, y: 479 },
      //       { time: 1628239340805, x: 557, y: 480 },
      //       { time: 1628239340837, x: 557, y: 481 },
      //       { time: 1628239341176, x: 557, y: 481 },
      //     ],
      //   },
      //   {
      //     penOptions: {
      //       touchsStrategy: "mix",
      //       parmFilterWeight: 0.7,
      //       lastVelocity: 1,
      //       lastWidth: 0.7224391983409053,
      //       maxWidth: 0.9110970996216897,
      //       minWidth: 0.18221941992433796,
      //       boardScale: 2.7439446366782008,
      //       minDistance: 1.8221941992433794,
      //       dotSize: 0.18221941992433796,
      //       penColor: "rgb(0,0,0)",
      //     },
      //     points: [
      //       { time: 1628239882598, x: 295, y: 136 },
      //       { time: 1628239882599, x: 292, y: 142 },
      //       { time: 1628239882616, x: 285, y: 160 },
      //       { time: 1628239882634, x: 277, y: 179 },
      //       { time: 1628239882651, x: 268, y: 203 },
      //       { time: 1628239882668, x: 249, y: 245 },
      //       { time: 1628239882684, x: 233, y: 268 },
      //       { time: 1628239882700, x: 220, y: 287 },
      //       { time: 1628239882716, x: 208, y: 305 },
      //       { time: 1628239882732, x: 198, y: 322 },
      //       { time: 1628239882748, x: 191, y: 339 },
      //       { time: 1628239882765, x: 185, y: 353 },
      //       { time: 1628239882781, x: 177, y: 369 },
      //       { time: 1628239882797, x: 172, y: 382 },
      //       { time: 1628239882814, x: 168, y: 392 },
      //       { time: 1628239882831, x: 167, y: 397 },
      //       { time: 1628239882848, x: 166, y: 398 },
      //       { time: 1628239882877, x: 166, y: 399 },
      //       { time: 1628239882899, x: 166, y: 400 },
      //       { time: 1628239882916, x: 165, y: 400 },
      //       { time: 1628239883078, x: 164, y: 400 },
      //       { time: 1628239883094, x: 163, y: 400 },
      //       { time: 1628239883112, x: 162, y: 400 },
      //       { time: 1628239883142, x: 161, y: 400 },
      //       { time: 1628239883159, x: 160, y: 400 },
      //       { time: 1628239883176, x: 159, y: 401 },
      //       { time: 1628239883194, x: 156, y: 406 },
      //       { time: 1628239883211, x: 152, y: 416 },
      //       { time: 1628239883227, x: 149, y: 423 },
      //       { time: 1628239883245, x: 143, y: 437 },
      //       { time: 1628239883261, x: 139, y: 450 },
      //       { time: 1628239883277, x: 134, y: 466 },
      //       { time: 1628239883294, x: 131, y: 487 },
      //       { time: 1628239883311, x: 129, y: 506 },
      //       { time: 1628239883329, x: 129, y: 519 },
      //       { time: 1628239883346, x: 129, y: 526 },
      //       { time: 1628239883363, x: 129, y: 529 },
      //       { time: 1628239883412, x: 130, y: 529 },
      //       { time: 1628239883460, x: 131, y: 529 },
      //       { time: 1628239883475, x: 132, y: 529 },
      //       { time: 1628239883492, x: 135, y: 529 },
      //       { time: 1628239883508, x: 145, y: 529 },
      //       { time: 1628239883524, x: 174, y: 532 },
      //       { time: 1628239883540, x: 233, y: 545 },
      //       { time: 1628239883558, x: 308, y: 561 },
      //       { time: 1628239883575, x: 374, y: 572 },
      //       { time: 1628239883592, x: 428, y: 580 },
      //       { time: 1628239883609, x: 460, y: 582 },
      //       { time: 1628239883626, x: 481, y: 582 },
      //       { time: 1628239883643, x: 496, y: 582 },
      //       { time: 1628239883707, x: 496, y: 583 },
      //       { time: 1628239883724, x: 491, y: 586 },
      //       { time: 1628239883740, x: 482, y: 593 },
      //       { time: 1628239883757, x: 473, y: 603 },
      //       { time: 1628239883773, x: 462, y: 613 },
      //       { time: 1628239883791, x: 445, y: 624 },
      //       { time: 1628239883808, x: 422, y: 633 },
      //       { time: 1628239883824, x: 396, y: 639 },
      //       { time: 1628239883840, x: 369, y: 644 },
      //       { time: 1628239883857, x: 340, y: 647 },
      //       { time: 1628239883874, x: 314, y: 650 },
      //       { time: 1628239883891, x: 295, y: 652 },
      //       { time: 1628239883908, x: 278, y: 653 },
      //       { time: 1628239883924, x: 273, y: 653 },
      //       { time: 1628239883941, x: 271, y: 648 },
      //       { time: 1628239883957, x: 269, y: 641 },
      //       { time: 1628239883974, x: 263, y: 610 },
      //       { time: 1628239883990, x: 259, y: 596 },
      //       { time: 1628239884007, x: 257, y: 590 },
      //       { time: 1628239884022, x: 257, y: 584 },
      //       { time: 1628239884040, x: 264, y: 569 },
      //       { time: 1628239884057, x: 288, y: 515 },
      //       { time: 1628239884074, x: 316, y: 451 },
      //       { time: 1628239884091, x: 351, y: 383 },
      //       { time: 1628239884108, x: 362, y: 360 },
      //       { time: 1628239884124, x: 367, y: 349 },
      //       { time: 1628239884147, x: 368, y: 347 },
      //       { time: 1628239884151, x: 368, y: 347 },
      //     ],
      //   },

      // ];
      // this.$refs.signature.fromData(data);
    },
    closeBrush() {
      this.$refs.signature.off();
    },
    save() {
      let data = this.$refs.signature.toData();
      const div = document.createElement("div");
      div.innerHTML = JSON.stringify(data);
      const newWin = window.open("");
      newWin.document.body.appendChild(div);
      newWin.document.title = "流程图数据";
    },
    saveImg() {
      let imageStr = this.$refs.signature.toDataUrl();
      const outputImg = new Image();
      outputImg.src = imageStr;
      const newWin = window.open("");
      newWin.document.body.appendChild(outputImg);
      newWin.document.title = "流程图";
    },
    setBrushWidth() {
      ++this.brushWidth;
    },
    setBrushColor() {
      debugger;
      this.options.penColor = "red";
    },
    setEraser() {
      this.$refs.signature.switchToEraser();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding: 0;
  margin: 0;
}
.board {
  width: 100%;
}
</style>
