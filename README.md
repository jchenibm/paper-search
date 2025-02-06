# Paper Search System

这是一个基于 Next.js 开发的学术论文搜索系统,可以搜索和浏览 arXiv 上的论文。

## 功能特点

- 论文搜索：支持通过关键词搜索 arXiv 论文
- 论文展示：清晰展示论文标题、作者、发布时间和摘要
- 排序功能：支持按发布时间排序
- 响应式设计：适配各种屏幕尺寸

## 技术栈

- **前端框架:** Next.js 15.1.6
- **UI 组件:** Tailwind CSS
- **字体:** Geist Font
- **容器化:** Docker

## 开始使用

1. 安装依赖:

```bash
npm install
```

2. 运行开发服务器:

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## Docker 部署

1. 构建镜像:

```bash
docker build -f Dockerfile.new -t paper-search .
```

2. 运行容器:

```bash
docker run -p 3000:3000 paper-search
```

## 项目结构

```
/
├── public/               # 静态资源
│   └── paper-agent-download.json  # 预加载的论文数据
├── src/
│   ├── app/             # 页面组件
│   ├── components/      # 可复用组件
│   └── types/          # TypeScript 类型定义
├── scripts/            # Python 脚本
└── Dockerfile.new      # Docker 配置文件
```

## 开发说明

- 使用 `npm run dev` 启动开发服务器
- 使用 `npm run build` 构建生产版本
- 使用 `npm start` 启动生产服务器

## 部署

推荐使用 [Vercel Platform](https://vercel.com/new) 进行部署,可以获得最佳的开发体验。

## 许可证

MIT License