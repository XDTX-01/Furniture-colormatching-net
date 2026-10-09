import store from '@/store'
import eventBus from '@/utils/eventBus'

const ctrlKey = 17,
    commandKey = 91, // mac command
    vKey = 86, // 粘贴
    cKey = 67, // 复制
    xKey = 88, // 剪切

    yKey = 89, // 重做
    zKey = 90, // 撤销

    gKey = 71, // 组合
    bKey = 66, // 拆分

    lKey = 76, // 锁定
    uKey = 85, // 解锁

    sKey = 83, // 保存
    pKey = 80, // 预览
    dKey = 68, // 删除
    deleteKey = 46, // 删除
    eKey = 69 // 清空画布

export const keycodes = [66, 67, 68, 69, 71, 76, 80, 83, 85, 86, 88, 89, 90]

// 与组件状态无关的操作
const basemap = {
    [vKey]: paste,
    [yKey]: redo,
    [zKey]: undo,
    [sKey]: save,
    [pKey]: preview,
    [eKey]: clearCanvas,
}

// 组件锁定状态下可以执行的操作
const lockMap = {
    ...basemap,
    [uKey]: unlock,
}

// 组件未锁定状态下可以执行的操作
const unlockMap = {
    ...basemap,
    [cKey]: copy,
    [xKey]: cut,
    [gKey]: compose,
    [bKey]: decompose,
    [dKey]: deleteComponent,
    [deleteKey]: deleteComponent,
    [lKey]: lock,
}

let isCtrlOrCommandDown = false
// 全局监听按键操作并执行相应命令
export function listenGlobalKeyDown() {
    window.onkeydown = (e) => {
        if (!store.state.isInEdiotr) return

        const { curComponent } = store.state
        const { keyCode } = e
        if (keyCode === ctrlKey || keyCode === commandKey) {
            isCtrlOrCommandDown = true
        } else if (keyCode == deleteKey) {
            const { multiSelectComponents } = store.state
            // 多选时删除选中组件（跳过锁定的）；否则删除当前选中组件（锁定的不删）
            if (multiSelectComponents && multiSelectComponents.length > 1) {
                const deletable = multiSelectComponents.filter((c) => !c.isLock)
                if (deletable.length) {
                    store.commit('batchDeleteComponent', deletable)
                }
                store.commit('setMultiSelectComponents', [])
                store.commit('setCurComponent', { component: null, index: null })
                store.commit('recordSnapshot')
                eventBus.$emit('hideArea')
            } else if (curComponent && !curComponent.isLock) {
                store.commit('deleteComponent')
                store.commit('recordSnapshot')
            }
        } else if (isCtrlOrCommandDown) {
            if (unlockMap[keyCode] && (!curComponent || !curComponent.isLock)) {
                e.preventDefault()
                unlockMap[keyCode]()
            } else if (lockMap[keyCode] && curComponent && curComponent.isLock) {
                e.preventDefault()
                lockMap[keyCode]()
            }
        }
    }

    window.onkeyup = (e) => {
        if (e.keyCode === ctrlKey || e.keyCode === commandKey) {
            isCtrlOrCommandDown = false
        }
    }

    window.onmousedown = () => {
        store.commit('setInEditorStatus', false)
    }
}

function copy() {
    store.commit('copy')
}

function paste() {
    store.commit('paste')
    store.commit('recordSnapshot')
}

function cut() {
    store.commit('cut')
}

function redo() {
    store.commit('redo')
}

function undo() {
    store.commit('undo')
}

function compose() {
    const { areaData, multiSelectComponents, editor } = store.state
    // Ctrl 点多选时 areaData.components 是空的，用 multiSelectComponents 兜底
    // 计算这些组件的包围盒，塞进 areaData 让 compose mutation 能用
    if (!areaData.components.length && multiSelectComponents && multiSelectComponents.length > 1) {
        let top = Infinity, left = Infinity, right = -Infinity, bottom = -Infinity
        const edRect = editor.getBoundingClientRect()
        multiSelectComponents.forEach((c) => {
            const el = document.querySelector(`#component${c.id}`)
            if (!el) return
            const r = el.getBoundingClientRect()
            if (r.left - edRect.left < left) left = r.left - edRect.left
            if (r.top - edRect.top < top) top = r.top - edRect.top
            if (r.right - edRect.left > right) right = r.right - edRect.left
            if (r.bottom - edRect.top > bottom) bottom = r.bottom - edRect.top
        })
        store.commit('setAreaData', {
            style: { left, top, width: right - left, height: bottom - top },
            components: multiSelectComponents,
        })
    }
    if (store.state.areaData.components.length) {
        store.commit('compose')
        store.commit('recordSnapshot')
    }
}

function decompose() {
    const curComponent = store.state.curComponent
    if (curComponent && !curComponent.isLock && curComponent.component == 'Group') {
        store.commit('decompose')
        store.commit('recordSnapshot')
    }
}

function save() {
    eventBus.$emit('save')
}

function preview() {
    eventBus.$emit('preview')
}

function deleteComponent() {
    if (store.state.curComponent) {
        store.commit('deleteComponent')
        store.commit('recordSnapshot')
    }
}

function clearCanvas() {
    eventBus.$emit('clearCanvas')
}

function lock() {
    store.commit('lock')
}

function unlock() {
    store.commit('unlock')
}
