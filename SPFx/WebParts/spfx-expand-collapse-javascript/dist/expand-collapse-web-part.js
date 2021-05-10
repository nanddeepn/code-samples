define("eb6ecb8c-aba2-4594-b556-05218473c345_0.0.1", ["@microsoft/sp-property-pane","ExpandCollapseWebPartStrings","@microsoft/sp-core-library","@microsoft/sp-webpart-base"], function(__WEBPACK_EXTERNAL_MODULE__26ea__, __WEBPACK_EXTERNAL_MODULE__95I2__, __WEBPACK_EXTERNAL_MODULE_UWqr__, __WEBPACK_EXTERNAL_MODULE_br4S__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "rKcW");
/******/ })
/************************************************************************/
/******/ ({

/***/ "26ea":
/*!**********************************************!*\
  !*** external "@microsoft/sp-property-pane" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__26ea__;

/***/ }),

/***/ "95I2":
/*!***********************************************!*\
  !*** external "ExpandCollapseWebPartStrings" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__95I2__;

/***/ }),

/***/ "JPst":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "RSlv":
/*!**************************************************************************!*\
  !*** ./lib/webparts/expandCollapse/ExpandCollapseWebPart.module.scss.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable */
__webpack_require__(/*! ./ExpandCollapseWebPart.module.css */ "q/zx");
var styles = {
    expandCollapse: 'expandCollapse_f480435b',
    container: 'container_f480435b',
    row: 'row_f480435b',
    justifyContentEnd: 'justifyContentEnd_f480435b',
    mainTable: 'mainTable_f480435b',
    titleRow: 'titleRow_f480435b',
    descriptionRow: 'descriptionRow_f480435b',
    buttonExpandCollapse: 'buttonExpandCollapse_f480435b',
    column: 'column_f480435b',
    'ms-Grid': 'ms-Grid_f480435b',
    title: 'title_f480435b',
    subTitle: 'subTitle_f480435b',
    description: 'description_f480435b',
    button: 'button_f480435b',
    label: 'label_f480435b'
};
/* harmony default export */ __webpack_exports__["default"] = (styles);
/* tslint:enable */ 


/***/ }),

/***/ "UWqr":
/*!*********************************************!*\
  !*** external "@microsoft/sp-core-library" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_UWqr__;

/***/ }),

/***/ "br4S":
/*!*********************************************!*\
  !*** external "@microsoft/sp-webpart-base" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_br4S__;

/***/ }),

/***/ "q/zx":
/*!**********************************************************************!*\
  !*** ./lib/webparts/expandCollapse/ExpandCollapseWebPart.module.css ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/postcss-loader/src??postcss!./ExpandCollapseWebPart.module.css */ "qqlt");
var loader = __webpack_require__(/*! ./node_modules/@microsoft/loader-load-themed-styles/node_modules/@microsoft/load-themed-styles/lib/index.js */ "ruv1");

if(typeof content === "string") content = [[module.i, content]];

// add the styles to the DOM
for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1], true);

if(content.locals) module.exports = content.locals;

/***/ }),

/***/ "qqlt":
/*!*******************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??postcss!./lib/webparts/expandCollapse/ExpandCollapseWebPart.module.css ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "JPst")(false);
// Module
exports.push([module.i, ".expandCollapse_f480435b .container_f480435b{margin:10px auto}.expandCollapse_f480435b .row_f480435b{margin:0 -8px;box-sizing:border-box;padding:10px}.expandCollapse_f480435b .row_f480435b:after,.expandCollapse_f480435b .row_f480435b:before{display:table;content:\"\";line-height:0}.expandCollapse_f480435b .row_f480435b:after{clear:both}.expandCollapse_f480435b .justifyContentEnd_f480435b{-ms-flex-pack:end!important;justify-content:flex-end!important;display:-ms-flexbox;display:flex;-ms-flex-align:baseline;align-items:baseline}.expandCollapse_f480435b .mainTable_f480435b{border-spacing:0!important;border:1px solid #f3f3f3;height:auto;overflow:hidden}.expandCollapse_f480435b .titleRow_f480435b{font-size:16px!important;border:none!important;background-color:#fafafa;-ms-flex-pack:justify!important;justify-content:space-between!important;-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;padding:12px 20px 12px 10px}.expandCollapse_f480435b .descriptionRow_f480435b{padding:12px 20px 12px 10px}.expandCollapse_f480435b .buttonExpandCollapse_f480435b{background:0 0!important;border:none;padding:0!important;cursor:pointer}.expandCollapse_f480435b a,.expandCollapse_f480435b a:hover,.expandCollapse_f480435b a:visited{color:#07c;text-decoration:none}.expandCollapse_f480435b .column_f480435b{position:relative;min-height:1px;padding-left:8px;padding-right:8px;box-sizing:border-box}[dir=ltr] .expandCollapse_f480435b .column_f480435b{float:left}[dir=rtl] .expandCollapse_f480435b .column_f480435b{float:right}.expandCollapse_f480435b .column_f480435b .ms-Grid_f480435b{padding:0}@media (min-width:640px){.expandCollapse_f480435b .column_f480435b{width:83.33333333333334%}}@media (min-width:1024px){.expandCollapse_f480435b .column_f480435b{width:66.66666666666666%}}@media (min-width:1024px){[dir=ltr] .expandCollapse_f480435b .column_f480435b{left:16.66667%}[dir=rtl] .expandCollapse_f480435b .column_f480435b{right:16.66667%}}@media (min-width:640px){[dir=ltr] .expandCollapse_f480435b .column_f480435b{left:8.33333%}[dir=rtl] .expandCollapse_f480435b .column_f480435b{right:8.33333%}}.expandCollapse_f480435b .title_f480435b{font-size:21px;font-weight:100;color:\"[theme:white, default: #ffffff]\"}.expandCollapse_f480435b .description_f480435b,.expandCollapse_f480435b .subTitle_f480435b{font-size:17px;font-weight:300;color:\"[theme:white, default: #ffffff]\"}.expandCollapse_f480435b .button_f480435b{text-decoration:none;height:32px;min-width:80px;background-color:\"[theme:themePrimary, default: #0078d4]\";border-color:\"[theme:themePrimary, default: #0078d4]\";color:\"[theme:white, default: #ffffff]\";outline:transparent;position:relative;font-family:Segoe UI WestEuropean,Segoe UI,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;font-weight:400;border-width:0;text-align:center;cursor:pointer;display:inline-block;padding:0 16px}.expandCollapse_f480435b .button_f480435b .label_f480435b{font-weight:600;font-size:14px;height:32px;line-height:32px;margin:0 4px;vertical-align:top;display:inline-block}", ""]);


/***/ }),

/***/ "rKcW":
/*!**************************************************************!*\
  !*** ./lib/webparts/expandCollapse/ExpandCollapseWebPart.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_property_pane__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-property-pane */ "26ea");
/* harmony import */ var _microsoft_sp_property_pane__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_property_pane__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-webpart-base */ "br4S");
/* harmony import */ var _microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ExpandCollapseWebPart_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ExpandCollapseWebPart.module.scss */ "RSlv");
/* harmony import */ var ExpandCollapseWebPartStrings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ExpandCollapseWebPartStrings */ "95I2");
/* harmony import */ var ExpandCollapseWebPartStrings__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ExpandCollapseWebPartStrings__WEBPACK_IMPORTED_MODULE_4__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var ExpandCollapseWebPart = /** @class */ (function (_super) {
    __extends(ExpandCollapseWebPart, _super);
    function ExpandCollapseWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExpandCollapseWebPart.prototype.render = function () {
        var _this = this;
        this.enableExpandCollapse();
        this.domElement.innerHTML = "\n      <div class=\"" + _ExpandCollapseWebPart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].expandCollapse + "\">\n        <div class=\"" + _ExpandCollapseWebPart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].container + "\">\n          <div class=\"" + _ExpandCollapseWebPart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].row + "\">\n            <div class=\"" + _ExpandCollapseWebPart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].justifyContentEnd + "\">\n              <a href=\"#\" id=\"linkExpandAll\" style=\"display: none\" rel=\"noreferrer\" onClick=\"" + function () { _this.expandAll(); } + "\">Expand all</a>\n              <a href=\"#\" id=\"linkCollapseAll\" rel=\"noreferrer\" onClick=\"" + function () { _this.collapseAll(); } + "\">Collapse all</a>\n            </div>\n\n            <div id=\"tblAnnouncementDetails\">\n            </div>            \n            \n          </div>\n        </div>\n      </div>";
        this.getAnnouncementDetails();
        this._setButtonEventHandlers();
    };
    ExpandCollapseWebPart.prototype.getAnnouncementDetails = function () {
        var announcementItems = this.getAnnouncementItems();
        var html = "<div>";
        announcementItems.forEach(function (item) {
            html += "\n      <div class=\"" + _ExpandCollapseWebPart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].mainTable + "\">\n        <div class=\"" + _ExpandCollapseWebPart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].titleRow + "\">\n          <label>" + item.title + "</label>\n          <button type=\"button\" class=\"" + _ExpandCollapseWebPart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].buttonExpandCollapse + " collapsible\"}>\u25B2</button>\n        </div>\n        <div class=\"" + _ExpandCollapseWebPart_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].descriptionRow + "\">\n          <label>" + item.description + "</label>\n        </div>\n      </div>";
        });
        html += '</div>';
        var announcementContainer = this.domElement.querySelector('#tblAnnouncementDetails');
        announcementContainer.innerHTML = html;
    };
    ExpandCollapseWebPart.prototype._setButtonEventHandlers = function () {
        var webPart = this;
        this.domElement.querySelector('#linkExpandAll').addEventListener('click', function () { webPart.expandAll(); });
        this.domElement.querySelector('#linkCollapseAll').addEventListener('click', function () { webPart.collapseAll(); });
    };
    ExpandCollapseWebPart.prototype.enableExpandCollapse = function () {
        var existCondition = setInterval(function () {
            if (document.getElementsByClassName("collapsible").length > 0) {
                var coll = document.getElementsByClassName("collapsible");
                for (var i = 0; i < coll.length; i++) {
                    coll[i].addEventListener("click", function () {
                        this.classList.toggle("active");
                        var content = this.parentElement.nextElementSibling;
                        if (content.style.display === "block" || content.style.display === "") {
                            this.textContent = "▼";
                            content.style.display = "none";
                        }
                        else {
                            this.textContent = "▲";
                            content.style.display = "block";
                        }
                    });
                }
                clearInterval(existCondition);
            }
        }, 100);
    };
    ExpandCollapseWebPart.prototype.expandAll = function () {
        if (document.getElementsByClassName("collapsible").length > 0) {
            var coll = document.getElementsByClassName("collapsible");
            for (var i = 0; i < coll.length; i++) {
                var content = coll[i].parentElement.nextElementSibling;
                coll[i].textContent = "▲";
                content.style.display = "block";
            }
        }
        var linkCollapseAll = document.getElementById("linkCollapseAll");
        var linkExpandAll = document.getElementById("linkExpandAll");
        if (typeof linkCollapseAll !== "undefined" && typeof linkExpandAll !== "undefined") {
            linkCollapseAll.style.display = "block";
            linkExpandAll.style.display = "none";
        }
    };
    ExpandCollapseWebPart.prototype.collapseAll = function () {
        if (document.getElementsByClassName("collapsible").length > 0) {
            var coll = document.getElementsByClassName("collapsible");
            for (var i = 0; i < coll.length; i++) {
                var content = coll[i].parentElement.nextElementSibling;
                coll[i].textContent = "▼";
                content.style.display = "none";
            }
        }
        var linkCollapseAll = document.getElementById("linkCollapseAll");
        var linkExpandAll = document.getElementById("linkExpandAll");
        if (typeof linkCollapseAll !== "undefined" && typeof linkExpandAll !== "undefined") {
            linkCollapseAll.style.display = "none";
            linkExpandAll.style.display = "block";
        }
    };
    ExpandCollapseWebPart.prototype.getAnnouncementItems = function () {
        var announcementItems = [
            { title: "What is a product key?", description: "A product key is a 25-character code that comes with a Microsoft Office product. The product key allows you to install and activate the Office product on your PC." },
            { title: "Where do I find my Office product key?", description: "Your product key is 25 characters and is found in different locations depending on how you acquired your Office product." },
            { title: "How long does it take to download?", description: "Download times vary by location, internet connection speed and the size of the Office product you are downloading. It is recommended only high-speed broadband connections are used to download your file(s)." },
            { title: "What happens after I download?", description: "After the download has completed, go to the location that you saved the file at and double click on the new icon to start the installation." },
            { title: "What if the download stops or is interrupted before it is complete?", description: "If you become disconnected while files are being downloaded through your web browser, reconnect to the internet and retry your download." }
        ];
        return announcementItems;
    };
    Object.defineProperty(ExpandCollapseWebPart.prototype, "dataVersion", {
        get: function () {
            return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Version"].parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    ExpandCollapseWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: ExpandCollapseWebPartStrings__WEBPACK_IMPORTED_MODULE_4__["PropertyPaneDescription"]
                    },
                    groups: [
                        {
                            groupName: ExpandCollapseWebPartStrings__WEBPACK_IMPORTED_MODULE_4__["BasicGroupName"],
                            groupFields: [
                                Object(_microsoft_sp_property_pane__WEBPACK_IMPORTED_MODULE_1__["PropertyPaneTextField"])('description', {
                                    label: ExpandCollapseWebPartStrings__WEBPACK_IMPORTED_MODULE_4__["DescriptionFieldLabel"]
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return ExpandCollapseWebPart;
}(_microsoft_sp_webpart_base__WEBPACK_IMPORTED_MODULE_2__["BaseClientSideWebPart"]));
/* harmony default export */ __webpack_exports__["default"] = (ExpandCollapseWebPart);


/***/ }),

/***/ "ruv1":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/@microsoft/loader-load-themed-styles/node_modules/@microsoft/load-themed-styles/lib/index.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitStyles = exports.detokenize = exports.clearStyles = exports.loadTheme = exports.flush = exports.configureRunMode = exports.configureLoadStyles = exports.loadStyles = void 0;
// Store the theming state in __themeState__ global scope for reuse in the case of duplicate
// load-themed-styles hosted on the page.
var _root = typeof window === 'undefined' ? global : window; // eslint-disable-line @typescript-eslint/no-explicit-any
// Nonce string to inject into script tag if one provided. This is used in CSP (Content Security Policy).
var _styleNonce = _root && _root.CSPSettings && _root.CSPSettings.nonce;
var _themeState = initializeThemeState();
/**
 * Matches theming tokens. For example, "[theme: themeSlotName, default: #FFF]" (including the quotes).
 */
var _themeTokenRegex = /[\'\"]\[theme:\s*(\w+)\s*(?:\,\s*default:\s*([\\"\']?[\.\,\(\)\#\-\s\w]*[\.\,\(\)\#\-\w][\"\']?))?\s*\][\'\"]/g;
var now = function () {
    return typeof performance !== 'undefined' && !!performance.now ? performance.now() : Date.now();
};
function measure(func) {
    var start = now();
    func();
    var end = now();
    _themeState.perf.duration += end - start;
}
/**
 * initialize global state object
 */
function initializeThemeState() {
    var state = _root.__themeState__ || {
        theme: undefined,
        lastStyleElement: undefined,
        registeredStyles: []
    };
    if (!state.runState) {
        state = __assign(__assign({}, state), { perf: {
                count: 0,
                duration: 0
            }, runState: {
                flushTimer: 0,
                mode: 0 /* sync */,
                buffer: []
            } });
    }
    if (!state.registeredThemableStyles) {
        state = __assign(__assign({}, state), { registeredThemableStyles: [] });
    }
    _root.__themeState__ = state;
    return state;
}
/**
 * Loads a set of style text. If it is registered too early, we will register it when the window.load
 * event is fired.
 * @param {string | ThemableArray} styles Themable style text to register.
 * @param {boolean} loadAsync When true, always load styles in async mode, irrespective of current sync mode.
 */
function loadStyles(styles, loadAsync) {
    if (loadAsync === void 0) { loadAsync = false; }
    measure(function () {
        var styleParts = Array.isArray(styles) ? styles : splitStyles(styles);
        var _a = _themeState.runState, mode = _a.mode, buffer = _a.buffer, flushTimer = _a.flushTimer;
        if (loadAsync || mode === 1 /* async */) {
            buffer.push(styleParts);
            if (!flushTimer) {
                _themeState.runState.flushTimer = asyncLoadStyles();
            }
        }
        else {
            applyThemableStyles(styleParts);
        }
    });
}
exports.loadStyles = loadStyles;
/**
 * Allows for customizable loadStyles logic. e.g. for server side rendering application
 * @param {(processedStyles: string, rawStyles?: string | ThemableArray) => void}
 * a loadStyles callback that gets called when styles are loaded or reloaded
 */
function configureLoadStyles(loadStylesFn) {
    _themeState.loadStyles = loadStylesFn;
}
exports.configureLoadStyles = configureLoadStyles;
/**
 * Configure run mode of load-themable-styles
 * @param mode load-themable-styles run mode, async or sync
 */
function configureRunMode(mode) {
    _themeState.runState.mode = mode;
}
exports.configureRunMode = configureRunMode;
/**
 * external code can call flush to synchronously force processing of currently buffered styles
 */
function flush() {
    measure(function () {
        var styleArrays = _themeState.runState.buffer.slice();
        _themeState.runState.buffer = [];
        var mergedStyleArray = [].concat.apply([], styleArrays);
        if (mergedStyleArray.length > 0) {
            applyThemableStyles(mergedStyleArray);
        }
    });
}
exports.flush = flush;
/**
 * register async loadStyles
 */
function asyncLoadStyles() {
    return setTimeout(function () {
        _themeState.runState.flushTimer = 0;
        flush();
    }, 0);
}
/**
 * Loads a set of style text. If it is registered too early, we will register it when the window.load event
 * is fired.
 * @param {string} styleText Style to register.
 * @param {IStyleRecord} styleRecord Existing style record to re-apply.
 */
function applyThemableStyles(stylesArray, styleRecord) {
    if (_themeState.loadStyles) {
        _themeState.loadStyles(resolveThemableArray(stylesArray).styleString, stylesArray);
    }
    else {
        registerStyles(stylesArray);
    }
}
/**
 * Registers a set theme tokens to find and replace. If styles were already registered, they will be
 * replaced.
 * @param {theme} theme JSON object of theme tokens to values.
 */
function loadTheme(theme) {
    _themeState.theme = theme;
    // reload styles.
    reloadStyles();
}
exports.loadTheme = loadTheme;
/**
 * Clear already registered style elements and style records in theme_State object
 * @param option - specify which group of registered styles should be cleared.
 * Default to be both themable and non-themable styles will be cleared
 */
function clearStyles(option) {
    if (option === void 0) { option = 3 /* all */; }
    if (option === 3 /* all */ || option === 2 /* onlyNonThemable */) {
        clearStylesInternal(_themeState.registeredStyles);
        _themeState.registeredStyles = [];
    }
    if (option === 3 /* all */ || option === 1 /* onlyThemable */) {
        clearStylesInternal(_themeState.registeredThemableStyles);
        _themeState.registeredThemableStyles = [];
    }
}
exports.clearStyles = clearStyles;
function clearStylesInternal(records) {
    records.forEach(function (styleRecord) {
        var styleElement = styleRecord && styleRecord.styleElement;
        if (styleElement && styleElement.parentElement) {
            styleElement.parentElement.removeChild(styleElement);
        }
    });
}
/**
 * Reloads styles.
 */
function reloadStyles() {
    if (_themeState.theme) {
        var themableStyles = [];
        for (var _i = 0, _a = _themeState.registeredThemableStyles; _i < _a.length; _i++) {
            var styleRecord = _a[_i];
            themableStyles.push(styleRecord.themableStyle);
        }
        if (themableStyles.length > 0) {
            clearStyles(1 /* onlyThemable */);
            applyThemableStyles([].concat.apply([], themableStyles));
        }
    }
}
/**
 * Find theme tokens and replaces them with provided theme values.
 * @param {string} styles Tokenized styles to fix.
 */
function detokenize(styles) {
    if (styles) {
        styles = resolveThemableArray(splitStyles(styles)).styleString;
    }
    return styles;
}
exports.detokenize = detokenize;
/**
 * Resolves ThemingInstruction objects in an array and joins the result into a string.
 * @param {ThemableArray} splitStyleArray ThemableArray to resolve and join.
 */
function resolveThemableArray(splitStyleArray) {
    var theme = _themeState.theme;
    var themable = false;
    // Resolve the array of theming instructions to an array of strings.
    // Then join the array to produce the final CSS string.
    var resolvedArray = (splitStyleArray || []).map(function (currentValue) {
        var themeSlot = currentValue.theme;
        if (themeSlot) {
            themable = true;
            // A theming annotation. Resolve it.
            var themedValue = theme ? theme[themeSlot] : undefined;
            var defaultValue = currentValue.defaultValue || 'inherit';
            // Warn to console if we hit an unthemed value even when themes are provided, but only if "DEBUG" is true.
            // Allow the themedValue to be undefined to explicitly request the default value.
            if (theme &&
                !themedValue &&
                console &&
                !(themeSlot in theme) &&
                "boolean" !== 'undefined' &&
                true) {
                console.warn("Theming value not provided for \"" + themeSlot + "\". Falling back to \"" + defaultValue + "\".");
            }
            return themedValue || defaultValue;
        }
        else {
            // A non-themable string. Preserve it.
            return currentValue.rawString;
        }
    });
    return {
        styleString: resolvedArray.join(''),
        themable: themable
    };
}
/**
 * Split tokenized CSS into an array of strings and theme specification objects
 * @param {string} styles Tokenized styles to split.
 */
function splitStyles(styles) {
    var result = [];
    if (styles) {
        var pos = 0; // Current position in styles.
        var tokenMatch = void 0;
        while ((tokenMatch = _themeTokenRegex.exec(styles))) {
            var matchIndex = tokenMatch.index;
            if (matchIndex > pos) {
                result.push({
                    rawString: styles.substring(pos, matchIndex)
                });
            }
            result.push({
                theme: tokenMatch[1],
                defaultValue: tokenMatch[2] // May be undefined
            });
            // index of the first character after the current match
            pos = _themeTokenRegex.lastIndex;
        }
        // Push the rest of the string after the last match.
        result.push({
            rawString: styles.substring(pos)
        });
    }
    return result;
}
exports.splitStyles = splitStyles;
/**
 * Registers a set of style text. If it is registered too early, we will register it when the
 * window.load event is fired.
 * @param {ThemableArray} styleArray Array of IThemingInstruction objects to register.
 * @param {IStyleRecord} styleRecord May specify a style Element to update.
 */
function registerStyles(styleArray) {
    if (typeof document === 'undefined') {
        return;
    }
    var head = document.getElementsByTagName('head')[0];
    var styleElement = document.createElement('style');
    var _a = resolveThemableArray(styleArray), styleString = _a.styleString, themable = _a.themable;
    styleElement.setAttribute('data-load-themed-styles', 'true');
    if (_styleNonce) {
        styleElement.setAttribute('nonce', _styleNonce);
    }
    styleElement.appendChild(document.createTextNode(styleString));
    _themeState.perf.count++;
    head.appendChild(styleElement);
    var ev = document.createEvent('HTMLEvents');
    ev.initEvent('styleinsert', true /* bubbleEvent */, false /* cancelable */);
    ev.args = {
        newStyle: styleElement
    };
    document.dispatchEvent(ev);
    var record = {
        styleElement: styleElement,
        themableStyle: styleArray
    };
    if (themable) {
        _themeState.registeredThemableStyles.push(record);
    }
    else {
        _themeState.registeredStyles.push(record);
    }
}
//# sourceMappingURL=index.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../webpack/buildin/global.js */ "yLpj")))

/***/ }),

/***/ "yLpj":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

/******/ })});;
//# sourceMappingURL=expand-collapse-web-part.js.map