const path = require('path')
const fs = require('fs')
const babel = require('@babel/core');

/**
 * 将文件解析成AST
 * @param {file} file 入口文件
 * @returns {*}
 */
function getAst(filePath) {
  const code = fs.readFileSync(filePath, 'utf-8')

  const ast = babel.parseSync(code, {
    sourceType: "module",
  })
  return ast
}

/**
 * 将AST编译成代码
 * @param {*} AST
 * @returns {string} 编译后的源码
 */
function getTranslateCode(ast) {
  const { code } = babel.transformFromAstSync(ast, null, {
    presets: ['@babel/env']
  });
  return code
}

/**
 * 获取依赖关系
 * @param {*} ast
 */
function getDependence(ast) {
  let dependencies = []
  babel.traverse(ast, {
    ImportDeclaration: ({node}) => {
      dependencies.push(node.source.value)
    }
  })
  return dependencies
}

/**
 * 生成完整的文件依赖关系映射
 * @param fileName
 * @param entry
 * @returns {{fileName: *, dependence, code: *}}
 */
function parse(fileName, entry) {
  let filePath = fileName.indexOf('.js') === -1 ? fileName + '.js' : fileName
  // 以入口文件位置为基
  let dirName = entry ? '' : path.dirname(config.entry)
  let absolutePath = path.join(dirName, filePath)
  const ast = getAst(absolutePath)

  return {
    fileName,
    dependence: getDependence(ast),
    code: getTranslateCode(ast),
  };
}

/**
 * 深度优先遍历，获取所有模块
 * @param main
 * @returns {*[]}
 */
function getModules(entry, module, modules = [], exist = []) {
  const mod = parse(module, entry)
  if (!exist.includes(mod.fileName)) {
    modules.push(mod)
  }
  exist.push(mod.fileName)
  mod.dependence.forEach(dep => {
    getModules(false, dep, modules, exist)
  })
  return modules
}

function bundle(queue) {
  let modules = ''
  queue.forEach(function (mod) {
    modules += `'${mod.fileName}': function (require, module, exports) { ${mod.code} },`
  })
  const result = `
    (function(modules) {
      function require(fileName) {
        const fn = modules[fileName];
        const module = { exports : {} };
        fn(require, module, module.exports);
        return module.exports;
      }
      require('${config.entry}');
    })({${modules}})
  `;

  return result;
}

function bundleFile(option) {
  config = option
  let queue = getModules(true, config.entry)
  return bundle(queue)
}

module.exports = bundleFile
