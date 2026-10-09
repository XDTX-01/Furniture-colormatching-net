<template>
  <div class="group">
    <div>
      <div
        v-for="item in propValue"
        :key="item.id"
        class="group-item"
      >
        <div
          v-if="item.component !== 'VText'"
          class="group-yes"
          :style="nameStyle(item)"
        >{{ item.label }}</div>
        <component
          :is="item.component"
          :id="'component' + item.id"
          class="component"
          :class="{ 'text-top': item.component === 'VText' }"
          :style="item.groupStyle"
          :prop-value="item.propValue"
          :element="item"
          :request="item.request"
        />
      </div>
    </div>
  </div>
</template>

<script>
import OnEvent from "../common/OnEvent";

export default {
  extends: OnEvent,
  props: {
    propValue: {
      type: Array,
      default: () => [],
    },
    element: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    // 子组件按 groupStyle 保持在各自的原位置，名字标签定位在组件左上角
    nameStyle(item) {
      const gs = item.groupStyle || {};
      return {
        left: gs.left,
        top: gs.top,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.group {
  & > div {
    position: relative;
    width: 100%;
    height: 100%;

    .component {
      position: absolute;
    }

    // 组合内的文字始终在最上层
    .component.text-top {
      z-index: 1000;
    }

    .group-item {
      .group-yes {
        position: absolute;
        left: 0;
        top: 0;
        margin-left: 10px;
        transform: translateY(-110%);
        font: 14px/100% "幼圆";
        color: #606266;
        white-space: nowrap;
        z-index: 2;
        pointer-events: none;
      }
    }
  }
}
</style>
