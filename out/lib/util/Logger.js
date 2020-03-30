"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LogFormat = void 0;

var _readline = _interopRequireDefault(require("readline"));

var _console = require("console");

var _gulplog = _interopRequireDefault(require("gulplog"));

var _chalk = _interopRequireDefault(require("chalk"));

var _tildify = _interopRequireDefault(require("tildify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logConsole = new _console.Console(process.stdout, process.stderr);
/**
 * Formats strings to be used in the {@link Logger}.
 */

class LogFormat {
  /**
   * Formats a string to represent a path.
   * @param {string} path The path to format.
   * @return {string} The formatted string.
   */
  static path(path) {
    return _chalk.default.magenta((0, _tildify.default)(path));
  }
  /**
   * Formats a string to represent a command.
   * @param {string} command The command to format.
   * @return {string} The formatted string.
   */


  static command(command) {
    return _chalk.default.bold(command);
  }
  /**
   * Formats a string to represent a value. Use this format for files, module names, etc.
   * @param {string} value The value to format.
   * @return {string} The formatted string.
   */


  static value(value) {
    return _chalk.default.cyan(value);
  }
  /**
   * Formats a string to represent a number. Use this format for times, counts, etc.
   * @param {string} number The value to format.
   * @return {string} The formatted string.
   */


  static number(number) {
    return _chalk.default.magenta(number);
  }

}
/**
 * A logger used in all console outputs.
 * **Should never be instantiated.**
 * Log levels, `--silent`-flags etc. are handled automatically by {@link gulplog}.
 */


exports.LogFormat = LogFormat;

class Logger {
  /**
   * An instance of {@link chalk}.
   * @type {chalk}
   */
  static get colors() {
    return _chalk.default;
  }
  /**
   * An instance of {@link LogFormat}.
   * @type {LogFormat}
   */


  static get format() {
    return LogFormat;
  }
  /**
   * The prefix added to each log. Should always equal fancy-log's prefix.
   * @type {string}
   * @see {@link gulplog}
   */


  static get prefix() {
    function pad(val) {
      return `00${val}`.slice(-2);
    }

    const now = new Date();
    const timestamp = [pad(now.getHours()), pad(now.getMinutes()), pad(now.getSeconds())].join(':');
    return `[${_chalk.default.gray(timestamp)}]`;
  }
  /**
   * Print debug messages.
   * @param {...string} message The message(s) to print.
   */


  static debug(...message) {
    _gulplog.default.debug(...message);
  }
  /**
   * Print regular logs.
   * @param {...string} message The message(s) to print.
   */


  static info(...message) {
    _gulplog.default.info(...message);
  }
  /**
   * Print warnings.
   * @param {...string} message The message(s) to print.
   */


  static warn(...message) {
    _gulplog.default.warn(...message);
  }
  /**
   * Print error messages.
   * @param {...string} message The message(s) to print.
   */


  static error(...message) {
    _gulplog.default.error(...message);
  }
  /**
   * The log types available.
   * @type {string[]}
   */


  static get types() {
    return ['error', 'warn', 'info', 'debug'];
  }
  /**
   * Apply options to the logger.
   * **Should only be called once.**.
   * @param {Object} options Options passed to {@link gulplog}.
   */


  static applyOptions(options) {
    if (options.tasksSimple || options.silent || options.logLevel === 0) {
      _gulplog.default.on('error', () => {});

      return;
    }
    /**
     * The log types handled.
     * @type {Map<String, Boolean>}
     */


    this._handled = {};
    this.types.filter((item, i) => {
      const handle = i < options.logLevel;
      this._handled[item] = handle;
      return handle;
    }).forEach(level => _gulplog.default.on(level, (...args) => {
      logConsole[level === 'error' ? 'error' : 'info'](...[this.prefix].concat(args));
    }));
  }
  /**
   * Pipes a readable stream and logs the last line of each chunk processed.
   * @param {node.stream.Readable} stream The stream to pipe.
   */


  static pipeLastLine(stream) {
    let loggedBefore = false;
    stream.on('data', d => {
      const lines = d.toString().split('\n').filter(l => l.trim() !== '');

      if (loggedBefore && this._handled.info) {
        _readline.default.moveCursor(process.stdout, 0, -1);

        _readline.default.clearLine(process.stdout);
      }

      Logger.info(lines[lines.length - 1]);
      loggedBefore = true;
    }).on('end', () => {
      if (loggedBefore && this._handled.info) {
        _readline.default.moveCursor(process.stdout, 0, -1);

        _readline.default.clearLine(process.stdout);

        _readline.default.cursorTo(process.stdout, 0);
      }
    });
  }

}

exports.default = Logger;
//# sourceMappingURL=Logger.js.map