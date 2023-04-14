<template>
  <div
    class="home"
    oncontextmenu="window.event.returnValue=false;return false;"
    onselectstart="event.returnValue=false;return false;"
  >
    <Toolbar />

    <main>
      <!-- 中间画布 -->
      <section class="center">
        <div
          class="content"
          @drop="handleDrop"
          @dragover="handleDragOver"
          @mousedown="handleMouseDown"
          @mouseup="deselectCurComponent"
        >
          <Editor />
        </div>
      </section>
      <section class="right">
        <ComponentList />
        <RealTimeComponentList />
      </section>
    </main>
    <div class="footer">
      <a href="https://beian.miit.gov.cn/" target="_blank"
        >湘ICP备2023005025号</a
      >
    </div>
  </div>
</template>

<script>
import Editor from "@/components/Editor/index";
import ComponentList from "@/components/ComponentList"; // 左侧列表组件
import AnimationList from "@/components/AnimationList"; // 右侧动画列表
import EventList from "@/components/EventList"; // 右侧事件列表
import componentList from "@/custom-component/component-list"; // 左侧列表数据
import Toolbar from "@/components/Toolbar";
import { deepCopy } from "@/utils/utils";
import { mapState } from "vuex";
import generateID from "@/utils/generateID";
import { listenGlobalKeyDown } from "@/utils/shortcutKey";
import RealTimeComponentList from "@/components/RealTimeComponentList";
import CanvasAttr from "@/components/CanvasAttr";
import { changeComponentSizeWithScale } from "@/utils/changeComponentsSizeWithScale";
import { setDefaultcomponentData } from "@/store/snapshot";

export default {
  components: {
    Editor,
    ComponentList,
    AnimationList,
    EventList,
    Toolbar,
    RealTimeComponentList,
    CanvasAttr,
  },
  data() {
    return {
      activeName: "attr",
      reSelectAnimateIndex: undefined,
    };
  },
  computed: mapState([
    "componentData",
    "curComponent",
    "isClickComponent",
    "canvasStyleData",
    "editor",
  ]),
  created() {
    this.restore();
    // 全局监听按键事件
    listenGlobalKeyDown();
  },
  methods: {
    restore() {
      // 用保存的数据恢复画布
      if (localStorage.getItem("canvasData")) {
        setDefaultcomponentData(JSON.parse(localStorage.getItem("canvasData")));
        this.$store.commit(
          "setComponentData",
          JSON.parse(localStorage.getItem("canvasData"))
        );
      }

      if (localStorage.getItem("canvasStyle")) {
        this.$store.commit(
          "setCanvasStyle",
          JSON.parse(localStorage.getItem("canvasStyle"))
        );
      }
    },

    handleDrop(e) {
      console.log("eee", e);
      e.preventDefault();
      e.stopPropagation();

      const index = e.dataTransfer.getData("index");
      const rectInfo = this.editor.getBoundingClientRect();
      console.log("index", index);
      if (index) {
        let list = componentList.filter((ele) => {
          return ele.label == index;
        });
        console.log("66-6", index, "77--", componentList);

        const component = deepCopy(list[0]);
        console.log("---", component);
        component.style.top = e.clientY - rectInfo.y;
        component.style.left = e.clientX - rectInfo.x;
        component.id = generateID();

        changeComponentSizeWithScale(component);

        this.$store.commit("addComponent", { component });
        this.$store.commit("recordSnapshot");
      }
    },

    handleDragOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },

    handleMouseDown(e) {
      e.stopPropagation();
      this.$store.commit("setClickComponentStatus", false);
      this.$store.commit("setInEditorStatus", true);
    },

    deselectCurComponent(e) {
      if (!this.isClickComponent) {
        this.$store.commit("setCurComponent", { component: null, index: null });
      }

      // 0 左击 1 滚轮 2 右击
      if (e.button != 2) {
        this.$store.commit("hideContextMenu");
      }
    },
  },
};
</script>

<style lang="scss">
*:-webkit-scrollbar {
  display: none;
}
* {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.home {
  width: 100%;
  height: 100%;
  background: #fff;

  main {
    position: relative;
    height: 100%;
    .left {
      position: absolute;
      height: 100%;
      width: 200px;
      left: 0;
      top: 0;

      & > div {
        overflow: auto;

        &:first-child {
          border-bottom: 1px solid #ddd;
        }
      }
    }

    .right {
      position: absolute;
      height: 90vh;
      width: 260px;
      right: 0;
      top: 0;
      padding: 10px;

      .el-select {
        width: 100%;
      }
    }

    .center {
      margin-right: 260px;
      background: #f5f5f5;
      height: 100%;
      overflow: auto;
      padding: 5px;
      .content {
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }
  }
  .footer {
    position: absolute;
    font-family: 幼圆;
    width: 100%;
    bottom: 0;
    text-align: center;
    font-size: 15px;
    height: 18px;
  }
  a {
    text-decoration: none;
    color: #000000;
  }
  .placeholder {
    text-align: center;
    color: #333;
  }

  .global-attr {
    padding: 10px;
  }
}
</style>
