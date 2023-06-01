# mall
从零搭建vue2的服务端渲染架构

# router配置
路由的统一`/mall`前缀，是因为使用nginx代理：`location /mall`

# v-if与v-show在服务端渲染
这个问题的发现是由于我的顶部导航原来是使用v-if去条件渲染登录与未登录，登录后的头像下拉框有点击按钮跳转写文章页。使用v-if时，会导致点击写文章跳转，路由已经发生变化，但是页面还是原来的页面，只是el-popover这个组件
变换了位置。改为v-show之后，页面正常跳转了。

# docker部署项目

一定要先将本地的pro-server.js文件和packeage.json文件先放到服务器对应的目录下，否则会导致依赖未装，出现意外的bug。从昨天到今天，由于我安装了`@tinymce/tinymce-vue`这个依赖，但是服务器的package.json未更新，导致进入tinymce富文本编辑页，刷新页面，docker容器就自动退出。查看日志只是输出了`server-bundle.js`这个文件的内容，浪费了大量时间。
