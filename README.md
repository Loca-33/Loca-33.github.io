# 个人主页：GitHub Actions 自动同步版

## 本版解决的问题
访客浏览器不再请求 api.github.com。GitHub Actions 先读取公开仓库并生成静态项目卡片，再部署主页。无 JavaScript 也能看到部署后的项目。

## 更新现有网站
1. 仓库 Settings → Pages → Build and deployment → Source 改为 GitHub Actions。
2. 将本文件夹内部内容上传到主页仓库根目录，保留 assets、scripts 和 .github 文件夹结构。不要上传 ZIP 或外层文件夹。
3. 必须包含 scripts/build_site.py 和 .github/workflows/deploy.yml。
4. 如果网页上传遗漏 .github，用 Add file → Create new file，文件名填 .github/workflows/deploy.yml，复制本包同名文件全部内容并提交。
5. Actions → Sync projects and deploy homepage → Run workflow → main → Run workflow。
6. 等 Generate project cards 和 Deploy 均成功后，刷新主页。

默认主分支为 main。如果使用其他分支，修改 deploy.yml 中 push.branches，并确认 Pages 环境允许该分支部署。
无需创建个人 Token；使用 GitHub 自动提供的临时令牌，它不会写入网页或发布文件。

## 同步规则
每天北京时间 10:23 计划同步一次（GitHub 调度可能延迟），主页仓库 main 分支提交也会同步。其他项目仓库的修改不会立即触发此工作流；需要即时同步时手动 Run workflow。
公开仓库长期没有活动时，GitHub 可能停用定时工作流；到 Actions 重新启用即可。
展示全部账号名下公开仓库，排除 Loca-33.github.io，Fork 和 Archived 有标记；按最近更新时间排序。
项目名、Description、Topics、主要语言来自 GitHub，原样展示。建议用英文填写 Description。
仓库转为私有或删除后，需要下一次成功部署才会移除页面中的旧卡片。
API 获取失败会阻止部署，保留上一次成功发布的网站，并在 Actions 标记失败。

## 文件结构
index.html：个人信息及项目生成占位符
style.css：黑蓝配色与响应式样式
script.js：年份、导航高亮；不访问 GitHub API
assets/：照片和图标
scripts/build_site.py：生成静态项目卡片
.github/workflows/deploy.yml：自动同步和发布
.nojekyll：空文件

## 本地预览
直接打开 index.html 可以预览个人信息，但项目是构建时生成的，不会在源文件中自动出现。
如果本地网络能访问 GitHub API，可以运行 python scripts/build_site.py，然后打开 _site/index.html。
本地不通 API 时，请通过 GitHub Actions 构建，不需要安装第三方 Python 包。

## 维护
修改仓库 About 中的 Description 和 Topics 维护项目资料。
照片保持 assets/portrait.jpg 路径；个人信息在 index.html 中修改。
不要将 _site、Python 缓存、原始简历或个人 Token 上传到仓库。
