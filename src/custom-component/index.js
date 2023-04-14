import Vue from 'vue'

const components = [
    'CircleShape',
    'Picture',
    'VText',
    'VButton',
    'Group',
    'RectShape',
    'LineShape',
    'VTable',
    'Video',
    'Music',
    'Browser',
]


components.forEach(key => {
    Vue.component(key, resolve => require([`@/custom-component/${key}/Component`], resolve))
    Vue.component(key + 'Attr', resolve => require([`@/custom-component/${key}/Attr`], resolve))
})

const svgs = [
    'SVGStar',
    'SVGTriangle',
]

svgs.forEach(key => {
    Vue.component(key, resolve => require([`@/custom-component/svgs/${key}/Component`], resolve))
    Vue.component(key + 'Attr', resolve => require([`@/custom-component/svgs/${key}/Attr`], resolve))
})
