## 后台管理系统 

前端技术栈 Vue3 + Vite2 + TypeScript + Vue Router + Pinia + Sass + Axios + Element Plus + Echarts + Jest等。

## 项目优势

- 极易上手，减少学习成本；
- 功能全面：国际化、动态路由、按钮权限、主题大小切换、Echarts、wangEditor；
- TypeScript 全面支持，包括组件和 API 调用层面；
- 主流 Vue3 生态和前端技术栈，常用组件极简封装；

## 技术栈及插件

| 技术栈 | 描述 | 官网 |
| --- | --- | --- |
| Vue3 | 渐进式 JavaScript 框架 | https://v3.cn.vuejs.org/ |
| TypeScript | JavaScript 的一个超集 | https://www.tslang.cn/ |
| Vite2 | 前端开发与构建工具 | https://cn.vitejs.dev/ |
| Element Plus | 基于 Vue 3，面向设计师和开发者的组件库 | https://element-plus.gitee.io/zh-CN/ |
| Pinia | 新一代状态管理工具 | https://pinia.vuejs.org/ |
| Vue Router | Vue.js 的官方路由 | https://router.vuejs.org/zh/ |
| Jest | JavaScript、组件 测试框架 | https://www.jestjs.cn/ |
| Echarts | Echarts图表 | https://echarts.apache.org/examples/zh/index.html |
| wangEditor | 富文本编辑器 | https://www.wangeditor.com/v5/for-frame.html#vue3 |



## 启动部署

### 环境准备

- 安装 Node

  版本：v14 或 v16

- 开发工具

  推荐 VSCode

- 必装插件

  VSCode 插件市场搜索并安装 `Volar`, 且一定要禁用 Vetur，不然代码可能会出现组件使用了但编译器还报组件未使用的警告信息，Volar 将会替代 Vetur 作为 Vue 的官方插件。

  `Prettier` 代码格式化工具。

  `EditorConfig for VS Code` EditorConfig有助于在不同的编辑器和IDE中为从事同一项目的多个开发人员维护一致的编码风格。


### 项目启动

1. npm install
2. npm run dev
3. 浏览器访问 http://localhost:3000

### 项目部署

- 本地打包

  ```
  npm run build:prod
  ```

  生成的静态文件位于项目根目录 dist 文件夹下

- nginx.cofig 配置

  ```
  server {
      listen     80;
      server_name  localhost;

      location / {
          root /usr/share/nginx/html/web;
          index index.html index.htm;
      }

      # 代理转发请求至网关，prod-api标识解决跨域问题
      location /prod-api/ {
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_pass http://****.com/;
      }
  }

  ```

  ### 其他命令

  - 测试环境打包

     ```
     npm run build:uat 
     ```

  -  本地开启服务器预览静态页面，可以用http-server命令行工具或者serve-static等服务中间件
  
     ```
     npm run serve
     ```

  - 执行单元测试脚本 
  
     ```
     npm run test
     ```

  - 修复ESLint错误警告
  
    ```
    npm run lint
    ```

  - 创建.husky/目录并指定该目录为git hooks所在的目录（husky+commitlint：检查提交描述是否符合规范要求）
  
    ```
    npm run prepare
    ```

  - 代码格式化，VSCode需要添加prettier插件
  
    ```
    npm run prettier  
    ```

 - 样式代码格式检查
  
    ```
    npm run stylelint  
    ```

 - 样式代码格式检查并自动修复
  
    ```
    npm run stylint:fix
    ```


 ## 项目目录结构

```
├── .husky                        git hooks所在的目录
├── public                        存放静态资源公共资源，不会被压缩合并
├── src
│   ├── api                       api接口请求文件目录
│   ├── assets                    资源目录（图片、scss、css等）
│   ├── components                项目组件目录
│   ├── directive                 自定义指令目录
│   ├── lang                      语言包目录
│   ├── layout                    页面布局组件目录
│   ├── router                    路由配置
│   ├── store                     状态管理目录 
│   ├── styles                    样式文件目录
│   ├── types                     ts类型声明目录 
│   ├── utils                     工具类函数目录
│   ├── views                     页面视图目录
│   ├── App.vue                   主应用
│   ├── components.d.ts           全局组件类型声明
│   ├── env.d.ts                  全局声明
│   ├── main.ts                   主入口
│   ├── permission.ts             动态路由权限
│   └── settings.ts               网站布局配置
├── .editorconfig                 编辑器的编码格式规范配置文件
├── .env.development              开发环境下的配置文件
├── .env.production               生产环境下的配置文件
├── .env.uat                      测试环境下的配置文件
├── .eslintignore                 ESLint忽略配置文件
├── .eslintrc.js                  ESLint配置文件
├── .gitignore                    Git忽略配置文件
├── .prettierignore               Prettier忽略配置文件
├── .prettierrc.js                Prettier代码格式化配置文件
├── .stylelintignore              Stylelint样式代码检查忽略配置文件
├── .stylelintrc.js               Stylelint样式代码检查配置文件
├── commitlint.config.js          代码提交规范配置文件
├── index.html                    模板文件，项目入口
├── jest.config.js                Jest单元测试配置文件
├── package.json                  依赖包/运行脚本配置文件
├── README.md                     项目介绍
├── README.NAME.md                命名规范
├── tsconfig.json                 ts配置文件
└── vite.config.ts                vite配置文件
```


## 特别说明

git 提交需要规范操作，如果EsLint报错需要优先解决问题才能提交，[提交描述规范详见](https://github.com/conventional-changelog/commitlint/#what-is-commitlint)

```js 
/* 
 - git commit -m <type>[optional scope]: <description>  
 - type详见 commitlint.config.js
*/
git add .
git commit -m 'fix: 优化'
git push
```

 