# 第三方开源组件声明（THIRD-PARTY-LICENSES）

本项目使用了多个开源软件组件。各组件版权归原作者所有，按其原始开源协议发布。本文件仅作合规声明，不修改原作者任何权利。

---

## 第一部分：基础框架 MIT 协议全文

### visual-drag-demo（本项目基础框架）

- 项目地址：https://github.com/woai3c/visual-drag-demo
- 开源协议：MIT License
- 版权：Copyright (c) 2020 woai3c (小翟同学)

**MIT License 全文：**

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 第二部分：样式与动画库

### animate.css

- 项目地址：https://github.com/animate-css/animate.css
- 开源协议：MIT License
- 版权：Copyright (c) 2017 Daniel Eden
- 备注：部分关键帧动画原始作者 Nick Pettit（https://github.com/nickpettit/glide）
- 本项目使用方式：本地引入 `src/styles/animate.scss`，版权注释已保留在文件头

---

## 第三部分：生产环境依赖（dependencies）

以下依赖通过 npm 安装，会被打包进生产环境。所有包均为 MIT 协议。

| 包名 | 版本 | 用途 |
|---|---|---|
| vue | ^2.6.14 | 前端框架 |
| vue-router | ^3.6.5 | 路由管理 |
| vuex | ^3.6.2 | 状态管理 |
| element-ui | ^2.15.13 | UI 组件库 |
| axios | ^1.1.3 | HTTP 请求 |
| core-js | ^3.32.0 | ES6+ Polyfill |
| html-to-image | ^1.11.11 | DOM 转图片导出 |
| mathjs | ^10.5.3 | 数学计算 |
| nanoid | ^4.0.2 | 唯一 ID 生成 |
| vue-lazyload | ^1.3.3 | 图片懒加载 |

---

## 第四部分：开发环境依赖（devDependencies）

以下依赖仅用于开发构建，不会打包进生产环境。

| 包名 | 用途 |
|---|---|
| @vue/cli-service | 构建工具 |
| @vue/cli-plugin-babel | Babel 编译 |
| @vue/cli-plugin-router | 路由插件 |
| @vue/cli-plugin-vuex | Vuex 插件 |
| @vue/cli-plugin-eslint | ESLint 插件 |
| @babel/core | JS 编译器 |
| @babel/eslint-parser | ESLint 解析器 |
| @vue/eslint-config-airbnb | ESLint 规则集 |
| eslint | 代码检查 |
| eslint-plugin-import | ESLint import 规则 |
| eslint-plugin-vue | ESLint Vue 规则 |
| eslint-plugin-vuejs-accessibility | ESLint 无障碍规则 |
| sass | CSS 预处理器 |
| sass-loader | webpack sass 加载器 |
| postcss-html | PostCSS HTML 处理 |
| postcss-scss | PostCSS SCSS 处理 |
| stylelint | 样式检查 |
| stylelint-config-recommended-vue | stylelint 规则 |
| stylelint-config-standard-scss | stylelint 规则 |
| vue-template-compiler | Vue 模板编译 |
| compression-webpack-plugin | 打包压缩 |
| chalk | 终端颜色 |
| husky | Git hooks |
| lint-staged | Git 暂存检查 |

---

## 第五部分：素材与字体

- **材质图片**：项目中使用的家具材质图片由本项目自行制作或采购，版权归本项目所有。
- **字体**：使用系统默认字体（Microsoft YaHei / PingFang SC / sans-serif），未引入第三方字体库。
- **图标**：使用 Element UI 内置图标，版权归 Element UI 原作者所有（MIT）。

---

## 第六部分：外部资源与 CDN 说明

- 本项目**已移除**所有外部 CDN 依赖（包括 jQuery CDN）。
- 本项目**已移除** 51.la 第三方统计代码。
- 所有 JS / CSS / 字体 / 图片资源均由本站自身提供，不加载任何外部脚本。

---

## 第七部分：安全策略（CSP）

`public/index.html` 中已配置 Content-Security-Policy：

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob:;
font-src 'self' data:;
connect-src 'self';
object-src 'none';
base-uri 'self'
```

仅允许本站资源，禁止加载任何外部脚本或外联资源。

---

## 第八部分：协议说明

- **MIT License**：允许商用、修改、分发、闭源，唯一要求是保留原作者版权声明与协议原文。
- 各 npm 包的完整协议文本位于 `node_modules/<包名>/LICENSE` 或 `package.json` 字段中。
- 本项目已完整保留 visual-drag-demo 原作者的 MIT 版权声明与协议全文（见本文件第一部分）。

---

*本文件维护日期：2026-10-09*
*如有遗漏或错误，请联系维护者更新。*
