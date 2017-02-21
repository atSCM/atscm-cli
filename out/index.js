'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _liftoff = require('liftoff');

var _liftoff2 = _interopRequireDefault(_liftoff);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _log = require('./lib/util/log');

var _log2 = _interopRequireDefault(_log);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _options = require('./lib/options');

var cliOptions = _interopRequireWildcard(_options);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AtscmCli extends _liftoff2.default {

  static get Command() {
    return {
      Run: 'run',
      Docs: 'docs'
    };
  }

  /**
   * The filename used for configuration files
   * @type {String}
   */
  static get ConfigName() {
    return 'Atviseproject';
  }

  /**
   * The name under which the module is available from the command line.
   * @type {String}
   */
  static get BinName() {
    return Object.keys(_package2.default.bin)[0];
  }

  /**
   * Creates a new Cli instance tasking the specified arguments.
   * @param argv
   */
  constructor(argv) {
    super({
      name: 'atscm',
      configName: AtscmCli.ConfigName
    });

    this._argv = argv;
  }

  requireModule() {
    if (!this.env.modulePath) {
      _log2.default.error(_log2.default.colors.red(`Local ${ AtscmCli.BinName } not found in`), _log2.default.format.path(this.env.cwd));
      _log2.default.info(`Make sure ${ AtscmCli.BinName } is installed inside CWD.`, 'Otherwise run', _log2.default.format.command(`npm install --save-dev ${ AtscmCli.BinName }`));

      process.exitCode = 1;
      return false;
    }

    return true;
  }

  requireConfig() {
    if (!this.env.configPath) {
      _log2.default.error(_log2.default.colors.red(`No ${ AtscmCli.ConfigName } found in`), _log2.default.format.path(this.env.cwd));

      process.exitCode = 1;
      return false;
    }

    return true;
  }

  requireModuleAndConfig() {
    return this.requireModule() && this.requireConfig();
  }

  run(command) {}

  /**
   * Starts atscm-cli with the commands an options given through stdin. The command run is picked by
   * evaluating:
   *  1. if `--help` is used print help
   *  2. if `--version` is used print atscm-cli and (if installed) atscm version.
   *  3. if `--config` is used print the project config or fail if no Atviseproject is found.
   *  4. Run explicit commands (one of run, docs, ...)
   *  5. Run `run` command if none is used explicit.
   */
  launch() {
    let cmd = AtscmCli.Command.Run;

    const opts = (0, _yargs2.default)(this._argv).usage(`Usage: ${ AtscmCli.BinName } [cmd=run]`).option(cliOptions.global).help('help', 'Show this help.').alias('help', 'h').command(`${ AtscmCli.Command.Run } [tasks..]`, '(default) Run tasks.', cliOptions.run).command(AtscmCli.Command.Docs, 'Open documentation', {}, () => cmd = AtscmCli.Command.Docs).global(Object.keys(cliOptions.global)).argv;

    // Initialize logger
    _log2.default.applyOptions(opts);

    super.launch({
      cwd: opts.cwd,
      configPath: opts.projectfile
    }, env => {
      this.env = env;

      if (opts.version) {
        _log2.default.info(`CLI version: ${ _package2.default.version }`);

        if (env.modulePackage && env.modulePackage.version) {
          _log2.default.info(`Local version: ${ env.modulePackage.version }`);
        }
      } else if (opts.config) {
        if (this.requireModuleAndConfig()) {
          _log2.default.error(_log2.default.colors.red(`Not implmented: Print config (path: ${ _log2.default.format.path(this.env.configPath) })`));
        }
      } else {
        _log2.default.error(_log2.default.colors.red('Running commands is not implemented yet'));
      }
    });
  }

}
exports.default = AtscmCli;