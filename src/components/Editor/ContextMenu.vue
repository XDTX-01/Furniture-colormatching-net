<template>
  <div
    v-show="menuShow"
    class="contextmenu"
    :style="{ top: menuTop + 'px', left: menuLeft + 'px' }"
  >
    <ul @mouseup="handleMouseUp">
      <li @click="textTool">文字</li>
      <li v-if="multiSelectComponents.length" @click="compose">组合</li>
      <template v-if="curComponent">
        <template v-if="!curComponent.isLock">
          <!-- <li @click="copy">复制</li> -->
          <!-- <li @click="paste">粘贴</li> -->
          <!-- <li @click="cut">剪切</li> -->
          <li v-if="curComponent.component === 'Group'" @click="decompose">拆分</li>
          <li @click="deleteComponent">删除</li>
          <li @click="lock">锁定</li>
          <li @click="topComponent">置顶</li>
          <li @click="bottomComponent">置底</li>
          <li @click="upComponent">上移</li>
          <li @click="downComponent">下移</li>
        </template>
        <li v-else @click="unlock">解锁</li>
      </template>
      <li v-else @click="paste">粘贴</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getComponentRotatedStyle } from "@/utils/style";
import { $ } from "@/utils/utils";

export default {
  data() {
    return {
      copyData: null,
    };
  },
  computed: mapState(["menuTop", "menuLeft", "menuShow", "curComponent", "multiSelectComponents"]),
  methods: {
    // 激活文字工具（等同顶部工具栏“文字”按钮），并关闭右键菜单
    textTool() {
      this.$store.commit("setTextTool", true);
      this.$store.commit("hideContextMenu");
    },

    // 组合选中的多个组件（等同 Ctrl+G）
    compose() {
      const { areaData, multiSelectComponents } = this.$store.state;
      // 右键打开菜单时 areaData 可能已被清空，这里用多选集合兜底重建
      if (!areaData.components.length && multiSelectComponents.length) {
        this.$store.commit("setAreaData", {
          style: this.computeAreaStyle(multiSelectComponents),
          components: multiSelectComponents,
        });
      }

      if (this.$store.state.areaData.components.length) {
        this.$store.commit("compose");
        this.$store.commit("recordSnapshot");
        this.$store.commit("hideContextMenu");
      }
    },

    // 拆分选中的 Group（等同 Ctrl+B）
    decompose() {
      if (this.curComponent && this.curComponent.component === "Group") {
        this.$store.commit("decompose");
        this.$store.commit("recordSnapshot");
        this.$store.commit("hideContextMenu");
      }
    },

    // 由多选组件计算包围盒（Group 需遍历子组件）
    computeAreaStyle(components) {
      const editorRect = this.$store.state.editor.getBoundingClientRect();
      const edX = editorRect.x;
      const edY = editorRect.y;
      let top = Infinity,
        left = Infinity,
        right = -Infinity,
        bottom = -Infinity;

      components.forEach((c) => {
        if (c.component === "Group") {
          c.propValue.forEach((item) => {
            const rect = $(`#component${item.id}`).getBoundingClientRect();
            const l = rect.left - edX;
            const t = rect.top - edY;
            const r = rect.right - edX;
            const b = rect.bottom - edY;
            if (l < left) left = l;
            if (t < top) top = t;
            if (r > right) right = r;
            if (b > bottom) bottom = b;
          });
        } else {
          const style = getComponentRotatedStyle(c.style);
          if (style.left < left) left = style.left;
          if (style.top < top) top = style.top;
          if (style.right > right) right = style.right;
          if (style.bottom > bottom) bottom = style.bottom;
        }
      });

      return { left, top, width: right - left, height: bottom - top };
    },

    lock() {
      this.$store.commit("lock");
    },

    unlock() {
      this.$store.commit("unlock");
    },

    // 点击菜单时不取消当前组件的选中状态
    handleMouseUp() {
      this.$store.commit("setClickComponentStatus", true);
    },

    cut() {
      this.$store.commit("cut");
    },

    copy() {
      this.$store.commit("copy");
    },

    paste() {
      this.$store.commit("paste", true);
      this.$store.commit("recordSnapshot");
    },

    deleteComponent() {
      this.$store.commit("deleteComponent");
      this.$store.commit("recordSnapshot");
    },

    upComponent() {
      this.$store.commit("upComponent");
      this.$store.commit("recordSnapshot");
    },

    downComponent() {
      this.$store.commit("downComponent");
      this.$store.commit("recordSnapshot");
    },

    topComponent() {
      this.$store.commit("topComponent");
      this.$store.commit("recordSnapshot");
    },

    bottomComponent() {
      this.$store.commit("bottomComponent");
      this.$store.commit("recordSnapshot");
    },
  },
};
</script>

<style lang="scss" scoped>
.contextmenu {
  position: absolute;
  z-index: 1000;

  ul {
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    margin: 5px 0;
    padding: 6px 0;

    li {
      font-size: 14px;
      padding: 0 20px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #606266;
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;

      &:hover {
        background-color: #f5f7fa;
      }
    }
  }
}
</style>
