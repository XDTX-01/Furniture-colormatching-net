# 家装配色可视化编辑器 · 开发手册（高级版）

> 面向全栈工程师。本文不止告诉你"改哪"，还讲清楚**为什么这么设计、数据流怎么走、关键算法怎么算**。

---

## 一、系统架构总览

```
┌─────────────────────────────────────────────────────┐
│                    Browser (Vue 2)                   │
├─────────────────────────────────────────────────────┤
│  Views/Home.vue                                     │
│    ├── Toolbar.vue          ← 顶部命令栏            │
│    ├── ComponentList.vue    ← 左侧/右侧组件面板     │
│    ├── CanvasAttr.vue       ← 画布属性              │
│    └── Editor/              ← 画布渲染层            │
│         ├── index.vue       ← 画布容器/事件总线     │
│         ├── Shape.vue       ← 组件实例渲染          │
│         ├── Area.vue        ← 框选选区              │
│         ├── MarkLine.vue    ← 对齐参考线            │
│         └── ContextMenu.vue ← 右键上下文菜单        │
└─────────────────────────────────────────────────────┘
                        │ commit/dispatch
                        ▼
┌─────────────────────────────────────────────────────┐
│              Vuex Store（单一数据源）                │
│  index.js ─── 核心 state: componentData[]            │
│  ├── compose.js      组合/拆分                      │
│  ├── snapshot.js     快照栈（undo/redo）           │
│  ├── contextmenu.js  菜单显隐                       │
│  ├── copy.js         复制/剪切/粘贴                 │
│  ├── layer.js        z-index 层级                   │
│  ├── lock.js         锁定态                         │
│  └── animation.js    动效                           │
└─────────────────────────────────────────────────────┘
                        │ subscribe
                        ▼
┌─────────────────────────────────────────────────────┐
│              自定义组件层 custom-component/          │
│  VText / Group / Picture / CircleShape / svgs/      │
│  component-list.js ← 注册表（工厂模式）              │
└─────────────────────────────────────────────────────┘
```

**设计原则：单向数据流。**
用户操作 → 组件捕获事件 → `commit` mutation → state 更新 → 响应式 re-render。
不允许组件直接改 `curComponent.style.xxx`，必须走 mutation。

---

## 二、核心数据结构

### 2.1 组件实例（componentData 数组项）

```js
{
  id: 'U1sbXq9',              // nanoid()
  component: 'VText',         // 组件类型，对应 custom-component/index.js 映射
  propValue: '客厅主色',       // VText=字符串，Picture=图片URL，Group=子组件数组
  style: {
    top: 100, left: 200,      // 绝对定位，相对画布
    width: 300, height: 48,
    rotate: 0,                // 旋转角度
    color: '#FF0000',         // VText 文字色
    fontSize: 32,             // VText 字号
  },
  isLock: false,              // 锁定后不可选中
  // Group 独有：
  propValue: [ /* 嵌套的子组件对象数组 */ ],
}
```

### 2.2 选中态模型

```js
state = {
  curComponent: null,           // 单选：当前选中的组件引用
  curComponentIndex: null,      // 它在 componentData 的下标
  multiSelectComponents: [],    // 多选：选中的组件数组
  areaData: {                   // 框选包围盒
    top:0, left:0, width:0, height:0
  },
  isTextTool: false,            // 文字工具激活态
}
```

**关键设计**：单选和多选是互斥状态。`curComponent` 是 Shape.vue `:class` 绑定的来源；`multiSelectComponents` 是组合/批量删除的来源。

---

## 三、关键算法

### 3.1 拖拽移动（Shape.vue）

```
mousedown 记录 startX/startY + 组件原始 top/left
   │
mousemove 计算 deltaX/deltaY
   │
   ▼
setShapeStyle({ top: origTop + deltaY, left: origLeft + deltaX })
   │
   ▼
store.commit → state 更新 → Shape.vue 响应式 re-render
```

**性能要点**：mousemove 里不要做复杂计算，直接 commit；对齐线在 MarkLine.vue 里 watch `curComponent.style` 自动计算。

### 3.2 组合（compose.js）

```
1. 从 multiSelectComponents 取所有组件
2. 计算包围盒：
   minTop    = min(各组件.top)
   minLeft   = min(各组件.left)
   maxBottom = max(各组件.top + height)
   maxRight  = max(各组件.left + width)
3. 把每个子组件的 top/left 改成相对包围盒左上角
4. 创建一个 Group 组件，propValue = [子组件数组]
5. 从 componentData 删掉这些子组件，push Group 进去
```

### 3.3 拆分（decomposeComponent.js）

```
1. 取出 Group 的包围盒位置（top/left）
2. 遍历 propValue 子组件，把相对坐标还原成绝对坐标：
   child.top += group.top
   child.left += group.left
3. 删掉 Group，把子组件按原顺序插回 componentData
```

### 3.4 框选（Editor/index.vue）

```
mousedown 在画布空白处 → 开始框选
mousemove → 更新 areaData（top/left/width/height）
mouseup   → 遍历 componentData，判断每个组件是否与 areaData 相交：
            intersects(child, area) ⇒ 加入 multiSelectComponents
```

### 3.5 撤销/重做（snapshot.js）

```
每次 commit mutation 后 → deep clone componentData → push 进 undoStack
                                    ↓
undoStack 栈顶就是当前状态
press undo → 把当前 push 进 redoStack，从 undoStack pop 一个出来恢复
press redo → 反过来
```

**注意**：深拷贝用 `JSON.parse(JSON.stringify())`，组件数据是纯 JSON 可序列化的。

---

## 四、组件通信方式

| 场景 | 用什么 | 例子 |
|---|---|---|
| 父子传值 | props / $emit | Shape.vue 接收 `item` prop |
| 跨层级共享 | Vuex | curComponent |
| 非父子事件 | eventBus | `eventBus.$emit('componentClick')` |
| 右键菜单 | Vuex + ContextMenu | `contextmenu.js` 存菜单坐标 |
| 文字工具激活 | Vuex | `isTextTool` state |

---

## 五、扩展点设计

### 5.1 加新组件（工厂模式）

```
custom-component/component-list.js   ← 注册表
         ↓ 导出 componentList 数组
         ↓ 每项 { key, label, icon, defaultSize, defaultStyle }
ComponentList.vue 遍历渲染
         ↓ 拖到画布
         ↓ componentData.push({ component: key, propValue, style })
Shape.vue 渲染时 ↓
custom-component/index.js 按 component 字段查表 ↓
         ↓
动态组件 <component :is="comp" />
```

**新增组件只需要**：建文件夹 → 在 `component-list.js` 注册 → 在 `index.js` 加映射。不用动画布逻辑。

### 5.2 加新快捷键

`utils/shortcutKey.js` 里加 case：

```js
case 88: // X
  dispatch('xxxAction')
  break
```

keyCode 查 https://keycode.info。

### 5.3 加新右键菜单项

`ContextMenu.vue` template 里加 `<div class="menu-item" @click="xxx">`，在 `data()` 里加 `isShowXxx` 控制显隐条件。

---

## 六、性能与坑

### 6.1 已知性能点
- 组件上百个后，mousemove 拖拽会卡 → 考虑加 `requestAnimationFrame` 节流
- 深拷贝 componentData 大时 snapshot 栈吃内存 → 限制栈深度（当前 50）

### 6.2 常见坑
| 坑 | 原因 | 解法 |
|---|---|---|
| 改完组件不更新 | 直接改 `curComponent.style`，没走 mutation | 必须 commit |
| Group 拆分后位置错 | 子组件坐标没还原 | decomposeComponent.js 里做加法 |
| Delete 删不掉多选 | 用 dispatch 调 action 但 mutation 是 commit | 用 commit 删除组件 |
| 文字被组合挡住 | VText 没设 z-index | `.text-top` 设 z-index:1000 |
| CSP 报错 | 加了新外链资源 | index.html CSP 加白名单 |

---

## 七、关键文件速查（按改动频率排序）

| 优先级 | 文件 | 改什么 |
|---|---|---|
| ★★★ | `src/components/Editor/Shape.vue` | 拖拽/缩放/选中/多选 |
| ★★★ | `src/components/Editor/index.vue` | 画布鼠标事件/框选 |
| ★★★ | `src/custom-component/VText/Component.vue` | 文字编辑 |
| ★★☆ | `src/store/index.js` | 核心 state/mutation |
| ★★☆ | `src/components/Editor/ContextMenu.vue` | 右键菜单 |
| ★★☆ | `src/utils/shortcutKey.js` | 快捷键 |
| ★☆☆ | `src/store/compose.js` | 组合/拆分 |
| ★☆☆ | `src/custom-component/component-list.js` | 组件注册 |
| ★☆☆ | `public/index.html` | CSP/标题/加载动画 |

---

## 八、部署

```bash
npm run build
# 产物 dist/ 是纯静态文件
# 扔 nginx / OSS / CDN，hash 路由不需要 rewrite
# 注意 CSP meta 标签保留
```

---

*架构版本：v2.0 · 2026-10-09*
