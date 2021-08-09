

<script>
import SignaturePad from "../utils/signature_pad.js";
import { naturalDimensions, brushOption, cloneCanvas } from "../utils/utils.js";

export default {
  name: "vueSignature",
  props: {
    customStyle: {
      type: Object,
      default: () => ({}),
    },
    img: {
      type: String,
      default: "",
    },
    brushWidth: {
      type: Number,
      default: 3,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    signaturePad: {},
    onResizeHandler: null,
    ratioWidth: 1,
    ratioHeight: 1,
    canvasSize: {},
  }),
  computed: {
    brushOptions() {
      let options = {
        ...brushOption[this.brushWidth],    //笔刷宽度范围
        minDistance: 5,    //两点间最小距离  影响起笔笔锋  线条顺滑
        dotSize: 0.1,      //起点大小  影响起笔笔锋/
      };
      for (let item in options) {
        options[item] = options[item] / this.ratioWidth;
      }
      return options;
    },
  },
  watch: {
    brushOptions: function (nextOptions) {
      this.updateOptions(nextOptions);
    },

    options: {
      handler(nextOptions) {
        let options = {};
        Object.keys(nextOptions)
          .filter(
            (key) =>
              ![
                "minWidth",
                "maxWidth",
                "minDistance",
                "dotSize",
                "brushMode",
                "brushWidth",
              ].includes(key)
          )
          .forEach((option) => {
            // if (this.signature[option]) {
              options[option] = nextOptions[option];
            // }
          });
        this.updateOptions(options);
      },
      deep: true,
    },
    img: function (img) {
      this.destoryBoard();
      img && this.initBoard();
    },
  },
  mounted() {
    this.resizeHandler = this.resizeHandler.bind(this);
    this.initBoard();
  },
  methods: {
    async initBoard() {
      this.canvasSize = await naturalDimensions.handle(this.$refs.bgImg);

      this.$refs.signaturePadCanvas.width = this.canvasSize.w;
      this.$refs.signaturePadCanvas.height = this.canvasSize.h;
      this.setBoardSize();
   debugger
      this.signature = new SignaturePad(this.$refs.signaturePadCanvas, {
        ...this.options,
        ...this.brushOptions,
        boardScale: this.ratioWidth,
      });
      this.$emit('loaded')
      window.addEventListener("resize", this.resizeHandler);
    },
    resizeHandler() {
      console.log('window.devicePixelRatio',window.devicePixelRatio)
      this.setBoardSize();
      // this.signature.boardScale = this.ratioWidth;
     this.updateOptions({boardScale:this.ratioWidth});
    },
    // 设置画板尺寸和图片原始尺寸一致(不同尺寸屏幕下画板尺寸始终一致)
    setBoardSize() {
      var canvasBox = this.$refs.signaturePadCanvas.getBoundingClientRect(); //获取canvas元素的边界框
      this.ratioWidth = this.canvasSize.w / canvasBox.width;
      this.ratioHeight = this.canvasSize.h / canvasBox.height;
      //恢复默认缩放比例
      this.$refs.signaturePadCanvas.getContext("2d").restore();
      this.$refs.signaturePadCanvas.getContext("2d").save();
      //设缩放比例
      console.log('this.ratioHeight--',this.ratioHeight)
      this.$refs.signaturePadCanvas
        .getContext("2d")
        .scale(this.ratioWidth, this.ratioHeight);
    },

    destoryBoard() {
      window.removeEventListener("resize", this.resizeHandler, false);
    },

    clearBoard() {
      this.signature.clear();
    },
    switchToEraser() {
      this.signature.switchToEraser();
    },
    on() {
      debugger;
      this.signature._ctx.globalCompositeOperation = "source-over";
      this.updateOptions(this.brushOptions);
      this.signature.on();
    },
    off() {
      this.signature._ctx.globalCompositeOperation = "source-over";
      this.updateOptions(this.brushOptions);
      this.signature.off();
    },
    toDataUrl() {
      const outPutCanvas = cloneCanvas(this.$refs.signaturePadCanvas);
      outPutCanvas.getContext("2d").globalCompositeOperation =
        "destination-over";
      outPutCanvas.getContext("2d").drawImage(this.$refs.bgImg, 0, 0);
      outPutCanvas.getContext("2d").scale(this.ratioWidth, this.ratioHeight);
      let imageStr = outPutCanvas.toDataURL();

      return imageStr;
    },
    updateOptions(options) {
      Object.keys(options).forEach((option) => {
        if (this.signature) {
          this.signature.setPenOption(option,options[option]);
        }
      });
    },
    toData() {
      return this.signature.toData();
    },
    fromData(data){
          return this.signature.fromData(data);
    }
  },
  render(createElement) {
    const { customStyle } = this;
    return createElement(
      "div",
      {
        style: {
          ...customStyle,
        },
        attrs:{
          class:'signature-board'
        }
      },
      [
        createElement("canvas", {
          style: {
            width: "100%",
            height: "100%",
          },
          ref: "signaturePadCanvas",
        }),
        createElement("img", {
          style: {
            width: "100%",
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
          },
          attrs: {
            src: this.img,
            id: "bg-img",
          },
          ref: "bgImg",
        }),
      ]
    );
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.signature-board {
  position: relative;
  top: 0px;
  left: 0px;
  height: 100%;
}
</style>
