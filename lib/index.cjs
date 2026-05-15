"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/ieee754/index.js
var require_ieee754 = __commonJS({
  "node_modules/ieee754/index.js"(exports2) {
    exports2.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports2.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
      }
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
      }
      buffer[offset + i - d] |= s * 128;
    };
  }
});

// node_modules/@tokenizer/inflate/node_modules/debug/node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/@tokenizer/inflate/node_modules/debug/node_modules/ms/index.js"(exports2, module2) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/@tokenizer/inflate/node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/@tokenizer/inflate/node_modules/debug/src/common.js"(exports2, module2) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug2(...args) {
          if (!debug2.enabled) {
            return;
          }
          const self = debug2;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug2.namespace = namespace;
        debug2.useColors = createDebug.useColors();
        debug2.color = createDebug.selectColor(namespace);
        debug2.extend = extend;
        debug2.destroy = createDebug.destroy;
        Object.defineProperty(debug2, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug2);
        }
        return debug2;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
        for (const ns of split) {
          if (ns[0] === "-") {
            createDebug.skips.push(ns.slice(1));
          } else {
            createDebug.names.push(ns);
          }
        }
      }
      function matchesTemplate(search, template) {
        let searchIndex = 0;
        let templateIndex = 0;
        let starIndex = -1;
        let matchIndex = 0;
        while (searchIndex < search.length) {
          if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
            if (template[templateIndex] === "*") {
              starIndex = templateIndex;
              matchIndex = searchIndex;
              templateIndex++;
            } else {
              searchIndex++;
              templateIndex++;
            }
          } else if (starIndex !== -1) {
            templateIndex = starIndex + 1;
            matchIndex++;
            searchIndex = matchIndex;
          } else {
            return false;
          }
        }
        while (templateIndex < template.length && template[templateIndex] === "*") {
          templateIndex++;
        }
        return templateIndex === template.length;
      }
      function disable() {
        const namespaces = [
          ...createDebug.names,
          ...createDebug.skips.map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        for (const skip of createDebug.skips) {
          if (matchesTemplate(name, skip)) {
            return false;
          }
        }
        for (const ns of createDebug.names) {
          if (matchesTemplate(name, ns)) {
            return true;
          }
        }
        return false;
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// node_modules/@tokenizer/inflate/node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/@tokenizer/inflate/node_modules/debug/src/browser.js"(exports2, module2) {
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.storage = localstorage();
    exports2.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports2.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports2.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports2.storage.setItem("debug", namespaces);
        } else {
          exports2.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports2.storage.getItem("debug") || exports2.storage.getItem("DEBUG");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = require_common()(exports2);
    var { formatters } = module2.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/has-flag/index.js"(exports2, module2) {
    "use strict";
    module2.exports = (flag, argv) => {
      argv = argv || process.argv;
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const pos = argv.indexOf(prefix + flag);
      const terminatorPos = argv.indexOf("--");
      return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
    };
  }
});

// node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/supports-color/index.js"(exports2, module2) {
    "use strict";
    var os = require("os");
    var hasFlag = require_has_flag();
    var env = process.env;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false")) {
      forceColor = false;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = true;
    }
    if ("FORCE_COLOR" in env) {
      forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(stream) {
      if (forceColor === false) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (stream && !stream.isTTY && forceColor !== true) {
        return 0;
      }
      const min = forceColor ? 1 : 0;
      if (process.platform === "win32") {
        const osRelease = os.release().split(".");
        if (Number(process.versions.node.split(".")[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      if (env.TERM === "dumb") {
        return min;
      }
      return min;
    }
    function getSupportLevel(stream) {
      const level = supportsColor(stream);
      return translateLevel(level);
    }
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: getSupportLevel(process.stdout),
      stderr: getSupportLevel(process.stderr)
    };
  }
});

// node_modules/@tokenizer/inflate/node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/@tokenizer/inflate/node_modules/debug/src/node.js"(exports2, module2) {
    var tty = require("tty");
    var util = require("util");
    exports2.init = init;
    exports2.log = log;
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.destroy = util.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports2.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports2.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports2.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports2.inspectOpts ? Boolean(exports2.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports2.inspectOpts.hideDate) {
        return "";
      }
      return (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.formatWithOptions(exports2.inspectOpts, ...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug2) {
      debug2.inspectOpts = {};
      const keys = Object.keys(exports2.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug2.inspectOpts[keys[i]] = exports2.inspectOpts[keys[i]];
      }
    }
    module2.exports = require_common()(exports2);
    var { formatters } = module2.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/@tokenizer/inflate/node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/@tokenizer/inflate/node_modules/debug/src/index.js"(exports2, module2) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});

// lib/index.js
var lib_exports3 = {};
__export(lib_exports3, {
  S3: () => S3,
  default: () => lib_default,
  sanitizeETag: () => sanitizeETag
});
module.exports = __toCommonJS(lib_exports3);

// node_modules/strtok3/lib/stream/Errors.js
var defaultMessages = "End-Of-Stream";
var EndOfStreamError = class extends Error {
  constructor() {
    super(defaultMessages);
    this.name = "EndOfStreamError";
  }
};
var AbortError = class extends Error {
  constructor(message = "The operation was aborted") {
    super(message);
    this.name = "AbortError";
  }
};

// node_modules/strtok3/lib/stream/AbstractStreamReader.js
var AbstractStreamReader = class {
  constructor() {
    this.endOfStream = false;
    this.interrupted = false;
    this.peekQueue = [];
  }
  async peek(uint8Array, mayBeLess = false) {
    const bytesRead = await this.read(uint8Array, mayBeLess);
    this.peekQueue.push(uint8Array.subarray(0, bytesRead));
    return bytesRead;
  }
  async read(buffer, mayBeLess = false) {
    if (buffer.length === 0) {
      return 0;
    }
    let bytesRead = this.readFromPeekBuffer(buffer);
    if (!this.endOfStream) {
      bytesRead += await this.readRemainderFromStream(buffer.subarray(bytesRead), mayBeLess);
    }
    if (bytesRead === 0 && !mayBeLess) {
      throw new EndOfStreamError();
    }
    return bytesRead;
  }
  /**
   * Read chunk from stream
   * @param buffer - Target Uint8Array (or Buffer) to store data read from stream in
   * @returns Number of bytes read
   */
  readFromPeekBuffer(buffer) {
    let remaining = buffer.length;
    let bytesRead = 0;
    while (this.peekQueue.length > 0 && remaining > 0) {
      const peekData = this.peekQueue.pop();
      if (!peekData)
        throw new Error("peekData should be defined");
      const lenCopy = Math.min(peekData.length, remaining);
      buffer.set(peekData.subarray(0, lenCopy), bytesRead);
      bytesRead += lenCopy;
      remaining -= lenCopy;
      if (lenCopy < peekData.length) {
        this.peekQueue.push(peekData.subarray(lenCopy));
      }
    }
    return bytesRead;
  }
  async readRemainderFromStream(buffer, mayBeLess) {
    let bytesRead = 0;
    while (bytesRead < buffer.length && !this.endOfStream) {
      if (this.interrupted) {
        throw new AbortError();
      }
      const chunkLen = await this.readFromStream(buffer.subarray(bytesRead), mayBeLess);
      if (chunkLen === 0)
        break;
      bytesRead += chunkLen;
    }
    if (!mayBeLess && bytesRead < buffer.length) {
      throw new EndOfStreamError();
    }
    return bytesRead;
  }
};

// node_modules/strtok3/lib/stream/WebStreamReader.js
var WebStreamReader = class extends AbstractStreamReader {
  constructor(reader) {
    super();
    this.reader = reader;
  }
  async abort() {
    return this.close();
  }
  async close() {
    this.reader.releaseLock();
  }
};

// node_modules/strtok3/lib/stream/WebStreamByobReader.js
var WebStreamByobReader = class extends WebStreamReader {
  /**
   * Read from stream
   * @param buffer - Target Uint8Array (or Buffer) to store data read from stream in
   * @param mayBeLess - If true, may fill the buffer partially
   * @protected Bytes read
   */
  async readFromStream(buffer, mayBeLess) {
    if (buffer.length === 0)
      return 0;
    const result = await this.reader.read(new Uint8Array(buffer.length), { min: mayBeLess ? void 0 : buffer.length });
    if (result.done) {
      this.endOfStream = result.done;
    }
    if (result.value) {
      buffer.set(result.value);
      return result.value.length;
    }
    return 0;
  }
};

// node_modules/strtok3/lib/stream/WebStreamDefaultReader.js
var WebStreamDefaultReader = class extends AbstractStreamReader {
  constructor(reader) {
    super();
    this.reader = reader;
    this.buffer = null;
  }
  /**
   * Copy chunk to target, and store the remainder in this.buffer
   */
  writeChunk(target, chunk) {
    const written = Math.min(chunk.length, target.length);
    target.set(chunk.subarray(0, written));
    if (written < chunk.length) {
      this.buffer = chunk.subarray(written);
    } else {
      this.buffer = null;
    }
    return written;
  }
  /**
   * Read from stream
   * @param buffer - Target Uint8Array (or Buffer) to store data read from stream in
   * @param mayBeLess - If true, may fill the buffer partially
   * @protected Bytes read
   */
  async readFromStream(buffer, mayBeLess) {
    if (buffer.length === 0)
      return 0;
    let totalBytesRead = 0;
    if (this.buffer) {
      totalBytesRead += this.writeChunk(buffer, this.buffer);
    }
    while (totalBytesRead < buffer.length && !this.endOfStream) {
      const result = await this.reader.read();
      if (result.done) {
        this.endOfStream = true;
        break;
      }
      if (result.value) {
        totalBytesRead += this.writeChunk(buffer.subarray(totalBytesRead), result.value);
      }
    }
    if (!mayBeLess && totalBytesRead === 0 && this.endOfStream) {
      throw new EndOfStreamError();
    }
    return totalBytesRead;
  }
  abort() {
    this.interrupted = true;
    return this.reader.cancel();
  }
  async close() {
    await this.abort();
    this.reader.releaseLock();
  }
};

// node_modules/strtok3/lib/stream/WebStreamReaderFactory.js
function makeWebStreamReader(stream) {
  try {
    const reader = stream.getReader({ mode: "byob" });
    if (reader instanceof ReadableStreamDefaultReader) {
      return new WebStreamDefaultReader(reader);
    }
    return new WebStreamByobReader(reader);
  } catch (error) {
    if (error instanceof TypeError) {
      return new WebStreamDefaultReader(stream.getReader());
    }
    throw error;
  }
}

// node_modules/strtok3/lib/AbstractTokenizer.js
var AbstractTokenizer = class {
  /**
   * Constructor
   * @param options Tokenizer options
   * @protected
   */
  constructor(options) {
    this.numBuffer = new Uint8Array(8);
    this.position = 0;
    this.onClose = options?.onClose;
    if (options?.abortSignal) {
      options.abortSignal.addEventListener("abort", () => {
        this.abort();
      });
    }
  }
  /**
   * Read a token from the tokenizer-stream
   * @param token - The token to read
   * @param position - If provided, the desired position in the tokenizer-stream
   * @returns Promise with token data
   */
  async readToken(token, position = this.position) {
    const uint8Array = new Uint8Array(token.len);
    const len = await this.readBuffer(uint8Array, { position });
    if (len < token.len)
      throw new EndOfStreamError();
    return token.get(uint8Array, 0);
  }
  /**
   * Peek a token from the tokenizer-stream.
   * @param token - Token to peek from the tokenizer-stream.
   * @param position - Offset where to begin reading within the file. If position is null, data will be read from the current file position.
   * @returns Promise with token data
   */
  async peekToken(token, position = this.position) {
    const uint8Array = new Uint8Array(token.len);
    const len = await this.peekBuffer(uint8Array, { position });
    if (len < token.len)
      throw new EndOfStreamError();
    return token.get(uint8Array, 0);
  }
  /**
   * Read a numeric token from the stream
   * @param token - Numeric token
   * @returns Promise with number
   */
  async readNumber(token) {
    const len = await this.readBuffer(this.numBuffer, { length: token.len });
    if (len < token.len)
      throw new EndOfStreamError();
    return token.get(this.numBuffer, 0);
  }
  /**
   * Read a numeric token from the stream
   * @param token - Numeric token
   * @returns Promise with number
   */
  async peekNumber(token) {
    const len = await this.peekBuffer(this.numBuffer, { length: token.len });
    if (len < token.len)
      throw new EndOfStreamError();
    return token.get(this.numBuffer, 0);
  }
  /**
   * Ignore number of bytes, advances the pointer in under tokenizer-stream.
   * @param length - Number of bytes to ignore
   * @return resolves the number of bytes ignored, equals length if this available, otherwise the number of bytes available
   */
  async ignore(length) {
    if (this.fileInfo.size !== void 0) {
      const bytesLeft = this.fileInfo.size - this.position;
      if (length > bytesLeft) {
        this.position += bytesLeft;
        return bytesLeft;
      }
    }
    this.position += length;
    return length;
  }
  async close() {
    await this.abort();
    await this.onClose?.();
  }
  normalizeOptions(uint8Array, options) {
    if (!this.supportsRandomAccess() && options && options.position !== void 0 && options.position < this.position) {
      throw new Error("`options.position` must be equal or greater than `tokenizer.position`");
    }
    return {
      ...{
        mayBeLess: false,
        offset: 0,
        length: uint8Array.length,
        position: this.position
      },
      ...options
    };
  }
  abort() {
    return Promise.resolve();
  }
};

// node_modules/strtok3/lib/ReadStreamTokenizer.js
var maxBufferSize = 256e3;
var ReadStreamTokenizer = class extends AbstractTokenizer {
  /**
   * Constructor
   * @param streamReader stream-reader to read from
   * @param options Tokenizer options
   */
  constructor(streamReader, options) {
    super(options);
    this.streamReader = streamReader;
    this.fileInfo = options?.fileInfo ?? {};
  }
  /**
   * Read buffer from tokenizer
   * @param uint8Array - Target Uint8Array to fill with data read from the tokenizer-stream
   * @param options - Read behaviour options
   * @returns Promise with number of bytes read
   */
  async readBuffer(uint8Array, options) {
    const normOptions = this.normalizeOptions(uint8Array, options);
    const skipBytes = normOptions.position - this.position;
    if (skipBytes > 0) {
      await this.ignore(skipBytes);
      return this.readBuffer(uint8Array, options);
    }
    if (skipBytes < 0) {
      throw new Error("`options.position` must be equal or greater than `tokenizer.position`");
    }
    if (normOptions.length === 0) {
      return 0;
    }
    const bytesRead = await this.streamReader.read(uint8Array.subarray(0, normOptions.length), normOptions.mayBeLess);
    this.position += bytesRead;
    if ((!options || !options.mayBeLess) && bytesRead < normOptions.length) {
      throw new EndOfStreamError();
    }
    return bytesRead;
  }
  /**
   * Peek (read ahead) buffer from tokenizer
   * @param uint8Array - Uint8Array (or Buffer) to write data to
   * @param options - Read behaviour options
   * @returns Promise with number of bytes peeked
   */
  async peekBuffer(uint8Array, options) {
    const normOptions = this.normalizeOptions(uint8Array, options);
    let bytesRead = 0;
    if (normOptions.position) {
      const skipBytes = normOptions.position - this.position;
      if (skipBytes > 0) {
        const skipBuffer = new Uint8Array(normOptions.length + skipBytes);
        bytesRead = await this.peekBuffer(skipBuffer, { mayBeLess: normOptions.mayBeLess });
        uint8Array.set(skipBuffer.subarray(skipBytes));
        return bytesRead - skipBytes;
      }
      if (skipBytes < 0) {
        throw new Error("Cannot peek from a negative offset in a stream");
      }
    }
    if (normOptions.length > 0) {
      try {
        bytesRead = await this.streamReader.peek(uint8Array.subarray(0, normOptions.length), normOptions.mayBeLess);
      } catch (err2) {
        if (options?.mayBeLess && err2 instanceof EndOfStreamError) {
          return 0;
        }
        throw err2;
      }
      if (!normOptions.mayBeLess && bytesRead < normOptions.length) {
        throw new EndOfStreamError();
      }
    }
    return bytesRead;
  }
  async ignore(length) {
    const bufSize = Math.min(maxBufferSize, length);
    const buf = new Uint8Array(bufSize);
    let totBytesRead = 0;
    while (totBytesRead < length) {
      const remaining = length - totBytesRead;
      const bytesRead = await this.readBuffer(buf, { length: Math.min(bufSize, remaining) });
      if (bytesRead < 0) {
        return bytesRead;
      }
      totBytesRead += bytesRead;
    }
    return totBytesRead;
  }
  abort() {
    return this.streamReader.abort();
  }
  async close() {
    return this.streamReader.close();
  }
  supportsRandomAccess() {
    return false;
  }
};

// node_modules/strtok3/lib/BufferTokenizer.js
var BufferTokenizer = class extends AbstractTokenizer {
  /**
   * Construct BufferTokenizer
   * @param uint8Array - Uint8Array to tokenize
   * @param options Tokenizer options
   */
  constructor(uint8Array, options) {
    super(options);
    this.uint8Array = uint8Array;
    this.fileInfo = { ...options?.fileInfo ?? {}, ...{ size: uint8Array.length } };
  }
  /**
   * Read buffer from tokenizer
   * @param uint8Array - Uint8Array to tokenize
   * @param options - Read behaviour options
   * @returns {Promise<number>}
   */
  async readBuffer(uint8Array, options) {
    if (options?.position) {
      this.position = options.position;
    }
    const bytesRead = await this.peekBuffer(uint8Array, options);
    this.position += bytesRead;
    return bytesRead;
  }
  /**
   * Peek (read ahead) buffer from tokenizer
   * @param uint8Array
   * @param options - Read behaviour options
   * @returns {Promise<number>}
   */
  async peekBuffer(uint8Array, options) {
    const normOptions = this.normalizeOptions(uint8Array, options);
    const bytes2read = Math.min(this.uint8Array.length - normOptions.position, normOptions.length);
    if (!normOptions.mayBeLess && bytes2read < normOptions.length) {
      throw new EndOfStreamError();
    }
    uint8Array.set(this.uint8Array.subarray(normOptions.position, normOptions.position + bytes2read));
    return bytes2read;
  }
  close() {
    return super.close();
  }
  supportsRandomAccess() {
    return true;
  }
  setPosition(position) {
    this.position = position;
  }
};

// node_modules/strtok3/lib/core.js
function fromWebStream(webStream, options) {
  const webStreamReader = makeWebStreamReader(webStream);
  const _options = options ?? {};
  const chainedClose = _options.onClose;
  _options.onClose = async () => {
    await webStreamReader.close();
    if (chainedClose) {
      return chainedClose();
    }
  };
  return new ReadStreamTokenizer(webStreamReader, _options);
}
function fromBuffer(uint8Array, options) {
  return new BufferTokenizer(uint8Array, options);
}

// node_modules/strtok3/lib/FileTokenizer.js
var import_promises = require("node:fs/promises");
var FileTokenizer = class _FileTokenizer extends AbstractTokenizer {
  /**
   * Create tokenizer from provided file path
   * @param sourceFilePath File path
   */
  static async fromFile(sourceFilePath) {
    const fileHandle = await (0, import_promises.open)(sourceFilePath, "r");
    const stat = await fileHandle.stat();
    return new _FileTokenizer(fileHandle, { fileInfo: { path: sourceFilePath, size: stat.size } });
  }
  constructor(fileHandle, options) {
    super(options);
    this.fileHandle = fileHandle;
    this.fileInfo = options.fileInfo;
  }
  /**
   * Read buffer from file
   * @param uint8Array - Uint8Array to write result to
   * @param options - Read behaviour options
   * @returns Promise number of bytes read
   */
  async readBuffer(uint8Array, options) {
    const normOptions = this.normalizeOptions(uint8Array, options);
    this.position = normOptions.position;
    if (normOptions.length === 0)
      return 0;
    const res = await this.fileHandle.read(uint8Array, 0, normOptions.length, normOptions.position);
    this.position += res.bytesRead;
    if (res.bytesRead < normOptions.length && (!options || !options.mayBeLess)) {
      throw new EndOfStreamError();
    }
    return res.bytesRead;
  }
  /**
   * Peek buffer from file
   * @param uint8Array - Uint8Array (or Buffer) to write data to
   * @param options - Read behaviour options
   * @returns Promise number of bytes read
   */
  async peekBuffer(uint8Array, options) {
    const normOptions = this.normalizeOptions(uint8Array, options);
    const res = await this.fileHandle.read(uint8Array, 0, normOptions.length, normOptions.position);
    if (!normOptions.mayBeLess && res.bytesRead < normOptions.length) {
      throw new EndOfStreamError();
    }
    return res.bytesRead;
  }
  async close() {
    await this.fileHandle.close();
    return super.close();
  }
  setPosition(position) {
    this.position = position;
  }
  supportsRandomAccess() {
    return true;
  }
};

// node_modules/strtok3/lib/index.js
var fromFile = FileTokenizer.fromFile;

// node_modules/token-types/lib/index.js
var ieee754 = __toESM(require_ieee754(), 1);
function dv(array) {
  return new DataView(array.buffer, array.byteOffset);
}
var UINT8 = {
  len: 1,
  get(array, offset) {
    return dv(array).getUint8(offset);
  },
  put(array, offset, value) {
    dv(array).setUint8(offset, value);
    return offset + 1;
  }
};
var UINT16_LE = {
  len: 2,
  get(array, offset) {
    return dv(array).getUint16(offset, true);
  },
  put(array, offset, value) {
    dv(array).setUint16(offset, value, true);
    return offset + 2;
  }
};
var UINT16_BE = {
  len: 2,
  get(array, offset) {
    return dv(array).getUint16(offset);
  },
  put(array, offset, value) {
    dv(array).setUint16(offset, value);
    return offset + 2;
  }
};
var UINT32_LE = {
  len: 4,
  get(array, offset) {
    return dv(array).getUint32(offset, true);
  },
  put(array, offset, value) {
    dv(array).setUint32(offset, value, true);
    return offset + 4;
  }
};
var UINT32_BE = {
  len: 4,
  get(array, offset) {
    return dv(array).getUint32(offset);
  },
  put(array, offset, value) {
    dv(array).setUint32(offset, value);
    return offset + 4;
  }
};
var INT32_BE = {
  len: 4,
  get(array, offset) {
    return dv(array).getInt32(offset);
  },
  put(array, offset, value) {
    dv(array).setInt32(offset, value);
    return offset + 4;
  }
};
var UINT64_LE = {
  len: 8,
  get(array, offset) {
    return dv(array).getBigUint64(offset, true);
  },
  put(array, offset, value) {
    dv(array).setBigUint64(offset, value, true);
    return offset + 8;
  }
};
var StringType = class {
  constructor(len, encoding) {
    this.len = len;
    this.encoding = encoding;
    this.textDecoder = new TextDecoder(encoding);
  }
  get(uint8Array, offset) {
    return this.textDecoder.decode(uint8Array.subarray(offset, offset + this.len));
  }
};

// node_modules/fflate/esm/index.mjs
var import_module = require("module");
var require2 = (0, import_module.createRequire)("/");
var Worker;
try {
  Worker = require2("worker_threads").Worker;
} catch (e) {
}
var u8 = Uint8Array;
var u16 = Uint16Array;
var i32 = Int32Array;
var fleb = new u8([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]);
var fdeb = new u8([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]);
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var freb = function(eb, start) {
  var b = new u16(31);
  for (var i = 0; i < 31; ++i) {
    b[i] = start += 1 << eb[i - 1];
  }
  var r = new i32(b[30]);
  for (var i = 1; i < 30; ++i) {
    for (var j = b[i]; j < b[i + 1]; ++j) {
      r[j] = j - b[i] << 5 | i;
    }
  }
  return { b, r };
};
var _a = freb(fleb, 2);
var fl = _a.b;
var revfl = _a.r;
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0);
var fd = _b.b;
var revfd = _b.r;
var rev = new u16(32768);
for (i = 0; i < 32768; ++i) {
  x = (i & 43690) >> 1 | (i & 21845) << 1;
  x = (x & 52428) >> 2 | (x & 13107) << 2;
  x = (x & 61680) >> 4 | (x & 3855) << 4;
  rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
}
var x;
var i;
var hMap = function(cd, mb, r) {
  var s = cd.length;
  var i = 0;
  var l = new u16(mb);
  for (; i < s; ++i) {
    if (cd[i])
      ++l[cd[i] - 1];
  }
  var le = new u16(mb);
  for (i = 1; i < mb; ++i) {
    le[i] = le[i - 1] + l[i - 1] << 1;
  }
  var co;
  if (r) {
    co = new u16(1 << mb);
    var rvb = 15 - mb;
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        var sv = i << 4 | cd[i];
        var r_1 = mb - cd[i];
        var v = le[cd[i] - 1]++ << r_1;
        for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
          co[rev[v] >> rvb] = sv;
        }
      }
    }
  } else {
    co = new u16(s);
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        co[i] = rev[le[cd[i] - 1]++] >> 15 - cd[i];
      }
    }
  }
  return co;
};
var flt = new u8(288);
for (i = 0; i < 144; ++i)
  flt[i] = 8;
var i;
for (i = 144; i < 256; ++i)
  flt[i] = 9;
var i;
for (i = 256; i < 280; ++i)
  flt[i] = 7;
var i;
for (i = 280; i < 288; ++i)
  flt[i] = 8;
var i;
var fdt = new u8(32);
for (i = 0; i < 32; ++i)
  fdt[i] = 5;
var i;
var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
var max = function(a) {
  var m = a[0];
  for (var i = 1; i < a.length; ++i) {
    if (a[i] > m)
      m = a[i];
  }
  return m;
};
var bits = function(d, p, m) {
  var o = p / 8 | 0;
  return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
};
var bits16 = function(d, p) {
  var o = p / 8 | 0;
  return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
};
var shft = function(p) {
  return (p + 7) / 8 | 0;
};
var slc = function(v, s, e) {
  if (s == null || s < 0)
    s = 0;
  if (e == null || e > v.length)
    e = v.length;
  return new u8(v.subarray(s, e));
};
var ec = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
];
var err = function(ind, msg, nt) {
  var e = new Error(msg || ec[ind]);
  e.code = ind;
  if (Error.captureStackTrace)
    Error.captureStackTrace(e, err);
  if (!nt)
    throw e;
  return e;
};
var inflt = function(dat, st, buf, dict) {
  var sl = dat.length, dl = dict ? dict.length : 0;
  if (!sl || st.f && !st.l)
    return buf || new u8(0);
  var noBuf = !buf;
  var resize = noBuf || st.i != 2;
  var noSt = st.i;
  if (noBuf)
    buf = new u8(sl * 3);
  var cbuf = function(l2) {
    var bl = buf.length;
    if (l2 > bl) {
      var nbuf = new u8(Math.max(bl * 2, l2));
      nbuf.set(buf);
      buf = nbuf;
    }
  };
  var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
  var tbts = sl * 8;
  do {
    if (!lm) {
      final = bits(dat, pos, 1);
      var type = bits(dat, pos + 1, 3);
      pos += 3;
      if (!type) {
        var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
        if (t > sl) {
          if (noSt)
            err(0);
          break;
        }
        if (resize)
          cbuf(bt + l);
        buf.set(dat.subarray(s, t), bt);
        st.b = bt += l, st.p = pos = t * 8, st.f = final;
        continue;
      } else if (type == 1)
        lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
      else if (type == 2) {
        var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
        var tl = hLit + bits(dat, pos + 5, 31) + 1;
        pos += 14;
        var ldt = new u8(tl);
        var clt = new u8(19);
        for (var i = 0; i < hcLen; ++i) {
          clt[clim[i]] = bits(dat, pos + i * 3, 7);
        }
        pos += hcLen * 3;
        var clb = max(clt), clbmsk = (1 << clb) - 1;
        var clm = hMap(clt, clb, 1);
        for (var i = 0; i < tl; ) {
          var r = clm[bits(dat, pos, clbmsk)];
          pos += r & 15;
          var s = r >> 4;
          if (s < 16) {
            ldt[i++] = s;
          } else {
            var c = 0, n = 0;
            if (s == 16)
              n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
            else if (s == 17)
              n = 3 + bits(dat, pos, 7), pos += 3;
            else if (s == 18)
              n = 11 + bits(dat, pos, 127), pos += 7;
            while (n--)
              ldt[i++] = c;
          }
        }
        var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
        lbt = max(lt);
        dbt = max(dt);
        lm = hMap(lt, lbt, 1);
        dm = hMap(dt, dbt, 1);
      } else
        err(1);
      if (pos > tbts) {
        if (noSt)
          err(0);
        break;
      }
    }
    if (resize)
      cbuf(bt + 131072);
    var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
    var lpos = pos;
    for (; ; lpos = pos) {
      var c = lm[bits16(dat, pos) & lms], sym = c >> 4;
      pos += c & 15;
      if (pos > tbts) {
        if (noSt)
          err(0);
        break;
      }
      if (!c)
        err(2);
      if (sym < 256)
        buf[bt++] = sym;
      else if (sym == 256) {
        lpos = pos, lm = null;
        break;
      } else {
        var add = sym - 254;
        if (sym > 264) {
          var i = sym - 257, b = fleb[i];
          add = bits(dat, pos, (1 << b) - 1) + fl[i];
          pos += b;
        }
        var d = dm[bits16(dat, pos) & dms], dsym = d >> 4;
        if (!d)
          err(3);
        pos += d & 15;
        var dt = fd[dsym];
        if (dsym > 3) {
          var b = fdeb[dsym];
          dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
        }
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
        if (resize)
          cbuf(bt + 131072);
        var end = bt + add;
        if (bt < dt) {
          var shift = dl - dt, dend = Math.min(dt, end);
          if (shift + bt < 0)
            err(3);
          for (; bt < dend; ++bt)
            buf[bt] = dict[shift + bt];
        }
        for (; bt < end; ++bt)
          buf[bt] = buf[bt - dt];
      }
    }
    st.l = lm, st.p = lpos, st.b = bt, st.f = final;
    if (lm)
      final = 1, st.m = lbt, st.d = dm, st.n = dbt;
  } while (!final);
  return bt != buf.length && noBuf ? slc(buf, 0, bt) : buf.subarray(0, bt);
};
var et = /* @__PURE__ */ new u8(0);
var gzs = function(d) {
  if (d[0] != 31 || d[1] != 139 || d[2] != 8)
    err(6, "invalid gzip data");
  var flg = d[3];
  var st = 10;
  if (flg & 4)
    st += (d[10] | d[11] << 8) + 2;
  for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
    ;
  return st + (flg & 2);
};
var gzl = function(d) {
  var l = d.length;
  return (d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16 | d[l - 1] << 24) >>> 0;
};
var zls = function(d, dict) {
  if ((d[0] & 15) != 8 || d[0] >> 4 > 7 || (d[0] << 8 | d[1]) % 31)
    err(6, "invalid zlib data");
  if ((d[1] >> 5 & 1) == +!dict)
    err(6, "invalid zlib data: " + (d[1] & 32 ? "need" : "unexpected") + " dictionary");
  return (d[1] >> 3 & 4) + 2;
};
function inflateSync(data, opts) {
  return inflt(data, { i: 2 }, opts && opts.out, opts && opts.dictionary);
}
function gunzipSync(data, opts) {
  var st = gzs(data);
  if (st + 8 > data.length)
    err(6, "invalid gzip data");
  return inflt(data.subarray(st, -8), { i: 2 }, opts && opts.out || new u8(gzl(data)), opts && opts.dictionary);
}
function unzlibSync(data, opts) {
  return inflt(data.subarray(zls(data, opts && opts.dictionary), -4), { i: 2 }, opts && opts.out, opts && opts.dictionary);
}
function decompressSync(data, opts) {
  return data[0] == 31 && data[1] == 139 && data[2] == 8 ? gunzipSync(data, opts) : (data[0] & 15) != 8 || data[0] >> 4 > 7 || (data[0] << 8 | data[1]) % 31 ? inflateSync(data, opts) : unzlibSync(data, opts);
}
var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
var tds = 0;
try {
  td.decode(et, { stream: true });
  tds = 1;
} catch (e) {
}

// node_modules/@tokenizer/inflate/lib/index.js
var import_debug = __toESM(require_src(), 1);

// node_modules/@tokenizer/inflate/lib/ZipToken.js
var Signature = {
  LocalFileHeader: 67324752,
  DataDescriptor: 134695760,
  CentralFileHeader: 33639248,
  EndOfCentralDirectory: 101010256
};
var DataDescriptor = {
  get(array) {
    const flags = UINT16_LE.get(array, 6);
    return {
      signature: UINT32_LE.get(array, 0),
      compressedSize: UINT32_LE.get(array, 8),
      uncompressedSize: UINT32_LE.get(array, 12)
    };
  },
  len: 16
};
var LocalFileHeaderToken = {
  get(array) {
    const flags = UINT16_LE.get(array, 6);
    return {
      signature: UINT32_LE.get(array, 0),
      minVersion: UINT16_LE.get(array, 4),
      dataDescriptor: !!(flags & 8),
      compressedMethod: UINT16_LE.get(array, 8),
      compressedSize: UINT32_LE.get(array, 18),
      uncompressedSize: UINT32_LE.get(array, 22),
      filenameLength: UINT16_LE.get(array, 26),
      extraFieldLength: UINT16_LE.get(array, 28),
      filename: null
    };
  },
  len: 30
};
var EndOfCentralDirectoryRecordToken = {
  get(array) {
    return {
      signature: UINT32_LE.get(array, 0),
      nrOfThisDisk: UINT16_LE.get(array, 4),
      nrOfThisDiskWithTheStart: UINT16_LE.get(array, 6),
      nrOfEntriesOnThisDisk: UINT16_LE.get(array, 8),
      nrOfEntriesOfSize: UINT16_LE.get(array, 10),
      sizeOfCd: UINT32_LE.get(array, 12),
      offsetOfStartOfCd: UINT32_LE.get(array, 16),
      zipFileCommentLength: UINT16_LE.get(array, 20)
    };
  },
  len: 22
};
var FileHeader = {
  get(array) {
    const flags = UINT16_LE.get(array, 8);
    return {
      signature: UINT32_LE.get(array, 0),
      minVersion: UINT16_LE.get(array, 6),
      dataDescriptor: !!(flags & 8),
      compressedMethod: UINT16_LE.get(array, 10),
      compressedSize: UINT32_LE.get(array, 20),
      uncompressedSize: UINT32_LE.get(array, 24),
      filenameLength: UINT16_LE.get(array, 28),
      extraFieldLength: UINT16_LE.get(array, 30),
      fileCommentLength: UINT16_LE.get(array, 32),
      relativeOffsetOfLocalHeader: UINT32_LE.get(array, 42),
      filename: null
    };
  },
  len: 46
};

// node_modules/@tokenizer/inflate/lib/index.js
function signatureToArray(signature) {
  const signatureBytes = new Uint8Array(UINT32_LE.len);
  UINT32_LE.put(signatureBytes, 0, signature);
  return signatureBytes;
}
var debug = (0, import_debug.default)("tokenizer:inflate");
var syncBufferSize = 256 * 1024;
var ddSignatureArray = signatureToArray(Signature.DataDescriptor);
var eocdSignatureBytes = signatureToArray(Signature.EndOfCentralDirectory);
var ZipHandler = class {
  constructor(tokenizer) {
    this.tokenizer = tokenizer;
    this.syncBuffer = new Uint8Array(syncBufferSize);
  }
  async isZip() {
    return await this.peekSignature() === Signature.LocalFileHeader;
  }
  peekSignature() {
    return this.tokenizer.peekToken(UINT32_LE);
  }
  async findEndOfCentralDirectoryLocator() {
    const randomReadTokenizer = this.tokenizer;
    const chunkLength = Math.min(16 * 1024, randomReadTokenizer.fileInfo.size);
    const buffer = this.syncBuffer.subarray(0, chunkLength);
    await this.tokenizer.readBuffer(buffer, { position: randomReadTokenizer.fileInfo.size - chunkLength });
    for (let i = buffer.length - 4; i >= 0; i--) {
      if (buffer[i] === eocdSignatureBytes[0] && buffer[i + 1] === eocdSignatureBytes[1] && buffer[i + 2] === eocdSignatureBytes[2] && buffer[i + 3] === eocdSignatureBytes[3]) {
        return randomReadTokenizer.fileInfo.size - chunkLength + i;
      }
    }
    return -1;
  }
  async readCentralDirectory() {
    if (!this.tokenizer.supportsRandomAccess()) {
      debug("Cannot reading central-directory without random-read support");
      return;
    }
    debug("Reading central-directory...");
    const pos = this.tokenizer.position;
    const offset = await this.findEndOfCentralDirectoryLocator();
    if (offset > 0) {
      debug("Central-directory 32-bit signature found");
      const eocdHeader = await this.tokenizer.readToken(EndOfCentralDirectoryRecordToken, offset);
      const files = [];
      this.tokenizer.setPosition(eocdHeader.offsetOfStartOfCd);
      for (let n = 0; n < eocdHeader.nrOfEntriesOfSize; ++n) {
        const entry = await this.tokenizer.readToken(FileHeader);
        if (entry.signature !== Signature.CentralFileHeader) {
          throw new Error("Expected Central-File-Header signature");
        }
        entry.filename = await this.tokenizer.readToken(new StringType(entry.filenameLength, "utf-8"));
        await this.tokenizer.ignore(entry.extraFieldLength);
        await this.tokenizer.ignore(entry.fileCommentLength);
        files.push(entry);
        debug(`Add central-directory file-entry: n=${n + 1}/${files.length}: filename=${files[n].filename}`);
      }
      this.tokenizer.setPosition(pos);
      return files;
    }
    this.tokenizer.setPosition(pos);
  }
  async unzip(fileCb) {
    const entries = await this.readCentralDirectory();
    if (entries) {
      return this.iterateOverCentralDirectory(entries, fileCb);
    }
    let stop = false;
    do {
      const zipHeader = await this.readLocalFileHeader();
      if (!zipHeader)
        break;
      const next = fileCb(zipHeader);
      stop = !!next.stop;
      let fileData = void 0;
      await this.tokenizer.ignore(zipHeader.extraFieldLength);
      if (zipHeader.dataDescriptor && zipHeader.compressedSize === 0) {
        const chunks = [];
        let len = syncBufferSize;
        debug("Compressed-file-size unknown, scanning for next data-descriptor-signature....");
        let nextHeaderIndex = -1;
        while (nextHeaderIndex < 0 && len === syncBufferSize) {
          len = await this.tokenizer.peekBuffer(this.syncBuffer, { mayBeLess: true });
          nextHeaderIndex = indexOf(this.syncBuffer.subarray(0, len), ddSignatureArray);
          const size = nextHeaderIndex >= 0 ? nextHeaderIndex : len;
          if (next.handler) {
            const data = new Uint8Array(size);
            await this.tokenizer.readBuffer(data);
            chunks.push(data);
          } else {
            await this.tokenizer.ignore(size);
          }
        }
        debug(`Found data-descriptor-signature at pos=${this.tokenizer.position}`);
        if (next.handler) {
          await this.inflate(zipHeader, mergeArrays(chunks), next.handler);
        }
      } else {
        if (next.handler) {
          debug(`Reading compressed-file-data: ${zipHeader.compressedSize} bytes`);
          fileData = new Uint8Array(zipHeader.compressedSize);
          await this.tokenizer.readBuffer(fileData);
          await this.inflate(zipHeader, fileData, next.handler);
        } else {
          debug(`Ignoring compressed-file-data: ${zipHeader.compressedSize} bytes`);
          await this.tokenizer.ignore(zipHeader.compressedSize);
        }
      }
      debug(`Reading data-descriptor at pos=${this.tokenizer.position}`);
      if (zipHeader.dataDescriptor) {
        const dataDescriptor = await this.tokenizer.readToken(DataDescriptor);
        if (dataDescriptor.signature !== 134695760) {
          throw new Error(`Expected data-descriptor-signature at position ${this.tokenizer.position - DataDescriptor.len}`);
        }
      }
    } while (!stop);
  }
  async iterateOverCentralDirectory(entries, fileCb) {
    for (const fileHeader of entries) {
      const next = fileCb(fileHeader);
      if (next.handler) {
        this.tokenizer.setPosition(fileHeader.relativeOffsetOfLocalHeader);
        const zipHeader = await this.readLocalFileHeader();
        if (zipHeader) {
          await this.tokenizer.ignore(zipHeader.extraFieldLength);
          const fileData = new Uint8Array(fileHeader.compressedSize);
          await this.tokenizer.readBuffer(fileData);
          await this.inflate(zipHeader, fileData, next.handler);
        }
      }
      if (next.stop)
        break;
    }
  }
  inflate(zipHeader, fileData, cb) {
    if (zipHeader.compressedMethod === 0) {
      return cb(fileData);
    }
    debug(`Decompress filename=${zipHeader.filename}, compressed-size=${fileData.length}`);
    const uncompressedData = decompressSync(fileData);
    return cb(uncompressedData);
  }
  async readLocalFileHeader() {
    const signature = await this.tokenizer.peekToken(UINT32_LE);
    if (signature === Signature.LocalFileHeader) {
      const header = await this.tokenizer.readToken(LocalFileHeaderToken);
      header.filename = await this.tokenizer.readToken(new StringType(header.filenameLength, "utf-8"));
      return header;
    }
    if (signature === Signature.CentralFileHeader) {
      return false;
    }
    if (signature === 3759263696) {
      throw new Error("Encrypted ZIP");
    }
    throw new Error("Unexpected signature");
  }
};
function indexOf(buffer, portion) {
  const bufferLength = buffer.length;
  const portionLength = portion.length;
  if (portionLength > bufferLength)
    return -1;
  for (let i = 0; i <= bufferLength - portionLength; i++) {
    let found = true;
    for (let j = 0; j < portionLength; j++) {
      if (buffer[i + j] !== portion[j]) {
        found = false;
        break;
      }
    }
    if (found) {
      return i;
    }
  }
  return -1;
}
function mergeArrays(chunks) {
  const totalLength = chunks.reduce((acc, curr) => acc + curr.length, 0);
  const mergedArray = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    mergedArray.set(chunk, offset);
    offset += chunk.length;
  }
  return mergedArray;
}

// node_modules/uint8array-extras/index.js
var cachedDecoders = {
  utf8: new globalThis.TextDecoder("utf8")
};
var cachedEncoder = new globalThis.TextEncoder();
var byteToHexLookupTable = Array.from({ length: 256 }, (_, index) => index.toString(16).padStart(2, "0"));
function getUintBE(view) {
  const { byteLength } = view;
  if (byteLength === 6) {
    return view.getUint16(0) * 2 ** 32 + view.getUint32(2);
  }
  if (byteLength === 5) {
    return view.getUint8(0) * 2 ** 32 + view.getUint32(1);
  }
  if (byteLength === 4) {
    return view.getUint32(0);
  }
  if (byteLength === 3) {
    return view.getUint8(0) * 2 ** 16 + view.getUint16(1);
  }
  if (byteLength === 2) {
    return view.getUint16(0);
  }
  if (byteLength === 1) {
    return view.getUint8(0);
  }
}

// node_modules/file-type/util.js
function stringToBytes(string) {
  return [...string].map((character) => character.charCodeAt(0));
}
function tarHeaderChecksumMatches(arrayBuffer, offset = 0) {
  const readSum = Number.parseInt(new StringType(6).get(arrayBuffer, 148).replace(/\0.*$/, "").trim(), 8);
  if (Number.isNaN(readSum)) {
    return false;
  }
  let sum = 8 * 32;
  for (let index = offset; index < offset + 148; index++) {
    sum += arrayBuffer[index];
  }
  for (let index = offset + 156; index < offset + 512; index++) {
    sum += arrayBuffer[index];
  }
  return readSum === sum;
}
var uint32SyncSafeToken = {
  get: (buffer, offset) => buffer[offset + 3] & 127 | buffer[offset + 2] << 7 | buffer[offset + 1] << 14 | buffer[offset] << 21,
  len: 4
};

// node_modules/file-type/supported.js
var extensions = [
  "jpg",
  "png",
  "apng",
  "gif",
  "webp",
  "flif",
  "xcf",
  "cr2",
  "cr3",
  "orf",
  "arw",
  "dng",
  "nef",
  "rw2",
  "raf",
  "tif",
  "bmp",
  "icns",
  "jxr",
  "psd",
  "indd",
  "zip",
  "tar",
  "rar",
  "gz",
  "bz2",
  "7z",
  "dmg",
  "mp4",
  "mid",
  "mkv",
  "webm",
  "mov",
  "avi",
  "mpg",
  "mp2",
  "mp3",
  "m4a",
  "oga",
  "ogg",
  "ogv",
  "opus",
  "flac",
  "wav",
  "spx",
  "amr",
  "pdf",
  "epub",
  "elf",
  "macho",
  "exe",
  "swf",
  "rtf",
  "wasm",
  "woff",
  "woff2",
  "eot",
  "ttf",
  "otf",
  "ttc",
  "ico",
  "flv",
  "ps",
  "xz",
  "sqlite",
  "nes",
  "crx",
  "xpi",
  "cab",
  "deb",
  "ar",
  "rpm",
  "Z",
  "lz",
  "cfb",
  "mxf",
  "mts",
  "blend",
  "bpg",
  "docx",
  "pptx",
  "xlsx",
  "3gp",
  "3g2",
  "j2c",
  "jp2",
  "jpm",
  "jpx",
  "mj2",
  "aif",
  "qcp",
  "odt",
  "ods",
  "odp",
  "xml",
  "mobi",
  "heic",
  "cur",
  "ktx",
  "ape",
  "wv",
  "dcm",
  "ics",
  "glb",
  "pcap",
  "dsf",
  "lnk",
  "alias",
  "voc",
  "ac3",
  "m4v",
  "m4p",
  "m4b",
  "f4v",
  "f4p",
  "f4b",
  "f4a",
  "mie",
  "asf",
  "ogm",
  "ogx",
  "mpc",
  "arrow",
  "shp",
  "aac",
  "mp1",
  "it",
  "s3m",
  "xm",
  "skp",
  "avif",
  "eps",
  "lzh",
  "pgp",
  "asar",
  "stl",
  "chm",
  "3mf",
  "zst",
  "jxl",
  "vcf",
  "jls",
  "pst",
  "dwg",
  "parquet",
  "class",
  "arj",
  "cpio",
  "ace",
  "avro",
  "icc",
  "fbx",
  "vsdx",
  "vtt",
  "apk",
  "drc",
  "lz4",
  "potx",
  "xltx",
  "dotx",
  "xltm",
  "ott",
  "ots",
  "otp",
  "odg",
  "otg",
  "xlsm",
  "docm",
  "dotm",
  "potm",
  "pptm",
  "jar",
  "rm",
  "ppsm",
  "ppsx"
];
var mimeTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/flif",
  "image/x-xcf",
  "image/x-canon-cr2",
  "image/x-canon-cr3",
  "image/tiff",
  "image/bmp",
  "image/vnd.ms-photo",
  "image/vnd.adobe.photoshop",
  "application/x-indesign",
  "application/epub+zip",
  "application/x-xpinstall",
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12",
  "application/vnd.oasis.opendocument.text",
  "application/vnd.oasis.opendocument.spreadsheet",
  "application/vnd.oasis.opendocument.presentation",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
  "application/zip",
  "application/x-tar",
  "application/x-rar-compressed",
  "application/gzip",
  "application/x-bzip2",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/vnd.apache.arrow.file",
  "video/mp4",
  "audio/midi",
  "video/matroska",
  "video/webm",
  "video/quicktime",
  "video/vnd.avi",
  "audio/wav",
  "audio/qcelp",
  "audio/x-ms-asf",
  "video/x-ms-asf",
  "application/vnd.ms-asf",
  "video/mpeg",
  "video/3gpp",
  "audio/mpeg",
  "audio/mp4",
  // RFC 4337
  "video/ogg",
  "audio/ogg",
  "audio/ogg; codecs=opus",
  "application/ogg",
  "audio/flac",
  "audio/ape",
  "audio/wavpack",
  "audio/amr",
  "application/pdf",
  "application/x-elf",
  "application/x-mach-binary",
  "application/x-msdownload",
  "application/x-shockwave-flash",
  "application/rtf",
  "application/wasm",
  "font/woff",
  "font/woff2",
  "application/vnd.ms-fontobject",
  "font/ttf",
  "font/otf",
  "font/collection",
  "image/x-icon",
  "video/x-flv",
  "application/postscript",
  "application/eps",
  "application/x-xz",
  "application/x-sqlite3",
  "application/x-nintendo-nes-rom",
  "application/x-google-chrome-extension",
  "application/vnd.ms-cab-compressed",
  "application/x-deb",
  "application/x-unix-archive",
  "application/x-rpm",
  "application/x-compress",
  "application/x-lzip",
  "application/x-cfb",
  "application/x-mie",
  "application/mxf",
  "video/mp2t",
  "application/x-blender",
  "image/bpg",
  "image/j2c",
  "image/jp2",
  "image/jpx",
  "image/jpm",
  "image/mj2",
  "audio/aiff",
  "application/xml",
  "application/x-mobipocket-ebook",
  "image/heif",
  "image/heif-sequence",
  "image/heic",
  "image/heic-sequence",
  "image/icns",
  "image/ktx",
  "application/dicom",
  "audio/x-musepack",
  "text/calendar",
  "text/vcard",
  "text/vtt",
  "model/gltf-binary",
  "application/vnd.tcpdump.pcap",
  "audio/x-dsf",
  // Non-standard
  "application/x.ms.shortcut",
  // Invented by us
  "application/x.apple.alias",
  // Invented by us
  "audio/x-voc",
  "audio/vnd.dolby.dd-raw",
  "audio/x-m4a",
  "image/apng",
  "image/x-olympus-orf",
  "image/x-sony-arw",
  "image/x-adobe-dng",
  "image/x-nikon-nef",
  "image/x-panasonic-rw2",
  "image/x-fujifilm-raf",
  "video/x-m4v",
  "video/3gpp2",
  "application/x-esri-shape",
  "audio/aac",
  "audio/x-it",
  "audio/x-s3m",
  "audio/x-xm",
  "video/MP1S",
  "video/MP2P",
  "application/vnd.sketchup.skp",
  "image/avif",
  "application/x-lzh-compressed",
  "application/pgp-encrypted",
  "application/x-asar",
  "model/stl",
  "application/vnd.ms-htmlhelp",
  "model/3mf",
  "image/jxl",
  "application/zstd",
  "image/jls",
  "application/vnd.ms-outlook",
  "image/vnd.dwg",
  "application/vnd.apache.parquet",
  "application/java-vm",
  "application/x-arj",
  "application/x-cpio",
  "application/x-ace-compressed",
  "application/avro",
  "application/vnd.iccprofile",
  "application/x.autodesk.fbx",
  // Invented by us
  "application/vnd.visio",
  "application/vnd.android.package-archive",
  "application/vnd.google.draco",
  // Invented by us
  "application/x-lz4",
  // Invented by us
  "application/vnd.openxmlformats-officedocument.presentationml.template",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
  "application/vnd.ms-excel.template.macroenabled.12",
  "application/vnd.oasis.opendocument.text-template",
  "application/vnd.oasis.opendocument.spreadsheet-template",
  "application/vnd.oasis.opendocument.presentation-template",
  "application/vnd.oasis.opendocument.graphics",
  "application/vnd.oasis.opendocument.graphics-template",
  "application/vnd.ms-excel.sheet.macroenabled.12",
  "application/vnd.ms-word.document.macroenabled.12",
  "application/vnd.ms-word.template.macroenabled.12",
  "application/vnd.ms-powerpoint.template.macroenabled.12",
  "application/vnd.ms-powerpoint.presentation.macroenabled.12",
  "application/java-archive",
  "application/vnd.rn-realmedia"
];

// node_modules/file-type/core.js
var reasonableDetectionSizeInBytes = 4100;
async function fileTypeFromBuffer(input, options) {
  return new FileTypeParser(options).fromBuffer(input);
}
function getFileTypeFromMimeType(mimeType) {
  mimeType = mimeType.toLowerCase();
  switch (mimeType) {
    case "application/epub+zip":
      return {
        ext: "epub",
        mime: mimeType
      };
    case "application/vnd.oasis.opendocument.text":
      return {
        ext: "odt",
        mime: mimeType
      };
    case "application/vnd.oasis.opendocument.text-template":
      return {
        ext: "ott",
        mime: mimeType
      };
    case "application/vnd.oasis.opendocument.spreadsheet":
      return {
        ext: "ods",
        mime: mimeType
      };
    case "application/vnd.oasis.opendocument.spreadsheet-template":
      return {
        ext: "ots",
        mime: mimeType
      };
    case "application/vnd.oasis.opendocument.presentation":
      return {
        ext: "odp",
        mime: mimeType
      };
    case "application/vnd.oasis.opendocument.presentation-template":
      return {
        ext: "otp",
        mime: mimeType
      };
    case "application/vnd.oasis.opendocument.graphics":
      return {
        ext: "odg",
        mime: mimeType
      };
    case "application/vnd.oasis.opendocument.graphics-template":
      return {
        ext: "otg",
        mime: mimeType
      };
    case "application/vnd.openxmlformats-officedocument.presentationml.slideshow":
      return {
        ext: "ppsx",
        mime: mimeType
      };
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return {
        ext: "xlsx",
        mime: mimeType
      };
    case "application/vnd.ms-excel.sheet.macroenabled":
      return {
        ext: "xlsm",
        mime: "application/vnd.ms-excel.sheet.macroenabled.12"
      };
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.template":
      return {
        ext: "xltx",
        mime: mimeType
      };
    case "application/vnd.ms-excel.template.macroenabled":
      return {
        ext: "xltm",
        mime: "application/vnd.ms-excel.template.macroenabled.12"
      };
    case "application/vnd.ms-powerpoint.slideshow.macroenabled":
      return {
        ext: "ppsm",
        mime: "application/vnd.ms-powerpoint.slideshow.macroenabled.12"
      };
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return {
        ext: "docx",
        mime: mimeType
      };
    case "application/vnd.ms-word.document.macroenabled":
      return {
        ext: "docm",
        mime: "application/vnd.ms-word.document.macroenabled.12"
      };
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.template":
      return {
        ext: "dotx",
        mime: mimeType
      };
    case "application/vnd.ms-word.template.macroenabledtemplate":
      return {
        ext: "dotm",
        mime: "application/vnd.ms-word.template.macroenabled.12"
      };
    case "application/vnd.openxmlformats-officedocument.presentationml.template":
      return {
        ext: "potx",
        mime: mimeType
      };
    case "application/vnd.ms-powerpoint.template.macroenabled":
      return {
        ext: "potm",
        mime: "application/vnd.ms-powerpoint.template.macroenabled.12"
      };
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      return {
        ext: "pptx",
        mime: mimeType
      };
    case "application/vnd.ms-powerpoint.presentation.macroenabled":
      return {
        ext: "pptm",
        mime: "application/vnd.ms-powerpoint.presentation.macroenabled.12"
      };
    case "application/vnd.ms-visio.drawing":
      return {
        ext: "vsdx",
        mime: "application/vnd.visio"
      };
    case "application/vnd.ms-package.3dmanufacturing-3dmodel+xml":
      return {
        ext: "3mf",
        mime: "model/3mf"
      };
    default:
  }
}
function _check(buffer, headers, options) {
  options = {
    offset: 0,
    ...options
  };
  for (const [index, header] of headers.entries()) {
    if (options.mask) {
      if (header !== (options.mask[index] & buffer[index + options.offset])) {
        return false;
      }
    } else if (header !== buffer[index + options.offset]) {
      return false;
    }
  }
  return true;
}
var FileTypeParser = class {
  constructor(options) {
    this.options = {
      mpegOffsetTolerance: 0,
      ...options
    };
    this.detectors = [
      ...options?.customDetectors ?? [],
      { id: "core", detect: this.detectConfident },
      { id: "core.imprecise", detect: this.detectImprecise }
    ];
    this.tokenizerOptions = {
      abortSignal: options?.signal
    };
  }
  async fromTokenizer(tokenizer) {
    const initialPosition = tokenizer.position;
    for (const detector of this.detectors) {
      const fileType = await detector.detect(tokenizer);
      if (fileType) {
        return fileType;
      }
      if (initialPosition !== tokenizer.position) {
        return void 0;
      }
    }
  }
  async fromBuffer(input) {
    if (!(input instanceof Uint8Array || input instanceof ArrayBuffer)) {
      throw new TypeError(`Expected the \`input\` argument to be of type \`Uint8Array\` or \`ArrayBuffer\`, got \`${typeof input}\``);
    }
    const buffer = input instanceof Uint8Array ? input : new Uint8Array(input);
    if (!(buffer?.length > 1)) {
      return;
    }
    return this.fromTokenizer(fromBuffer(buffer, this.tokenizerOptions));
  }
  async fromBlob(blob) {
    return this.fromStream(blob.stream());
  }
  async fromStream(stream) {
    const tokenizer = await fromWebStream(stream, this.tokenizerOptions);
    try {
      return await this.fromTokenizer(tokenizer);
    } finally {
      await tokenizer.close();
    }
  }
  async toDetectionStream(stream, options) {
    const { sampleSize = reasonableDetectionSizeInBytes } = options;
    let detectedFileType;
    let firstChunk;
    const reader = stream.getReader({ mode: "byob" });
    try {
      const { value: chunk, done } = await reader.read(new Uint8Array(sampleSize));
      firstChunk = chunk;
      if (!done && chunk) {
        try {
          detectedFileType = await this.fromBuffer(chunk.subarray(0, sampleSize));
        } catch (error) {
          if (!(error instanceof EndOfStreamError)) {
            throw error;
          }
          detectedFileType = void 0;
        }
      }
      firstChunk = chunk;
    } finally {
      reader.releaseLock();
    }
    const transformStream = new TransformStream({
      async start(controller) {
        controller.enqueue(firstChunk);
      },
      transform(chunk, controller) {
        controller.enqueue(chunk);
      }
    });
    const newStream = stream.pipeThrough(transformStream);
    newStream.fileType = detectedFileType;
    return newStream;
  }
  check(header, options) {
    return _check(this.buffer, header, options);
  }
  checkString(header, options) {
    return this.check(stringToBytes(header), options);
  }
  // Detections with a high degree of certainty in identifying the correct file type
  detectConfident = async (tokenizer) => {
    this.buffer = new Uint8Array(reasonableDetectionSizeInBytes);
    if (tokenizer.fileInfo.size === void 0) {
      tokenizer.fileInfo.size = Number.MAX_SAFE_INTEGER;
    }
    this.tokenizer = tokenizer;
    await tokenizer.peekBuffer(this.buffer, { length: 12, mayBeLess: true });
    if (this.check([66, 77])) {
      return {
        ext: "bmp",
        mime: "image/bmp"
      };
    }
    if (this.check([11, 119])) {
      return {
        ext: "ac3",
        mime: "audio/vnd.dolby.dd-raw"
      };
    }
    if (this.check([120, 1])) {
      return {
        ext: "dmg",
        mime: "application/x-apple-diskimage"
      };
    }
    if (this.check([77, 90])) {
      return {
        ext: "exe",
        mime: "application/x-msdownload"
      };
    }
    if (this.check([37, 33])) {
      await tokenizer.peekBuffer(this.buffer, { length: 24, mayBeLess: true });
      if (this.checkString("PS-Adobe-", { offset: 2 }) && this.checkString(" EPSF-", { offset: 14 })) {
        return {
          ext: "eps",
          mime: "application/eps"
        };
      }
      return {
        ext: "ps",
        mime: "application/postscript"
      };
    }
    if (this.check([31, 160]) || this.check([31, 157])) {
      return {
        ext: "Z",
        mime: "application/x-compress"
      };
    }
    if (this.check([199, 113])) {
      return {
        ext: "cpio",
        mime: "application/x-cpio"
      };
    }
    if (this.check([96, 234])) {
      return {
        ext: "arj",
        mime: "application/x-arj"
      };
    }
    if (this.check([239, 187, 191])) {
      this.tokenizer.ignore(3);
      return this.detectConfident(tokenizer);
    }
    if (this.check([71, 73, 70])) {
      return {
        ext: "gif",
        mime: "image/gif"
      };
    }
    if (this.check([73, 73, 188])) {
      return {
        ext: "jxr",
        mime: "image/vnd.ms-photo"
      };
    }
    if (this.check([31, 139, 8])) {
      return {
        ext: "gz",
        mime: "application/gzip"
      };
    }
    if (this.check([66, 90, 104])) {
      return {
        ext: "bz2",
        mime: "application/x-bzip2"
      };
    }
    if (this.checkString("ID3")) {
      await tokenizer.ignore(6);
      const id3HeaderLength = await tokenizer.readToken(uint32SyncSafeToken);
      if (tokenizer.position + id3HeaderLength > tokenizer.fileInfo.size) {
        return {
          ext: "mp3",
          mime: "audio/mpeg"
        };
      }
      await tokenizer.ignore(id3HeaderLength);
      return this.fromTokenizer(tokenizer);
    }
    if (this.checkString("MP+")) {
      return {
        ext: "mpc",
        mime: "audio/x-musepack"
      };
    }
    if ((this.buffer[0] === 67 || this.buffer[0] === 70) && this.check([87, 83], { offset: 1 })) {
      return {
        ext: "swf",
        mime: "application/x-shockwave-flash"
      };
    }
    if (this.check([255, 216, 255])) {
      if (this.check([247], { offset: 3 })) {
        return {
          ext: "jls",
          mime: "image/jls"
        };
      }
      return {
        ext: "jpg",
        mime: "image/jpeg"
      };
    }
    if (this.check([79, 98, 106, 1])) {
      return {
        ext: "avro",
        mime: "application/avro"
      };
    }
    if (this.checkString("FLIF")) {
      return {
        ext: "flif",
        mime: "image/flif"
      };
    }
    if (this.checkString("8BPS")) {
      return {
        ext: "psd",
        mime: "image/vnd.adobe.photoshop"
      };
    }
    if (this.checkString("MPCK")) {
      return {
        ext: "mpc",
        mime: "audio/x-musepack"
      };
    }
    if (this.checkString("FORM")) {
      return {
        ext: "aif",
        mime: "audio/aiff"
      };
    }
    if (this.checkString("icns", { offset: 0 })) {
      return {
        ext: "icns",
        mime: "image/icns"
      };
    }
    if (this.check([80, 75, 3, 4])) {
      let fileType;
      await new ZipHandler(tokenizer).unzip((zipHeader) => {
        switch (zipHeader.filename) {
          case "META-INF/mozilla.rsa":
            fileType = {
              ext: "xpi",
              mime: "application/x-xpinstall"
            };
            return {
              stop: true
            };
          case "META-INF/MANIFEST.MF":
            fileType = {
              ext: "jar",
              mime: "application/java-archive"
            };
            return {
              stop: true
            };
          case "mimetype":
            return {
              async handler(fileData) {
                const mimeType = new TextDecoder("utf-8").decode(fileData).trim();
                fileType = getFileTypeFromMimeType(mimeType);
              },
              stop: true
            };
          case "[Content_Types].xml":
            return {
              async handler(fileData) {
                let xmlContent = new TextDecoder("utf-8").decode(fileData);
                const endPos = xmlContent.indexOf('.main+xml"');
                if (endPos === -1) {
                  const mimeType = "application/vnd.ms-package.3dmanufacturing-3dmodel+xml";
                  if (xmlContent.includes(`ContentType="${mimeType}"`)) {
                    fileType = getFileTypeFromMimeType(mimeType);
                  }
                } else {
                  xmlContent = xmlContent.slice(0, Math.max(0, endPos));
                  const firstPos = xmlContent.lastIndexOf('"');
                  const mimeType = xmlContent.slice(Math.max(0, firstPos + 1));
                  fileType = getFileTypeFromMimeType(mimeType);
                }
              },
              stop: true
            };
          default:
            if (/classes\d*\.dex/.test(zipHeader.filename)) {
              fileType = {
                ext: "apk",
                mime: "application/vnd.android.package-archive"
              };
              return { stop: true };
            }
            return {};
        }
      });
      return fileType ?? {
        ext: "zip",
        mime: "application/zip"
      };
    }
    if (this.checkString("OggS")) {
      await tokenizer.ignore(28);
      const type = new Uint8Array(8);
      await tokenizer.readBuffer(type);
      if (_check(type, [79, 112, 117, 115, 72, 101, 97, 100])) {
        return {
          ext: "opus",
          mime: "audio/ogg; codecs=opus"
        };
      }
      if (_check(type, [128, 116, 104, 101, 111, 114, 97])) {
        return {
          ext: "ogv",
          mime: "video/ogg"
        };
      }
      if (_check(type, [1, 118, 105, 100, 101, 111, 0])) {
        return {
          ext: "ogm",
          mime: "video/ogg"
        };
      }
      if (_check(type, [127, 70, 76, 65, 67])) {
        return {
          ext: "oga",
          mime: "audio/ogg"
        };
      }
      if (_check(type, [83, 112, 101, 101, 120, 32, 32])) {
        return {
          ext: "spx",
          mime: "audio/ogg"
        };
      }
      if (_check(type, [1, 118, 111, 114, 98, 105, 115])) {
        return {
          ext: "ogg",
          mime: "audio/ogg"
        };
      }
      return {
        ext: "ogx",
        mime: "application/ogg"
      };
    }
    if (this.check([80, 75]) && (this.buffer[2] === 3 || this.buffer[2] === 5 || this.buffer[2] === 7) && (this.buffer[3] === 4 || this.buffer[3] === 6 || this.buffer[3] === 8)) {
      return {
        ext: "zip",
        mime: "application/zip"
      };
    }
    if (this.checkString("MThd")) {
      return {
        ext: "mid",
        mime: "audio/midi"
      };
    }
    if (this.checkString("wOFF") && (this.check([0, 1, 0, 0], { offset: 4 }) || this.checkString("OTTO", { offset: 4 }))) {
      return {
        ext: "woff",
        mime: "font/woff"
      };
    }
    if (this.checkString("wOF2") && (this.check([0, 1, 0, 0], { offset: 4 }) || this.checkString("OTTO", { offset: 4 }))) {
      return {
        ext: "woff2",
        mime: "font/woff2"
      };
    }
    if (this.check([212, 195, 178, 161]) || this.check([161, 178, 195, 212])) {
      return {
        ext: "pcap",
        mime: "application/vnd.tcpdump.pcap"
      };
    }
    if (this.checkString("DSD ")) {
      return {
        ext: "dsf",
        mime: "audio/x-dsf"
        // Non-standard
      };
    }
    if (this.checkString("LZIP")) {
      return {
        ext: "lz",
        mime: "application/x-lzip"
      };
    }
    if (this.checkString("fLaC")) {
      return {
        ext: "flac",
        mime: "audio/flac"
      };
    }
    if (this.check([66, 80, 71, 251])) {
      return {
        ext: "bpg",
        mime: "image/bpg"
      };
    }
    if (this.checkString("wvpk")) {
      return {
        ext: "wv",
        mime: "audio/wavpack"
      };
    }
    if (this.checkString("%PDF")) {
      return {
        ext: "pdf",
        mime: "application/pdf"
      };
    }
    if (this.check([0, 97, 115, 109])) {
      return {
        ext: "wasm",
        mime: "application/wasm"
      };
    }
    if (this.check([73, 73])) {
      const fileType = await this.readTiffHeader(false);
      if (fileType) {
        return fileType;
      }
    }
    if (this.check([77, 77])) {
      const fileType = await this.readTiffHeader(true);
      if (fileType) {
        return fileType;
      }
    }
    if (this.checkString("MAC ")) {
      return {
        ext: "ape",
        mime: "audio/ape"
      };
    }
    if (this.check([26, 69, 223, 163])) {
      async function readField() {
        const msb = await tokenizer.peekNumber(UINT8);
        let mask = 128;
        let ic = 0;
        while ((msb & mask) === 0 && mask !== 0) {
          ++ic;
          mask >>= 1;
        }
        const id = new Uint8Array(ic + 1);
        await tokenizer.readBuffer(id);
        return id;
      }
      async function readElement() {
        const idField = await readField();
        const lengthField = await readField();
        lengthField[0] ^= 128 >> lengthField.length - 1;
        const nrLength = Math.min(6, lengthField.length);
        const idView = new DataView(idField.buffer);
        const lengthView = new DataView(lengthField.buffer, lengthField.length - nrLength, nrLength);
        return {
          id: getUintBE(idView),
          len: getUintBE(lengthView)
        };
      }
      async function readChildren(children) {
        while (children > 0) {
          const element = await readElement();
          if (element.id === 17026) {
            const rawValue = await tokenizer.readToken(new StringType(element.len));
            return rawValue.replaceAll(/\00.*$/g, "");
          }
          await tokenizer.ignore(element.len);
          --children;
        }
      }
      const re = await readElement();
      const documentType = await readChildren(re.len);
      switch (documentType) {
        case "webm":
          return {
            ext: "webm",
            mime: "video/webm"
          };
        case "matroska":
          return {
            ext: "mkv",
            mime: "video/matroska"
          };
        default:
          return;
      }
    }
    if (this.checkString("SQLi")) {
      return {
        ext: "sqlite",
        mime: "application/x-sqlite3"
      };
    }
    if (this.check([78, 69, 83, 26])) {
      return {
        ext: "nes",
        mime: "application/x-nintendo-nes-rom"
      };
    }
    if (this.checkString("Cr24")) {
      return {
        ext: "crx",
        mime: "application/x-google-chrome-extension"
      };
    }
    if (this.checkString("MSCF") || this.checkString("ISc(")) {
      return {
        ext: "cab",
        mime: "application/vnd.ms-cab-compressed"
      };
    }
    if (this.check([237, 171, 238, 219])) {
      return {
        ext: "rpm",
        mime: "application/x-rpm"
      };
    }
    if (this.check([197, 208, 211, 198])) {
      return {
        ext: "eps",
        mime: "application/eps"
      };
    }
    if (this.check([40, 181, 47, 253])) {
      return {
        ext: "zst",
        mime: "application/zstd"
      };
    }
    if (this.check([127, 69, 76, 70])) {
      return {
        ext: "elf",
        mime: "application/x-elf"
      };
    }
    if (this.check([33, 66, 68, 78])) {
      return {
        ext: "pst",
        mime: "application/vnd.ms-outlook"
      };
    }
    if (this.checkString("PAR1") || this.checkString("PARE")) {
      return {
        ext: "parquet",
        mime: "application/vnd.apache.parquet"
      };
    }
    if (this.checkString("ttcf")) {
      return {
        ext: "ttc",
        mime: "font/collection"
      };
    }
    if (this.check([207, 250, 237, 254])) {
      return {
        ext: "macho",
        mime: "application/x-mach-binary"
      };
    }
    if (this.check([4, 34, 77, 24])) {
      return {
        ext: "lz4",
        mime: "application/x-lz4"
        // Invented by us
      };
    }
    if (this.check([79, 84, 84, 79, 0])) {
      return {
        ext: "otf",
        mime: "font/otf"
      };
    }
    if (this.checkString("#!AMR")) {
      return {
        ext: "amr",
        mime: "audio/amr"
      };
    }
    if (this.checkString("{\\rtf")) {
      return {
        ext: "rtf",
        mime: "application/rtf"
      };
    }
    if (this.check([70, 76, 86, 1])) {
      return {
        ext: "flv",
        mime: "video/x-flv"
      };
    }
    if (this.checkString("IMPM")) {
      return {
        ext: "it",
        mime: "audio/x-it"
      };
    }
    if (this.checkString("-lh0-", { offset: 2 }) || this.checkString("-lh1-", { offset: 2 }) || this.checkString("-lh2-", { offset: 2 }) || this.checkString("-lh3-", { offset: 2 }) || this.checkString("-lh4-", { offset: 2 }) || this.checkString("-lh5-", { offset: 2 }) || this.checkString("-lh6-", { offset: 2 }) || this.checkString("-lh7-", { offset: 2 }) || this.checkString("-lzs-", { offset: 2 }) || this.checkString("-lz4-", { offset: 2 }) || this.checkString("-lz5-", { offset: 2 }) || this.checkString("-lhd-", { offset: 2 })) {
      return {
        ext: "lzh",
        mime: "application/x-lzh-compressed"
      };
    }
    if (this.check([0, 0, 1, 186])) {
      if (this.check([33], { offset: 4, mask: [241] })) {
        return {
          ext: "mpg",
          // May also be .ps, .mpeg
          mime: "video/MP1S"
        };
      }
      if (this.check([68], { offset: 4, mask: [196] })) {
        return {
          ext: "mpg",
          // May also be .mpg, .m2p, .vob or .sub
          mime: "video/MP2P"
        };
      }
    }
    if (this.checkString("ITSF")) {
      return {
        ext: "chm",
        mime: "application/vnd.ms-htmlhelp"
      };
    }
    if (this.check([202, 254, 186, 190])) {
      return {
        ext: "class",
        mime: "application/java-vm"
      };
    }
    if (this.checkString(".RMF")) {
      return {
        ext: "rm",
        mime: "application/vnd.rn-realmedia"
      };
    }
    if (this.checkString("DRACO")) {
      return {
        ext: "drc",
        mime: "application/vnd.google.draco"
        // Invented by us
      };
    }
    if (this.check([253, 55, 122, 88, 90, 0])) {
      return {
        ext: "xz",
        mime: "application/x-xz"
      };
    }
    if (this.checkString("<?xml ")) {
      return {
        ext: "xml",
        mime: "application/xml"
      };
    }
    if (this.check([55, 122, 188, 175, 39, 28])) {
      return {
        ext: "7z",
        mime: "application/x-7z-compressed"
      };
    }
    if (this.check([82, 97, 114, 33, 26, 7]) && (this.buffer[6] === 0 || this.buffer[6] === 1)) {
      return {
        ext: "rar",
        mime: "application/x-rar-compressed"
      };
    }
    if (this.checkString("solid ")) {
      return {
        ext: "stl",
        mime: "model/stl"
      };
    }
    if (this.checkString("AC")) {
      const version = new StringType(4, "latin1").get(this.buffer, 2);
      if (version.match("^d*") && version >= 1e3 && version <= 1050) {
        return {
          ext: "dwg",
          mime: "image/vnd.dwg"
        };
      }
    }
    if (this.checkString("070707")) {
      return {
        ext: "cpio",
        mime: "application/x-cpio"
      };
    }
    if (this.checkString("BLENDER")) {
      return {
        ext: "blend",
        mime: "application/x-blender"
      };
    }
    if (this.checkString("!<arch>")) {
      await tokenizer.ignore(8);
      const string = await tokenizer.readToken(new StringType(13, "ascii"));
      if (string === "debian-binary") {
        return {
          ext: "deb",
          mime: "application/x-deb"
        };
      }
      return {
        ext: "ar",
        mime: "application/x-unix-archive"
      };
    }
    if (this.checkString("WEBVTT") && // One of LF, CR, tab, space, or end of file must follow "WEBVTT" per the spec (see `fixture/fixture-vtt-*.vtt` for examples). Note that `\0` is technically the null character (there is no such thing as an EOF character). However, checking for `\0` gives us the same result as checking for the end of the stream.
    ["\n", "\r", "	", " ", "\0"].some((char7) => this.checkString(char7, { offset: 6 }))) {
      return {
        ext: "vtt",
        mime: "text/vtt"
      };
    }
    if (this.check([137, 80, 78, 71, 13, 10, 26, 10])) {
      await tokenizer.ignore(8);
      async function readChunkHeader() {
        return {
          length: await tokenizer.readToken(INT32_BE),
          type: await tokenizer.readToken(new StringType(4, "latin1"))
        };
      }
      do {
        const chunk = await readChunkHeader();
        if (chunk.length < 0) {
          return;
        }
        switch (chunk.type) {
          case "IDAT":
            return {
              ext: "png",
              mime: "image/png"
            };
          case "acTL":
            return {
              ext: "apng",
              mime: "image/apng"
            };
          default:
            await tokenizer.ignore(chunk.length + 4);
        }
      } while (tokenizer.position + 8 < tokenizer.fileInfo.size);
      return {
        ext: "png",
        mime: "image/png"
      };
    }
    if (this.check([65, 82, 82, 79, 87, 49, 0, 0])) {
      return {
        ext: "arrow",
        mime: "application/vnd.apache.arrow.file"
      };
    }
    if (this.check([103, 108, 84, 70, 2, 0, 0, 0])) {
      return {
        ext: "glb",
        mime: "model/gltf-binary"
      };
    }
    if (this.check([102, 114, 101, 101], { offset: 4 }) || this.check([109, 100, 97, 116], { offset: 4 }) || this.check([109, 111, 111, 118], { offset: 4 }) || this.check([119, 105, 100, 101], { offset: 4 })) {
      return {
        ext: "mov",
        mime: "video/quicktime"
      };
    }
    if (this.check([73, 73, 82, 79, 8, 0, 0, 0, 24])) {
      return {
        ext: "orf",
        mime: "image/x-olympus-orf"
      };
    }
    if (this.checkString("gimp xcf ")) {
      return {
        ext: "xcf",
        mime: "image/x-xcf"
      };
    }
    if (this.checkString("ftyp", { offset: 4 }) && (this.buffer[8] & 96) !== 0) {
      const brandMajor = new StringType(4, "latin1").get(this.buffer, 8).replace("\0", " ").trim();
      switch (brandMajor) {
        case "avif":
        case "avis":
          return { ext: "avif", mime: "image/avif" };
        case "mif1":
          return { ext: "heic", mime: "image/heif" };
        case "msf1":
          return { ext: "heic", mime: "image/heif-sequence" };
        case "heic":
        case "heix":
          return { ext: "heic", mime: "image/heic" };
        case "hevc":
        case "hevx":
          return { ext: "heic", mime: "image/heic-sequence" };
        case "qt":
          return { ext: "mov", mime: "video/quicktime" };
        case "M4V":
        case "M4VH":
        case "M4VP":
          return { ext: "m4v", mime: "video/x-m4v" };
        case "M4P":
          return { ext: "m4p", mime: "video/mp4" };
        case "M4B":
          return { ext: "m4b", mime: "audio/mp4" };
        case "M4A":
          return { ext: "m4a", mime: "audio/x-m4a" };
        case "F4V":
          return { ext: "f4v", mime: "video/mp4" };
        case "F4P":
          return { ext: "f4p", mime: "video/mp4" };
        case "F4A":
          return { ext: "f4a", mime: "audio/mp4" };
        case "F4B":
          return { ext: "f4b", mime: "audio/mp4" };
        case "crx":
          return { ext: "cr3", mime: "image/x-canon-cr3" };
        default:
          if (brandMajor.startsWith("3g")) {
            if (brandMajor.startsWith("3g2")) {
              return { ext: "3g2", mime: "video/3gpp2" };
            }
            return { ext: "3gp", mime: "video/3gpp" };
          }
          return { ext: "mp4", mime: "video/mp4" };
      }
    }
    if (this.check([82, 73, 70, 70])) {
      if (this.checkString("WEBP", { offset: 8 })) {
        return {
          ext: "webp",
          mime: "image/webp"
        };
      }
      if (this.check([65, 86, 73], { offset: 8 })) {
        return {
          ext: "avi",
          mime: "video/vnd.avi"
        };
      }
      if (this.check([87, 65, 86, 69], { offset: 8 })) {
        return {
          ext: "wav",
          mime: "audio/wav"
        };
      }
      if (this.check([81, 76, 67, 77], { offset: 8 })) {
        return {
          ext: "qcp",
          mime: "audio/qcelp"
        };
      }
    }
    if (this.check([73, 73, 85, 0, 24, 0, 0, 0, 136, 231, 116, 216])) {
      return {
        ext: "rw2",
        mime: "image/x-panasonic-rw2"
      };
    }
    if (this.check([48, 38, 178, 117, 142, 102, 207, 17, 166, 217])) {
      async function readHeader() {
        const guid = new Uint8Array(16);
        await tokenizer.readBuffer(guid);
        return {
          id: guid,
          size: Number(await tokenizer.readToken(UINT64_LE))
        };
      }
      await tokenizer.ignore(30);
      while (tokenizer.position + 24 < tokenizer.fileInfo.size) {
        const header = await readHeader();
        let payload = header.size - 24;
        if (_check(header.id, [145, 7, 220, 183, 183, 169, 207, 17, 142, 230, 0, 192, 12, 32, 83, 101])) {
          const typeId = new Uint8Array(16);
          payload -= await tokenizer.readBuffer(typeId);
          if (_check(typeId, [64, 158, 105, 248, 77, 91, 207, 17, 168, 253, 0, 128, 95, 92, 68, 43])) {
            return {
              ext: "asf",
              mime: "audio/x-ms-asf"
            };
          }
          if (_check(typeId, [192, 239, 25, 188, 77, 91, 207, 17, 168, 253, 0, 128, 95, 92, 68, 43])) {
            return {
              ext: "asf",
              mime: "video/x-ms-asf"
            };
          }
          break;
        }
        await tokenizer.ignore(payload);
      }
      return {
        ext: "asf",
        mime: "application/vnd.ms-asf"
      };
    }
    if (this.check([171, 75, 84, 88, 32, 49, 49, 187, 13, 10, 26, 10])) {
      return {
        ext: "ktx",
        mime: "image/ktx"
      };
    }
    if ((this.check([126, 16, 4]) || this.check([126, 24, 4])) && this.check([48, 77, 73, 69], { offset: 4 })) {
      return {
        ext: "mie",
        mime: "application/x-mie"
      };
    }
    if (this.check([39, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], { offset: 2 })) {
      return {
        ext: "shp",
        mime: "application/x-esri-shape"
      };
    }
    if (this.check([255, 79, 255, 81])) {
      return {
        ext: "j2c",
        mime: "image/j2c"
      };
    }
    if (this.check([0, 0, 0, 12, 106, 80, 32, 32, 13, 10, 135, 10])) {
      await tokenizer.ignore(20);
      const type = await tokenizer.readToken(new StringType(4, "ascii"));
      switch (type) {
        case "jp2 ":
          return {
            ext: "jp2",
            mime: "image/jp2"
          };
        case "jpx ":
          return {
            ext: "jpx",
            mime: "image/jpx"
          };
        case "jpm ":
          return {
            ext: "jpm",
            mime: "image/jpm"
          };
        case "mjp2":
          return {
            ext: "mj2",
            mime: "image/mj2"
          };
        default:
          return;
      }
    }
    if (this.check([255, 10]) || this.check([0, 0, 0, 12, 74, 88, 76, 32, 13, 10, 135, 10])) {
      return {
        ext: "jxl",
        mime: "image/jxl"
      };
    }
    if (this.check([254, 255])) {
      if (this.check([0, 60, 0, 63, 0, 120, 0, 109, 0, 108], { offset: 2 })) {
        return {
          ext: "xml",
          mime: "application/xml"
        };
      }
      return void 0;
    }
    if (this.check([208, 207, 17, 224, 161, 177, 26, 225])) {
      return {
        ext: "cfb",
        mime: "application/x-cfb"
      };
    }
    await tokenizer.peekBuffer(this.buffer, { length: Math.min(256, tokenizer.fileInfo.size), mayBeLess: true });
    if (this.check([97, 99, 115, 112], { offset: 36 })) {
      return {
        ext: "icc",
        mime: "application/vnd.iccprofile"
      };
    }
    if (this.checkString("**ACE", { offset: 7 }) && this.checkString("**", { offset: 12 })) {
      return {
        ext: "ace",
        mime: "application/x-ace-compressed"
      };
    }
    if (this.checkString("BEGIN:")) {
      if (this.checkString("VCARD", { offset: 6 })) {
        return {
          ext: "vcf",
          mime: "text/vcard"
        };
      }
      if (this.checkString("VCALENDAR", { offset: 6 })) {
        return {
          ext: "ics",
          mime: "text/calendar"
        };
      }
    }
    if (this.checkString("FUJIFILMCCD-RAW")) {
      return {
        ext: "raf",
        mime: "image/x-fujifilm-raf"
      };
    }
    if (this.checkString("Extended Module:")) {
      return {
        ext: "xm",
        mime: "audio/x-xm"
      };
    }
    if (this.checkString("Creative Voice File")) {
      return {
        ext: "voc",
        mime: "audio/x-voc"
      };
    }
    if (this.check([4, 0, 0, 0]) && this.buffer.length >= 16) {
      const jsonSize = new DataView(this.buffer.buffer).getUint32(12, true);
      if (jsonSize > 12 && this.buffer.length >= jsonSize + 16) {
        try {
          const header = new TextDecoder().decode(this.buffer.subarray(16, jsonSize + 16));
          const json = JSON.parse(header);
          if (json.files) {
            return {
              ext: "asar",
              mime: "application/x-asar"
            };
          }
        } catch {
        }
      }
    }
    if (this.check([6, 14, 43, 52, 2, 5, 1, 1, 13, 1, 2, 1, 1, 2])) {
      return {
        ext: "mxf",
        mime: "application/mxf"
      };
    }
    if (this.checkString("SCRM", { offset: 44 })) {
      return {
        ext: "s3m",
        mime: "audio/x-s3m"
      };
    }
    if (this.check([71]) && this.check([71], { offset: 188 })) {
      return {
        ext: "mts",
        mime: "video/mp2t"
      };
    }
    if (this.check([71], { offset: 4 }) && this.check([71], { offset: 196 })) {
      return {
        ext: "mts",
        mime: "video/mp2t"
      };
    }
    if (this.check([66, 79, 79, 75, 77, 79, 66, 73], { offset: 60 })) {
      return {
        ext: "mobi",
        mime: "application/x-mobipocket-ebook"
      };
    }
    if (this.check([68, 73, 67, 77], { offset: 128 })) {
      return {
        ext: "dcm",
        mime: "application/dicom"
      };
    }
    if (this.check([76, 0, 0, 0, 1, 20, 2, 0, 0, 0, 0, 0, 192, 0, 0, 0, 0, 0, 0, 70])) {
      return {
        ext: "lnk",
        mime: "application/x.ms.shortcut"
        // Invented by us
      };
    }
    if (this.check([98, 111, 111, 107, 0, 0, 0, 0, 109, 97, 114, 107, 0, 0, 0, 0])) {
      return {
        ext: "alias",
        mime: "application/x.apple.alias"
        // Invented by us
      };
    }
    if (this.checkString("Kaydara FBX Binary  \0")) {
      return {
        ext: "fbx",
        mime: "application/x.autodesk.fbx"
        // Invented by us
      };
    }
    if (this.check([76, 80], { offset: 34 }) && (this.check([0, 0, 1], { offset: 8 }) || this.check([1, 0, 2], { offset: 8 }) || this.check([2, 0, 2], { offset: 8 }))) {
      return {
        ext: "eot",
        mime: "application/vnd.ms-fontobject"
      };
    }
    if (this.check([6, 6, 237, 245, 216, 29, 70, 229, 189, 49, 239, 231, 254, 116, 183, 29])) {
      return {
        ext: "indd",
        mime: "application/x-indesign"
      };
    }
    await tokenizer.peekBuffer(this.buffer, { length: Math.min(512, tokenizer.fileInfo.size), mayBeLess: true });
    if (this.checkString("ustar", { offset: 257 }) && (this.checkString("\0", { offset: 262 }) || this.checkString(" ", { offset: 262 })) || this.check([0, 0, 0, 0, 0, 0], { offset: 257 }) && tarHeaderChecksumMatches(this.buffer)) {
      return {
        ext: "tar",
        mime: "application/x-tar"
      };
    }
    if (this.check([255, 254])) {
      if (this.check([60, 0, 63, 0, 120, 0, 109, 0, 108, 0], { offset: 2 })) {
        return {
          ext: "xml",
          mime: "application/xml"
        };
      }
      if (this.check([255, 14, 83, 0, 107, 0, 101, 0, 116, 0, 99, 0, 104, 0, 85, 0, 112, 0, 32, 0, 77, 0, 111, 0, 100, 0, 101, 0, 108, 0], { offset: 2 })) {
        return {
          ext: "skp",
          mime: "application/vnd.sketchup.skp"
        };
      }
      return void 0;
    }
    if (this.checkString("-----BEGIN PGP MESSAGE-----")) {
      return {
        ext: "pgp",
        mime: "application/pgp-encrypted"
      };
    }
  };
  // Detections with limited supporting data, resulting in a higher likelihood of false positives
  detectImprecise = async (tokenizer) => {
    this.buffer = new Uint8Array(reasonableDetectionSizeInBytes);
    await tokenizer.peekBuffer(this.buffer, { length: Math.min(8, tokenizer.fileInfo.size), mayBeLess: true });
    if (this.check([0, 0, 1, 186]) || this.check([0, 0, 1, 179])) {
      return {
        ext: "mpg",
        mime: "video/mpeg"
      };
    }
    if (this.check([0, 1, 0, 0, 0])) {
      return {
        ext: "ttf",
        mime: "font/ttf"
      };
    }
    if (this.check([0, 0, 1, 0])) {
      return {
        ext: "ico",
        mime: "image/x-icon"
      };
    }
    if (this.check([0, 0, 2, 0])) {
      return {
        ext: "cur",
        mime: "image/x-icon"
      };
    }
    await tokenizer.peekBuffer(this.buffer, { length: Math.min(2 + this.options.mpegOffsetTolerance, tokenizer.fileInfo.size), mayBeLess: true });
    if (this.buffer.length >= 2 + this.options.mpegOffsetTolerance) {
      for (let depth = 0; depth <= this.options.mpegOffsetTolerance; ++depth) {
        const type = this.scanMpeg(depth);
        if (type) {
          return type;
        }
      }
    }
  };
  async readTiffTag(bigEndian) {
    const tagId = await this.tokenizer.readToken(bigEndian ? UINT16_BE : UINT16_LE);
    this.tokenizer.ignore(10);
    switch (tagId) {
      case 50341:
        return {
          ext: "arw",
          mime: "image/x-sony-arw"
        };
      case 50706:
        return {
          ext: "dng",
          mime: "image/x-adobe-dng"
        };
      default:
    }
  }
  async readTiffIFD(bigEndian) {
    const numberOfTags = await this.tokenizer.readToken(bigEndian ? UINT16_BE : UINT16_LE);
    for (let n = 0; n < numberOfTags; ++n) {
      const fileType = await this.readTiffTag(bigEndian);
      if (fileType) {
        return fileType;
      }
    }
  }
  async readTiffHeader(bigEndian) {
    const version = (bigEndian ? UINT16_BE : UINT16_LE).get(this.buffer, 2);
    const ifdOffset = (bigEndian ? UINT32_BE : UINT32_LE).get(this.buffer, 4);
    if (version === 42) {
      if (ifdOffset >= 6) {
        if (this.checkString("CR", { offset: 8 })) {
          return {
            ext: "cr2",
            mime: "image/x-canon-cr2"
          };
        }
        if (ifdOffset >= 8) {
          const someId1 = (bigEndian ? UINT16_BE : UINT16_LE).get(this.buffer, 8);
          const someId2 = (bigEndian ? UINT16_BE : UINT16_LE).get(this.buffer, 10);
          if (someId1 === 28 && someId2 === 254 || someId1 === 31 && someId2 === 11) {
            return {
              ext: "nef",
              mime: "image/x-nikon-nef"
            };
          }
        }
      }
      await this.tokenizer.ignore(ifdOffset);
      const fileType = await this.readTiffIFD(bigEndian);
      return fileType ?? {
        ext: "tif",
        mime: "image/tiff"
      };
    }
    if (version === 43) {
      return {
        ext: "tif",
        mime: "image/tiff"
      };
    }
  }
  /**
  	Scan check MPEG 1 or 2 Layer 3 header, or 'layer 0' for ADTS (MPEG sync-word 0xFFE).
  
  	@param offset - Offset to scan for sync-preamble.
  	@returns {{ext: string, mime: string}}
  	*/
  scanMpeg(offset) {
    if (this.check([255, 224], { offset, mask: [255, 224] })) {
      if (this.check([16], { offset: offset + 1, mask: [22] })) {
        if (this.check([8], { offset: offset + 1, mask: [8] })) {
          return {
            ext: "aac",
            mime: "audio/aac"
          };
        }
        return {
          ext: "aac",
          mime: "audio/aac"
        };
      }
      if (this.check([2], { offset: offset + 1, mask: [6] })) {
        return {
          ext: "mp3",
          mime: "audio/mpeg"
        };
      }
      if (this.check([4], { offset: offset + 1, mask: [6] })) {
        return {
          ext: "mp2",
          mime: "audio/mpeg"
        };
      }
      if (this.check([6], { offset: offset + 1, mask: [6] })) {
        return {
          ext: "mp1",
          mime: "audio/mpeg"
        };
      }
    }
  }
};
var supportedExtensions = new Set(extensions);
var supportedMimeTypes = new Set(mimeTypes);

// lib/index.js
var AWS_ALGORITHM = "AWS4-HMAC-SHA256";
var AWS_REQUEST_TYPE = "aws4_request";
var S3_SERVICE = "s3";
var LIST_TYPE = "2";
var UNSIGNED_PAYLOAD = "UNSIGNED-PAYLOAD";
var DEFAULT_STREAM_CONTENT_TYPE = "application/octet-stream";
var XML_CONTENT_TYPE = "application/xml";
var JSON_CONTENT_TYPE = "application/json";
var RETRYABLE_STATUS_CODES = [503];
var MAX_RETRY_ATTEMPTS = 3;
var INITIAL_RETRY_DELAY_MS = 250;
var SENSITIVE_KEYS_REDACTED = ["accessKeyId", "secretAccessKey", "sessionToken", "password"];
var MIN_MAX_REQUEST_SIZE_IN_BYTES = 5 * 1024 * 1024;
var HEADER_AMZ_CONTENT_SHA256 = "x-amz-content-sha256";
var HEADER_AMZ_DATE = "x-amz-date";
var HEADER_HOST = "host";
var HEADER_AUTHORIZATION = "Authorization";
var HEADER_CONTENT_TYPE = "Content-Type";
var HEADER_CONTENT_LENGTH = "Content-Length";
var HEADER_ETAG = "etag";
var HEADER_LAST_MODIFIED = "last-modified";
var ERROR_PREFIX = "ultralight-s3 Module: ";
var ERROR_ACCESS_KEY_REQUIRED = `${ERROR_PREFIX}accessKeyId must be a non-empty string`;
var ERROR_SECRET_KEY_REQUIRED = `${ERROR_PREFIX}secretAccessKey must be a non-empty string`;
var ERROR_ENDPOINT_REQUIRED = `${ERROR_PREFIX}endpoint must be a non-empty string`;
var ERROR_BUCKET_NAME_REQUIRED = `${ERROR_PREFIX}bucketName must be a non-empty string`;
var ERROR_KEY_REQUIRED = `${ERROR_PREFIX}key must be a non-empty string`;
var ERROR_UPLOAD_ID_REQUIRED = `${ERROR_PREFIX}uploadId must be a non-empty string`;
var ERROR_PARTS_REQUIRED = `${ERROR_PREFIX}parts must be a non-empty array`;
var ERROR_INVALID_PART = `${ERROR_PREFIX}Each part must have a partNumber (number) and ETag (string)`;
var ERROR_DATA_BUFFER_REQUIRED = `${ERROR_PREFIX}data must be a Buffer or string`;
var ERROR_PREFIX_TYPE = `${ERROR_PREFIX}prefix must be a string`;
var ERROR_MAX_KEYS_TYPE = `${ERROR_PREFIX}maxKeys must be a positive integer`;
var ERROR_DELIMITER_REQUIRED = `${ERROR_PREFIX}delimiter must be a string`;
var _createHmac = crypto.createHmac;
var _createHash = crypto.createHash;
var nodeCryptoPromise = null;
var ensureNodeCrypto = async () => {
  if (_createHmac && _createHash) {
    return;
  }
  if (!nodeCryptoPromise) {
    nodeCryptoPromise = import("node:crypto");
  }
  const nodeCrypto = await nodeCryptoPromise.catch((error) => {
    throw new Error(`ultralight-S3 Module: Crypto functions are not available in this runtime. ${error instanceof Error ? error.message : String(error)}`);
  });
  _createHmac || (_createHmac = nodeCrypto.createHmac);
  _createHash || (_createHash = nodeCrypto.createHash);
};
var expectArray = {
  contents: true
};
var encodeAsHex = (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`;
var uriEscape = (uriStr) => {
  return encodeURIComponent(uriStr).replace(/[!'()*]/g, encodeAsHex);
};
var uriResourceEscape = (string) => {
  return uriEscape(string).replace(/%2F/g, "/");
};
var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var S3 = class {
  constructor({ accessKeyId, secretAccessKey, endpoint, bucketName, region = "auto", maxRequestSizeInBytes = MIN_MAX_REQUEST_SIZE_IN_BYTES, requestAbortTimeout = void 0, logger = void 0 }) {
    this.getBucketName = () => this.bucketName;
    this.setBucketName = (bucketName2) => {
      this.bucketName = bucketName2;
    };
    this.getRegion = () => this.region;
    this.setRegion = (region2) => {
      this.region = region2;
    };
    this.getEndpoint = () => this.endpoint;
    this.setEndpoint = (endpoint2) => {
      this.endpoint = endpoint2;
    };
    this.getMaxRequestSizeInBytes = () => this.maxRequestSizeInBytes;
    this.setMaxRequestSizeInBytes = (maxRequestSizeInBytes2) => {
      this.maxRequestSizeInBytes = maxRequestSizeInBytes2;
    };
    this.sanitizeETag = (etag) => sanitizeETag(etag);
    this.getProps = () => ({
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
      region: this.region,
      bucket: this.bucketName,
      endpoint: this.endpoint,
      maxRequestSizeInBytes: this.maxRequestSizeInBytes,
      requestAbortTimeout: this.requestAbortTimeout,
      logger: this.logger
    });
    this.setProps = (props) => {
      this._validateConstructorParams(props.accessKeyId, props.secretAccessKey, props.bucketName, props.endpoint);
      this.accessKeyId = props.accessKeyId;
      this.secretAccessKey = props.secretAccessKey;
      this.region = props.region || "auto";
      this.bucketName = props.bucketName;
      this.endpoint = props.endpoint;
      this.maxRequestSizeInBytes = props.maxRequestSizeInBytes || MIN_MAX_REQUEST_SIZE_IN_BYTES;
      this.requestAbortTimeout = props.requestAbortTimeout;
      this.logger = props.logger;
    };
    this._validateConstructorParams(accessKeyId, secretAccessKey, endpoint, bucketName);
    this.accessKeyId = accessKeyId;
    this.secretAccessKey = secretAccessKey;
    this.endpoint = endpoint;
    this.bucketName = bucketName;
    this.region = region;
    this.maxRequestSizeInBytes = maxRequestSizeInBytes;
    this.requestAbortTimeout = requestAbortTimeout;
    this.logger = logger;
  }
  _validateConstructorParams(accessKeyId, secretAccessKey, endpoint, bucketName) {
    if (typeof accessKeyId !== "string" || accessKeyId.trim().length === 0)
      throw new TypeError(ERROR_ACCESS_KEY_REQUIRED);
    if (typeof secretAccessKey !== "string" || secretAccessKey.trim().length === 0)
      throw new TypeError(ERROR_SECRET_KEY_REQUIRED);
    if (typeof endpoint !== "string" || endpoint.trim().length === 0)
      throw new TypeError(ERROR_ENDPOINT_REQUIRED);
    if (typeof bucketName !== "string" || bucketName.trim().length === 0)
      throw new TypeError(ERROR_BUCKET_NAME_REQUIRED);
  }
  _checkMethodHeadnGet(method) {
    if (method !== "GET" && method !== "HEAD") {
      this._log("error", `${ERROR_PREFIX}method must be either GET or HEAD`);
      throw new Error("method must be either GET or HEAD");
    }
  }
  _checkKey(key) {
    if (typeof key !== "string" || key.trim().length === 0) {
      this._log("error", ERROR_KEY_REQUIRED);
      throw new TypeError(ERROR_KEY_REQUIRED);
    }
  }
  _checkDelimiter(delimiter) {
    if (typeof delimiter !== "string" || delimiter.trim().length === 0) {
      this._log("error", ERROR_DELIMITER_REQUIRED);
      throw new TypeError(ERROR_DELIMITER_REQUIRED);
    }
  }
  _checkPrefix(prefix) {
    if (typeof prefix !== "string") {
      this._log("error", ERROR_PREFIX_TYPE);
      throw new TypeError(ERROR_PREFIX_TYPE);
    }
  }
  _checkMaxKeys(maxKeys) {
    if (typeof maxKeys !== "number" || maxKeys <= 0) {
      this._log("error", ERROR_MAX_KEYS_TYPE);
      throw new TypeError(ERROR_MAX_KEYS_TYPE);
    }
  }
  _checkOpts(opts) {
    if (typeof opts !== "object") {
      this._log("error", `${ERROR_PREFIX}opts must be an object`);
      throw new TypeError(`${ERROR_PREFIX}opts must be an object`);
    }
  }
  /**
   * Internal method to log messages with sanitized sensitive information.
   * @param {string} level - The log level (e.g., 'info', 'warn', 'error').
   * @param {string} message - The message to log.
   * @param {Object} [additionalData={}] - Additional data to include in the log.
   * @private
   */
  _log(level, message, additionalData = {}) {
    if (this.logger && typeof this.logger[level] === "function") {
      const sanitize = (obj) => {
        if (typeof obj !== "object" || obj === null) {
          return obj;
        }
        return Object.keys(obj).reduce((acc, key) => {
          if (SENSITIVE_KEYS_REDACTED.includes(key.toLowerCase())) {
            acc[key] = "[REDACTED]";
          } else if (typeof obj[key] === "object" && obj[key] !== null) {
            acc[key] = sanitize(obj[key]);
          } else {
            acc[key] = obj[key];
          }
          return acc;
        }, Array.isArray(obj) ? [] : {});
      };
      const sanitizedData = sanitize(additionalData);
      const logEntry = {
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        level,
        message,
        ...sanitizedData,
        // Include some general context, but sanitize sensitive parts
        context: sanitize({
          bucketName: this.bucketName,
          region: this.region,
          endpoint: this.endpoint,
          // Only include the first few characters of the access key, if it exists
          accessKeyId: this.accessKeyId ? `${this.accessKeyId.substring(0, 4)}...` : void 0
        })
      };
      this.logger[level](logEntry);
    }
  }
  /**
   * Get the content length of an object.
   * @param {string} key - The key of the object.
   * @returns {Promise<Response | null>} The response of the object. If the object does not exist, null will be returned.
   * @throws {TypeError} If the key is not a non-empty string.
   */
  async getHead(key) {
    this._checkKey(key);
    const headers = {
      [HEADER_AMZ_CONTENT_SHA256]: UNSIGNED_PAYLOAD
    };
    const encodedKey = uriResourceEscape(key);
    const { url, headers: signedHeaders } = await this._sign("HEAD", encodedKey, {}, headers, "");
    const res = await this._sendRequest(url, "HEAD", signedHeaders, "", [200, 404, 403]);
    if (res.status === 404) {
      return null;
    } else if (!res.ok) {
      this._log("error", `Failed to get object. Status: ${res.status}`);
      throw new Error(`Failed to get object. Status: ${res.status}`);
    }
    return res;
  }
  /**
   * Check if a bucket exists.
   * @returns {Promise<boolean>} True if the bucket exists, false otherwise.
   */
  async bucketExists() {
    const headers = {
      [HEADER_AMZ_CONTENT_SHA256]: UNSIGNED_PAYLOAD
    };
    const { url, headers: signedHeaders } = await this._sign("HEAD", "", {}, headers, "");
    const res = await this._sendRequest(url, "HEAD", signedHeaders, "", [200, 404, 403]);
    this._log("error", `Response status: ${res.status, res.statusText}`);
    if (res.ok && res.status === 200) {
      return true;
    }
    return false;
  }
  // TBD
  async createBucket() {
    const xmlBody = `
    <CreateBucketConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
      <LocationConstraint>${this.region}</LocationConstraint>
    </CreateBucketConfiguration>
    `;
    const headers = {
      [HEADER_CONTENT_TYPE]: XML_CONTENT_TYPE,
      [HEADER_CONTENT_LENGTH]: Buffer.byteLength(xmlBody).toString(),
      [HEADER_AMZ_CONTENT_SHA256]: await _hash(xmlBody)
    };
    const encodedKey = encodeURI("");
    const { url, headers: signedHeaders } = await this._sign("PUT", encodedKey, {}, headers, "");
    const res = await this._sendRequest(url, "PUT", signedHeaders, xmlBody, [200, 404, 403]);
    if (res.ok && res.status === 200) {
      return true;
    }
    return false;
  }
  /**
   * Check if a file exists in the bucket.
   * @param {string} key - The key of the object.
   * @param {Object} [opts={}] - Additional options for the fileExists operation.
   * @returns {Promise<ExistResponseCode>} True if the file exists, false otherwise. 0 - Not found (404), 1 - Found (200), 2 - ETag mismatch (412).
   * @throws {TypeError} If the key is not a non-empty string.
   */
  async fileExists(key, opts = {}) {
    this._checkKey(key);
    const { filteredOpts, conditionalHeaders } = this._filterIfHeaders(opts);
    const headers = { [HEADER_AMZ_CONTENT_SHA256]: UNSIGNED_PAYLOAD, ...conditionalHeaders };
    const encodedKey = uriResourceEscape(key);
    const { url, headers: signedHeaders } = await this._sign("HEAD", encodedKey, filteredOpts, headers, "");
    try {
      const res = await this._sendRequest(url, "HEAD", signedHeaders, "", [200, 404, 412, 304]);
      if (res.status === 404) {
        return false;
      }
      if (res.status === 412 || res.status === 304) {
        return null;
      }
      if (res.ok && res.status === 200)
        return true;
      else
        this._handleErrorResponse(res);
      return false;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this._log("error", `${ERROR_PREFIX}Failed to check if file exists: ${errorMessage}`);
      throw new Error(`${ERROR_PREFIX}Failed to check if file exists: ${errorMessage}`);
    }
  }
  /**
  * Get the response of the HEAD request to a file.
  * @param {string} key - The key of the object.
  * @returns {Promise<number>} The content length of the object in bytes.
  * @throws {TypeError} If the key is not a non-empty string.
  */
  async getContentLength(key) {
    this._checkKey(key);
    const headers = {
      [HEADER_AMZ_CONTENT_SHA256]: UNSIGNED_PAYLOAD
    };
    const encodedKey = uriResourceEscape(key);
    const { url, headers: signedHeaders } = await this._sign("HEAD", encodedKey, {}, headers, "");
    const res = await this._sendRequest(url, "HEAD", signedHeaders);
    const contentLength = res.headers.get(HEADER_CONTENT_LENGTH);
    return contentLength ? parseInt(contentLength, 10) : 0;
  }
  async _sign(method, keyPath, query = {}, headers, body) {
    const datetime = (/* @__PURE__ */ new Date()).toISOString().replace(/[:-]|\.\d{3}/g, "");
    const url = typeof keyPath === "string" && keyPath.length > 0 ? new URL(keyPath, this.endpoint) : new URL(this.endpoint);
    url.pathname = `/${encodeURI(this.bucketName)}${url.pathname}`;
    headers[HEADER_AMZ_CONTENT_SHA256] = body ? await _hash(body) : UNSIGNED_PAYLOAD;
    headers[HEADER_AMZ_DATE] = datetime;
    headers[HEADER_HOST] = url.host;
    const canonicalHeaders = this._buildCanonicalHeaders(headers);
    const signedHeaders = Object.keys(headers).map((key) => key.toLowerCase()).sort().join(";");
    const canonicalRequest = await this._buildCanonicalRequest(method, url, query, canonicalHeaders, signedHeaders, body);
    const stringToSign = await this._buildStringToSign(datetime, canonicalRequest);
    const signature = await this._calculateSignature(datetime, stringToSign);
    const authorizationHeader = this._buildAuthorizationHeader(datetime, signedHeaders, signature);
    headers[HEADER_AUTHORIZATION] = authorizationHeader;
    return { url: url.toString(), headers };
  }
  _buildCanonicalHeaders(headers) {
    return Object.entries(headers).map(([key, value]) => `${key.toLowerCase()}:${String(value).trim()}`).sort().join("\n");
  }
  async _buildCanonicalRequest(method, url, query, canonicalHeaders, signedHeaders, body) {
    return [
      method,
      url.pathname,
      this._buildCanonicalQueryString(query),
      `${canonicalHeaders}
`,
      signedHeaders,
      body ? await _hash(body) : UNSIGNED_PAYLOAD
    ].join("\n");
  }
  async _buildStringToSign(datetime, canonicalRequest) {
    const credentialScope = [datetime.slice(0, 8), this.region, S3_SERVICE, AWS_REQUEST_TYPE].join("/");
    return [AWS_ALGORITHM, datetime, credentialScope, await _hash(canonicalRequest)].join("\n");
  }
  async _calculateSignature(datetime, stringToSign) {
    const signingKey = await this._getSignatureKey(datetime.slice(0, 8));
    return _hmac(signingKey, stringToSign, "hex");
  }
  _buildAuthorizationHeader(datetime, signedHeaders, signature) {
    const credentialScope = [datetime.slice(0, 8), this.region, S3_SERVICE, AWS_REQUEST_TYPE].join("/");
    return [
      `${AWS_ALGORITHM} Credential=${this.accessKeyId}/${credentialScope}`,
      `SignedHeaders=${signedHeaders}`,
      `Signature=${signature}`
    ].join(", ");
  }
  _filterIfHeaders(opts) {
    const filteredOpts = {};
    const conditionalHeaders = {};
    const ifHeaders = ["if-match", "if-none-match", "if-modified-since", "if-unmodified-since"];
    for (const [key, value] of Object.entries(opts)) {
      if (ifHeaders.includes(key)) {
        conditionalHeaders[key] = value;
      } else {
        filteredOpts[key] = value;
      }
    }
    return { filteredOpts, conditionalHeaders };
  }
  /**
   * List objects in the bucket.
   * @param {string} [delimiter='/'] - The delimiter to use for grouping objects in specific path.
   * @param {string} [prefix=''] - The prefix to filter objects in specific path.
   * @param {number} [maxKeys=1000] - The maximum number of keys to return.
   * @param {string} [method='GET'] - The HTTP method to use (GET or HEAD).
   * @param {Object} [opts={}] - Additional options for the list operation.
   * @returns {Promise<Object|Array>} The list of objects or object metadata.
   * @throws {TypeError} If any of the parameters are of incorrect type.
   */
  async list(delimiter = "/", prefix = "", maxKeys = 1e3, method = "GET", opts = {}) {
    this._checkDelimiter(delimiter);
    this._checkPrefix(prefix);
    this._checkMaxKeys(maxKeys);
    this._checkMethodHeadnGet(method);
    this._checkOpts(opts);
    this._log("info", `Listing objects in ${prefix}`);
    const query = {
      "list-type": LIST_TYPE,
      "max-keys": String(maxKeys),
      ...opts
    };
    if (prefix.length > 0) {
      query["prefix"] = prefix;
    }
    const headers = {
      [HEADER_CONTENT_TYPE]: JSON_CONTENT_TYPE,
      [HEADER_AMZ_CONTENT_SHA256]: UNSIGNED_PAYLOAD
    };
    const encodedKey = delimiter === "/" ? delimiter : uriEscape(delimiter);
    const { url, headers: signedHeaders } = await this._sign("GET", encodedKey, query, headers, "");
    const urlWithQuery = `${url}?${new URLSearchParams(query)}`;
    const res = await this._sendRequest(urlWithQuery, "GET", signedHeaders);
    const responseBody = await res.text();
    if (method === "HEAD") {
      const contentLength = res.headers.get(HEADER_CONTENT_LENGTH);
      const lastModified = res.headers.get(HEADER_LAST_MODIFIED);
      const etag = res.headers.get(HEADER_ETAG);
      return {
        size: contentLength ? +contentLength : void 0,
        mtime: lastModified ? new Date(lastModified) : void 0,
        ETag: etag || void 0
      };
    }
    const data = _parseXml(responseBody);
    const output = data.listBucketResult || data.error || data;
    return output.contents || output;
  }
  /**
   * List multipart uploads in the bucket.
   * @param {string} [delimiter='/'] - The delimiter to use for grouping objects in specific path.
   * @param {string} [prefix=''] - The prefix to filter objects in specific path.
   * @param {string} [method='GET'] - The HTTP method to use (GET or HEAD).
   * @param {Object} [opts={}] - Additional options for the list operation.
   * @returns {Promise<Object|Array>} The list of objects or object metadata.
   * @throws {TypeError} If any of the parameters are of incorrect type.
   */
  async listMultiPartUploads(delimiter = "/", prefix = "", method = "GET", opts = {}) {
    this._checkDelimiter(delimiter);
    this._checkPrefix(prefix);
    this._checkMethodHeadnGet(method);
    this._checkOpts(opts);
    this._log("info", `Listing multipart uploads in ${prefix}`);
    const query = {
      uploads: "",
      ...opts
    };
    const headers = {
      [HEADER_CONTENT_TYPE]: JSON_CONTENT_TYPE,
      [HEADER_AMZ_CONTENT_SHA256]: UNSIGNED_PAYLOAD
    };
    const encodedKey = delimiter === "/" ? delimiter : uriEscape(delimiter);
    const { url, headers: signedHeaders } = await this._sign("GET", encodedKey, query, headers, "");
    const urlWithQuery = `${url}?${new URLSearchParams(query)}`;
    const res = await this._sendRequest(urlWithQuery, "GET", signedHeaders);
    const responseBody = await res.text();
    if (method === "HEAD") {
      return {
        size: +(res.headers.get(HEADER_CONTENT_LENGTH) ?? "0"),
        mtime: new Date(res.headers.get(HEADER_LAST_MODIFIED) ?? ""),
        ETag: res.headers.get(HEADER_ETAG) ?? ""
      };
    }
    const data = _parseXml(responseBody);
    const output = data.listMultipartUploadsResult || data.error || data;
    return output.uploads || output;
  }
  /**
   * Get an object from the bucket.
   * @param {string} key - The key of the object to get.
   * @param {Object} [opts={}] - Additional options for the get operation.
   * @returns {Promise<Response | null>} The response of the object. If the object does not exist, null will be returned.
   */
  async get(key, opts = {}) {
    this._checkKey(key);
    this._log("info", `Getting object ${key}`);
    const { filteredOpts, conditionalHeaders } = this._filterIfHeaders(opts);
    const headers = {
      [HEADER_CONTENT_TYPE]: JSON_CONTENT_TYPE,
      [HEADER_AMZ_CONTENT_SHA256]: UNSIGNED_PAYLOAD,
      ...conditionalHeaders
    };
    const encodedKey = uriResourceEscape(key);
    const { url, headers: signedHeaders } = await this._sign("GET", encodedKey, filteredOpts, headers, "");
    const res = await this._sendRequest(url, "GET", signedHeaders, "", [200, 404, 412, 304]);
    if (res.status === 404 || res.status === 412 || res.status === 304) {
      this._log("error", `Failed to get object. Status: ${res.status}`);
      return null;
    }
    if (!res.ok) {
      this._log("error", `Failed to get object. Status: ${res.status}`);
      throw new Error(`Failed to get object. Status: ${res.status}`);
    }
    return res;
  }
  /**
   *
   * @param {string} key - The key of the object to get.
   * @param {Object} [opts={}] - Additional options for the get operation.
   * @returns {Promise<{ etag: string|null; data: string|null }>} The content of the object. If the object does not exist, etag and data will be null.
   */
  async getObjectWithETag(key, opts = {}) {
    this._checkKey(key);
    this._log("info", `Getting object ${key}`);
    const { filteredOpts, conditionalHeaders } = this._filterIfHeaders(opts);
    const headers = {
      [HEADER_CONTENT_TYPE]: JSON_CONTENT_TYPE,
      [HEADER_AMZ_CONTENT_SHA256]: UNSIGNED_PAYLOAD,
      ...conditionalHeaders
    };
    const encodedKey = uriResourceEscape(key);
    const { url, headers: signedHeaders } = await this._sign("GET", encodedKey, filteredOpts, headers, "");
    try {
      const res = await this._sendRequest(url, "GET", signedHeaders, "", [200, 404, 412, 304]);
      if (res.status === 404 || res.status === 412 || res.status === 304) {
        this._log("error", `Failed to get object. Status: ${res.status}`);
        return { etag: null, data: null };
      }
      if (!res.ok) {
        this._log("error", `Failed to get object. Status: ${res.status}`);
        throw new Error(`Failed to get object. Status: ${res.status}`);
      }
      const etag = res.headers.get("etag");
      if (!etag) {
        throw new Error("ETag not found in response headers");
      }
      const data = await res.text();
      return { etag: sanitizeETag(etag), data };
    } catch (error) {
      this._log("error", `Error getting object ${key} with ETag: ${error}`);
      throw error;
    }
  }
  /**
   * Get the ETag of an object.
   * @param {string} key - The key of the object to get.
   * @param {Object} [opts={}] - Additional options for the get operation.
   * @returns {Promise<string|null>} The ETag of the object or null if the object etag does not match.
   */
  async getEtag(key, opts = {}) {
    this._checkKey(key);
    this._log("info", `Getting etag object ${key}`);
    const { filteredOpts, conditionalHeaders } = this._filterIfHeaders(opts);
    const headers = {
      [HEADER_CONTENT_TYPE]: JSON_CONTENT_TYPE,
      [HEADER_AMZ_CONTENT_SHA256]: UNSIGNED_PAYLOAD,
      ...conditionalHeaders
    };
    const encodedKey = uriResourceEscape(key);
    const { url, headers: signedHeaders } = await this._sign("HEAD", encodedKey, filteredOpts, headers, "");
    const res = await this._sendRequest(url, "HEAD", signedHeaders, "", [200, 412, 304]);
    this._log("info", `Response status: ${res.status, res.statusText}`);
    if (res.status === 412 || res.status === 304) {
      return null;
    }
    const etag = res.headers.get("etag");
    if (!etag) {
      this._log("error", `ETag not found in response headers`);
      throw new Error(`ETag not found in response headers`);
    }
    return sanitizeETag(etag);
  }
  /**
   * Get a response of an object from the bucket.
   * @param {string} key - The key of the object to get.
   * @param {boolean} [wholeFile=true] - Whether to get the whole file or a part.
   * @param {number} [rangeFrom=0] - The range from to get if not getting the whole file.
   * @param {number} [rangeTo=this.maxRequestSizeInBytes] - The range to to get if not getting the whole file. Note: rangeTo is inclusive.
   * @param {Object} [opts={}] - Additional options for the get operation.
   * @returns {Promise<Response>} Response of the object content. Use readableStream() to get the stream from .body.
   */
  async getResponse(key, wholeFile = true, rangeFrom = 0, rangeTo = this.maxRequestSizeInBytes, opts = {}) {
    this._checkKey(key);
    const { filteredOpts, conditionalHeaders } = this._filterIfHeaders({ ...opts });
    const headers = {
      [HEADER_CONTENT_TYPE]: JSON_CONTENT_TYPE,
      [HEADER_AMZ_CONTENT_SHA256]: UNSIGNED_PAYLOAD,
      ...wholeFile ? {} : { range: `bytes=${rangeFrom}-${rangeTo - 1}` },
      ...conditionalHeaders
    };
    const encodedKey = uriResourceEscape(key);
    const { url, headers: signedHeaders } = await this._sign("GET", encodedKey, filteredOpts, headers, "");
    const urlWithQuery = `${url}?${new URLSearchParams(filteredOpts)}`;
    return this._sendRequest(urlWithQuery, "GET", signedHeaders);
  }
  /**
   * Put an object into the bucket.
   * @param {string} key - The key of the object to put. To create a folder, include a trailing slash.
   * @param {Buffer|string} data - The content of the object to put.
   * @param {string} contentType - The MIME type of the object.
   * @returns {Promise<Response>} The response from the put operation.
   * @throws {TypeError} If the key is not a non-empty string or data is not a Buffer or string.
   */
  async put(key, data, contentType) {
    this._checkKey(key);
    if (!(data instanceof Buffer || typeof data === "string")) {
      this._log("error", ERROR_DATA_BUFFER_REQUIRED);
      throw new TypeError(ERROR_DATA_BUFFER_REQUIRED);
    }
    if (!contentType) {
      try {
        const fileType = await fileTypeFromBuffer(data);
        contentType = fileType?.mime;
      } catch (_) {
      }
    }
    this._log("info", `Uploading object ${key}`);
    const contentLength = typeof data === "string" ? Buffer.byteLength(data) : data.length;
    const headers = {
      [HEADER_CONTENT_LENGTH]: contentLength,
      [HEADER_CONTENT_TYPE]: contentType || DEFAULT_STREAM_CONTENT_TYPE
    };
    const encodedKey = uriResourceEscape(key);
    const { url, headers: signedHeaders } = await this._sign("PUT", encodedKey, {}, headers, data);
    return this._sendRequest(url, "PUT", signedHeaders, data, [200]);
  }
  /**
   * Initiate a multipart upload.
   * @param {string} key - The key of the object to upload.
   * @param {string} [fileType='application/octet-stream'] - The MIME type of the file.
   * @returns {Promise<string>} The upload ID for the multipart upload.
   * @throws {TypeError} If the key is not a non-empty string or fileType is not a string.
   * @throws {Error} If the multipart upload initiation fails.
   */
  async getMultipartUploadId(key, fileType = DEFAULT_STREAM_CONTENT_TYPE) {
    this._checkKey(key);
    if (typeof fileType !== "string") {
      this._log("error", `${ERROR_PREFIX}fileType must be a string`);
      throw new TypeError(`${ERROR_PREFIX}fileType must be a string`);
    }
    this._log("info", `Initiating multipart upload for object ${key}`);
    const query = { uploads: "" };
    const headers = {
      [HEADER_CONTENT_TYPE]: fileType,
      [HEADER_AMZ_CONTENT_SHA256]: UNSIGNED_PAYLOAD
    };
    const encodedKey = uriResourceEscape(key);
    const { url, headers: signedHeaders } = await this._sign("POST", encodedKey, query, headers, "");
    const urlWithQuery = `${url}?${new URLSearchParams(query)}`;
    const res = await this._sendRequest(urlWithQuery, "POST", signedHeaders);
    const responseBody = await res.text();
    const parsedResponse = _parseXml(responseBody);
    if (typeof parsedResponse === "object" && parsedResponse !== null && "error" in parsedResponse && typeof parsedResponse.error === "object" && parsedResponse.error !== null && "message" in parsedResponse.error) {
      const errorMessage = String(parsedResponse.error.message);
      this._log("error", `${ERROR_PREFIX}Failed to abort multipart upload: ${errorMessage}`);
      throw new Error(`${ERROR_PREFIX}Failed to abort multipart upload: ${errorMessage}`);
    }
    if (typeof parsedResponse === "object" && parsedResponse !== null) {
      if (!parsedResponse.initiateMultipartUploadResult || !parsedResponse.initiateMultipartUploadResult.uploadId) {
        this._log("error", `${ERROR_PREFIX}Failed to create multipart upload: no uploadId in response`);
        throw new Error(`${ERROR_PREFIX}Failed to create multipart upload: Missing upload ID in response`);
      }
      return parsedResponse.initiateMultipartUploadResult.uploadId;
    } else {
      this._log("error", `${ERROR_PREFIX}Failed to create multipart upload: unexpected response format`);
      throw new Error(`${ERROR_PREFIX}Failed to create multipart upload: Unexpected response format`);
    }
  }
  /**
   * Upload a part in a multipart upload.
   * @param {string} key - The key of the object being uploaded.
   * @param {Buffer|string} data - The content of the part.
   * @param {string} uploadId - The upload ID of the multipart upload.
   * @param {number} partNumber - The part number.
   * @param {Object} [opts={}] - Additional options for the upload.
   * @returns {Promise<Object>} The ETag and part number of the uploaded part.
   * @throws {TypeError} If any of the parameters are of incorrect type.
   */
  async uploadPart(key, data, uploadId, partNumber, opts = {}) {
    this._validateUploadPartParams(key, data, uploadId, partNumber, opts);
    const query = { uploadId, partNumber, ...opts };
    const headers = {
      [HEADER_CONTENT_LENGTH]: data.length
    };
    const encodedKey = uriResourceEscape(key);
    const { url, headers: signedHeaders } = await this._sign("PUT", encodedKey, query, headers, data);
    const urlWithQuery = `${url}?${new URLSearchParams(query)}`;
    const res = await this._sendRequest(urlWithQuery, "PUT", signedHeaders, data);
    const ETag = sanitizeETag(res.headers.get("etag") || "");
    return { partNumber, ETag };
  }
  _validateUploadPartParams(key, data, uploadId, partNumber, opts) {
    this._checkKey(key);
    if (!(data instanceof Buffer || typeof data === "string")) {
      this._log("error", ERROR_DATA_BUFFER_REQUIRED);
      throw new TypeError(ERROR_DATA_BUFFER_REQUIRED);
    }
    if (typeof uploadId !== "string" || uploadId.trim().length === 0) {
      this._log("error", ERROR_UPLOAD_ID_REQUIRED);
      throw new TypeError(ERROR_UPLOAD_ID_REQUIRED);
    }
    if (!Number.isInteger(partNumber) || partNumber <= 0) {
      this._log("error", `${ERROR_PREFIX}partNumber must be a positive integer`);
      throw new TypeError(`${ERROR_PREFIX}partNumber must be a positive integer`);
    }
    this._checkOpts(opts);
  }
  /**
   * Complete a multipart upload.
   * @param {string} key - The key of the object being uploaded.
   * @param {string} uploadId - The upload ID of the multipart upload.
   * @param {Array<Object>} parts - An array of objects containing PartNumber and ETag for each part.
   * @returns {Promise<Object>} The result of the complete multipart upload operation.
   * @throws {TypeError} If any of the parameters are of incorrect type.
   * @throws {Error} If the complete multipart upload operation fails.
   */
  async completeMultipartUpload(key, uploadId, parts) {
    this._checkKey(key);
    if (typeof uploadId !== "string" || uploadId.trim().length === 0) {
      this._log("error", ERROR_UPLOAD_ID_REQUIRED);
      throw new TypeError(ERROR_UPLOAD_ID_REQUIRED);
    }
    if (!Array.isArray(parts) || parts.length === 0) {
      this._log("error", ERROR_PARTS_REQUIRED);
      throw new TypeError(ERROR_PARTS_REQUIRED);
    }
    if (!parts.every((part) => typeof part.partNumber === "number" && typeof part.ETag === "string")) {
      this._log("error", ERROR_INVALID_PART);
      throw new TypeError(ERROR_INVALID_PART);
    }
    this._log("info", `Complete multipart upload ${uploadId} for object ${key}`);
    const query = { uploadId };
    const xmlBody = this._buildCompleteMultipartUploadXml(parts);
    const headers = {
      [HEADER_CONTENT_TYPE]: XML_CONTENT_TYPE,
      [HEADER_CONTENT_LENGTH]: Buffer.byteLength(xmlBody).toString(),
      [HEADER_AMZ_CONTENT_SHA256]: await _hash(xmlBody)
    };
    const encodedKey = uriResourceEscape(key);
    const { url, headers: signedHeaders } = await this._sign("POST", encodedKey, query, headers, xmlBody);
    const urlWithQuery = `${url}?${new URLSearchParams(query)}`;
    const res = await this._sendRequest(urlWithQuery, "POST", signedHeaders, xmlBody);
    const responseBody = await res.text();
    const parsedResponse = _parseXml(responseBody);
    if (typeof parsedResponse === "object" && parsedResponse !== null && "error" in parsedResponse && typeof parsedResponse.error === "object" && parsedResponse.error !== null && "message" in parsedResponse.error) {
      const errorMessage = String(parsedResponse.error.message);
      this._log("error", `${ERROR_PREFIX}Failed to abort multipart upload: ${errorMessage}`);
      throw new Error(`${ERROR_PREFIX}Failed to abort multipart upload: ${errorMessage}`);
    }
    return parsedResponse.completeMultipartUploadResult;
  }
  /**
   * Aborts a multipart upload.
   * @param {string} key - The key of the object being uploaded.
   * @param {string} uploadId - The ID of the multipart upload to abort.
   * @returns {Promise<Object>} - A promise that resolves to the abort response.
   * @throws {Error} If the abort operation fails.
   */
  async abortMultipartUpload(key, uploadId) {
    this._checkKey(key);
    if (typeof uploadId !== "string" || uploadId.trim().length === 0) {
      this._log("error", ERROR_UPLOAD_ID_REQUIRED);
      throw new TypeError(ERROR_UPLOAD_ID_REQUIRED);
    }
    this._log("info", `Aborting multipart upload ${uploadId} for object ${key}`);
    const query = { uploadId };
    const headers = {
      [HEADER_CONTENT_TYPE]: XML_CONTENT_TYPE,
      [HEADER_AMZ_CONTENT_SHA256]: UNSIGNED_PAYLOAD
    };
    try {
      const encodedKey = uriResourceEscape(key);
      const { url, headers: signedHeaders } = await this._sign("DELETE", encodedKey, query, headers, "");
      const urlWithQuery = `${url}?${new URLSearchParams(query)}`;
      const res = await this._sendRequest(urlWithQuery, "DELETE", signedHeaders);
      if (res.ok) {
        const responseBody = await res.text();
        const parsedResponse = _parseXml(responseBody);
        if (typeof parsedResponse === "object" && parsedResponse !== null && "error" in parsedResponse && typeof parsedResponse.error === "object" && parsedResponse.error !== null && "message" in parsedResponse.error) {
          const errorMessage = String(parsedResponse.error.message);
          this._log("error", `${ERROR_PREFIX}Failed to abort multipart upload: ${errorMessage}`);
          throw new Error(`${ERROR_PREFIX}Failed to abort multipart upload: ${errorMessage}`);
        }
        return {
          status: "Aborted",
          key,
          uploadId,
          response: parsedResponse
        };
      } else {
        this._log("error", `${ERROR_PREFIX}Abort request failed with status ${res.status}`);
        throw new Error(`${ERROR_PREFIX}Abort request failed with status ${res.status}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this._log("error", `${ERROR_PREFIX}Failed to abort multipart upload for key ${key}: ${errorMessage}`);
      throw new Error(`${ERROR_PREFIX}Failed to abort multipart upload for key ${key}: ${errorMessage}`);
    }
  }
  _buildCompleteMultipartUploadXml(parts) {
    return `
      <CompleteMultipartUpload>
        ${parts.map((part) => `
          <Part>
            <PartNumber>${part.partNumber}</PartNumber>
            <ETag>${part.ETag}</ETag>
          </Part>
        `).join("")}
      </CompleteMultipartUpload>
    `;
  }
  /**
   * Delete an object from the bucket.
   * @param {string} key - The key of the object to delete.
   * @returns {Promise<boolean>} The response from the delete operation. True if the delete operation was successful, false otherwise. Note: The delete operation may return a 204 status code even if the object was not found.
   */
  async delete(key) {
    this._checkKey(key);
    this._log("info", `Deleting object ${key}`);
    const headers = {
      [HEADER_CONTENT_TYPE]: JSON_CONTENT_TYPE,
      [HEADER_AMZ_CONTENT_SHA256]: UNSIGNED_PAYLOAD
    };
    const encodedKey = uriResourceEscape(key);
    const { url, headers: signedHeaders } = await this._sign("DELETE", encodedKey, {}, headers, "");
    const res = await this._sendRequest(url, "DELETE", signedHeaders);
    if (res.status === 204 || res.status === 200) {
      return true;
    }
    return false;
  }
  async _sendRequest(url, method, headers, body, toleratedStatusCodes = []) {
    this._log("info", `Sending ${method} request to ${url}, headers: ${JSON.stringify(headers)}`);
    for (let attempt = 1; attempt <= MAX_RETRY_ATTEMPTS; attempt++) {
      const res = await fetch(url, {
        method,
        headers,
        body: ["GET", "HEAD"].includes(method) ? void 0 : body,
        signal: this.requestAbortTimeout !== void 0 ? AbortSignal.timeout(this.requestAbortTimeout) : void 0
      });
      this._log("info", `Response status: ${res.status}`);
      if (RETRYABLE_STATUS_CODES.includes(res.status) && attempt < MAX_RETRY_ATTEMPTS) {
        const retryDelay = INITIAL_RETRY_DELAY_MS * 2 ** (attempt - 1);
        this._log("info", `Retrying ${method} request to ${url} after ${res.status} response`, {
          attempt,
          retryDelay
        });
        await sleep(retryDelay);
        continue;
      }
      if (!res.ok && !toleratedStatusCodes.includes(res.status)) {
        await this._handleErrorResponse(res);
      }
      return res;
    }
    throw new Error(`${ERROR_PREFIX}Request retry loop exited unexpectedly`);
  }
  async _handleErrorResponse(res) {
    const errorBody = await res.text();
    const errorCode = res.headers.get("x-amz-error-code") || "Unknown";
    const errorMessage = res.headers.get("x-amz-error-message") || res.statusText;
    this._log("error", `${ERROR_PREFIX}Request failed with status ${res.status}: ${errorCode} - ${errorMessage},err body: ${errorBody}`);
    throw new Error(`${ERROR_PREFIX}Request failed with status ${res.status}: ${errorCode} - ${errorMessage}, err body: ${errorBody}`);
  }
  _buildCanonicalQueryString(queryParams) {
    if (Object.keys(queryParams).length < 1) {
      return "";
    }
    return Object.keys(queryParams).sort().map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`).join("&");
  }
  async _getSignatureKey(dateStamp) {
    const kDate = await _hmac(`AWS4${this.secretAccessKey}`, dateStamp);
    const kRegion = await _hmac(kDate, this.region);
    const kService = await _hmac(kRegion, S3_SERVICE);
    return _hmac(kService, AWS_REQUEST_TYPE);
  }
};
var _hash = async (content) => {
  await ensureNodeCrypto();
  const hashSum = _createHash("sha256");
  hashSum.update(content);
  return String(hashSum.digest("hex"));
};
async function _hmac(key, content, encoding) {
  await ensureNodeCrypto();
  const hmacSum = _createHmac("sha256", key);
  hmacSum.update(content);
  return encoding ? hmacSum.digest(encoding) : hmacSum.digest();
}
var sanitizeETag = (etag) => {
  const replaceChars = {
    '"': "",
    "&quot;": "",
    "&#34;": "",
    "&QUOT;": "",
    "&#x00022": ""
  };
  return etag.replace(/^("|&quot;|&#34;)|("|&quot;|&#34;)$/g, (m) => replaceChars[m]);
};
var _parseXml = (str) => {
  const unescapeXml = (value) => {
    return value.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
  };
  const json = {};
  const re = /<(\w)([-\w]+)(?:\/|[^>]*>((?:(?!<\1)[\s\S])*)<\/\1\2)>/gm;
  let match;
  while (match = re.exec(str)) {
    const [, prefix, key, value] = match;
    const fullKey = prefix.toLowerCase() + key;
    const parsedValue = value != null ? _parseXml(value) : true;
    if (typeof parsedValue === "string") {
      json[fullKey] = sanitizeETag(unescapeXml(parsedValue));
    } else if (Array.isArray(json[fullKey])) {
      json[fullKey].push(parsedValue);
    } else {
      json[fullKey] = json[fullKey] != null ? [json[fullKey], parsedValue] : expectArray[fullKey] ? [parsedValue] : parsedValue;
    }
  }
  return Object.keys(json).length ? json : unescapeXml(str);
};
var lib_default = S3;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  S3,
  sanitizeETag
});
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)
*/
//# sourceMappingURL=index.cjs.map
