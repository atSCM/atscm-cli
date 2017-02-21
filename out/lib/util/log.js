'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogFormat = undefined;

var _gulplog = require('gulplog');

var _gulplog2 = _interopRequireDefault(_gulplog);

var _toConsole = require('gulp-cli/lib/shared/log/toConsole');

var _toConsole2 = _interopRequireDefault(_toConsole);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _tildify = require('tildify');

var _tildify2 = _interopRequireDefault(_tildify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Formats strings to be used in the {@link Logger}
 */
class LogFormat {

  /**
   * Formats a string to represent a path
   * @param {String} path The path to format
   * @return {String} The formatted string
   */
  static path(path) {
    return _chalk2.default.cyan((0, _tildify2.default)(path));
  }

  /**
   * Formats a string to represent a command
   * @param {String} command The command to format
   * @return {String} The formatted string
   */
  static command(command) {
    return _chalk2.default.bold(command);
  }

}

exports.LogFormat = LogFormat; /**
                                * A logger used in all console outputs.
                                * **Should never be instantiated.**
                                * Log levels, `--silent`-flags etc. are handled automatically by {@link gulplog}.
                                */

class Logger {

  /**
   * An instance of {@link chalk}
   * @type {chalk}
   */
  static get colors() {
    return _chalk2.default;
  }

  /**
   * An instance of {@link LogFormat}
   * @return {LogFormat} formats
   */
  static get format() {
    return LogFormat;
  }

  /**
   * Print debug messages
   * @param {...String} message The message(s) to print
   */
  static debug(...message) {
    _gulplog2.default.debug(...message);
  }

  /**
   * Print regular logs
   * @param {...String} message The message(s) to print
   */
  static info(...message) {
    _gulplog2.default.info(...message);
  }

  /**
   * Print warnings
   * @param {...String} message The message(s) to print
   */
  static warn(...message) {
    _gulplog2.default.warn(...message);
  }

  /**
   * Print error messages
   * @param {...String} message The message(s) to print
   */
  static error(...message) {
    _gulplog2.default.error(...message);
  }

  /**
   * Apply options to the logger.
   * **Should only be called once.**
   * @param {Object} options Options passed to {@link gulplog}
   */
  static applyOptions(options) {
    (0, _toConsole2.default)(_gulplog2.default, options);
  }

}
exports.default = Logger;