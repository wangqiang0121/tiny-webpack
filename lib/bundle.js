const path = require('path')
const fs = require('fs')
const babel = require('@babel/core');
/**
 * 获取文件，解析成AST语法
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
 * 编译
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
 * 生成完整的文件依赖关系映射
 * @param fileName
 * @param entry
 * @returns {{fileName: *, dependence, code: *}}
 */
function parse(fileName, entry) {
  let filePath = fileName.indexOf('.js') === -1 ? fileName + '.js' : fileName
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
 * 获取深度队列依赖关系
 * @param main
 * @returns {*[]}
 */
function getQueue(main) {
  let queue = [main]
  for (let asset of queue) {
    asset.dependence.forEach(function (dep) {
      let child = parse(dep)
      queue.push(child)
    })
  }
  return queue
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
  let mainFile = parse(config.entry, true)

  let queue = getQueue(mainFile)
  return bundle(queue)
}

module.exports = bundleFile
