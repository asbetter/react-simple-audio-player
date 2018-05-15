module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.parseStartTime = parseStartTime;
exports.randomString = randomString;
exports.queryString = queryString;
exports.getSDK = getSDK;
exports.getConfig = getConfig;
exports.omit = omit;
exports.callPlayer = callPlayer;
exports.isObject = isObject;
exports.isEqual = isEqual;

var _loadScript = __webpack_require__(18);

var _loadScript2 = _interopRequireDefault(_loadScript);

var _deepmerge = __webpack_require__(17);

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _props = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MATCH_START_QUERY = /[?&#](?:start|t)=([0-9hms]+)/;
var MATCH_START_STAMP = /(\d+)(h|m|s)/g;
var MATCH_NUMERIC = /^\d+$/;

// Parse YouTube URL for a start time param, ie ?t=1h14m30s
// and return the start time in seconds
function parseStartTime(url) {
  var match = url.match(MATCH_START_QUERY);
  if (match) {
    var stamp = match[1];
    if (stamp.match(MATCH_START_STAMP)) {
      return parseStartStamp(stamp);
    }
    if (MATCH_NUMERIC.test(stamp)) {
      return parseInt(stamp, 10);
    }
  }
  return 0;
}

function parseStartStamp(stamp) {
  var seconds = 0;
  var array = MATCH_START_STAMP.exec(stamp);
  while (array !== null) {
    var _array = array,
        _array2 = _slicedToArray(_array, 3),
        count = _array2[1],
        period = _array2[2];

    if (period === 'h') seconds += parseInt(count, 10) * 60 * 60;
    if (period === 'm') seconds += parseInt(count, 10) * 60;
    if (period === 's') seconds += parseInt(count, 10);
    array = MATCH_START_STAMP.exec(stamp);
  }
  return seconds;
}

// http://stackoverflow.com/a/38622545
function randomString() {
  return Math.random().toString(36).substr(2, 5);
}

function queryString(object) {
  return Object.keys(object).map(function (key) {
    return key + '=' + object[key];
  }).join('&');
}

// Util function to load an external SDK
// or return the SDK if it is already loaded
function getSDK(url, sdkGlobal) {
  var sdkReady = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var isLoaded = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {
    return true;
  };

  if (window[sdkGlobal] && isLoaded(window[sdkGlobal])) {
    return Promise.resolve(window[sdkGlobal]);
  }
  return new Promise(function (resolve, reject) {
    if (sdkReady) {
      var previousOnReady = window[sdkReady];
      window[sdkReady] = function () {
        if (previousOnReady) previousOnReady();
        resolve(window[sdkGlobal]);
      };
    }
    (0, _loadScript2['default'])(url, function (err) {
      if (err) reject(err);
      if (!sdkReady) {
        resolve(window[sdkGlobal]);
      }
    });
  });
}

function getConfig(props, defaultProps, showWarning) {
  var config = (0, _deepmerge2['default'])(defaultProps.config, props.config);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _props.DEPRECATED_CONFIG_PROPS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var p = _step.value;

      if (props[p]) {
        var key = p.replace(/Config$/, '');
        config = (0, _deepmerge2['default'])(config, _defineProperty({}, key, props[p]));
        if (showWarning) {
          var link = 'https://github.com/CookPete/react-player#config-prop';
          var message = 'ReactPlayer: %c' + p + ' %cis deprecated, please use the config prop instead \u2013 ' + link;
          console.warn(message, 'font-weight: bold', '');
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return config;
}

function omit(object) {
  var _ref;

  for (var _len = arguments.length, arrays = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    arrays[_key - 1] = arguments[_key];
  }

  var omitKeys = (_ref = []).concat.apply(_ref, arrays);
  var output = {};
  var keys = Object.keys(object);
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var key = _step2.value;

      if (omitKeys.indexOf(key) === -1) {
        output[key] = object[key];
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2['return']) {
        _iterator2['return']();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return output;
}

function callPlayer(method) {
  var _player;

  // Util method for calling a method on this.player
  // but guard against errors and console.warn instead
  if (!this.player || !this.player[method]) {
    var message = 'ReactPlayer: ' + this.constructor.displayName + ' player could not call %c' + method + '%c \u2013 ';
    if (!this.player) {
      message += 'The player was not available';
    } else if (!this.player[method]) {
      message += 'The method was not available';
    }
    console.warn(message, 'font-weight: bold', '');
    return null;
  }

  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return (_player = this.player)[method].apply(_player, args);
}

function isObject(val) {
  return val !== null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object';
}

// Deep comparison of two objects but ignoring
// functions, for use in shouldComponentUpdate
function isEqual(a, b) {
  if (typeof a === 'function' && typeof b === 'function') {
    return true;
  }
  if (a instanceof Array && b instanceof Array) {
    if (a.length !== b.length) {
      return false;
    }
    for (var i = 0; i !== a.length; i++) {
      if (!isEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }
  if (isObject(a) && isObject(b)) {
    if (Object.keys(a).length !== Object.keys(b).length) {
      return false;
    }
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = Object.keys(a)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var key = _step3.value;

        if (!isEqual(a[key], b[key])) {
          return false;
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    return true;
  }
  return a === b;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports['default'] = createSinglePlayer;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _props2 = __webpack_require__(4);

var _utils = __webpack_require__(1);

var _Player = __webpack_require__(8);

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SUPPORTED_PROPS = Object.keys(_props2.propTypes);

function createSinglePlayer(activePlayer) {
  var _class, _temp2;

  return _temp2 = _class = function (_Component) {
    _inherits(SinglePlayer, _Component);

    function SinglePlayer() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, SinglePlayer);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SinglePlayer.__proto__ || Object.getPrototypeOf(SinglePlayer)).call.apply(_ref, [this].concat(args))), _this), _this.getDuration = function () {
        if (!_this.player) return null;
        return _this.player.getDuration();
      }, _this.getCurrentTime = function () {
        if (!_this.player) return null;
        return _this.player.getCurrentTime();
      }, _this.getSecondsLoaded = function () {
        if (!_this.player) return null;
        return _this.player.getSecondsLoaded();
      }, _this.getInternalPlayer = function () {
        var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'player';

        if (!_this.player) return null;
        return _this.player.getInternalPlayer(key);
      }, _this.seekTo = function (fraction) {
        if (!_this.player) return null;
        _this.player.seekTo(fraction);
      }, _this.ref = function (player) {
        _this.player = player;
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SinglePlayer, [{
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps) {
        return !(0, _utils.isEqual)(this.props, nextProps);
      }
    }, {
      key: 'componentWillUpdate',
      value: function componentWillUpdate(nextProps) {
        this.config = (0, _utils.getConfig)(nextProps, _props2.defaultProps);
      }
    }, {
      key: 'render',
      value: function render() {
        if (!activePlayer.canPlay(this.props.url)) {
          return null;
        }
        var _props = this.props,
            style = _props.style,
            width = _props.width,
            height = _props.height,
            Wrapper = _props.wrapper;

        var otherProps = (0, _utils.omit)(this.props, SUPPORTED_PROPS, _props2.DEPRECATED_CONFIG_PROPS);
        return _react2['default'].createElement(
          Wrapper,
          _extends({ style: _extends({}, style, { width: width, height: height }) }, otherProps),
          _react2['default'].createElement(_Player2['default'], _extends({}, this.props, {
            ref: this.ref,
            activePlayer: activePlayer,
            config: (0, _utils.getConfig)(this.props, _props2.defaultProps)
          }))
        );
      }
    }]);

    return SinglePlayer;
  }(_react.Component), _class.displayName = activePlayer.displayName + 'Player', _class.propTypes = _props2.propTypes, _class.defaultProps = _props2.defaultProps, _class.canPlay = activePlayer.canPlay, _temp2;
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEPRECATED_CONFIG_PROPS = exports.defaultProps = exports.propTypes = undefined;

var _propTypes = __webpack_require__(23);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var string = _propTypes2['default'].string,
    bool = _propTypes2['default'].bool,
    number = _propTypes2['default'].number,
    array = _propTypes2['default'].array,
    oneOfType = _propTypes2['default'].oneOfType,
    shape = _propTypes2['default'].shape,
    object = _propTypes2['default'].object,
    func = _propTypes2['default'].func;
var propTypes = exports.propTypes = {
  url: oneOfType([string, array]),
  playing: bool,
  loop: bool,
  controls: bool,
  volume: number,
  muted: bool,
  playbackRate: number,
  width: oneOfType([string, number]),
  height: oneOfType([string, number]),
  style: object,
  progressInterval: number,
  playsinline: bool,
  wrapper: oneOfType([string, func]),
  config: shape({
    soundcloud: shape({
      options: object
    }),
    youtube: shape({
      playerVars: object,
      preload: bool
    }),
    facebook: shape({
      appId: string
    }),
    dailymotion: shape({
      params: object,
      preload: bool
    }),
    vimeo: shape({
      iframeParams: object,
      preload: bool
    }),
    file: shape({
      attributes: object,
      tracks: array,
      forceVideo: bool,
      forceAudio: bool,
      forceHLS: bool,
      forceDASH: bool,
      hlsOptions: object
    }),
    wistia: shape({
      options: object
    }),
    mixcloud: shape({
      options: object
    }),
    twitch: shape({
      options: object
    })
  }),
  onReady: func,
  onStart: func,
  onPlay: func,
  onPause: func,
  onBuffer: func,
  onEnded: func,
  onError: func,
  onDuration: func,
  onSeek: func,
  onProgress: func
};

var defaultProps = exports.defaultProps = {
  playing: false,
  loop: false,
  controls: false,
  volume: null,
  muted: false,
  playbackRate: 1,
  width: '640px',
  height: '360px',
  style: {},
  progressInterval: 1000,
  playsinline: false,
  wrapper: 'div',
  config: {
    soundcloud: {
      options: {
        visual: true, // Undocumented, but makes player fill container and look better
        buying: false,
        liking: false,
        download: false,
        sharing: false,
        show_comments: false,
        show_playcount: false
      }
    },
    youtube: {
      playerVars: {
        autoplay: 0,
        playsinline: 1,
        showinfo: 0,
        rel: 0,
        iv_load_policy: 3,
        modestbranding: 1
      },
      preload: false
    },
    facebook: {
      appId: '1309697205772819'
    },
    dailymotion: {
      params: {
        api: 1,
        'endscreen-enable': false
      },
      preload: false
    },
    vimeo: {
      playerOptions: {
        autopause: false,
        autoplay: false,
        byline: false,
        portrait: false,
        title: false
      },
      preload: false
    },
    file: {
      attributes: {},
      tracks: [],
      forceVideo: false,
      forceAudio: false,
      forceHLS: false,
      forceDASH: false,
      hlsOptions: {}
    },
    wistia: {
      options: {}
    },
    mixcloud: {
      options: {
        hide_cover: 1
      }
    },
    twitch: {
      options: {}
    }
  },
  onReady: function onReady() {},
  onStart: function onStart() {},
  onPlay: function onPlay() {},
  onPause: function onPause() {},
  onBuffer: function onBuffer() {},
  onEnded: function onEnded() {},
  onError: function onError() {},
  onDuration: function onDuration() {},
  onSeek: function onSeek() {},
  onProgress: function onProgress() {}
};

var DEPRECATED_CONFIG_PROPS = exports.DEPRECATED_CONFIG_PROPS = ['soundcloudConfig', 'youtubeConfig', 'facebookConfig', 'dailymotionConfig', 'vimeoConfig', 'fileConfig', 'wistiaConfig'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _props2 = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SEEK_ON_PLAY_EXPIRY = 5000;

var Player = function (_Component) {
  _inherits(Player, _Component);

  function Player() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Player);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Player.__proto__ || Object.getPrototypeOf(Player)).call.apply(_ref, [this].concat(args))), _this), _this.mounted = false, _this.isReady = false, _this.isPlaying = false, _this.isLoading = true, _this.startOnPlay = true, _this.seekOnPlay = null, _this.onDurationCalled = false, _this.getInternalPlayer = function (key) {
      if (!_this.player) return null;
      return _this.player[key];
    }, _this.progress = function () {
      if (_this.props.url && _this.player && _this.isReady) {
        var playedSeconds = _this.getCurrentTime() || 0;
        var loadedSeconds = _this.getSecondsLoaded();
        var duration = _this.getDuration();
        if (duration) {
          var progress = {
            playedSeconds: playedSeconds,
            played: playedSeconds / duration
          };
          if (loadedSeconds !== null) {
            progress.loadedSeconds = loadedSeconds;
            progress.loaded = loadedSeconds / duration;
          }
          // Only call onProgress if values have changed
          if (progress.played !== _this.prevPlayed || progress.loaded !== _this.prevLoaded) {
            _this.props.onProgress(progress);
          }
          _this.prevPlayed = progress.played;
          _this.prevLoaded = progress.loaded;
        }
      }
      _this.progressTimeout = setTimeout(_this.progress, _this.props.progressFrequency || _this.props.progressInterval);
    }, _this.onReady = function () {
      if (!_this.mounted) return;
      _this.isReady = true;
      _this.isLoading = false;
      var _this$props = _this.props,
          onReady = _this$props.onReady,
          playing = _this$props.playing,
          volume = _this$props.volume,
          muted = _this$props.muted;

      onReady();
      if (muted || volume !== null) {
        _this.player.setVolume(muted ? 0 : volume);
      }
      if (playing) {
        _this.player.play();
      }
      _this.onDurationCheck();
    }, _this.onPlay = function () {
      _this.isPlaying = true;
      _this.isLoading = false;
      var _this$props2 = _this.props,
          onStart = _this$props2.onStart,
          onPlay = _this$props2.onPlay,
          playbackRate = _this$props2.playbackRate;

      if (_this.startOnPlay) {
        if (_this.player.setPlaybackRate) {
          _this.player.setPlaybackRate(playbackRate);
        }
        onStart();
        _this.startOnPlay = false;
      }
      onPlay();
      if (_this.seekOnPlay) {
        _this.seekTo(_this.seekOnPlay);
        _this.seekOnPlay = null;
      }
      _this.onDurationCheck();
    }, _this.onPause = function (e) {
      _this.isPlaying = false;
      if (!_this.isLoading) {
        _this.props.onPause(e);
      }
    }, _this.onEnded = function () {
      var _this$props3 = _this.props,
          activePlayer = _this$props3.activePlayer,
          loop = _this$props3.loop,
          onEnded = _this$props3.onEnded;

      if (activePlayer.loopOnEnded && loop) {
        _this.seekTo(0);
      }
      if (!loop) {
        _this.isPlaying = false;
      }
      onEnded();
    }, _this.onDurationCheck = function () {
      clearTimeout(_this.durationCheckTimeout);
      var duration = _this.getDuration();
      if (duration) {
        if (!_this.onDurationCalled) {
          _this.props.onDuration(duration);
          _this.onDurationCalled = true;
        }
      } else {
        _this.durationCheckTimeout = setTimeout(_this.onDurationCheck, 100);
      }
    }, _this.ref = function (player) {
      if (player) {
        _this.player = player;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  } // Track playing state internally to prevent bugs
  // Use isLoading to prevent onPause when switching URL


  _createClass(Player, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.mounted = true;
      this.player.load(this.props.url);
      this.progress();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.progressTimeout);
      if (this.isReady) {
        this.player.stop();
      }
      this.mounted = false;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // Invoke player methods based on incoming props
      var _props = this.props,
          url = _props.url,
          playing = _props.playing,
          volume = _props.volume,
          muted = _props.muted,
          playbackRate = _props.playbackRate;

      if (url !== nextProps.url) {
        this.isLoading = true;
        this.startOnPlay = true;
        this.onDurationCalled = false;
        this.player.load(nextProps.url, this.isReady);
      }
      if (!playing && nextProps.playing && !this.isPlaying) {
        this.player.play();
      }
      if (playing && !nextProps.playing && this.isPlaying) {
        this.player.pause();
      }
      if (nextProps.volume !== null) {
        if (volume !== nextProps.volume && !nextProps.muted) {
          this.player.setVolume(nextProps.volume);
        }
        if (muted !== nextProps.muted) {
          this.player.setVolume(nextProps.muted ? 0 : nextProps.volume);
        }
      }
      if (playbackRate !== nextProps.playbackRate && this.player.setPlaybackRate) {
        this.player.setPlaybackRate(nextProps.playbackRate);
      }
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      if (!this.isReady) return null;
      return this.player.getDuration();
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      if (!this.isReady) return null;
      return this.player.getCurrentTime();
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      if (!this.isReady) return null;
      return this.player.getSecondsLoaded();
    }
  }, {
    key: 'seekTo',
    value: function seekTo(amount) {
      var _this2 = this;

      // When seeking before player is ready, store value and seek later
      if (!this.isReady && amount !== 0) {
        this.seekOnPlay = amount;
        setTimeout(function () {
          _this2.seekOnPlay = null;
        }, SEEK_ON_PLAY_EXPIRY);
        return;
      }
      if (amount > 0 && amount < 1) {
        // Convert fraction to seconds based on duration
        var duration = this.player.getDuration();
        if (!duration) {
          console.warn('ReactPlayer: could not seek using fraction – duration not yet available');
          return;
        }
        this.player.seekTo(duration * amount);
        return;
      }
      this.player.seekTo(amount);
    }
  }, {
    key: 'render',
    value: function render() {
      var Player = this.props.activePlayer;
      return _react2['default'].createElement(Player, _extends({}, this.props, {
        ref: this.ref,
        onReady: this.onReady,
        onPlay: this.onPlay,
        onPause: this.onPause,
        onEnded: this.onEnded
      }));
    }
  }]);

  return Player;
}(_react.Component);

Player.displayName = 'Player';
Player.propTypes = _props2.propTypes;
Player.defaultProps = _props2.defaultProps;
exports['default'] = Player;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(5);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DailyMotion = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(1);

var _singlePlayer = __webpack_require__(2);

var _singlePlayer2 = _interopRequireDefault(_singlePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDK_URL = 'https://api.dmcdn.net/all.js';
var SDK_GLOBAL = 'DM';
var SDK_GLOBAL_READY = 'dmAsyncInit';
var MATCH_URL = /dailymotion\.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/;

var DailyMotion = exports.DailyMotion = function (_Component) {
  _inherits(DailyMotion, _Component);

  function DailyMotion() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DailyMotion);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DailyMotion.__proto__ || Object.getPrototypeOf(DailyMotion)).call.apply(_ref, [this].concat(args))), _this), _this.callPlayer = _utils.callPlayer, _this.onDurationChange = function () {
      var duration = _this.getDuration();
      _this.props.onDuration(duration);
    }, _this.ref = function (container) {
      _this.container = container;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DailyMotion, [{
    key: 'parseId',
    value: function parseId(url) {
      var m = url.match(MATCH_URL);
      return m[4] || m[2];
    }
  }, {
    key: 'load',
    value: function load(url) {
      var _this2 = this;

      var _props = this.props,
          controls = _props.controls,
          config = _props.config,
          onError = _props.onError,
          playing = _props.playing;

      var id = this.parseId(url);
      if (this.player) {
        this.player.load(id, {
          start: (0, _utils.parseStartTime)(url),
          autoplay: playing
        });
        return;
      }
      (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY, function (DM) {
        return DM.player;
      }).then(function (DM) {
        if (!_this2.container) return;
        var Player = DM.player;
        _this2.player = new Player(_this2.container, {
          width: '100%',
          height: '100%',
          video: id,
          params: _extends({
            controls: controls,
            autoplay: _this2.props.playing,
            start: (0, _utils.parseStartTime)(url),
            origin: window.location.origin
          }, config.dailymotion.params),
          events: {
            apiready: _this2.props.onReady,
            seeked: function seeked() {
              return _this2.props.onSeek(_this2.player.currentTime);
            },
            video_end: _this2.props.onEnded,
            durationchange: _this2.onDurationChange,
            pause: _this2.props.onPause,
            playing: _this2.props.onPlay,
            waiting: _this2.props.onBuffer,
            error: function error(event) {
              return onError(event);
            }
          }
        });
      }, onError);
    }
  }, {
    key: 'play',
    value: function play() {
      this.callPlayer('play');
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.callPlayer('pause');
    }
  }, {
    key: 'stop',
    value: function stop() {
      // Nothing to do
    }
  }, {
    key: 'seekTo',
    value: function seekTo(seconds) {
      this.callPlayer('seek', seconds);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      this.callPlayer('setVolume', fraction);
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.player.duration || null;
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      return this.player.currentTime;
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      return this.player.bufferedTime;
    }
  }, {
    key: 'render',
    value: function render() {
      var style = _extends({
        width: '100%',
        height: '100%',
        backgroundColor: 'black'
      }, this.props.style);
      return _react2['default'].createElement(
        'div',
        { style: style },
        _react2['default'].createElement('div', { ref: this.ref })
      );
    }
  }]);

  return DailyMotion;
}(_react.Component);

DailyMotion.displayName = 'DailyMotion';

DailyMotion.canPlay = function (url) {
  return MATCH_URL.test(url);
};

DailyMotion.loopOnEnded = true;
exports['default'] = (0, _singlePlayer2['default'])(DailyMotion);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilePlayer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(1);

var _singlePlayer = __webpack_require__(2);

var _singlePlayer2 = _interopRequireDefault(_singlePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var AUDIO_EXTENSIONS = /\.(m4a|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i;
var VIDEO_EXTENSIONS = /\.(mp4|og[gv]|webm|mov|m4v)($|\?)/i;
var HLS_EXTENSIONS = /\.(m3u8)($|\?)/i;
var HLS_SDK_URL = 'https://cdnjs.cloudflare.com/ajax/libs/hls.js/0.8.9/hls.min.js';
var HLS_GLOBAL = 'Hls';
var DASH_EXTENSIONS = /\.(mpd)($|\?)/i;
var DASH_SDK_URL = 'https://cdnjs.cloudflare.com/ajax/libs/dashjs/2.6.5/dash.all.min.js';
var DASH_GLOBAL = 'dashjs';
var MATCH_DROPBOX_URL = /www\.dropbox\.com\/.+/;

function canPlay(url) {
  if (url instanceof Array) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = url[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var item = _step.value;

        if (typeof item === 'string' && canPlay(item)) {
          return true;
        }
        if (canPlay(item.src)) {
          return true;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return false;
  }
  return AUDIO_EXTENSIONS.test(url) || VIDEO_EXTENSIONS.test(url) || HLS_EXTENSIONS.test(url) || DASH_EXTENSIONS.test(url);
}

var FilePlayer = exports.FilePlayer = function (_Component) {
  _inherits(FilePlayer, _Component);

  function FilePlayer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FilePlayer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FilePlayer.__proto__ || Object.getPrototypeOf(FilePlayer)).call.apply(_ref, [this].concat(args))), _this), _this.onSeek = function (e) {
      _this.props.onSeek(e.target.currentTime);
    }, _this.renderSourceElement = function (source, index) {
      if (typeof source === 'string') {
        return _react2['default'].createElement('source', { key: index, src: source });
      }
      return _react2['default'].createElement('source', _extends({ key: index }, source));
    }, _this.renderTrack = function (track, index) {
      return _react2['default'].createElement('track', _extends({ key: index }, track));
    }, _this.ref = function (player) {
      _this.player = player;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FilePlayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.addListeners();
      if (IOS) {
        this.player.load();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.shouldUseAudio(this.props) !== this.shouldUseAudio(nextProps)) {
        this.removeListeners();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.shouldUseAudio(this.props) !== this.shouldUseAudio(prevProps)) {
        this.addListeners();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeListeners();
    }
  }, {
    key: 'addListeners',
    value: function addListeners() {
      var _props = this.props,
          onReady = _props.onReady,
          onPlay = _props.onPlay,
          onPause = _props.onPause,
          onEnded = _props.onEnded,
          onError = _props.onError,
          playsinline = _props.playsinline;

      this.player.addEventListener('canplay', onReady);
      this.player.addEventListener('play', onPlay);
      this.player.addEventListener('pause', onPause);
      this.player.addEventListener('seeked', this.onSeek);
      this.player.addEventListener('ended', onEnded);
      this.player.addEventListener('error', onError);
      if (playsinline) {
        this.player.setAttribute('playsinline', '');
        this.player.setAttribute('webkit-playsinline', '');
      }
    }
  }, {
    key: 'removeListeners',
    value: function removeListeners() {
      var _props2 = this.props,
          onReady = _props2.onReady,
          onPlay = _props2.onPlay,
          onPause = _props2.onPause,
          onEnded = _props2.onEnded,
          onError = _props2.onError;

      this.player.removeEventListener('canplay', onReady);
      this.player.removeEventListener('play', onPlay);
      this.player.removeEventListener('pause', onPause);
      this.player.removeEventListener('seeked', this.onSeek);
      this.player.removeEventListener('ended', onEnded);
      this.player.removeEventListener('error', onError);
    }
  }, {
    key: 'shouldUseAudio',
    value: function shouldUseAudio(props) {
      if (props.config.file.forceVideo) {
        return false;
      }
      if (props.config.file.attributes.poster) {
        return false; // Use <video> so that poster is shown
      }
      return AUDIO_EXTENSIONS.test(props.url) || props.config.file.forceAudio;
    }
  }, {
    key: 'shouldUseHLS',
    value: function shouldUseHLS(url) {
      return HLS_EXTENSIONS.test(url) && !IOS || this.props.config.file.forceHLS;
    }
  }, {
    key: 'shouldUseDASH',
    value: function shouldUseDASH(url) {
      return DASH_EXTENSIONS.test(url) || this.props.config.file.forceDASH;
    }
  }, {
    key: 'load',
    value: function load(url) {
      var _this2 = this;

      if (this.shouldUseHLS(url)) {
        (0, _utils.getSDK)(HLS_SDK_URL, HLS_GLOBAL).then(function (Hls) {
          _this2.hls = new Hls(_this2.props.config.file.hlsOptions);
          _this2.hls.on(Hls.Events.ERROR, function (e, data) {
            _this2.props.onError(e, data, _this2.hls, Hls);
          });
          _this2.hls.loadSource(url);
          _this2.hls.attachMedia(_this2.player);
        });
      }
      if (this.shouldUseDASH(url)) {
        (0, _utils.getSDK)(DASH_SDK_URL, DASH_GLOBAL).then(function (dashjs) {
          _this2.dash = dashjs.MediaPlayer().create();
          _this2.dash.initialize(_this2.player, url, _this2.props.playing);
          _this2.dash.getDebug().setLogToBrowserConsole(false);
        });
      }
    }
  }, {
    key: 'play',
    value: function play() {
      var promise = this.player.play();
      if (promise) {
        promise['catch'](this.props.onError);
      }
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.player.pause();
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.player.removeAttribute('src');
      if (this.hls) {
        this.hls.destroy();
      }
      if (this.dash) {
        this.dash.reset();
      }
    }
  }, {
    key: 'seekTo',
    value: function seekTo(seconds) {
      this.player.currentTime = seconds;
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      this.player.volume = fraction;
    }
  }, {
    key: 'setPlaybackRate',
    value: function setPlaybackRate(rate) {
      this.player.playbackRate = rate;
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.player.duration;
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      return this.player.currentTime;
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      var buffered = this.player.buffered;

      if (buffered.length === 0) {
        return 0;
      }
      var end = buffered.end(buffered.length - 1);
      var duration = this.getDuration();
      if (end > duration) {
        return duration;
      }
      return end;
    }
  }, {
    key: 'getSource',
    value: function getSource(url) {
      var useHLS = this.shouldUseHLS(url);
      var useDASH = this.shouldUseDASH(url);
      if (url instanceof Array || useHLS || useDASH) {
        return undefined;
      }
      if (MATCH_DROPBOX_URL.test(url)) {
        return url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
      }
      return url;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          url = _props3.url,
          loop = _props3.loop,
          controls = _props3.controls,
          config = _props3.config,
          width = _props3.width,
          height = _props3.height;

      var useAudio = this.shouldUseAudio(this.props);
      var Element = useAudio ? 'audio' : 'video';
      var style = {
        width: !width || width === 'auto' ? width : '100%',
        height: !height || height === 'auto' ? height : '100%'
      };
      return _react2['default'].createElement(
        Element,
        _extends({
          ref: this.ref,
          src: this.getSource(url),
          style: style,
          preload: 'auto',
          controls: controls,
          loop: loop
        }, config.file.attributes),
        url instanceof Array && url.map(this.renderSourceElement),
        config.file.tracks.map(this.renderTrack)
      );
    }
  }]);

  return FilePlayer;
}(_react.Component);

FilePlayer.displayName = 'FilePlayer';
FilePlayer.canPlay = canPlay;
exports['default'] = (0, _singlePlayer2['default'])(FilePlayer);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundCloud = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(1);

var _singlePlayer = __webpack_require__(2);

var _singlePlayer2 = _interopRequireDefault(_singlePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDK_URL = 'https://w.soundcloud.com/player/api.js';
var SDK_GLOBAL = 'SC';
var MATCH_URL = /(soundcloud\.com|snd\.sc)\/.+$/;

var SoundCloud = exports.SoundCloud = function (_Component) {
  _inherits(SoundCloud, _Component);

  function SoundCloud() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SoundCloud);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SoundCloud.__proto__ || Object.getPrototypeOf(SoundCloud)).call.apply(_ref, [this].concat(args))), _this), _this.callPlayer = _utils.callPlayer, _this.duration = null, _this.currentTime = null, _this.fractionLoaded = null, _this.ref = function (iframe) {
      _this.iframe = iframe;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SoundCloud, [{
    key: 'load',
    value: function load(url, isReady) {
      var _this2 = this;

      (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL).then(function (SC) {
        if (!_this2.iframe) return;
        var _SC$Widget$Events = SC.Widget.Events,
            PLAY = _SC$Widget$Events.PLAY,
            PLAY_PROGRESS = _SC$Widget$Events.PLAY_PROGRESS,
            PAUSE = _SC$Widget$Events.PAUSE,
            FINISH = _SC$Widget$Events.FINISH,
            ERROR = _SC$Widget$Events.ERROR;

        if (!isReady) {
          _this2.player = SC.Widget(_this2.iframe);
          _this2.player.bind(PLAY, _this2.props.onPlay);
          _this2.player.bind(PAUSE, _this2.props.onPause);
          _this2.player.bind(PLAY_PROGRESS, function (e) {
            _this2.currentTime = e.currentPosition / 1000;
            _this2.fractionLoaded = e.loadedProgress;
          });
          _this2.player.bind(FINISH, function () {
            return _this2.props.onEnded();
          });
          _this2.player.bind(ERROR, function (e) {
            return _this2.props.onError(e);
          });
        }
        _this2.player.load(url, _extends({}, _this2.props.config.soundcloud.options, {
          callback: function callback() {
            _this2.player.getDuration(function (duration) {
              _this2.duration = duration / 1000;
              _this2.props.onReady();
            });
          }
        }));
      });
    }
  }, {
    key: 'play',
    value: function play() {
      this.callPlayer('play');
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.callPlayer('pause');
    }
  }, {
    key: 'stop',
    value: function stop() {
      // Nothing to do
    }
  }, {
    key: 'seekTo',
    value: function seekTo(seconds) {
      this.callPlayer('seekTo', seconds * 1000);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      this.callPlayer('setVolume', fraction * 100);
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.duration;
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      return this.currentTime;
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      return this.fractionLoaded * this.duration;
    }
  }, {
    key: 'render',
    value: function render() {
      var style = _extends({
        width: '100%',
        height: '100%'
      }, this.props.style);
      return _react2['default'].createElement('iframe', {
        ref: this.ref,
        src: 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(this.props.url),
        style: style,
        frameBorder: 0
      });
    }
  }]);

  return SoundCloud;
}(_react.Component);

SoundCloud.displayName = 'SoundCloud';

SoundCloud.canPlay = function (url) {
  return MATCH_URL.test(url);
};

SoundCloud.loopOnEnded = true;
exports['default'] = (0, _singlePlayer2['default'])(SoundCloud);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vimeo = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(1);

var _singlePlayer = __webpack_require__(2);

var _singlePlayer2 = _interopRequireDefault(_singlePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDK_URL = 'https://player.vimeo.com/api/player.js';
var SDK_GLOBAL = 'Vimeo';
var MATCH_URL = /vimeo\.com\/.+/;
var MATCH_FILE_URL = /vimeo\.com\/external\/.+\.mp4/;

var Vimeo = exports.Vimeo = function (_Component) {
  _inherits(Vimeo, _Component);

  function Vimeo() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Vimeo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Vimeo.__proto__ || Object.getPrototypeOf(Vimeo)).call.apply(_ref, [this].concat(args))), _this), _this.callPlayer = _utils.callPlayer, _this.duration = null, _this.currentTime = null, _this.secondsLoaded = null, _this.ref = function (container) {
      _this.container = container;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Vimeo, [{
    key: 'load',
    value: function load(url) {
      var _this2 = this;

      this.duration = null;
      (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL).then(function (Vimeo) {
        if (!_this2.container) return;
        _this2.player = new Vimeo.Player(_this2.container, _extends({}, _this2.props.config.vimeo.playerOptions, {
          url: url,
          loop: _this2.props.loop
        }));
        _this2.player.ready().then(function () {
          var iframe = _this2.container.querySelector('iframe');
          iframe.style.width = '100%';
          iframe.style.height = '100%';
        })['catch'](_this2.props.onError);
        _this2.player.on('loaded', function () {
          _this2.props.onReady();
          _this2.player.getDuration().then(function (duration) {
            _this2.duration = duration;
          });
        });
        _this2.player.on('play', _this2.props.onPlay);
        _this2.player.on('pause', _this2.props.onPause);
        _this2.player.on('seeked', function (e) {
          return _this2.props.onSeek(e.seconds);
        });
        _this2.player.on('ended', _this2.props.onEnded);
        _this2.player.on('error', _this2.props.onError);
        _this2.player.on('timeupdate', function (_ref2) {
          var seconds = _ref2.seconds;

          _this2.currentTime = seconds;
        });
        _this2.player.on('progress', function (_ref3) {
          var seconds = _ref3.seconds;

          _this2.secondsLoaded = seconds;
        });
      }, this.props.onError);
    }
  }, {
    key: 'play',
    value: function play() {
      this.callPlayer('play');
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.callPlayer('pause');
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.callPlayer('unload');
    }
  }, {
    key: 'seekTo',
    value: function seekTo(seconds) {
      this.callPlayer('setCurrentTime', seconds);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      this.callPlayer('setVolume', fraction);
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.duration;
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      return this.currentTime;
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      return this.secondsLoaded;
    }
  }, {
    key: 'render',
    value: function render() {
      var style = _extends({
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: 'black'
      }, this.props.style);
      return _react2['default'].createElement('div', {
        key: this.props.url,
        ref: this.ref,
        style: style
      });
    }
  }]);

  return Vimeo;
}(_react.Component);

Vimeo.displayName = 'Vimeo';

Vimeo.canPlay = function (url) {
  if (MATCH_FILE_URL.test(url)) {
    return false;
  }
  return MATCH_URL.test(url);
};

exports['default'] = (0, _singlePlayer2['default'])(Vimeo);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YouTube = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(1);

var _singlePlayer = __webpack_require__(2);

var _singlePlayer2 = _interopRequireDefault(_singlePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDK_URL = 'https://www.youtube.com/iframe_api';
var SDK_GLOBAL = 'YT';
var SDK_GLOBAL_READY = 'onYouTubeIframeAPIReady';
var MATCH_URL = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/;

var YouTube = exports.YouTube = function (_Component) {
  _inherits(YouTube, _Component);

  function YouTube() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, YouTube);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = YouTube.__proto__ || Object.getPrototypeOf(YouTube)).call.apply(_ref, [this].concat(args))), _this), _this.callPlayer = _utils.callPlayer, _this.onStateChange = function (_ref2) {
      var data = _ref2.data;
      var _this$props = _this.props,
          onPlay = _this$props.onPlay,
          onPause = _this$props.onPause,
          onBuffer = _this$props.onBuffer,
          onEnded = _this$props.onEnded,
          onReady = _this$props.onReady;
      var _window$SDK_GLOBAL$Pl = window[SDK_GLOBAL].PlayerState,
          PLAYING = _window$SDK_GLOBAL$Pl.PLAYING,
          PAUSED = _window$SDK_GLOBAL$Pl.PAUSED,
          BUFFERING = _window$SDK_GLOBAL$Pl.BUFFERING,
          ENDED = _window$SDK_GLOBAL$Pl.ENDED,
          CUED = _window$SDK_GLOBAL$Pl.CUED;

      if (data === PLAYING) onPlay();
      if (data === PAUSED) onPause();
      if (data === BUFFERING) onBuffer();
      if (data === ENDED) onEnded();
      if (data === CUED) onReady();
    }, _this.ref = function (container) {
      _this.container = container;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(YouTube, [{
    key: 'load',
    value: function load(url, isReady) {
      var _this2 = this;

      var _props = this.props,
          playsinline = _props.playsinline,
          controls = _props.controls,
          config = _props.config,
          _onError = _props.onError;

      var id = url && url.match(MATCH_URL)[1];
      if (isReady) {
        this.player.cueVideoById({
          videoId: id,
          startSeconds: (0, _utils.parseStartTime)(url)
        });
        return;
      }
      (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY, function (YT) {
        return YT.loaded;
      }).then(function (YT) {
        if (!_this2.container) return;
        _this2.player = new YT.Player(_this2.container, {
          width: '100%',
          height: '100%',
          videoId: id,
          playerVars: _extends({
            controls: controls ? 1 : 0,
            start: (0, _utils.parseStartTime)(url),
            origin: window.location.origin,
            playsinline: playsinline
          }, config.youtube.playerVars),
          events: {
            onReady: _this2.props.onReady,
            onStateChange: _this2.onStateChange,
            onError: function onError(event) {
              return _onError(event.data);
            }
          }
        });
      }, _onError);
    }
  }, {
    key: 'play',
    value: function play() {
      this.callPlayer('playVideo');
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.callPlayer('pauseVideo');
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (!document.body.contains(this.callPlayer('getIframe'))) return;
      this.callPlayer('stopVideo');
    }
  }, {
    key: 'seekTo',
    value: function seekTo(amount) {
      this.callPlayer('seekTo', amount);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      this.callPlayer('setVolume', fraction * 100);
    }
  }, {
    key: 'setPlaybackRate',
    value: function setPlaybackRate(rate) {
      this.callPlayer('setPlaybackRate', rate);
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.callPlayer('getDuration');
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      return this.callPlayer('getCurrentTime');
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      return this.callPlayer('getVideoLoadedFraction') * this.getDuration();
    }
  }, {
    key: 'render',
    value: function render() {
      var style = _extends({
        width: '100%',
        height: '100%'
      }, this.props.style);
      return _react2['default'].createElement(
        'div',
        { style: style },
        _react2['default'].createElement('div', { ref: this.ref })
      );
    }
  }]);

  return YouTube;
}(_react.Component);

YouTube.displayName = 'YouTube';

YouTube.canPlay = function (url) {
  return MATCH_URL.test(url);
};

YouTube.loopOnEnded = true;
exports['default'] = (0, _singlePlayer2['default'])(YouTube);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _props2 = __webpack_require__(4);

var _utils = __webpack_require__(1);

var _players = __webpack_require__(29);

var _players2 = _interopRequireDefault(_players);

var _Player3 = __webpack_require__(8);

var _Player4 = _interopRequireDefault(_Player3);

var _FilePlayer = __webpack_require__(11);

var _preload = __webpack_require__(30);

var _preload2 = _interopRequireDefault(_preload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SUPPORTED_PROPS = Object.keys(_props2.propTypes);

var customPlayers = [];

var ReactPlayer = function (_Component) {
  _inherits(ReactPlayer, _Component);

  function ReactPlayer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ReactPlayer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ReactPlayer.__proto__ || Object.getPrototypeOf(ReactPlayer)).call.apply(_ref, [this].concat(args))), _this), _this.config = (0, _utils.getConfig)(_this.props, _props2.defaultProps, true), _this.getDuration = function () {
      if (!_this.player) return null;
      return _this.player.getDuration();
    }, _this.getCurrentTime = function () {
      if (!_this.player) return null;
      return _this.player.getCurrentTime();
    }, _this.getSecondsLoaded = function () {
      if (!_this.player) return null;
      return _this.player.getSecondsLoaded();
    }, _this.getInternalPlayer = function () {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'player';

      if (!_this.player) return null;
      return _this.player.getInternalPlayer(key);
    }, _this.seekTo = function (fraction) {
      if (!_this.player) return null;
      _this.player.seekTo(fraction);
    }, _this.wrapperRef = function (wrapper) {
      _this.wrapper = wrapper;
    }, _this.activePlayerRef = function (player) {
      _this.player = player;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ReactPlayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.progressFrequency) {
        var message = 'ReactPlayer: %cprogressFrequency%c is deprecated, please use %cprogressInterval%c instead';
        console.warn(message, 'font-weight: bold', '', 'font-weight: bold', '');
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !(0, _utils.isEqual)(this.props, nextProps);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      this.config = (0, _utils.getConfig)(nextProps, _props2.defaultProps);
    }
  }, {
    key: 'getActivePlayer',
    value: function getActivePlayer(url) {
      var _arr = [].concat(_toConsumableArray(customPlayers), _toConsumableArray(_players2['default']));

      for (var _i = 0; _i < _arr.length; _i++) {
        var _Player = _arr[_i];
        if (_Player.canPlay(url)) {
          return _Player;
        }
      }
      // Fall back to FilePlayer if nothing else can play the URL
      return _FilePlayer.FilePlayer;
    }
  }, {
    key: 'renderActivePlayer',
    value: function renderActivePlayer(url) {
      if (!url) return null;
      var activePlayer = this.getActivePlayer(url);
      return _react2['default'].createElement(_Player4['default'], _extends({}, this.props, {
        key: activePlayer.displayName,
        ref: this.activePlayerRef,
        config: this.config,
        activePlayer: activePlayer
      }));
    }
  }, {
    key: 'sortPlayers',
    value: function sortPlayers(a, b) {
      // Retain player order to prevent weird iframe behaviour when switching players
      if (a && b) {
        return a.key < b.key ? -1 : 1;
      }
      return 0;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          url = _props.url,
          style = _props.style,
          width = _props.width,
          height = _props.height,
          Wrapper = _props.wrapper;

      var otherProps = (0, _utils.omit)(this.props, SUPPORTED_PROPS, _props2.DEPRECATED_CONFIG_PROPS);
      var activePlayer = this.renderActivePlayer(url);
      var preloadPlayers = (0, _preload2['default'])(url, this.config);
      var players = [activePlayer].concat(_toConsumableArray(preloadPlayers)).sort(this.sortPlayers);
      return _react2['default'].createElement(
        Wrapper,
        _extends({ ref: this.wrapperRef, style: _extends({}, style, { width: width, height: height }) }, otherProps),
        players
      );
    }
  }]);

  return ReactPlayer;
}(_react.Component);

ReactPlayer.addCustomPlayer = function (player) {
  customPlayers.push(player);
};

ReactPlayer.removeCustomPlayers = function () {
  customPlayers = [];
};

ReactPlayer.displayName = 'ReactPlayer';
ReactPlayer.propTypes = _props2.propTypes;
ReactPlayer.defaultProps = _props2.defaultProps;

ReactPlayer.canPlay = function (url) {
  var _arr2 = [].concat(_toConsumableArray(customPlayers), _toConsumableArray(_players2['default']));

  for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
    var _Player2 = _arr2[_i2];
    if (_Player2.canPlay(url)) {
      return true;
    }
  }
  return false;
};

exports['default'] = ReactPlayer;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactPlayer = __webpack_require__(15);

var _reactPlayer2 = _interopRequireDefault(_reactPlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var opts = {
    cx: 30,
    cy: 30,
    radius: 30,
    start_angle: 0
};

var initProgress = {
    loaded: 0,
    loadedSeconds: 0,
    played: 0,
    playedSeconds: 0
};

var progrssWidth = 0.3;

var PlayAudio = function (_Component) {
    _inherits(PlayAudio, _Component);

    function PlayAudio(props) {
        _classCallCheck(this, PlayAudio);

        var _this = _possibleConstructorReturn(this, (PlayAudio.__proto__ || Object.getPrototypeOf(PlayAudio)).call(this, props));

        _this.state = {
            start: _this.polarToCartesian(opts.cx, opts.cy, opts.radius, 0),
            end: _this.polarToCartesian(opts.cx, opts.cy, opts.radius, opts.start_angle),
            largeArcFlag: 0,
            playing: false,
            duration: 0,
            started: false,
            progress: initProgress,
            simpleMode: _this.props.simpleMode ? _this.props.simpleMode : _this.props.width < 45 ? true : false,
            width: _this.props.width ? _this.props.width : 60
        };

        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleOnProgress = _this.handleOnProgress.bind(_this);
        _this.handleOnDuration = _this.handleOnDuration.bind(_this);
        _this.handleOnEnded = _this.handleOnEnded.bind(_this);

        _this.colorScale = _this.props.colorScale ? _this.props.colorScale : ['#980000', '#fa0000', '#ffc7c7', '#ffe1e1', '#ffffff'];
        return _this;
    }

    _createClass(PlayAudio, [{
        key: 'handleOnDuration',
        value: function handleOnDuration(data) {
            this.setState({ duration: data });
        }
    }, {
        key: 'handleOnProgress',
        value: function handleOnProgress(data) {
            var newStart = this.polarToCartesian(opts.cx, opts.cy, opts.radius, data.played * 360);
            var newLargeArcFlag = data.played * 360 - opts.start_angle <= 180 ? "0" : "1";

            this.setState(function (prevState, props) {
                if (prevState.progress.played < data.played && prevState.started == true) return { progress: data, start: newStart, largeArcFlag: newLargeArcFlag };
            });
        }
    }, {
        key: 'handleClick',
        value: function handleClick() {
            var playing = this.state.playing;
            this.setState({ playing: !playing, started: true });
        }
    }, {
        key: 'handleOnEnded',
        value: function handleOnEnded() {
            var newStart = this.polarToCartesian(opts.cx, opts.cy, opts.radius, 0);
            this.setState({ progress: initProgress, start: newStart, largeArcFlag: 0, playing: false, started: false });
        }
    }, {
        key: 'polarToCartesian',
        value: function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
            var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

            return {
                x: centerX + radius * Math.cos(angleInRadians),
                y: centerY + radius * Math.sin(angleInRadians)
            };
        }
    }, {
        key: 'getPlaySection',
        value: function getPlaySection(position, width) {
            var _this2 = this;

            return _react2.default.createElement(
                'svg',
                { x: position.x, y: position.y, width: width, viewBox: "0 0 " + opts.radius * 2 + " " + opts.radius * 2, xmlns: 'http://www.w3.org/2000/svg' },
                _react2.default.createElement(
                    'g',
                    null,
                    _react2.default.createElement('polygon', { style: { display: this.state.playing ? 'none' : true }, points: function (x, y, size) {
                            var cord1 = _this2.polarToCartesian(x, y, size, 90);
                            var cord2 = _this2.polarToCartesian(x, y, size, 210);
                            var cord3 = _this2.polarToCartesian(x, y, size, 330);

                            return [cord1.x, cord1.y, cord2.x, cord2.y, cord3.x, cord3.y].join(" ");
                        }(opts.radius, opts.radius, 18), fill: this.colorScale[0] })
                )
            );
        }
    }, {
        key: 'getPauseSection',
        value: function getPauseSection(position, width) {
            return _react2.default.createElement(
                'svg',
                { x: position.x, y: position.y, width: width, viewBox: "0 0 " + opts.radius * 2 + " " + opts.radius * 2, xmlns: 'http://www.w3.org/2000/svg' },
                _react2.default.createElement(
                    'g',
                    null,
                    this.getRectangle(19, 15, 7, 30, this.colorScale[0]),
                    this.getRectangle(34, 15, 7, 30, this.colorScale[0])
                )
            );
        }
    }, {
        key: 'getRectangle',
        value: function getRectangle(x, y, width, height, color) {
            return _react2.default.createElement('polygon', { points: [x, y, x + width, y, x + width, y + height, x, y + height].join(" "), fill: color });
        }
    }, {
        key: 'getProgressSection',
        value: function getProgressSection(position, width) {
            return _react2.default.createElement(
                'svg',
                { x: position.x, y: position.y, width: width, viewBox: "0 0 " + opts.radius * 2 + " " + opts.radius * 2, xmlns: 'http://www.w3.org/2000/svg' },
                _react2.default.createElement(
                    'g',
                    null,
                    _react2.default.createElement(
                        'text',
                        { style: { display: this.state.playing ? true : 'none' }, y: opts.radius + 4, transform: 'translate(30)' },
                        _react2.default.createElement(
                            'tspan',
                            { fill: this.colorScale[0], style: { fontSize: "12pt", fontFamily: "Verdana" }, x: '0', textAnchor: 'middle' },
                            this.formatTime(this.state.progress.playedSeconds)
                        )
                    )
                )
            );
        }
    }, {
        key: 'formatTime',
        value: function formatTime(timeInSeconds) {
            var m = Math.floor(timeInSeconds / 60);
            var s = Math.floor(timeInSeconds % 60);
            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;
            return m + ':' + s;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'svg',
                    { onClick: this.handleClick, width: this.state.width, height: this.state.width, style: { textAlign: "center", verticalAlign: "center", cursor: this.state.playing ? "progress" : "pointer" }, viewBox: "0 0 " + opts.radius * 2 + " " + opts.radius * 2,
                        xmlns: 'http://www.w3.org/2000/svg' },
                    _react2.default.createElement(
                        'g',
                        null,
                        _react2.default.createElement('circle', { r: opts.radius, id: 'svg_1', cy: opts.radius, cx: opts.radius, fill: this.colorScale[1] }),
                        _react2.default.createElement('path', { fill: this.colorScale[0], d: ["M", this.state.start.x, this.state.start.y, "A", opts.radius, opts.radius, 0, this.state.largeArcFlag, 0, this.state.end.x, this.state.end.y, "L", opts.cx, opts.cy, "Z"].join(" ") }),
                        _react2.default.createElement('circle', { r: opts.radius * (1 - progrssWidth), id: 'svg_2', cy: opts.radius, cx: opts.radius, fill: this.colorScale[4] }),
                        _react2.default.createElement('circle', { r: opts.radius * (1 - progrssWidth) - 2, id: 'svg_3', cy: opts.radius, cx: opts.radius, fill: this.colorScale[3] }),
                        _react2.default.createElement('path', { d: function (x, y, size) {
                                var startCord = _this3.polarToCartesian(x, y, size, 90);
                                var endCord = _this3.polarToCartesian(x, y, size, 270);
                                return ["M", startCord.x, startCord.y, "A", size, size, 0, _this3.state.largeArcFlag, 0, endCord.x, endCord.y, "L", x, y, "Z"].join(" ");
                            }(opts.radius, opts.radius, opts.radius * (1 - progrssWidth) - 2), fill: this.colorScale[2] }),
                        this.state.playing ? this.state.simpleMode ? this.getPauseSection({ x: opts.radius - opts.radius * (1 - progrssWidth) + 2, y: 0 }, opts.radius * (1 - progrssWidth) * 2 - 4) : this.getProgressSection({ x: opts.radius - opts.radius * (1 - progrssWidth) + 2, y: 0 }, opts.radius * (1 - progrssWidth) * 2 - 4) : this.getPlaySection({ x: opts.radius - opts.radius * (1 - progrssWidth) + 2, y: 0 }, opts.radius * (1 - progrssWidth) * 2 - 4)
                    )
                ),
                _react2.default.createElement(_reactPlayer2.default, {
                    style: { display: "none" },
                    progressInterval: 1000,
                    onProgress: this.handleOnProgress,
                    url: this.props.url,
                    playing: this.state.playing,
                    onDuration: this.handleOnDuration,
                    onEnded: this.handleOnEnded
                })
            );
        }
    }]);

    return PlayAudio;
}(_react.Component);

exports.default = PlayAudio;

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, options) {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target, source, options) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function mergeObject(target, source, options) {
	var destination = {};
	if (options.isMergeableObject(target)) {
		Object.keys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
	}
	Object.keys(source).forEach(function(key) {
		if (!options.isMergeableObject(source[key]) || !target[key]) {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		} else {
			destination[key] = deepmerge(target[key], source[key], options);
		}
	});
	return destination
}

function deepmerge(target, source, options) {
	options = options || {};
	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	options.isMergeableObject = options.isMergeableObject || isMergeableObject;

	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array, options) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, options)
	}, {})
};

var deepmerge_1 = deepmerge;

/* harmony default export */ __webpack_exports__["default"] = (deepmerge_1);


/***/ }),
/* 18 */
/***/ (function(module, exports) {


module.exports = function load (src, opts, cb) {
  var head = document.head || document.getElementsByTagName('head')[0]
  var script = document.createElement('script')

  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }

  opts = opts || {}
  cb = cb || function() {}

  script.type = opts.type || 'text/javascript'
  script.charset = opts.charset || 'utf8';
  script.async = 'async' in opts ? !!opts.async : true
  script.src = src

  if (opts.attrs) {
    setAttributes(script, opts.attrs)
  }

  if (opts.text) {
    script.text = '' + opts.text
  }

  var onend = 'onload' in script ? stdOnEnd : ieOnEnd
  onend(script, cb)

  // some good legacy browsers (firefox) fail the 'in' detection above
  // so as a fallback we always set onload
  // old IE will ignore this and new IE will set onload
  if (!script.onload) {
    stdOnEnd(script, cb);
  }

  head.appendChild(script)
}

function setAttributes(script, attrs) {
  for (var attr in attrs) {
    script.setAttribute(attr, attrs[attr]);
  }
}

function stdOnEnd (script, cb) {
  script.onload = function () {
    this.onerror = this.onload = null
    cb(null, script)
  }
  script.onerror = function () {
    // this.onload = null here is necessary
    // because even IE9 works not like others
    this.onerror = this.onload = null
    cb(new Error('Failed to load ' + this.src), script)
  }
}

function ieOnEnd (script, cb) {
  script.onreadystatechange = function () {
    if (this.readyState != 'complete' && this.readyState != 'loaded') return
    this.onreadystatechange = null
    cb(null, script) // there is no way to catch loading errors in IE8
  }
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(6);
  var warning = __webpack_require__(9);
  var ReactPropTypesSecret = __webpack_require__(7);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(5);
var invariant = __webpack_require__(6);
var ReactPropTypesSecret = __webpack_require__(7);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(5);
var invariant = __webpack_require__(6);
var warning = __webpack_require__(9);
var assign = __webpack_require__(19);

var ReactPropTypesSecret = __webpack_require__(7);
var checkPropTypes = __webpack_require__(20);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(22)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(21)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Facebook = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(1);

var _singlePlayer = __webpack_require__(2);

var _singlePlayer2 = _interopRequireDefault(_singlePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDK_URL = '//connect.facebook.net/en_US/sdk.js';
var SDK_GLOBAL = 'FB';
var SDK_GLOBAL_READY = 'fbAsyncInit';
var MATCH_URL = /facebook\.com\/([^/?].+\/)?video(s|\.php)[/?].*$/;
var PLAYER_ID_PREFIX = 'facebook-player-';

var Facebook = exports.Facebook = function (_Component) {
  _inherits(Facebook, _Component);

  function Facebook() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Facebook);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Facebook.__proto__ || Object.getPrototypeOf(Facebook)).call.apply(_ref, [this].concat(args))), _this), _this.callPlayer = _utils.callPlayer, _this.playerID = PLAYER_ID_PREFIX + (0, _utils.randomString)(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Facebook, [{
    key: 'load',
    value: function load(url, isReady) {
      var _this2 = this;

      if (isReady) {
        (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY).then(function (FB) {
          return FB.XFBML.parse();
        });
        return;
      }
      (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY).then(function (FB) {
        FB.init({
          appId: _this2.props.config.facebook.appId,
          xfbml: true,
          version: 'v2.5'
        });
        FB.Event.subscribe('xfbml.ready', function (msg) {
          if (msg.type === 'video' && msg.id === _this2.playerID) {
            _this2.player = msg.instance;
            _this2.player.subscribe('startedPlaying', _this2.props.onPlay);
            _this2.player.subscribe('paused', _this2.props.onPause);
            _this2.player.subscribe('finishedPlaying', _this2.props.onEnded);
            _this2.player.subscribe('startedBuffering', _this2.props.onBuffer);
            _this2.player.subscribe('error', _this2.props.onError);
            _this2.callPlayer('unmute');
            _this2.props.onReady();
          }
        });
      });
    }
  }, {
    key: 'play',
    value: function play() {
      this.callPlayer('play');
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.callPlayer('pause');
    }
  }, {
    key: 'stop',
    value: function stop() {
      // Nothing to do
    }
  }, {
    key: 'seekTo',
    value: function seekTo(seconds) {
      this.callPlayer('seek', seconds);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      if (fraction !== 0) {
        this.callPlayer('unmute');
      }
      this.callPlayer('setVolume', fraction);
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.callPlayer('getDuration');
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      return this.callPlayer('getCurrentPosition');
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        width: '100%',
        height: '100%',
        backgroundColor: 'black'
      };
      return _react2['default'].createElement('div', {
        style: style,
        id: this.playerID,
        className: 'fb-video',
        'data-href': this.props.url,
        'data-allowfullscreen': 'true',
        'data-controls': !this.props.controls ? 'false' : undefined
      });
    }
  }]);

  return Facebook;
}(_react.Component);

Facebook.displayName = 'Facebook';

Facebook.canPlay = function (url) {
  return MATCH_URL.test(url);
};

Facebook.loopOnEnded = true;
exports['default'] = (0, _singlePlayer2['default'])(Facebook);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mixcloud = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(1);

var _singlePlayer = __webpack_require__(2);

var _singlePlayer2 = _interopRequireDefault(_singlePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDK_URL = '//widget.mixcloud.com/media/js/widgetApi.js';
var SDK_GLOBAL = 'Mixcloud';
var MATCH_URL = /mixcloud\.com\/([^/]+\/[^/]+)/;

var Mixcloud = exports.Mixcloud = function (_Component) {
  _inherits(Mixcloud, _Component);

  function Mixcloud() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Mixcloud);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Mixcloud.__proto__ || Object.getPrototypeOf(Mixcloud)).call.apply(_ref, [this].concat(args))), _this), _this.callPlayer = _utils.callPlayer, _this.duration = null, _this.currentTime = null, _this.secondsLoaded = null, _this.ref = function (iframe) {
      _this.iframe = iframe;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Mixcloud, [{
    key: 'load',
    value: function load(url) {
      var _this2 = this;

      (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL).then(function (Mixcloud) {
        _this2.player = Mixcloud.PlayerWidget(_this2.iframe);
        _this2.player.ready.then(function () {
          _this2.player.events.play.on(_this2.props.onPlay);
          _this2.player.events.pause.on(_this2.props.onPause);
          _this2.player.events.ended.on(_this2.props.onEnded);
          _this2.player.events.error.on(_this2.props.error);
          _this2.player.events.progress.on(function (seconds, duration) {
            _this2.currentTime = seconds;
            _this2.duration = duration;
          });
          _this2.props.onReady();
        });
      }, this.props.onError);
    }
  }, {
    key: 'play',
    value: function play() {
      this.callPlayer('play');
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.callPlayer('pause');
    }
  }, {
    key: 'stop',
    value: function stop() {
      // Nothing to do
    }
  }, {
    key: 'seekTo',
    value: function seekTo(seconds) {
      this.callPlayer('seek', seconds);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      // No volume support
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.duration;
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      return this.currentTime;
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          url = _props.url,
          config = _props.config;

      var id = url.match(MATCH_URL)[1];
      var style = {
        width: '100%',
        height: '100%'
      };
      var query = (0, _utils.queryString)(_extends({}, config.mixcloud.options, {
        feed: '/' + id + '/'
      }));
      // We have to give the iframe a key here to prevent a
      // weird dialog appearing when loading a new track
      return _react2['default'].createElement('iframe', {
        key: id,
        ref: this.ref,
        style: style,
        src: 'https://www.mixcloud.com/widget/iframe/?' + query,
        frameBorder: '0'
      });
    }
  }]);

  return Mixcloud;
}(_react.Component);

Mixcloud.displayName = 'Mixcloud';

Mixcloud.canPlay = function (url) {
  return MATCH_URL.test(url);
};

exports['default'] = (0, _singlePlayer2['default'])(Mixcloud);

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Streamable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(1);

var _singlePlayer = __webpack_require__(2);

var _singlePlayer2 = _interopRequireDefault(_singlePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDK_URL = '//cdn.embed.ly/player-0.1.0.min.js';
var SDK_GLOBAL = 'playerjs';
var MATCH_URL = /streamable\.com\/([a-z0-9]+)$/;

var Streamable = exports.Streamable = function (_Component) {
  _inherits(Streamable, _Component);

  function Streamable() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Streamable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Streamable.__proto__ || Object.getPrototypeOf(Streamable)).call.apply(_ref, [this].concat(args))), _this), _this.callPlayer = _utils.callPlayer, _this.duration = null, _this.currentTime = null, _this.secondsLoaded = null, _this.ref = function (iframe) {
      _this.iframe = iframe;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Streamable, [{
    key: 'load',
    value: function load(url) {
      var _this2 = this;

      (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL).then(function (playerjs) {
        if (!_this2.iframe) return;
        _this2.player = new playerjs.Player(_this2.iframe);
        _this2.player.setLoop(_this2.props.loop);
        _this2.player.on('ready', _this2.props.onReady);
        _this2.player.on('play', _this2.props.onPlay);
        _this2.player.on('pause', _this2.props.onPause);
        _this2.player.on('seeked', _this2.props.onSeek);
        _this2.player.on('ended', _this2.props.onEnded);
        _this2.player.on('error', _this2.props.onError);
        _this2.player.on('timeupdate', function (_ref2) {
          var duration = _ref2.duration,
              seconds = _ref2.seconds;

          _this2.duration = duration;
          _this2.currentTime = seconds;
        });
        _this2.player.on('buffered', function (_ref3) {
          var percent = _ref3.percent;

          if (_this2.duration) {
            _this2.secondsLoaded = _this2.duration * percent;
          }
        });
      }, this.props.onError);
    }
  }, {
    key: 'play',
    value: function play() {
      this.callPlayer('play');
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.callPlayer('pause');
    }
  }, {
    key: 'stop',
    value: function stop() {
      // Nothing to do
    }
  }, {
    key: 'seekTo',
    value: function seekTo(seconds) {
      this.callPlayer('setCurrentTime', seconds);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      this.callPlayer('setVolume', fraction * 100);
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.duration;
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      return this.currentTime;
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      return this.secondsLoaded;
    }
  }, {
    key: 'render',
    value: function render() {
      var id = this.props.url.match(MATCH_URL)[1];
      var style = {
        width: '100%',
        height: '100%'
      };
      return _react2['default'].createElement('iframe', {
        ref: this.ref,
        src: 'https://streamable.com/o/' + id,
        frameBorder: '0',
        scrolling: 'no',
        style: style,
        allowFullScreen: true
      });
    }
  }]);

  return Streamable;
}(_react.Component);

Streamable.displayName = 'Streamable';

Streamable.canPlay = function (url) {
  return MATCH_URL.test(url);
};

exports['default'] = (0, _singlePlayer2['default'])(Streamable);

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Twitch = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(1);

var _singlePlayer = __webpack_require__(2);

var _singlePlayer2 = _interopRequireDefault(_singlePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDK_URL = 'https://player.twitch.tv/js/embed/v1.js';
var SDK_GLOBAL = 'Twitch';
var MATCH_VIDEO_URL = /(?:www\.|go\.)?twitch\.tv\/videos\/(\d+)($|\?)/;
var MATCH_CHANNEL_URL = /(?:www\.|go\.)?twitch\.tv\/([a-z0-9_]+)($|\?)/;
var PLAYER_ID_PREFIX = 'twitch-player-';

var Twitch = exports.Twitch = function (_Component) {
  _inherits(Twitch, _Component);

  function Twitch() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Twitch);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Twitch.__proto__ || Object.getPrototypeOf(Twitch)).call.apply(_ref, [this].concat(args))), _this), _this.callPlayer = _utils.callPlayer, _this.playerID = PLAYER_ID_PREFIX + (0, _utils.randomString)(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Twitch, [{
    key: 'load',
    value: function load(url, isReady) {
      var _this2 = this;

      var _props = this.props,
          playsinline = _props.playsinline,
          onError = _props.onError,
          config = _props.config;

      var isChannel = MATCH_CHANNEL_URL.test(url);
      var id = isChannel ? url.match(MATCH_CHANNEL_URL)[1] : url.match(MATCH_VIDEO_URL)[1];
      if (isReady) {
        if (isChannel) {
          this.player.setChannel(id);
        } else {
          this.player.setVideo('v' + id);
        }
        return;
      }
      (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL).then(function (Twitch) {
        _this2.player = new Twitch.Player(_this2.playerID, _extends({
          video: isChannel ? '' : id,
          channel: isChannel ? id : '',
          height: '100%',
          width: '100%',
          playsinline: playsinline,
          autoplay: _this2.props.playing
        }, config.twitch.options));
        var _Twitch$Player = Twitch.Player,
            READY = _Twitch$Player.READY,
            PLAY = _Twitch$Player.PLAY,
            PAUSE = _Twitch$Player.PAUSE,
            ENDED = _Twitch$Player.ENDED;

        _this2.player.addEventListener(READY, _this2.props.onReady);
        _this2.player.addEventListener(PLAY, _this2.props.onPlay);
        _this2.player.addEventListener(PAUSE, _this2.props.onPause);
        _this2.player.addEventListener(ENDED, _this2.props.onEnded);
      }, onError);
    }
  }, {
    key: 'play',
    value: function play() {
      this.callPlayer('play');
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.callPlayer('pause');
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.callPlayer('pause');
    }
  }, {
    key: 'seekTo',
    value: function seekTo(seconds) {
      this.callPlayer('seek', seconds);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      this.callPlayer('setVolume', fraction);
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.callPlayer('getDuration');
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      return this.callPlayer('getCurrentTime');
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        width: '100%',
        height: '100%'
      };
      return _react2['default'].createElement('div', { style: style, id: this.playerID });
    }
  }]);

  return Twitch;
}(_react.Component);

Twitch.displayName = 'Twitch';

Twitch.canPlay = function (url) {
  return MATCH_VIDEO_URL.test(url) || MATCH_CHANNEL_URL.test(url);
};

Twitch.loopOnEnded = true;
exports['default'] = (0, _singlePlayer2['default'])(Twitch);

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wistia = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(1);

var _singlePlayer = __webpack_require__(2);

var _singlePlayer2 = _interopRequireDefault(_singlePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDK_URL = '//fast.wistia.com/assets/external/E-v1.js';
var SDK_GLOBAL = 'Wistia';
var MATCH_URL = /(?:wistia\.com|wi\.st)\/(?:medias|embed)\/(.*)$/;

var Wistia = exports.Wistia = function (_Component) {
  _inherits(Wistia, _Component);

  function Wistia() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Wistia);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Wistia.__proto__ || Object.getPrototypeOf(Wistia)).call.apply(_ref, [this].concat(args))), _this), _this.callPlayer = _utils.callPlayer, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Wistia, [{
    key: 'getID',
    value: function getID(url) {
      return url && url.match(MATCH_URL)[1];
    }
  }, {
    key: 'load',
    value: function load(url) {
      var _this2 = this;

      var _props = this.props,
          controls = _props.controls,
          _onReady = _props.onReady,
          onPlay = _props.onPlay,
          onPause = _props.onPause,
          onSeek = _props.onSeek,
          onEnded = _props.onEnded,
          config = _props.config;

      (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL).then(function () {
        window._wq = window._wq || [];
        window._wq.push({
          id: _this2.getID(url),
          options: _extends({
            controlsVisibleOnLoad: controls
          }, config.wistia.options),
          onReady: function onReady(player) {
            _this2.player = player;
            _this2.player.bind('play', onPlay);
            _this2.player.bind('pause', onPause);
            _this2.player.bind('seek', onSeek);
            _this2.player.bind('end', onEnded);
            _onReady();
          }
        });
      });
    }
  }, {
    key: 'play',
    value: function play() {
      this.callPlayer('play');
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.callPlayer('pause');
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.callPlayer('remove');
    }
  }, {
    key: 'seekTo',
    value: function seekTo(seconds) {
      this.callPlayer('time', seconds);
    }
  }, {
    key: 'setVolume',
    value: function setVolume(fraction) {
      this.callPlayer('volume', fraction);
    }
  }, {
    key: 'setPlaybackRate',
    value: function setPlaybackRate(rate) {
      this.callPlayer('playbackRate', rate);
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.callPlayer('duration');
    }
  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      return this.callPlayer('time');
    }
  }, {
    key: 'getSecondsLoaded',
    value: function getSecondsLoaded() {
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var id = this.getID(this.props.url);
      var className = 'wistia_embed wistia_async_' + id;
      var style = {
        width: '100%',
        height: '100%'
      };
      return _react2['default'].createElement('div', { key: id, className: className, style: style });
    }
  }]);

  return Wistia;
}(_react.Component);

Wistia.displayName = 'Wistia';

Wistia.canPlay = function (url) {
  return MATCH_URL.test(url);
};

Wistia.loopOnEnded = true;
exports['default'] = (0, _singlePlayer2['default'])(Wistia);

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _YouTube = __webpack_require__(14);

var _SoundCloud = __webpack_require__(12);

var _Vimeo = __webpack_require__(13);

var _Facebook = __webpack_require__(24);

var _Streamable = __webpack_require__(26);

var _Wistia = __webpack_require__(28);

var _Twitch = __webpack_require__(27);

var _DailyMotion = __webpack_require__(10);

var _Mixcloud = __webpack_require__(25);

var _FilePlayer = __webpack_require__(11);

exports['default'] = [_YouTube.YouTube, _SoundCloud.SoundCloud, _Vimeo.Vimeo, _Facebook.Facebook, _Streamable.Streamable, _Wistia.Wistia, _Twitch.Twitch, _DailyMotion.DailyMotion, _Mixcloud.Mixcloud, _FilePlayer.FilePlayer];

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = renderPreloadPlayers;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Player = __webpack_require__(8);

var _Player2 = _interopRequireDefault(_Player);

var _YouTube = __webpack_require__(14);

var _SoundCloud = __webpack_require__(12);

var _Vimeo = __webpack_require__(13);

var _DailyMotion = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var PRELOAD_PLAYERS = [{
  Player: _YouTube.YouTube,
  configKey: 'youtube',
  url: 'https://www.youtube.com/watch?v=GlCmAC4MHek'
}, {
  Player: _SoundCloud.SoundCloud,
  configKey: 'soundcloud',
  url: 'https://soundcloud.com/seucheu/john-cage-433-8-bit-version'
}, {
  Player: _Vimeo.Vimeo,
  configKey: 'vimeo',
  url: 'https://vimeo.com/127250231'
}, {
  Player: _DailyMotion.DailyMotion,
  configKey: 'dailymotion',
  url: 'http://www.dailymotion.com/video/xqdpyk'
}];

function renderPreloadPlayers(url, config) {
  var players = [];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = PRELOAD_PLAYERS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var player = _step.value;

      if (!player.Player.canPlay(url) && config[player.configKey].preload) {
        players.push(_react2['default'].createElement(_Player2['default'], {
          key: player.Player.displayName,
          activePlayer: player.Player,
          url: player.url,
          playing: true,
          style: { display: 'none' }
        }));
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return players;
}

/***/ })
/******/ ]);