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
  './src/index.js': function (require, module, exports) {
    "use strict";

    var _A = _interopRequireDefault(require("./A"));

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    console.log('引入A模块成功', _A.default);
  },
  './A': function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _B = _interopRequireDefault(require("./B1"));

    var _B2 = _interopRequireDefault(require("./B2"));

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var _default = "\u5BFC\u5165B1\u6A21\u5757\u6210\u529F\uFF0C".concat(_B.default, "\n\u5BFC\u5165B2\u6A21\u5757\u6210\u529F\uFF0C").concat(_B2.default);

    exports.default = _default;
  },
  './B1': function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _C = _interopRequireDefault(require("./C"));

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var b1 = "B1\u5BFC\u5165C\u6A21\u5757\u6210\u529F\uFF0C".concat(_C.default, "\n");
    var _default = b1;
    exports.default = _default;
  },
  './C': function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = 'C模块加载成功\n';
    exports.default = _default;
  },
  './B2': function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;

    var _C = _interopRequireDefault(require("./C"));

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var b2 = "B2\u5BFC\u5165C\u6A21\u5757\u6210\u529F\uFF0C".concat(_C.default, "\n");
    var _default = b2;
    exports.default = _default;
  },
})