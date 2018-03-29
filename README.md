
# vue-webpack-node
vue基于node，和mysql数据库的使用，当中涉及vue-router、vue-cli（脚手架）、axiose、element-ui（界面设计）等内容，包括登录注册功能、检索功能等的B2C商城，后续更多功能会逐渐完善。  
  
**`前端运行`**

    $npm run dev    
    
**`台服务器运行（在当前的目录下进入server文件夹）`**

    $cd server  
    $npm run server


> A Vue.js project for lexing
>
> 项目技术栈：
>
> 1. vue
> 2. vue-cli 
> 3. axios 
> 4. node.js

## Build Setup

#### YARN

```bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn dev

# build for production with minification
yarn build
```

####NPM

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 目录说明

```shell
├── Docs	文档目录
├── build	打包配置目录
├── config	基础配置目录
├── dist	运行yarn build之后webpack打包的目录
│   └── static
│       ├── css
│       └── js
├── src
│   ├── api					api路由请求目录
│   ├── assets				公用stylus库
│   │   └── fonts			图标字体打包成fonts库
│   ├── components			组件和页面所在目录
│   ├── router			路由目录
│   └── utils			工具库
└── static
    ├── css
    └── js
```

