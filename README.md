# 个人工作台 Personal Workbench

一个基于 Web 技术构建的个人学习工作台 PWA 应用，支持 Android APK 安装。

## 功能特性

- **学习打卡**：德语、板绘、英语、阅读四大类任务，每日动态生成
- **小树成长**：完成任务获得水滴滋养小树，成熟后可解锁新树种
- **连续学习**：连续打卡奖励机制，每3天额外获得经验
- **时事新闻**：每日自动更新5条新闻热点（AI生成 + RSS）
- **每日激励**：每日5条激励语录，每日一换
- **每日理论**：每日5个学习/生活理论，可查看详情
- **理财知识**：每日5个理财知识点
- **英语听力**：精选B站英语学习资源
- **板绘计划**：6阶段数字绘画学习路线图
- **笔友功能**：AI驱动的多语言对话练习（支持 DeepSeek / OpenRouter / 硅基流动）

## 技术栈

- 前端：HTML5 + CSS3 + 原生 JavaScript（无框架依赖）
- 图表：ECharts
- 数据存储：LocalStorage
- PWA：Service Worker + Web App Manifest
- AI 集成：支持多家 AI API 提供商
- 移动端：通过 Android WebView 打包为 APK

## 项目结构

```
personal-workbench/
├── personal-workbench.html   # 主页面
├── manifest.json             # PWA 清单
├── sw.js                     # Service Worker
├── server.js                 # 本地开发服务器（可选）
├── assets/
│   ├── app.js                # 核心应用逻辑
│   ├── data.js               # 静态数据（理论库、语录、任务池等）
│   ├── drawing-penpal-data.js # 板绘计划与笔友数据
│   ├── icon-192.png          # 应用图标
│   └── icon-512.png          # 高清应用图标
└── _shared/
    └── js/
        └── echarts.min.js     # ECharts 图表库
```

## 使用方式

### 作为网页使用

直接用浏览器打开 `personal-workbench.html`，或启动本地服务器：

```bash
node server.js
```

然后访问 `http://localhost:3000`。

### 作为 Android 应用使用

项目已包含打包好的 APK（如需重新打包，请参考构建脚本）。

安装步骤：
1. 将 APK 传输到手机
2. 允许"安装未知来源应用"
3. 点击安装

### AI 笔友配置

在应用内进入「设置」页面，选择 AI 提供商并输入 API Key：
- **DeepSeek**：https://platform.deepseek.com/
- **OpenRouter**：https://openrouter.ai/
- **硅基流动**：https://siliconflow.cn/

## License

MIT
