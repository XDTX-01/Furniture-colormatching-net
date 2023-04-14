import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [{
    path: `/`,
    component: (resolve) => require(['@/views/Home'], resolve),
    meta: {
        title: '制作模板'
    }
},
{
    path: `/preview`,
    component: (resolve) => require(['@/views/Preview'], resolve),
    meta: {
        title: '预览'
    }
},
]

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes,
})
