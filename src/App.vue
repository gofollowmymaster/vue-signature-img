<template>
  <div id="app">
    <section class="board">
      <vueSignature
        ref="signature"
        img="/0.png"
        :customStyle="customStyle"
        :brushWidth="brushWidth"
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
        //  minDistance: 5,    //两点间最小距离  影响起笔笔锋  线条顺滑
        penColor: "rgb(0,0,0)",
        velocityFilterWeight: 0.7, //上一点(宽度)权重
        throttle: 2, //节流  性能/跟随速度/结束笔锋
        touchsStrategy: "mix", //笔画宽度策略 pressure/speed/mix
      },

      brushWidth: 3,
    };
  },
  mounted() {



  },
  methods: {
    async getImageSize() {
      //  this.size = await naturalDimensions.handle(this.$refs.bgImg)
    },
    openBrush() {
      this.$refs.signature.on();
    },
    signatureLoaded() {
      let data =[{"penOptions":{"touchsStrategy":"mix","parmFilterWeight":0.7,"lastVelocity":0,"lastWidth":0.28567465321563684,"maxWidth":2.4312736443883987,"minWidth":0.4254728877679697,"boardScale":1.6452282157676348,"minDistance":3.039092055485498,"dotSize":0.060781841109709966,"penColor":"rgb(0,0,0)"},"points":[{"time":1628489146946,"x":266.3999938964844,"y":106.33332824707031,"type":"start","pressure":2.1599998474121094},{"time":1628489146984,"x":279.35382080078125,"y":100.87724304199219,"type":"common","pressure":2.690000057220459},{"time":1628489147001,"x":301.1464538574219,"y":90.88216400146484,"type":"common","pressure":2.569999933242798},{"time":1628489147017,"x":322.7189636230469,"y":78.64405822753906,"type":"common","pressure":2.5},{"time":1628489147033,"x":338.6951904296875,"y":68.61708068847656,"type":"common","pressure":2.549999952316284},{"time":1628489147049,"x":348.1589050292969,"y":61.80125427246094,"type":"common","pressure":2.549999952316284},{"time":1628489147065,"x":354.5273132324219,"y":56.18101501464844,"type":"common","pressure":2.3299999237060547},{"time":1628489147081,"x":357.2821960449219,"y":53.834434509277344,"type":"common","pressure":2.419999837875366},{"time":1628489147145,"x":342.53607177734375,"y":55.402793884277344,"type":"common","pressure":2.129999876022339},{"time":1628489147162,"x":337.121826171875,"y":57.29322814941406,"type":"common","pressure":2.3999998569488525},{"time":1628489147178,"x":333.96929931640625,"y":59.433441162109375,"type":"common","pressure":2.5399999618530273},{"time":1628489147195,"x":328.84820556640625,"y":69.9402847290039,"type":"common","pressure":2.609999895095825},{"time":1628489147212,"x":326.658447265625,"y":86.09037780761719,"type":"common","pressure":2.679999828338623},{"time":1628489147228,"x":326.7348327636719,"y":104.96855163574219,"type":"common","pressure":2.5399999618530273},{"time":1628489147244,"x":327.1380615234375,"y":119.78358459472656,"type":"common","pressure":2.3999998569488525},{"time":1628489147261,"x":327.6499938964844,"y":130.0856170654297,"type":"common","pressure":2.379999876022339},{"time":1628489147277,"x":327.6499938964844,"y":134.86648559570312,"type":"common","pressure":2.3299999237060547},{"time":1628489147294,"x":327.6499938964844,"y":138.48489379882812,"type":"common","pressure":2.379999876022339},{"time":1628489147329,"x":330.721923828125,"y":122.36886596679688,"type":"common","pressure":2.069999933242798},{"time":1628489147346,"x":336.6271667480469,"y":102.33039855957031,"type":"common","pressure":2.1599998474121094},{"time":1628489147362,"x":343.97381591796875,"y":79.57334899902344,"type":"common","pressure":2.25},{"time":1628489147378,"x":351.4188232421875,"y":61.38628387451172,"type":"common","pressure":2.509999990463257},{"time":1628489147395,"x":359.43060302734375,"y":49.78822326660156,"type":"common","pressure":2.6499998569488525},{"time":1628489147412,"x":366.35638427734375,"y":42.99813461303711,"type":"common","pressure":2.6599998474121094},{"time":1628489147429,"x":371.6016845703125,"y":40.053321838378906,"type":"common","pressure":2.690000057220459},{"time":1628489147444,"x":375.2207946777344,"y":39.162498474121094,"type":"common","pressure":2.569999933242798},{"time":1628489147460,"x":378.2760925292969,"y":39.97555160522461,"type":"common","pressure":2.559999942779541},{"time":1628489147476,"x":379.8149108886719,"y":46.413856506347656,"type":"common","pressure":2.619999885559082},{"time":1628489147492,"x":377.2153015136719,"y":56.56708526611328,"type":"common","pressure":2.5999999046325684},{"time":1628489147510,"x":372.7200622558594,"y":66.82653045654297,"type":"common","pressure":2.4800000190734863},{"time":1628489147527,"x":369.31158447265625,"y":74.46022033691406,"type":"common","pressure":2.5},{"time":1628489147543,"x":367.472412109375,"y":78.24553680419922,"type":"common","pressure":2.5299999713897705},{"time":1628489147576,"x":368.72381591796875,"y":82.01119232177734,"type":"common","pressure":2.6499998569488525},{"time":1628489147593,"x":383.79815673828125,"y":81.49880981445312,"type":"common","pressure":2.629999876022339},{"time":1628489147609,"x":403.99639892578125,"y":78.90184020996094,"type":"common","pressure":2.419999837875366},{"time":1628489147625,"x":420.65533447265625,"y":78.1583251953125,"type":"common","pressure":2.2899999618530273},{"time":1628489147643,"x":432.39385986328125,"y":78.45721435546875,"type":"common","pressure":2.169999837875366},{"time":1628489147659,"x":438.94281005859375,"y":80.00315856933594,"type":"common","pressure":2.429999828338623},{"time":1628489147676,"x":442.3525390625,"y":82.314453125,"type":"common","pressure":2.4700000286102295},{"time":1628489147692,"x":443.00616455078125,"y":88.96548461914062,"type":"common","pressure":2.5399999618530273},{"time":1628489147709,"x":436.0453796386719,"y":104.93496704101562,"type":"common","pressure":2.5899999141693115},{"time":1628489147725,"x":424.92694091796875,"y":120.3282470703125,"type":"common","pressure":2.5999999046325684},{"time":1628489147741,"x":411.34246826171875,"y":134.63206481933594,"type":"common","pressure":2.4700000286102295},{"time":1628489147758,"x":400.15228271484375,"y":143.0701141357422,"type":"common","pressure":2.509999990463257},{"time":1628489147775,"x":390.8912048339844,"y":147.1051788330078,"type":"common","pressure":2.440000057220459},{"time":1628489147792,"x":385.4591979980469,"y":147.6820831298828,"type":"common","pressure":2.4099998474121094},{"time":1628489147809,"x":380.5045166015625,"y":142.3153839111328,"type":"common","pressure":2.2799999713897705},{"time":1628489147826,"x":378.9996337890625,"y":125.49067687988281,"type":"common","pressure":2.0899999141693115},{"time":1628489147843,"x":381.44696044921875,"y":108.37884521484375,"type":"common","pressure":2.180000066757202},{"time":1628489147859,"x":384.914306640625,"y":97.56887817382812,"type":"common","pressure":2.2300000190734863},{"time":1628489147875,"x":387.46990966796875,"y":91.7376937866211,"type":"common","pressure":2.450000047683716},{"time":1628489147909,"x":387.90625,"y":88.07396697998047,"type":"common","pressure":2.440000057220459},{"time":1628489147927,"x":379.73333740234375,"y":90.86000061035156,"type":"common","pressure":2.5199999809265137},{"time":1628489147947,"x":362.91351318359375,"y":103.53657531738281,"type":"common","pressure":2.3899998664855957},{"time":1628489147963,"x":353.893798828125,"y":111.296875,"type":"common","pressure":2.5899999141693115},{"time":1628489147979,"x":348.0450134277344,"y":117.25105285644531,"type":"common","pressure":2.5999999046325684},{"time":1628489148043,"x":381.0645446777344,"y":107.1917724609375,"type":"common","pressure":2.0399999618530273},{"time":1628489148063,"x":388.9131774902344,"y":105.63143920898438,"type":"common","pressure":2.1599998474121094},{"time":1628489148079,"x":392.95123291015625,"y":105.10832977294922,"type":"common","pressure":2.200000047683716},{"time":1628489148096,"x":394.7366638183594,"y":107.94317626953125,"type":"common","pressure":2.4700000286102295},{"time":1628489148112,"x":385.03912353515625,"y":118.63604736328125,"type":"common","pressure":2.629999876022339},{"time":1628489148128,"x":368.22528076171875,"y":135.55081176757812,"type":"common","pressure":2.6499998569488525},{"time":1628489148144,"x":352.2625427246094,"y":151.137451171875,"type":"common","pressure":2.379999876022339},{"time":1628489148160,"x":338.062255859375,"y":164.8272705078125,"type":"common","pressure":2.0799999237060547},{"time":1628489148176,"x":333.7749938964844,"y":167.99166870117188,"type":"common","pressure":1.159999966621399},{"time":1628489148193,"x":333.7749938964844,"y":167.99166870117188,"type":"end","pressure":0}]},{"penOptions":{"touchsStrategy":"mix","parmFilterWeight":0.7,"lastVelocity":0,"lastWidth":0.28567465321563684,"maxWidth":2.4312736443883987,"minWidth":0.4254728877679697,"boardScale":1.6452282157676348,"minDistance":3.039092055485498,"dotSize":0.060781841109709966,"penColor":"rgb(0,0,0)"},"points":[{"time":1628489148601,"x":504.45831298828125,"y":35.69166564941406,"type":"start","pressure":2.0899999141693115},{"time":1628489148655,"x":508.80889892578125,"y":35.14228439331055,"type":"common","pressure":2.429999828338623},{"time":1628489148678,"x":505.26611328125,"y":46.700340270996094,"type":"common","pressure":2.2699999809265137},{"time":1628489148699,"x":491.15887451171875,"y":63.341064453125,"type":"common","pressure":2.119999885559082},{"time":1628489148717,"x":470.5666198730469,"y":83.46666717529297,"type":"common","pressure":1.1299999952316284}]},{"penOptions":{"touchsStrategy":"mix","parmFilterWeight":0.7,"lastVelocity":0,"lastWidth":0.28567465321563684,"maxWidth":2.4312736443883987,"minWidth":0.4254728877679697,"boardScale":1.6452282157676348,"minDistance":3.039092055485498,"dotSize":0.060781841109709966,"penColor":"rgb(0,0,0)"},"points":[{"time":1628489148754,"x":451.3749694824219,"y":101.84165954589844,"type":"start","pressure":1.9199999570846558},{"time":1628489148794,"x":470.3534851074219,"y":96.62443542480469,"type":"common","pressure":2.4099998474121094},{"time":1628489148826,"x":520.406005859375,"y":87.363037109375,"type":"common","pressure":2.200000047683716},{"time":1628489148844,"x":537.215576171875,"y":83.39508056640625,"type":"common","pressure":2.2899999618530273},{"time":1628489148864,"x":548.8409423828125,"y":79.78853607177734,"type":"common","pressure":2.190000057220459},{"time":1628489148880,"x":553.90380859375,"y":78.06179809570312,"type":"common","pressure":2.119999885559082},{"time":1628489148915,"x":555.5,"y":77.34166717529297,"type":"end","pressure":0}]},{"penOptions":{"touchsStrategy":"mix","parmFilterWeight":0.7,"lastVelocity":0,"lastWidth":0.28567465321563684,"maxWidth":2.4312736443883987,"minWidth":0.4254728877679697,"boardScale":1.6452282157676348,"minDistance":3.039092055485498,"dotSize":0.060781841109709966,"penColor":"rgb(0,0,0)"},"points":[{"time":1628489148995,"x":497.51666259765625,"y":75.29999542236328,"type":"start","pressure":1.96999990940094},{"time":1628489149033,"x":497.21051025390625,"y":78.46369934082031,"type":"common","pressure":2.4099998474121094},{"time":1628489149048,"x":496.4010925292969,"y":88.84666442871094,"type":"common","pressure":2.3899998664855957},{"time":1628489149065,"x":495.56317138671875,"y":105.65081024169922,"type":"common","pressure":2.379999876022339},{"time":1628489149080,"x":494.78900146484375,"y":116.88399505615234,"type":"common","pressure":2.169999837875366},{"time":1628489149096,"x":494.6582946777344,"y":126.54855346679688,"type":"common","pressure":1.8899999856948853},{"time":1628489149112,"x":495.3658142089844,"y":131.9207305908203,"type":"common","pressure":1.75},{"time":1628489149141,"x":498.33331298828125,"y":132.46665954589844,"type":"end","pressure":0}]},{"penOptions":{"touchsStrategy":"mix","parmFilterWeight":0.7,"lastVelocity":0,"lastWidth":0.28567465321563684,"maxWidth":2.4312736443883987,"minWidth":0.4254728877679697,"boardScale":1.6452282157676348,"minDistance":3.039092055485498,"dotSize":0.060781841109709966,"penColor":"rgb(0,0,0)"},"points":[{"time":1628489149226,"x":531.816650390625,"y":54.88332748413086,"type":"start","pressure":2.180000066757202},{"time":1628489149263,"x":531.017578125,"y":73.86373901367188,"type":"common","pressure":2.5299999713897705},{"time":1628489149279,"x":527.1250610351562,"y":104.34645080566406,"type":"common","pressure":2.5199999809265137},{"time":1628489149296,"x":519.9674682617188,"y":143.25967407226562,"type":"common","pressure":2.119999885559082},{"time":1628489149314,"x":515.5911865234375,"y":178.9470672607422,"type":"common","pressure":1.5899999141693115},{"time":1628489149337,"x":515.074951171875,"y":185.1416473388672,"type":"common","pressure":0}]}]
      ;
      // this.$refs.signature.fromData(data);
    },
    closeBrush() {
      this.$refs.signature.off();
    },
    save() {
      let data = this.$refs.signature.toDataUrl();
      const img = document.createElement("img");
      img.src = data;
      const newWin = window.open("");
      newWin.document.body.appendChild(img);
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
