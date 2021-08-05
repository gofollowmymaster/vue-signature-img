<template>
  <div id="app">
    <section class="board">
      <vueSignature
        class="signature-board"
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
        backgroundColor: "transparent",
        penColor: "rgb(0,0,0)",
        velocityFilterWeight: 0.7,
        throttle: 1,
        touchsStrategy: "force",
      },
      isBrushOn: true,
      imgDom: undefined,
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
  /* position: relative; */
  width: 100%;
}
.signature-board {
  position: relative;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100%;
}
</style>
