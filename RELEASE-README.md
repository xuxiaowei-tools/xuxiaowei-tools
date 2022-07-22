# RELEASE

# 📗 Links | 链接

# ⭐ New Features | 新功能

# 🐞 Bug Fixes | 漏洞修补

# 📔 Documentation | 文档

# 🔨 Dependency Upgrades | 依赖项升级

# ❤ Contributors | 贡献者

---

# 版本说明

- 内侧版
    - alpha
- 公测版
    - bate
- 候选版
    - RC
- 正式版
    - GA
    - RELEASE
    - Stable

# 修改版本号说明

1. 修改 [package.json](package.json) 中的 `version`
2. 修改 [package-lock.json](package-lock.json) 中的 `version`，注意要修改最上面两个 `version`，或者修改 [package.json](package.json)
   中的 `version` 后，执行 `npm i`
3. 修改 [tauri.conf.json](src-tauri/tauri.conf.json) 中的 `version`
4. 修改 [Cargo.toml](src-tauri/Cargo.toml) 中的 `version`
