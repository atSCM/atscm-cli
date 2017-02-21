'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class CliOption {

  constructor(desc, options = {}) {
    this.desc = desc;

    Object.keys(options).forEach(k => this[k] = options[k]);
  }

  static boolean(desc, options = {}) {
    return new this(desc, Object.assign(options, { type: 'boolean', default: false }));
  }

  static string(desc, options = {}) {
    return new this(desc, Object.assign(options, { type: 'string', requiresArg: true }));
  }

}

const CliOptions = {
  cli: CliOption.boolean('Open CLI documentation.'),
  config: CliOption.boolean('Print project configuration. Useful for debugging.'),
  cwd: CliOption.string('Manually set the CWD.'),
  help: CliOption.boolean('Show this help'),
  logLevel: new CliOption('Set the Logger level. ' + '-L for least verbose and -LLLL for most verbose. -LLL is default.', {
    alias: 'L',
    count: true
  }),
  projectfile: CliOption.string('Manually set path of Atviseproject file to use. ' + 'This will set the CWD to the Atviseproject file\'s directory as well.', { alias: 'p' }),
  silent: CliOption.boolean('Supress all logging.', { alias: 'S' }),
  version: CliOption.boolean('Print version.', { alias: 'v' })
};

exports.default = CliOptions;

/**
 * Options that can be used globally
 * @type {{projectfile: *, cwd: *, config: *, version: *, help: *, silent: *, logLevel: Option}}
 */

const global = exports.global = {
  projectfile: CliOptions.projectfile,
  cwd: CliOptions.cwd,
  config: CliOptions.config,
  version: CliOptions.version,
  help: CliOptions.help,
  silent: CliOptions.silent,
  logLevel: CliOptions.logLevel
};

/**
 * Options that can be used with the "run" command
 * @type {Object}
 */
const run = exports.run = {};

/**
 * Options that can be used with the "docs" command
 * @type {Object}
 */
const docs = exports.docs = {
  cli: CliOptions.cli
};
