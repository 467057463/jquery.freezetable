(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash"], factory);
	else if(typeof exports === 'object')
		exports["jquery.freezetable"] = factory(require("lodash"));
	else
		root["jquery.freezetable"] = factory(root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_lodash__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/defaults.js":
/*!*************************!*\
  !*** ./src/defaults.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaults = {
  /**
     * set freeze option
     * values: obj
    */
  freeze: {
    top: 0,
    bottom: 0,
    left: 1,
    right: 1
  },
  /**
   * hover line color
   * values: color(e.g. "red", "#ccc" ...)
  */
  lineHoverColor: false,
  /**
   * row hover color
   * value: color(same as line hover color)
  */
  rowHoverColor: false,
  /**
  * line separate color
  * values: Array first value is dark color last color is light scolor
  * (e.g. ["#f9f9f9", "transparent"] )
  */
  separateColor: [false, false],

  durationTime: 300,

  scrollDistance: 300,

  setWidth: false,

  setHeight: false,

  callback: {
    trClick: function trClick(element) {}
  },

  treeLevelRow: null
};

exports.default = defaults;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _defaults = __webpack_require__(/*! ./defaults.js */ "./src/defaults.js");

var _defaults2 = _interopRequireDefault(_defaults);

var _methods = __webpack_require__(/*! ./methods */ "./src/methods/index.js");

var _methods2 = _interopRequireDefault(_methods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_methods2.default);

var mm = 'mmsssbbb';

/*
----------------------------------------
PLUGIN SETUP
----------------------------------------
*/
/* plugin constructor functions */
$.fn.freezetable = function (method) {
  if (_methods2.default[method]) {
    return _methods2.default[method].apply(this, Array.prototype.slice.call(arguments, 1));
  } else if ((typeof method === 'undefined' ? 'undefined' : _typeof(method)) === "object" || !method) {
    return _methods2.default.init.apply(this, arguments);
  } else {
    $.error("Method " + method + " does not exist");
  }
};

// export default defaults;

/***/ }),

/***/ "./src/methods/index.js":
/*!******************************!*\
  !*** ./src/methods/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _init = __webpack_require__(/*! ./init */ "./src/methods/init.js");

var _init2 = _interopRequireDefault(_init);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  init: _init2.default
};

/***/ }),

/***/ "./src/methods/init.js":
/*!*****************************!*\
  !*** ./src/methods/init.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;
function init(options) {
  return 'ssssss';
}

/***/ }),

/***/ "lodash":
/*!*************************************************************************************!*\
  !*** external {"commonjs":"lodash","commonjs2":"lodash","amd":"lodash","root":"_"} ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash__;

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qcXVlcnkuZnJlZXpldGFibGUvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2pxdWVyeS5mcmVlemV0YWJsZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9qcXVlcnkuZnJlZXpldGFibGUvLi9zcmMvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vanF1ZXJ5LmZyZWV6ZXRhYmxlLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2pxdWVyeS5mcmVlemV0YWJsZS8uL3NyYy9tZXRob2RzL2luZGV4LmpzIiwid2VicGFjazovL2pxdWVyeS5mcmVlemV0YWJsZS8uL3NyYy9tZXRob2RzL2luaXQuanMiLCJ3ZWJwYWNrOi8vanF1ZXJ5LmZyZWV6ZXRhYmxlL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJsb2Rhc2hcIixcImNvbW1vbmpzMlwiOlwibG9kYXNoXCIsXCJhbWRcIjpcImxvZGFzaFwiLFwicm9vdFwiOlwiX1wifSJdLCJuYW1lcyI6WyJkZWZhdWx0cyIsImZyZWV6ZSIsInRvcCIsImJvdHRvbSIsImxlZnQiLCJyaWdodCIsImxpbmVIb3ZlckNvbG9yIiwicm93SG92ZXJDb2xvciIsInNlcGFyYXRlQ29sb3IiLCJkdXJhdGlvblRpbWUiLCJzY3JvbGxEaXN0YW5jZSIsInNldFdpZHRoIiwic2V0SGVpZ2h0IiwiY2FsbGJhY2siLCJ0ckNsaWNrIiwiZWxlbWVudCIsInRyZWVMZXZlbFJvdyIsImNvbnNvbGUiLCJsb2ciLCJtZXRob2RzIiwibW0iLCIkIiwiZm4iLCJmcmVlemV0YWJsZSIsIm1ldGhvZCIsImFwcGx5IiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJhcmd1bWVudHMiLCJpbml0IiwiZXJyb3IiLCJvcHRpb25zIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLElBQU1BLFdBQVc7QUFDZjs7OztBQUlFQyxVQUFPO0FBQ1BDLFNBQVEsQ0FERDtBQUVQQyxZQUFRLENBRkQ7QUFHUEMsVUFBUSxDQUhEO0FBSVBDLFdBQVE7QUFKRCxHQUxNO0FBV2Y7Ozs7QUFJQUMsa0JBQWdCLEtBZkQ7QUFnQmY7Ozs7QUFJQUMsaUJBQWUsS0FwQkE7QUFxQmY7Ozs7O0FBS0FDLGlCQUFlLENBQUMsS0FBRCxFQUFRLEtBQVIsQ0ExQkE7O0FBNEJmQyxnQkFBYyxHQTVCQzs7QUE4QmZDLGtCQUFnQixHQTlCRDs7QUFnQ2ZDLFlBQVUsS0FoQ0s7O0FBa0NmQyxhQUFXLEtBbENJOztBQW9DZkMsWUFBVTtBQUNSQyxhQUFTLGlCQUFTQyxPQUFULEVBQWlCLENBQUU7QUFEcEIsR0FwQ0s7O0FBd0NmQyxnQkFBYztBQXhDQyxDQUFqQjs7a0JBMkNlaEIsUTs7Ozs7Ozs7Ozs7Ozs7OztBQzNDZjs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBaUIsUUFBUUMsR0FBUixDQUFZQyxpQkFBWjs7QUFHQSxJQUFJQyxLQUFLLFVBQVQ7O0FBRUE7Ozs7O0FBS0E7QUFDQUMsRUFBRUMsRUFBRixDQUFLQyxXQUFMLEdBQW1CLFVBQVNDLE1BQVQsRUFBZ0I7QUFDakMsTUFBR0wsa0JBQVFLLE1BQVIsQ0FBSCxFQUFtQjtBQUNqQixXQUFPTCxrQkFBUUssTUFBUixFQUFnQkMsS0FBaEIsQ0FBc0IsSUFBdEIsRUFBNEJDLE1BQU1DLFNBQU4sQ0FBZ0JDLEtBQWhCLENBQXNCQyxJQUF0QixDQUEyQkMsU0FBM0IsRUFBc0MsQ0FBdEMsQ0FBNUIsQ0FBUDtBQUNELEdBRkQsTUFFTSxJQUFHLFFBQU9OLE1BQVAseUNBQU9BLE1BQVAsT0FBa0IsUUFBbEIsSUFBOEIsQ0FBQ0EsTUFBbEMsRUFBeUM7QUFDN0MsV0FBT0wsa0JBQVFZLElBQVIsQ0FBYU4sS0FBYixDQUFtQixJQUFuQixFQUF5QkssU0FBekIsQ0FBUDtBQUNELEdBRkssTUFFRDtBQUNIVCxNQUFFVyxLQUFGLENBQVEsWUFBWVIsTUFBWixHQUFxQixpQkFBN0I7QUFDRDtBQUNGLENBUkQ7O0FBVUEsMkI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCQTs7Ozs7O2tCQUVlO0FBQ2JPO0FBRGEsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JDRlNBLEk7QUFBVCxTQUFTQSxJQUFULENBQWNFLE9BQWQsRUFBc0I7QUFDbkMsU0FBTyxRQUFQO0FBQ0QsQzs7Ozs7Ozs7Ozs7QUNGRCxvRCIsImZpbGUiOiJqcXVlcnkuZnJlZXpldGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJsb2Rhc2hcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wibG9kYXNoXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImpxdWVyeS5mcmVlemV0YWJsZVwiXSA9IGZhY3RvcnkocmVxdWlyZShcImxvZGFzaFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wianF1ZXJ5LmZyZWV6ZXRhYmxlXCJdID0gZmFjdG9yeShyb290W1wiX1wiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2xvZGFzaF9fKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJjb25zdCBkZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAgICogc2V0IGZyZWV6ZSBvcHRpb25cbiAgICAgKiB2YWx1ZXM6IG9ialxuICAgICovXG4gICAgZnJlZXplOntcbiAgICB0b3AgICA6IDAsXG4gICAgYm90dG9tOiAwLFxuICAgIGxlZnQgIDogMSxcbiAgICByaWdodCA6IDFcbiAgfSxcbiAgLyoqXG4gICAqIGhvdmVyIGxpbmUgY29sb3JcbiAgICogdmFsdWVzOiBjb2xvcihlLmcuIFwicmVkXCIsIFwiI2NjY1wiIC4uLilcbiAgKi9cbiAgbGluZUhvdmVyQ29sb3I6IGZhbHNlLFxuICAvKipcbiAgICogcm93IGhvdmVyIGNvbG9yXG4gICAqIHZhbHVlOiBjb2xvcihzYW1lIGFzIGxpbmUgaG92ZXIgY29sb3IpXG4gICovXG4gIHJvd0hvdmVyQ29sb3I6IGZhbHNlLFxuICAvKipcbiAgKiBsaW5lIHNlcGFyYXRlIGNvbG9yXG4gICogdmFsdWVzOiBBcnJheSBmaXJzdCB2YWx1ZSBpcyBkYXJrIGNvbG9yIGxhc3QgY29sb3IgaXMgbGlnaHQgc2NvbG9yXG4gICogKGUuZy4gW1wiI2Y5ZjlmOVwiLCBcInRyYW5zcGFyZW50XCJdIClcbiAgKi9cbiAgc2VwYXJhdGVDb2xvcjogW2ZhbHNlLCBmYWxzZV0sXG5cbiAgZHVyYXRpb25UaW1lOiAzMDAsXG5cbiAgc2Nyb2xsRGlzdGFuY2U6IDMwMCxcblxuICBzZXRXaWR0aDogZmFsc2UsXG5cbiAgc2V0SGVpZ2h0OiBmYWxzZSxcblxuICBjYWxsYmFjazoge1xuICAgIHRyQ2xpY2s6IGZ1bmN0aW9uKGVsZW1lbnQpe31cbiAgfSxcblxuICB0cmVlTGV2ZWxSb3c6IG51bGxcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdHMiLCJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gXCIuL2RlZmF1bHRzLmpzXCI7XG5pbXBvcnQgbWV0aG9kcyBmcm9tICcuL21ldGhvZHMnO1xuXG5jb25zb2xlLmxvZyhtZXRob2RzKVxuXG5cbnZhciBtbSA9ICdtbXNzc2JiYidcblxuLypcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblBMVUdJTiBTRVRVUFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuKi9cbi8qIHBsdWdpbiBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgKi9cbiQuZm4uZnJlZXpldGFibGUgPSBmdW5jdGlvbihtZXRob2Qpe1xuICBpZihtZXRob2RzW21ldGhvZF0pe1xuICAgIHJldHVybiBtZXRob2RzW21ldGhvZF0uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gIH1lbHNlIGlmKHR5cGVvZiBtZXRob2QgPT09IFwib2JqZWN0XCIgfHwgIW1ldGhvZCl7XG4gICAgcmV0dXJuIG1ldGhvZHMuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gIH1lbHNle1xuICAgICQuZXJyb3IoXCJNZXRob2QgXCIgKyBtZXRob2QgKyBcIiBkb2VzIG5vdCBleGlzdFwiKTtcbiAgfVxufVxuXG4vLyBleHBvcnQgZGVmYXVsdCBkZWZhdWx0czsiLCJpbXBvcnQgaW5pdCBmcm9tICcuL2luaXQnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGluaXRcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0KG9wdGlvbnMpe1xuICByZXR1cm4gJ3Nzc3Nzcydcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfbG9kYXNoX187Il0sInNvdXJjZVJvb3QiOiIifQ==