# 基于 Tauri、Vite 3、Vue 3、Element Plus 的工具箱

## 项目创建

```shell
npm create tauri-app
npm i -D eslint
npx eslint --init
# 选择
# To check syntax, find problems, and enforce code style
# JavaScript modules (import/export)
# Vue.js
# use TypeScript
# √ Browser
# Use a popular style guide
# Standard: https://github.com/standard/standard
# JavaScript
npx husky-init
npm i element-plus
npm i -D unplugin-vue-components unplugin-auto-import
```

- 依赖

```shell
npm i @element-plus/icons-vue @tauri-apps/api @types/crypto-js crypto-js element-plus jsencrypt vue vue-clipboard3 vue-router vuex
npm i -D @tauri-apps/cli @typescript-eslint/eslint-plugin @typescript-eslint/parser @vitejs/plugin-vue eslint eslint-config-standard eslint-plugin-import eslint-plugin-n eslint-plugin-promise eslint-plugin-vue husky sass typescript unocss unplugin-auto-import unplugin-vue-components vite vue-tsc
```

# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue
3 `<script setup>` SFCs, check out
the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type
by default. In most cases this is fine if you don't really care about component prop types outside of templates.
However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using
manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look
   for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default,
   Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

## Stargazers over time

[![Stargazers over time](https://starchart.cc/xuxiaowei-tools/xuxiaowei-tools.svg)](https://starchart.cc/xuxiaowei-tools/xuxiaowei-tools)
