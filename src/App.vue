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
 new vconsole()

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
        backgroundColor: "transparent",   //背景色
        penColor: "rgb(0,0,0)",            //笔刷颜色
        velocityFilterWeight: 0.7,         //上一点(宽度)权重
        throttle: 5,                       //节流  性能/跟随速度
        touchsStrategy: "mix",           //笔画宽度策略 pressure/speed/mix
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
    closeBrush() {
      this.$refs.signature.off();
    },
    save() {
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
