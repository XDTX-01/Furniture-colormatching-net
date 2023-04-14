<template>
  <div ref="container" class="bg">
    <div class="canvas-container">
      <div
        class="canvas"
        v-if="canvasStyleData != {} && componentData.length != 0"
        :style="{
          ...getCanvasStyle(canvasStyleData),
          width: changeStyleWithScale(canvasStyleData.width) + 'px',
          height: changeStyleWithScale(canvasStyleData.height) + 'px',
        }"
      >
        <ComponentWrapper
          v-for="(item, index) in componentData"
          :key="index"
          :config="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getStyle, getCanvasStyle } from "@/utils/style";
import ComponentWrapper from "@/components/Editor/ComponentWrapper";
import { changeStyleWithScale } from "@/utils/translate";
export default {
  components: { ComponentWrapper },
  props: {
    isScreenshot: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      componentData: [],
      canvasStyleData: {},
    };
  },
  created() {
    if (window.localStorage.getItem("componentData") == null) {
      window.localStorage.setItem("componentData", "[]");
    }
    if (window.localStorage.getItem("canvasStyleData") == null) {
      window.localStorage.setItem("canvasStyleData", "{}");
    }
    this.componentData = JSON.parse(
      window.localStorage.getItem("componentData")
    );
    this.canvasStyleData = JSON.parse(
      window.localStorage.getItem("canvasStyleData")
    );

    console.log("this.componentData :>> ", this.componentData);
    console.log("this.canvasStyleData :>> ", this.canvasStyleData);
  },
  methods: {
    getStyle,
    getCanvasStyle,
    changeStyleWithScale,
  },
};
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  // background: rgb(0, 0, 0, 0.5);
  background: #fff;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 5px;

  .canvas-container {
    width: calc(100% - 40px);
    height: calc(100% - 120px);
    // overflow: hidden;

    .canvas {
      background: #fff;
      position: relative;
      margin: auto;
      margin-top: 32px;
      transform: scale(1.3, 1.25);
    }
  }
}
</style>

