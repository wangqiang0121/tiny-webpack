(function (modules) {
  function require(fileName) {
    const fn = modules[fileName];
    const module = {
      exports: {}
    };
    fn(require, module, module.exports);
    return module.exports;
  }
  require('./src/index.js');
})({
  "./A": "function (require, module, exports) { \"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _B = _interopRequireDefault(require(\"./B1\"));\n\nvar _B2 = _interopRequireDefault(require(\"./B2\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar _default = \"\\u5BFC\\u5165B1\\u6A21\\u5757\\u6210\\u529F\\uFF0C\".concat(_B.default, \"\\n\\u5BFC\\u5165B2\\u6A21\\u5757\\u6210\\u529F\\uFF0C\").concat(_B2.default);\n\nexports.default = _default; }",
  "./B1": "function (require, module, exports) { \"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _C = _interopRequireDefault(require(\"./C\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar b1 = \"B1\\u5BFC\\u5165C\\u6A21\\u5757\\u6210\\u529F\\uFF0C\".concat(_C.default, \"\\n\");\nvar _default = b1;\nexports.default = _default; }",
  "./B2": "function (require, module, exports) { \"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _C = _interopRequireDefault(require(\"./C\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar b2 = \"B2\\u5BFC\\u5165C\\u6A21\\u5757\\u6210\\u529F\\uFF0C\".concat(_C.default, \"\\n\");\nvar _default = b2;\nexports.default = _default; }",
  "./C": "function (require, module, exports) { \"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\nvar _default = 'C模块加载成功\\n';\nexports.default = _default; }"
})