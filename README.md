# 实现一个简单的Webpack

## tiny-webpack

### 需求
- 转换ES6语法到ES5
- 处理模块依赖加载
- 生成一个可以在浏览器执行的js文件

### 核心步骤
- 通过`@babel/parser`生成AST
- 处理模块依赖
- 转换语法
- 通过`babel-core`将AST转换成源码