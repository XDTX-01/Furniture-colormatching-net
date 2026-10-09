<template>
    <div v-if="editMode === 'edit'">
        <div
            class="v-text"
            :style="textStyle"
            v-html="element.propValue"
            @contextmenu.prevent.stop="openEditor"
        ></div>
        <div
            v-if="editing"
            class="v-text-editor"
            :style="editorPosition"
            @mousedown.stop
        >
            <input
                ref="content"
                v-model="editText"
                class="ve-content"
                placeholder="输入文字"
                @input="applyContent"
            />
            <label class="ve-label">字号</label>
            <el-input-number
                v-model="editFontSize"
                class="ve-font"
                :min="1"
                :max="200"
                size="mini"
                controls-position="right"
                @change="applyFontSize"
            />
            <label class="ve-label">颜色</label>
            <div class="ve-swatches">
                <span
                    v-for="c in commonColors"
                    :key="c"
                    class="ve-swatch"
                    :style="{ background: c }"
                    :class="{ active: editColor === c }"
                    @click="pickColor(c)"
                ></span>
            </div>
            <el-color-picker
                v-model="editColor"
                class="ve-color"
                size="mini"
                @change="applyColor"
            />
            <button class="ve-ok" @click="confirmEdit">确定</button>
        </div>
    </div>
    <div v-else v-html="element.propValue"></div>
</template>

<script>
import { mapState } from "vuex";

export default {
    props: {
        propValue: {
            type: String,
            default: "",
        },
        element: {
            type: Object,
            default: () => {},
        },
        defaultStyle: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            editing: false,
            editText: "",
            editFontSize: 32,
            editColor: "#FF0000",
            commonColors: ["#FF0000", "#FFCC00", "#33CC33", "#0066FF"],
        };
    },
    computed: {
        ...mapState(["editMode"]),
        textStyle() {
            const s = this.element.style || this.defaultStyle;
            const style = {
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                lineHeight: 1.2,
            };
            if (s.color) style.color = s.color;
            if (s.fontSize) style.fontSize = s.fontSize + "px";
            if (s.fontWeight) style.fontWeight = s.fontWeight;
            return style;
        },
        // 文字离画布顶部太近时，编辑框改放到文字下方，避免跑出画布外
        editorPosition() {
            const top = Number(this.element.style && this.element.style.top) || 0;
            if (top < 80) {
                return { top: "100%", marginTop: "8px" };
            }
            return { top: "-56px" };
        },
    },
    mounted() {
        // 用捕获阶段绑定，确保点击画布任意空白处都能确认（冒泡阶段可能被其他组件 stopPropagation 拦截）
        document.addEventListener("mousedown", this.handleOutsideClick, true);
    },
    beforeDestroy() {
        document.removeEventListener("mousedown", this.handleOutsideClick, true);
    },
    methods: {
        openEditor() {
            this.editText = this.element.propValue || "";
            this.editFontSize = this.element.style.fontSize || 32;
            this.editColor = this.element.style.color || "#FF0000";
            this.editing = true;
            this.$nextTick(() => {
                const el = this.$refs.content;
                if (el) {
                    el.focus();
                    el.select();
                }
            });
        },

        // 点击悬浮框以外区域关闭
        handleOutsideClick(e) {
            if (!this.editing) return;
            // 颜色选择器的选色面板挂载在 body 下，点击它时不视为“外点”关闭
            if (e.target && e.target.closest && e.target.closest(".el-color-dropdown")) return;
            if (!this.$el.contains(e.target)) {
                this.confirmEdit();
            }
        },

        applyContent() {
            this.$store.commit("setPropValueById", {
                id: this.element.id,
                value: this.editText,
            });
        },

        applyFontSize() {
            const val = Number(this.editFontSize) || 32;
            this.$store.commit("setShapeSingleStyleById", {
                id: this.element.id,
                key: "fontSize",
                value: val,
            });
        },

        applyColor() {
            this.$store.commit("setShapeSingleStyleById", {
                id: this.element.id,
                key: "color",
                value: this.editColor,
            });
        },

        // 点击常用色块：立即应用颜色（无需再点颜色面板的“确定”）
        pickColor(color) {
            this.editColor = color;
            this.applyColor();
        },

        confirmEdit() {
            if (!this.editing) return;
            this.$store.commit("setPropValueById", {
                id: this.element.id,
                value: this.editText,
            });
            this.$store.commit("setShapeSingleStyleById", {
                id: this.element.id,
                key: "fontSize",
                value: Number(this.editFontSize) || 32,
            });
            this.$store.commit("setShapeSingleStyleById", {
                id: this.element.id,
                key: "color",
                value: this.editColor,
            });
            this.editing = false;
            this.$store.commit("recordSnapshot");
        },
    },
};
</script>

<style scoped lang="scss">
.v-text {
    cursor: text;
    user-select: none;
}

.v-text-editor {
    position: absolute;
    top: -56px;
    left: 0;
    z-index: 9999;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 6px;
    height: 40px;
    padding: 6px 8px;
    box-sizing: border-box;
    background: #fff;
    border: 1px solid #70c0ff;
    border-radius: 6px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
    white-space: nowrap;

    & > * {
        flex: 0 0 auto;
    }

    .ve-content {
        width: 140px;
        height: 26px;
        padding: 0 6px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        outline: none;
        font-size: 13px;
    }

    .ve-label {
        font-size: 12px;
        color: #606266;
    }

    .ve-font {
        width: 92px;
    }

    .ve-swatches {
        display: flex;
        align-items: center;
        gap: 5px;
        height: 100%;

        .ve-swatch {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 1px solid rgba(0, 0, 0, 0.15);
            cursor: pointer;
            flex: 0 0 auto;
            box-sizing: border-box;

            &.active {
                box-shadow: 0 0 0 2px #409eff;
            }

            &:hover {
                transform: scale(1.15);
            }
        }
    }

    .ve-color {
        display: flex;
        align-items: center;
        width: 20px;
        height: 20px;
        ::v-deep .el-color-picker__trigger {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            padding: 0;
            box-sizing: border-box;
        }
        ::v-deep .el-color-picker__color {
            display: flex;
            align-items: center;
            width: 100%;
            height: 100%;
        }
        ::v-deep .el-color-picker__color-inner {
            border-radius: 2px;
        }
    }

    .ve-ok {
        height: 26px;
        padding: 0 12px;
        border: none;
        border-radius: 4px;
        background: #409eff;
        color: #fff;
        font-size: 13px;
        cursor: pointer;

        &:hover {
            background: #66b1ff;
        }
    }
}
</style>
