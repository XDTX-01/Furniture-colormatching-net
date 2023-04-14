import store from './index'
import generateID from '@/utils/generateID'
import eventBus from '@/utils/eventBus'
import decomposeComponent from '@/utils/decomposeComponent'
import { $ } from '@/utils/utils'
import { commonStyle, commonAttr } from '@/custom-component/component-list'
import { createGroupStyle } from '@/utils/style'

export default {
    state: {
        areaData: {
            style: {
                top: 0,
                left: 0,
                width: 0,
                height: 0,
            },
            components: [],
        },
        editor: null,
    },
    mutations: {
        getEditor(state) {
            state.editor = $('#editor')
        },

        setAreaData(state, data) {
            state.areaData = data
        },

        compose({ componentData, areaData, editor }) {
            const components = []
            areaData.components.forEach(component => {
                if (component.component != 'Group') {
                    components.push(component)
                } else {
                    const parentStyle = { ...component.style }
                    const subComponents = component.propValue
                    const editorRect = editor.getBoundingClientRect()

                    subComponents.forEach(component => {
                        decomposeComponent(component, editorRect, parentStyle)
                    })

                    components.push(...component.propValue)
                }
            })

            const groupComponent = {
                id: generateID(),
                component: 'Group',
                label: '组合',
                icon: 'zuhe',
                ...commonAttr,
                style: {
                    ...commonStyle,
                    ...areaData.style,
                },
                propValue: components,
            }

            createGroupStyle(groupComponent)

            store.commit('addComponent', {
                component: groupComponent,
            })

            eventBus.$emit('hideArea')

            store.commit('batchDeleteComponent', areaData.components)
            store.commit('setCurComponent', {
                component: componentData[componentData.length - 1],
                index: componentData.length - 1,
            })

            areaData.components = []
        },


        batchDeleteComponent({ componentData }, deleteData) {
            deleteData.forEach(component => {
                for (let i = 0, len = componentData.length; i < len; i++) {
                    if (component.id == componentData[i].id) {
                        componentData.splice(i, 1)
                        break
                    }
                }
            })
        },

        decompose({ curComponent, editor }) {
            const parentStyle = { ...curComponent.style }
            const components = curComponent.propValue
            const editorRect = editor.getBoundingClientRect()

            store.commit('deleteComponent')
            components.forEach(component => {
                decomposeComponent(component, editorRect, parentStyle)
                store.commit('addComponent', { component })
            })
        },
    },
}
