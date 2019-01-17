# 实现一个简单的Webpack

## tiny-webpack

### 需求
- 转换ES6语法到ES5
- 处理模块依赖加载
- 生成一个可以在浏览器执行的js文件

### 核心步骤
1. 初始化Option
2. 读取入口文件，分析模块依赖（深度遍历），对每一个模块进行build
  2.1 编译模块，生成抽象语法树（AST）
  2.2 遍历AST，转换代码
4. 遍历所以模块，集合（bundle）所有的编译后代码。
5. 输出

### 参考资料
[webpack 源码解析](https://lihuanghe.github.io/2016/05/30/webpack-source-analyse.html)
[细说 webpack 之流程篇](http://taobaofed.org/blog/2016/09/09/webpack-flow/)
[webpack打包原理](https://www.jianshu.com/p/e24ed38d89fd)
[webpack打包-模块分布解析](https://cnodejs.org/topic/5867bb575eac96bb04d3e301)