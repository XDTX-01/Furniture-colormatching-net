# 第三方开源组件声明（THIRD-PARTY-LICENSES）

本项目包含以下第三方开源组件。各组件版权归原作者所有，按其原始开源协议发布。本文件仅作合规声明，不修改原作者权利。

---

## 一、本项目基础框架

### 1. visual-drag-demo

- 项目地址：https://github.com/woai3c/visual-drag-demo
- 开源协议：MIT License
- 版权声明：Copyright (c) 2020 woai3c (小翟同学)
- 本项目关系：基于该项目二次开发，保留原作者版权声明与 MIT 协议全文（见根目录 LICENSE 文件）

---

## 二、样式与动画库

### 2. animate.css（动画样式）

- 项目地址：https://github.com/animate-css/animate.css
- 开源协议：MIT License
- 版权声明：Copyright (c) 2017 Daniel Eden
- 备注：部分关键帧动画原始作者 Nick Pettit（https://github.com/nickpettit/glide），版权注释已保留在 `src/styles/animate.scss` 文件头

---

## 三、生产环境依赖（dependencies）

以下依赖通过 npm 安装，会被打包进生产环境。

| 包名 | 版本 | 开源协议 | 用途 |
|---|---|---|---|
| vue | ^2.6.14 | MIT | 前端框架 |
| vue-router | ^3.6.5 | MIT | 路由管理 |
| vuex | ^3.6.2 | MIT | 状态管理 |
| element-ui | ^2.15.13 | MIT | UI 组件库 |
| axios | ^1.1.3 | MIT | HTTP 请求 |
| core-js | ^3.32.0 | MIT | Polyfill |
| html-to-image | ^1.11.11 | MIT | DOM 转图片导出 |
| mathjs | ^10.5.3 | MIT | 数学计算 |
| nanoid | ^4.0.2 | MIT | 唯一 ID 生成 |
| vue-lazyload | ^1.3.3 | MIT | 图片懒加载 |

---

## 四、开发环境依赖（devDependencies）

以下依赖仅用于开发构建，不会打包进生产环境。

| 包名 | 开源协议 | 用途 |
|---|---|---|
| @vue/cli-service | MIT | 构建工具 |
| @vue/cli-plugin-babel | MIT | Babel 编译 |
| @vue/cli-plugin-router | MIT | 路由插件 |
| @vue/cli-plugin-vuex | MIT | Vuex 插件 |
| @vue/cli-plugin-eslint | MIT | ESLint 插件 |
| @babel/core | MIT | JS 编译器 |
| @babel/eslint-parser | MIT | ESLint 解析器 |
| @vue/eslint-config-airbnb | MIT | ESLint 规则集 |
| eslint | MIT | 代码检查 |
| eslint-plugin-import | MIT | ESLint import 规则 |
| eslint-plugin-vue | MIT | ESLint Vue 规则 |
| eslint-plugin-vuejs-accessibility | MIT | ESLint 无障碍规则 |
| sass | MIT | CSS 预处理器 |
| sass-loader | MIT | webpack sass 加载器 |
| postcss-html | MIT | PostCSS HTML 处理 |
| postcss-scss | MIT | PostCSS SCSS 处理 |
| stylelint | MIT | 样式检查 |
| stylelint-config-recommended-vue | MIT | stylelint 规则 |
| stylelint-config-standard-scss | MIT | stylelint 规则 |
| vue-template-compiler | MIT | Vue 模板编译 |
| compression-webpack-plugin | MIT | 打包压缩 |
| chalk | MIT | 终端颜色 |
| husky | MIT | Git hooks |
| lint-staged | MIT | Git 暂存检查 |

---

## 五、协议说明

- **MIT License**：允许商用、修改、分发、闭源，唯一要求是保留原作者版权声明与协议原文。
- 本项目已在根目录 `LICENSE` 文件中保留 visual-drag-demo 原作者的 MIT 版权声明。
- 各 npm 包的完整协议文本位于 `node_modules/<包名>/LICENSE` 或 `package.json` 字段中。

---

*本文件生成日期：2026-10-09*
*如有遗漏或错误，请联系维护者更新。*
