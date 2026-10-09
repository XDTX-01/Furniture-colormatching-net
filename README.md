# 家装配色编辑器 · 操作手册

---

## 操作命令

```bash
npm install        # 装依赖
npm run serve      # 启动 → http://localhost:8080
npm run build      # 打包 → dist/
```

> 注意：是 `npm run serve`，不是 `npm run dev`。

---

## 项目结构（全部文件）

```
src/
├── main.js                          # 入口
├── App.vue                          # 根组件
│
├── views/
│   ├── Home.vue                     # 编辑页主页面
│   └── Preview.vue                  # 预览页
│
├── router/
│   └── index.js                     # 路由
│
├── components/                      # 通用组件
│   ├── Toolbar.vue                 # 顶部工具栏
│   ├── ComponentList.vue           # 右侧材质列表
│   ├── CanvasAttr.vue               # 画布属性面板
│   ├── AnimationList.vue            # 动效列表
│   ├── AnimationSettingModal.vue    # 动效设置弹窗
│   ├── EventList.vue               # 事件列表
│   ├── RealTimeComponentList.vue   # 实时组件列表
│   ├── Modal.vue                    # 通用弹窗
│   │
│   └── Editor/                      # 画布核心
│       ├── index.vue               # 画布容器：鼠标事件/框选/文字工具
│       ├── Shape.vue                # 单个组件：拖拽/缩放/选中/Ctrl多选
│       ├── ComponentWrapper.vue     # 组件外层包装
│       ├── ContextMenu.vue         # 右键菜单
│       ├── Area.vue                 # 框选虚线框
│       ├── MarkLine.vue             # 对齐辅助线
│       ├── Grid.vue                 # 背景网格
│       └── Preview.vue             # 画布内预览遮罩
│
├── custom-component/               # 业务组件
│   ├── component-list.js            # ★ 组件注册清单
│   ├── index.js                    # 组件名→组件映射
│   │
│   ├── VText/                       # 文字组件
│   │   ├── Component.vue
│   │   └── Attr.vue
│   ├── Group/                       # 组合组件
│   │   ├── Component.vue
│   │   └── Attr.vue
│   ├── Picture/                     # 图片组件
│   │   ├── Component.vue
│   │   └── Attr.vue
│   ├── CircleShape/                 # 圆形组件
│   │   ├── Component.vue
│   │   └── Attr.vue
│   ├── VTable/                      # 表格组件
│   │   ├── Component.vue
│   │   ├── Attr.vue
│   │   └── EditTable.vue
│   │
│   ├── svgs/                        # SVG 图形
│   │   ├── SVGStar/
│   │   │   ├── Component.vue
│   │   │   └── Attr.vue
│   │   └── SVGTriangle/
│   │       ├── Component.vue
│   │       └── Attr.vue
│   │
│   └── common/                      # 通用属性
│       ├── CommonAttr.vue            # 通用属性面板
│       ├── Linkage.vue              # 联动
│       ├── OnEvent.vue               # 事件
│       └── Request.vue               # 请求
│
├── store/                          # Vuex
│   ├── index.js                     # ★ 主数据/选中态/画布尺寸
│   ├── compose.js                   # 组合/拆分
│   ├── contextmenu.js               # 右键菜单显隐
│   ├── copy.js                      # 复制/剪切/粘贴
│   ├── layer.js                     # 置顶/置底
│   ├── lock.js                      # 锁定
│   ├── snapshot.js                  # 撤销/重做
│   ├── animation.js                 # 动效
│   └── event.js                     # 事件
│
├── styles/                         # 样式
│   ├── animate.scss                 # animate.css 动画库
│   ├── global.scss                  # 全局样式
│   ├── reset.css                    # 重置样式
│   └── variable.scss                # CSS 变量
│
└── utils/                          # 工具函数
    ├── shortcutKey.js               # ★ 快捷键
    ├── decomposeComponent.js        # 拆分还原
    ├── eventBus.js                  # 事件总线
    ├── generateID.js                # 生成 ID
    ├── calculateComponentPositonAndSize.js  # 计算包围盒
    ├── changeComponentsSizeWithScale.js    # 缩放
    ├── animationClassData.js        # 动效数据
    ├── runAnimation.js              # 跑动效
    ├── events.js                    # 事件
    ├── style.js                     # 样式处理
    ├── attr.js                      # 属性处理
    ├── request.js                   # 请求
    ├── toast.js                     # 提示
    ├── translate.js                 # 翻译
    └── utils.js                     # 通用工具

public/
└── index.html                      # ★ 标题/CSP/加载动画
```

---

## 哪里改

| 你要做什么 | 改哪个文件 |
|---|---|
| **标题/端口/CSP** | |
| 改网页标题 | `public/index.html` |
| 改端口 | `vue.config.js` |
| 加 CSP 白名单 | `public/index.html` |
| 改加载动画 | `public/index.html` |
| **画布** | |
| 改画布尺寸 | `store/index.js` 的 canvasStyleData |
| 改画布背景色 | `store/index.js` |
| 改鼠标点选逻辑 | `components/Editor/index.vue` |
| 改框选逻辑 | `components/Editor/index.vue` |
| 改文字工具（点画布加文字） | `components/Editor/index.vue` |
| 改背景网格 | `components/Editor/Grid.vue` |
| 改对齐辅助线 | `components/Editor/MarkLine.vue` |
| **组件拖拽** | |
| 改拖拽移动 | `components/Editor/Shape.vue` |
| 改控制点缩放 | `components/Editor/Shape.vue` |
| 改选中样式 | `components/Editor/Shape.vue` |
| 改 Ctrl 多选 | `components/Editor/Shape.vue` |
| **右键菜单** | |
| 加/删菜单项 | `components/Editor/ContextMenu.vue` |
| 改菜单位置 | `store/contextmenu.js` |
| **文字组件** | |
| 改文字默认颜色 | `custom-component/component-list.js` |
| 改文字默认字号 | `custom-component/component-list.js` |
| 改常用色（红黄绿蓝） | `custom-component/VText/Component.vue` |
| 改右键编辑框样式 | `custom-component/VText/Component.vue` |
| 改文字属性面板 | `custom-component/VText/Attr.vue` |
| **组合** | |
| 改组合逻辑 | `store/compose.js` |
| 改拆分逻辑 | `utils/decomposeComponent.js` |
| 改组合样式 | `custom-component/Group/Component.vue` |
| **快捷键** | |
| 改 Ctrl+G 组合 | `utils/shortcutKey.js` |
| 改 Ctrl+B 拆分 | `utils/shortcutKey.js` |
| 改 Delete 删除 | `utils/shortcutKey.js` |
| 加快捷键 | `utils/shortcutKey.js` |
| **其他** | |
| 加顶部按钮 | `components/Toolbar.vue` |
| 改右侧材质列表 | `components/ComponentList.vue` |
| 改画布属性面板 | `components/CanvasAttr.vue` |
| 改动效列表 | `components/AnimationList.vue` |
| 改撤销/重做 | `store/snapshot.js` |
| 改锁定 | `store/lock.js` |
| 改置顶/置底 | `store/layer.js` |
| 改复制粘贴 | `store/copy.js` |
| 加新材质组件 | `custom-component/component-list.js` |
| 改全局样式 | `styles/global.scss` |
| 改 CSS 变量 | `styles/variable.scss` |

---
