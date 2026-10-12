# 王楚涵的个人主页

目标地址：https://loca-33.github.io/

全英文界面、冷白底色与深蓝/近黑色的单页个人主页。使用原生 HTML、CSS、JavaScript，无需安装 Node.js、npm 或后端服务，无外部字体、CDN、追踪器依赖。项目不展示配图。

## 文件说明

```text
Loca-33.github.io/
├── index.html          首页内容（修改个人信息、邮箱等）
├── style.css           样式、颜色、桌面与手机布局
├── script.js           导航高亮、自动年份、GitHub 公开仓库同步
├── .nojekyll           空文件，关闭 GitHub Pages 的 Jekyll 处理
├── README.md           本说明
└── assets/
    ├── portrait.jpg    本人照片，已重新编码且不保留原 EXIF
    └── favicon.svg     CW 网站图标
```

## 1 本地查看

先解压 ZIP，再双击 `index.html`。不要直接在压缩包内打开，否则图片与样式可能无法读取。无需启动服务器。

也可在 VS Code 中打开整个文件夹，通过 Live Server 预览。或者在本文件夹终端执行（需要本机装有 Python）：

```sh
python -m http.server 8000
```

然后访问 http://localhost:8000 。关闭服务按 Ctrl+C。

## 2 创建 GitHub 仓库

1. 登录 https://github.com/Loca-33 。
2. 点击右上角 + → New repository。
3. Repository name 填写 `Loca-33.github.io`。
4. 选择 Public；如果首次用网页上传，可以先勾选 Add a README file。
5. 点击 Create repository。如果同名仓库已经存在，不要重复创建，先备份原内容再更新。

## 3 上传文件

在仓库中选择 Add file → Upload files，将**解压后的文件夹内部内容**上传：index.html、style.css、script.js、README.md、assets 文件夹及 .nojekyll。不要上传 ZIP，也不要把整个外层文件夹嵌套到仓库内。

正确：仓库根目录直接有 index.html，照片在 assets/portrait.jpg。

错误：仓库根目录只出现 Loca-33.github.io 文件夹，index.html 在它里面。

点击 Commit changes。如果上传覆盖已有 README，保留这一份使用说明即可。Windows 若没有显示 .nojekyll，可在 GitHub 使用 Add file → Create new file，文件名填写 `.nojekyll` 后提交；文件可以为空，也可以仅包含换行。

若浏览器不支持上传文件夹，推荐用 GitHub Desktop（Add an Existing Repository / Clone repository），把这些文件复制到本地仓库根目录，Commit 后 Push。熟悉 Git 的用户也可以使用：

```sh
git clone https://github.com/Loca-33/Loca-33.github.io.git
# 将本站文件复制到克隆出的仓库根目录后，在该目录执行：
git add .
git commit -m "Add personal homepage"
git push
```

不要强制推送覆盖不清楚的历史，也不要把完整简历、源照片、审计文件等额外材料放进仓库。

## 4 开启 GitHub Pages

仓库 → Settings → Pages → Build and deployment：

- Source：**Deploy from a branch**
- Branch：**main**（如果你的文件提交到别的分支，选择实际分支）
- Folder：**/ (root)**
- 点击 Save
- Custom domain 保持空白，不需要 CNAME
- Enforce HTTPS 如果可选则勾选

等几分钟后查看 Actions 中 pages build and deployment 是否成功，或查看 Pages 设置页显示的访问地址。默认访问 https://loca-33.github.io/ 。无需自建 GitHub Actions 工作流或安装依赖。

## 5 发布前检查内容

- 内容按本次提供的最新简历整理：关注大模型应用、RAG、Agent、Skill 优化，项目区改为读取 GitHub 公开仓库，不再保留手写美赛条目。关注领域并不表示已有上线成果。
- 没有沿用参考网站作者的个人信息、论文链接、项目图片，也没有沿用旧版简历的研究条目。本站独立实现，只参考单页内容组织。
- 英文姓名暂用 `Chuhan Wang`；如有惯用拼写，可在标题、首屏、照片注释和页脚一并更换。
- 个人照片会在公开网站展示。当前邮箱 `hujisheng132@gmail.com` 来自新简历；如果不希望公开，删除 footer 中对应的 mailto 链接。公开邮箱可能收到垃圾邮件。
- 不展示手机号、年龄、政治面貌、学号；照片资产使用普通文件名。
- 奖项与工作内容按简历填写，发布前请自行核对奖项官方表述及个人实际贡献；没有放入未复现的准确率、作者身份或论文发表主张。
- 本站无 Paper / Demo / CV 占位按钮，没有把 GitHub 总主页冒充项目源码链接。

## 6 日常修改

### 修改内容
打开 index.html，按 section 的 id 查找：

| 位置 | 内容 |
|---|---|
| home | 英文名、姓名、首页简介和照片 |
| about | 个人介绍 |
| interests | 当前关注方向 |
| projects | 自动读取 GitHub 的项目容器，不要手动复制卡片 |
| experience | 教育、校园经历、技术栈 |
| honors | 奖项 |
| contact | 邮箱、GitHub |

编辑 GitHub 网页中的文件（铅笔图标）并 Commit changes，或者在本地修改后 Push，Pages 会自动重新部署。纯 HTML 内容无需修改 JavaScript。

### GitHub 项目自动同步

项目区在每次打开或刷新页面时，通过 GitHub 公共 API 获取 Loca-33 名下的全部公开仓库（支持分页），按最近更新时间排序；排除个人主页仓库 Loca-33.github.io。Fork 和归档仓库也展示，并标注 Fork / Archived。不会获取私有仓库、别人名下你参与的仓库、置顶顺序或 README 正文。

- 新增/删除公开仓库、仓库改名或转为私有：下次成功加载时反映在页面。
- 名称来自仓库名；简介来自仓库 About → Description；标签来自 Topics；主要语言由 GitHub 判定。
- 仓库没有 Description 时会显示英文缺省提示。建议在仓库首页右侧 About 齿轮中填写英文 Description 和 Topics，让主页风格统一。仓库名称和简介原样展示，不自动翻译中文。
- 不需要重新上传主页代码来更新项目资料；但已打开的页面不会持续轮询，需要刷新。
- 本方案展示仓库元信息，不会把项目本身自动部署成在线 Demo。
- 原手写的美赛项目介绍已经移除。如果希望它展示，需要在账号下有对应公开仓库。公开前检查数据、论文及个人信息是否适合发布。

无需 Token、后端或额外 Actions。不要将 GitHub Token 写到网页。每次访问会从访客浏览器请求 api.github.com，GitHub 会接收该请求及通常的网络信息。匿名 API 通常限制为每个来源 IP 每小时 60 次请求；共享网络、网络阻断或 GitHub 服务故障可能导致加载失败，此时展示英文提示和仓库列表链接，不显示旧项目。API 的元数据也可能有短暂更新延迟。

如需展示主页仓库，在 script.js 中将 EXCLUDED_REPOS 改为 []；如需排除其他仓库，将对应仓库名（小写）加入该数组。

### 更新现有网站

将本版 index.html、style.css、script.js、README.md 上传到原主页仓库根目录覆盖同名文件，再 Commit changes。assets/ 和 .nojekyll 没变，不需要重新上传；Pages 仍用 main / (root)，不需要改设置。部署完成后强制刷新查看。

### 修改照片
替换 assets/portrait.jpg，文件名保持不变。页面默认按竖幅裁切，可在 style.css 的 `.portrait img` 调整 object-position。请保留或更新 HTML 中图片 width/height 以匹配新照片尺寸，并先移除 EXIF 位置等元数据。不要上传参考作者的 portal.png。

### 修改配色
在 style.css 顶部 `:root` 修改 `--bg`（背景）、`--ink`（文字）、`--accent`（强调色）。页面用系统字体，跨系统显示会有轻微差异，但不依赖海外字体服务。

### 添加公开版简历
先另存 PDF，删掉不希望公开的电话、学号、住址等信息。将文件放在 assets/cv.pdf，然后在 hero-actions 内添加：

```html
<a class="text-link" href="assets/cv.pdf" target="_blank" rel="noopener noreferrer">简历 PDF ↗</a>
```

本次没有打包原始 DOCX，避免无意公开其中额外信息。GitHub 历史可能保留曾上传的数据，删除文件不等于清除历史。

## 7 常见问题

- **404**：确认仓库名、发布分支和 root 设置，确认根目录有 index.html，查看 Actions 是否失败。
- **没有样式或照片**：保留目录结构，不要用 F:/ 或 C:/ 本地路径；文件名区分大小写。
- **旧内容没更新**：等部署成功后 Ctrl+F5 强制刷新。
- **手机布局**：已设计窄屏布局；导航在手机端显示第二行，不需要菜单脚本。
- **项目未显示**：确认仓库为 Public、不是主页仓库，检查网络能否访问 api.github.com；限流时稍后重试，或通过页面链接直接查看 GitHub。
- **无 JavaScript**：个人介绍和导航可阅读，项目区显示 GitHub 链接；自动加载仓库需要 JavaScript 和网络。

## 交付边界

此文件夹是可部署源码。创建仓库、上传及开启 Pages 需要你在自己账户中操作；交付文件不代表网站已经上线。
