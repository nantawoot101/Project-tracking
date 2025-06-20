'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* The FetchInterceptor class
*/
var FetchInterceptor = function () {
  /**
  * Recognize global environment and attach fetch
  */
  function FetchInterceptor() {
    _classCallCheck(this, FetchInterceptor);

    var ENVIRONMENT_IS_REACT_NATIVE = (typeof navigator === 'undefined' ? 'undefined' : _typeof(navigator)) === 'object' && navigator.product === 'ReactNative';
    var ENVIRONMENT_IS_NODE = (typeof process === 'undefined' ? 'undefined' : _typeof(process)) === 'object' && typeof require === 'function';
    var ENVIRONMENT_IS_WEB = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object';
    var ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';

    if (ENVIRONMENT_IS_REACT_NATIVE) {
      this.env = global;
    } else if (ENVIRONMENT_IS_WORKER) {
      this.env = self;
    } else if (ENVIRONMENT_IS_WEB) {
      this.env = window;
    } else if (ENVIRONMENT_IS_NODE) {
      this.env = global;
    } else {
      throw new Error('Unsupported environment for fetch-intercept');
    }

    this.fetch = this.env.fetch;
  }

  /**
  * Whitelist hooks
  */


  _createClass(FetchInterceptor, [{
    key: 'unregister',


    /**
    * Reset fetch and unregister intercept hooks
    */
    value: function unregister() {
      this.env.fetch = this.fetch;
      delete this.constructor._instance;
    }

    /**
    * Hijack global fetch and insert registered hooks if present
    */

  }, {
    key: 'hijack',
    value: function hijack() {
      var _this = this;

      var controller = new AbortController();
      var signal = controller.signal;
      this.env.fetch = function () {
        for (var _len = arguments.length, a = Array(_len), _key = 0; _key < _len; _key++) {
          a[_key] = arguments[_key];
        }

        var request = void 0;
        if (a[0] instanceof Request) {
          var object = {};
          ['cache', 'context', 'credentials', 'destination', 'headers', 'integrity', 'method', 'mode', 'redirect', 'referrer', 'referrerPolicy', 'url', 'body', 'bodyUsed'].forEach(function (prop) {
            if (prop in a[0]) {
              object[prop] = a[0][prop];
            }
          });
          object.signal = signal;

          var url = object.url,
              options = _objectWithoutProperties(object, ['url']);

          request = new Request(url, options);
        } else {
          var _url = a[0];
          var _options = _extends({}, a[1], {
            signal: signal
          });
          request = new Request(_url, _options);
        }
        if (typeof _this.onBeforeRequest === 'function') {
          _this.onBeforeRequest(request, controller);
        }
        var promise = _this.fetch.call(_this.env, request);
        if (typeof _this.onAfterRequest === 'function') {
          _this.onAfterRequest(request, controller);
        }
        return promise.then(function (response) {
          if (response.ok) {
            if (typeof _this.onRequestSuccess === 'function') {
              _this.onRequestSuccess(response, request, controller);
            }
          } else {
            if (typeof _this.onRequestFailure === 'function') {
              _this.onRequestFailure(response, request, controller);
            }
          }
          return response;
        });
      };
    }
  }], [{
    key: 'register',


    /**
    * Register intercept hooks & return an interceptor instance
    * @param {object} hooks - The intercept hooks
    * @return {FetchInterceptor} An interceptor object
    */
    value: function register() {
      var hooks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (this._instance) {
        return this._instance;
      }
      var interceptor = new this();
      for (var i = 0; i < this.hooks.length; i++) {
        var hook = this.hooks[i];
        if (typeof hooks[hook] === 'function') {
          interceptor[hook] = hooks[hook];
        }
      }
      interceptor.hijack();
      this._instance = interceptor;
      return interceptor;
    }
  }]);

  return FetchInterceptor;
}();

FetchInterceptor.hooks = ['onBeforeRequest', 'onRequestSuccess', 'onRequestFailure'];


module.exports = FetchInterceptor;