
# vue-webpack-node
>1、vue项目是基于node+webpack，和mysql数据库的商城，当中涉及vue-router、vue-cli（脚手架）、axios、element-ui（界面设计）等内容，包括登录注册功能、购物车、下单等功能的B2C商城，后续更多功能会逐渐完善。  
>2、我本地的数据库使用mysql,是使用xampp安装的，运行时需要打开apache和mysql
 
#前端运行#

    $npm run dev    
    
#后台服务器运行（在当前的目录下进入server文件夹）#
 
    $cd server  
    $npm run server


> A Vue.js project for online shop
>
> 项目技术栈：
>
> 1. vue
> 2. vue-cli 
> 3. axios 
> 4. node.js
> 5. webpack
> 6. element-ui


## Build Setup

####NPM

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8082(run fontend)
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run server(run server)
cd server
npm run server
```


## 目录说明

```shell
├── Docs	文档目录
├── build	打包配置目录
├── config	基础配置目录
├── dist	运行yarn build之后webpack打包的目录
│   └── static
│       ├── css
│       └── js
├── server
│   ├── api					api路由请求接口
├── src
│   ├── assets	    部分静态资源
│   ├── views       商城页面所在目录
│   ├── components			公共组件所在目录
│   ├── router			路由目录
│   └── background			后台管理系统的页面
└── static
    ├── uploadimage     上传图片的本地文件夹
    └── js
```
##首页图
 ![image](https://github.com/qianwen155/vue-webpack-node/blob/branch_test/shop.png)
