import Vue from 'vue'
import Vuex from 'vuex'
import animation from './animation'
import compose from './compose'
import contextmenu from './contextmenu'
import copy from './copy'
import event from './event'
import layer from './layer'
import snapshot from './snapshot'
import lock from './lock'

Vue.use(Vuex)

const data = {
    state: {
        ...animation.state,
        ...compose.state,
        ...contextmenu.state,
        ...copy.state,
        ...event.state,
        ...layer.state,
        ...snapshot.state,
        ...lock.state,

        editMode: 'edit', // 编辑器模式 edit preview
        canvasStyleData: { // 页面全局数据
            width: 1920,
            height: 1080,
            scale: 100,
            color: '#000',
            opacity: 1,
            background: '#fff',
            fontSize: 14,
        },
        isInEdiotr: false, // 是否在编辑器中，用于判断复制、粘贴组件时是否生效，如果在编辑器外，则无视这些操作
        componentData: [], // 画布组件数据
        curComponent: null,
        curComponentIndex: null,
        multiSelectComponents: [], // 框选出的多选集合，用于多选后一起拖动
        isTextTool: false, // 文字工具是否激活：激活后在画布上点一下即可直接输入文字
        // 点击画布时是否点中组件，主要用于取消选中组件用。
        // 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
        isClickComponent: false,
    },
    mutations: {
        ...animation.mutations,
        ...compose.mutations,
        ...contextmenu.mutations,
        ...copy.mutations,
        ...event.mutations,
        ...layer.mutations,
        ...snapshot.mutations,
        ...lock.mutations,

        setClickComponentStatus(state, status) {
            state.isClickComponent = status
        },

        setEditMode(state, mode) {
            state.editMode = mode
        },

        setInEditorStatus(state, status) {
            state.isInEdiotr = status
        },

        setCanvasStyle(state, style) {
            state.canvasStyleData = style
        },

        setCurComponent(state, { component, index }) {
            state.curComponent = component
            state.curComponentIndex = index
        },

        // 写回文本组件的文字内容（curComponent.propValue 为字符串）
        setPropValue(state, value) {
            if (state.curComponent) {
                state.curComponent.propValue = value
            }
        },

        // 按组件 id 写入，不依赖 curComponent（点空白确认时 curComponent 可能为 null）
        setPropValueById(state, { id, value }) {
            const c = state.componentData.find((c) => c.id === id)
            if (c) c.propValue = value
        },

        setShapeSingleStyleById(state, { id, key, value }) {
            const c = state.componentData.find((c) => c.id === id)
            if (c) c.style[key] = value
        },

        setShapeStyle({ curComponent }, { top, left, width, height, rotate }) {
            if (top) curComponent.style.top = Math.round(top)
            if (left) curComponent.style.left = Math.round(left)
            if (width) curComponent.style.width = Math.round(width)
            if (height) curComponent.style.height = Math.round(height)
            if (rotate) curComponent.style.rotate = Math.round(rotate)
        },

        setShapeSingleStyle({ curComponent }, { key, value }) {
            curComponent.style[key] = value
        },

        setMultiSelectComponents(state, components) {
            state.multiSelectComponents = components || []
        },

        setTextTool(state, status) {
            state.isTextTool = status
        },

        setComponentStyleById(state, { id, top, left }) {
            const component = state.componentData.find(c => c.id === id)
            if (!component) return
            if (top !== undefined) component.style.top = Math.round(top)
            if (left !== undefined) component.style.left = Math.round(left)
        },

        setComponentData(state, componentData = []) {
            Vue.set(state, 'componentData', componentData)
        },

        addComponent(state, { component, index }) {
            if (index !== undefined) {
                state.componentData.splice(index, 0, component)
            } else {
                state.componentData.push(component)
            }
        },

        deleteComponent(state, index) {
            if (index === undefined) {
                index = state.curComponentIndex
            }

            if (index == state.curComponentIndex) {
                state.curComponentIndex = null
                state.curComponent = null
            }

            if (/\d/.test(index)) {
                state.componentData.splice(index, 1)
            }
        },
    },
}

export default new Vuex.Store(data)
