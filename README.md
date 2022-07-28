<div align="center" style="text-align: center;">
    <h1>徐晓伟工具箱</h1>
    <h3>基于 Tauri、Vite 3、Vue 3、Element Plus 的工具箱</h3>
    <a target="_blank" href="https://github.com/996icu/996.ICU/blob/master/LICENSE">
        <img alt="License-Anti" src="https://img.shields.io/badge/License-Anti 996-blue.svg">
    </a>
    <a target="_blank" href="https://996.icu/#/zh_CN">
        <img alt="Link-996" src="https://img.shields.io/badge/Link-996.icu-red.svg">
    </a>
    <a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=ZieC6s1WB4njfVbrDHYgoNS8YpT26VtF&jump_from=webapi">
        <img alt="QQ群" src="https://img.shields.io/badge/QQ群-696503132-blue.svg"/>
    </a>
</div>

<p></p>

<div align="center" style="text-align: center;">
<a target="_blank" href="https://github.com/xuxiaowei-tools/xuxiaowei-tools">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/xuxiaowei-tools/xuxiaowei-tools?logo=github">
  </a>

  <a target="_blank" href="https://github.com/xuxiaowei-tools/xuxiaowei-tools">
    <img alt="GitHub forks" src="https://img.shields.io/github/forks/xuxiaowei-tools/xuxiaowei-tools?logo=github">
  </a>

  <a target="_blank" href="https://github.com/xuxiaowei-tools/xuxiaowei-tools">
    <img alt="GitHub watchers" src="https://img.shields.io/github/watchers/xuxiaowei-tools/xuxiaowei-tools?logo=github">
  </a>

  <a target="_blank" href="https://github.com/xuxiaowei-tools/xuxiaowei-tools">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/xuxiaowei-tools/xuxiaowei-tools">
  </a>

  <a target="_blank" href="https://gitee.com/xuxiaowei-tools/xuxiaowei-tools">
    <img alt="码云Gitee stars" src="https://gitee.com/xuxiaowei-tools/xuxiaowei-tools/badge/star.svg?theme=blue">
  </a>

  <a target="_blank" href="https://gitee.com/xuxiaowei-tools/xuxiaowei-tools">
    <img alt="码云Gitee forks" src="https://gitee.com/xuxiaowei-tools/xuxiaowei-tools/badge/fork.svg?theme=blue">
  </a>

  <a target="_blank" href="https://gitlab.com/xuxiaowei-tools/xuxiaowei-tools">
    <img alt="Gitlab stars" src="https://badgen.net/gitlab/stars/xuxiaowei-tools/xuxiaowei-tools?icon=gitlab">
  </a>

  <a target="_blank" href="https://gitlab.com/xuxiaowei-tools/xuxiaowei-tools">
    <img alt="Gitlab forks" src="https://badgen.net/gitlab/forks/xuxiaowei-tools/xuxiaowei-tools?icon=gitlab">
  </a>

  <a target="_blank" href="https://github.com/xuxiaowei-tools/xuxiaowei-tools">
    <img alt="total lines" src="https://tokei.rs/b1/github/xuxiaowei-tools/xuxiaowei-tools">
  </a>

</div>

<p></p>

<div align="center" style="text-align: center;">
   <div>
      1. 本项目提供
         <a target="_blank" href="https://xuxiaowei-tools.gitee.io">Gitee Page</a>、
         <a target="_blank" href="https://xuxiaowei-tools.gitlab.io">GitLab Page</a>、
         <a target="_blank" href="https://xuxiaowei-tools.github.io">GitHub Page</a>
         网站。
   </div>
   <div>
      2. 本项目提供 <code>Windows</code>、<code>Linux</code>、<code>Mac</code> 安装包。
   </div>
   <div>
      3. 本项目仅提供开发常用工具，不收集用户数据。
   </div>
   <div>
      4. 本项目仅用于开发、测试。非法使用，后果自付。
   </div>
</div>

<p></p>

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
npm i @element-plus/icons-vue @tauri-apps/api axios crypto-js element-plus jsencrypt jsrsasign pinia vue vue-clipboard3 vue-router
npm i -D @tauri-apps/cli @types/crypto-js @typescript-eslint/eslint-plugin @typescript-eslint/parser @vitejs/plugin-vue eslint eslint-config-standard eslint-plugin-import eslint-plugin-n eslint-plugin-promise eslint-plugin-vue husky sass typescript unocss unplugin-auto-import unplugin-vue-components vite vue-tsc
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
