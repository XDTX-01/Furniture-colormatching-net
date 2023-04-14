<template>
  <div class="toolbar">
    <div class="dickson">Dickson家装配色</div>
    <el-button @click="undo">撤销</el-button>
    <el-button @click="redo">前进</el-button>

    <el-button @click="clearCanvas">清空</el-button>
    <el-button :disabled="!curComponent || curComponent.isLock" @click="lock"
      >锁定</el-button
    >
    <el-button :disabled="!curComponent || !curComponent.isLock" @click="unlock"
      >解锁</el-button
    ><el-button style="margin-left: 10px" @click="preview(false)"
      >预览</el-button
    >
    <el-button @click="preview(true)">保存</el-button>

    <div class="canvas-config">
      <span>画布大小</span>
      <input v-model="canvasStyleData.width" />
      <span>*</span>
      <input v-model="canvasStyleData.height" />
    </div>
    <div class="canvas-config">
      <span>画布比例</span>
      <input v-model="scale" @input="handleScaleChange" /> %
    </div>

    <div style="margin-left: 30px">
      <el-tabs v-if="curComponent" v-model="activeName">
        <component :is="curComponent.component + 'Attr'" />
      </el-tabs>
    </div>

    <!-- 预览 -->
    <Preview
      v-if="isShowPreview"
      :is-screenshot="isScreenshot"
      @close="handlePreviewChange"
    />
  </div>
</template>

<script>
import generateID from "@/utils/generateID";
import toast from "@/utils/toast";
import { mapState } from "vuex";
import Preview from "@/components/Editor/Preview";
import { commonStyle, commonAttr } from "@/custom-component/component-list";
import eventBus from "@/utils/eventBus";
import { $ } from "@/utils/utils";
import changeComponentsSizeWithScale, {
  changeComponentSizeWithScale,
} from "@/utils/changeComponentsSizeWithScale";

console.log(
  "mapState :>> ",
  mapState([
    "componentData",
    "canvasStyleData",
    "areaData",
    "curComponent",
    "curComponentIndex",
  ])
);
export default {
  components: { Preview },
  data() {
    return {
      isShowPreview: false,
      timer: null,
      isScreenshot: false,
      scale: 100,
      activeName: "attr",
    };
  },
  computed: mapState([
    "componentData",
    "canvasStyleData",
    "areaData",
    "curComponent",
    "curComponentIndex",
  ]),
  created() {
    eventBus.$on("preview", this.preview);
    eventBus.$on("clearCanvas", this.clearCanvas);
    this.scale = this.canvasStyleData.scale;
  },
  methods: {
    handleScaleChange() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.scale = ~~this.scale || 1;
        changeComponentsSizeWithScale(this.scale);
      }, 1000);
    },

    lock() {
      this.$store.commit("lock");
    },

    unlock() {
      this.$store.commit("unlock");
    },

    undo() {
      this.$store.commit("undo");
    },

    redo() {
      this.$store.commit("redo");
    },

    preview(isScreenshot) {
      this.isScreenshot = isScreenshot;
      this.isShowPreview = true;
      this.$store.commit("setEditMode", "preview");
    },

    clearCanvas() {
      this.$store.commit("setCurComponent", { component: null, index: null });
      this.$store.commit("setComponentData", []);
      this.$store.commit("recordSnapshot");
    },

    handlePreviewChange() {
      this.isShowPreview = false;
      this.$store.commit("setEditMode", "edit");
    },
  },
};
</script>

<style lang="scss" scoped>
.toolbar {
  display: flex;
  padding: 7px;
  white-space: nowrap;
  overflow-x: auto;
  background: #fff;
  border-bottom: 2px solid #ccc;
  .dickson {
    display: flex;
    padding: 2px;
    font: 25px/100% "幼圆";
    margin-right: 20px;
  }
  .canvas-config {
    display: inline-block;
    margin-top: 5px;
    margin-left: 15px;
    font-size: 15px;
    color: #606266;

    input {
      width: 50px;
      margin-left: 5px;
      outline: none;
      padding: 0 5px;
      border: 1px solid #ddd;
      color: #606266;
    }

    span {
      margin-left: 10px;
    }
  }

  .insert {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
    padding: 10px 15px;
    font-size: 12px;
    border-radius: 3px;
    margin-left: 10px;

    &:active {
      color: #3a8ee6;
      border-color: #3a8ee6;
      outline: 0;
    }

    &:hover {
      background-color: #ecf5ff;
      color: #3a8ee6;
    }
  }
}
</style>
