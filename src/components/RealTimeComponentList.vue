<template>
  <div></div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["componentData", "curComponent", "curComponentIndex"]),
  methods: {
    getComponent(index) {
      return this.componentData[this.componentData.length - 1 - index];
    },

    transformIndex(index) {
      return this.componentData.length - 1 - index;
    },

    onClick(index) {
      this.setCurComponent(index);
    },

    deleteComponent() {
      setTimeout(() => {
        this.$store.commit("deleteComponent");
        this.$store.commit("recordSnapshot");
      });
    },

    upComponent() {
      setTimeout(() => {
        this.$store.commit("upComponent");
        this.$store.commit("recordSnapshot");
      });
    },

    downComponent() {
      setTimeout(() => {
        this.$store.commit("downComponent");
        this.$store.commit("recordSnapshot");
      });
    },

    setCurComponent(index) {
      this.$store.commit("setCurComponent", {
        component: this.componentData[index],
        index,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.real-time-component-list {
  height: 45%;

  .list {
    height: 50px;
    cursor: grab;
    text-align: center;
    color: #333;
    background-color: #f3f3f3;
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 0 15px;
    position: relative;
    user-select: none;

    &:active {
      cursor: grabbing;
    }

    &:hover {
      background-color: #d2d2d2;

      .icon-container {
        display: block;
      }
    }

    .label {
      font-size: 16px;
      margin-left: 5px;
    }
    .iconfont {
      margin-right: 5px;
      font-size: 30px;
    }

    .icon-shangyi,
    .icon-xiayi,
    .icon-shanchu {
      font-size: 28px;
      margin-right: 0px;
    }

    .icon-wenben,
    .icon-tupian {
      font-size: 28px;
    }

    .icon-container {
      position: absolute;
      right: 10px;
      display: none;

      .iconfont {
        cursor: pointer;
      }
    }
  }

  .actived {
    background: #ecf5ff;
    color: #409eff;
  }
}
</style>
