'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _liftoff = require('liftoff');

var _liftoff2 = _interopRequireDefault(_liftoff);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _Logger = require('./lib/util/Logger');

var _Logger2 = _interopRequireDefault(_Logger);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _options = require('./lib/options');

var cliOptions = _interopRequireWildcard(_options);

var _UsageError = require('./lib/error/UsageError');

var _UsageError2 = _interopRequireDefault(_UsageError);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The main class. Responsible for handling and validating command line arguments.
 */
class AtscmCli extends _liftoff2.default {

  /**
   * The atscm-cli commands
   * @type {{Run: String, Docs: String}}
   */
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
   * The name under which the module is available from the command line
   * @type {String}
   */
  static get BinName() {
    return Object.keys(_package2.default.bin)[0];
  }

  /**
   * Creates a new Cli instance tasking the specified arguments
   * @param {String[]} [argv] The command line arguments to use
   */
  constructor(argv) {
    super({
      name: AtscmCli.BinName,
      configName: AtscmCli.ConfigName
    });

    /**
     * The command line arguments used to call cli
     * @type {?String[]}
     */
    this._argv = argv;

    this.command = false;

    // Init logger
    _Logger2.default.applyOptions((0, _yargs2.default)().argv);
  }

  /**
   * Checks if we have a valid path to the local atscm module
   * @return {boolean} `true` if module was found
   */
  requireModule() {
    if (!this._env.modulePath) {
      _Logger2.default.error(_Logger2.default.colors.red(`Local ${ AtscmCli.BinName } not found in`), _Logger2.default.format.path(this._env.cwd));
      _Logger2.default.info(`Make sure ${ AtscmCli.BinName } is installed inside CWD.`, 'Otherwise run', _Logger2.default.format.command(`npm install --save-dev ${ AtscmCli.BinName }`));

      process.exitCode = 1;
      return false;
    }

    return true;
  }

  /**
   * Checks if we have a valid path to a config file
   * @return {boolean} `true` if a config file was found
   */
  requireConfig() {
    if (!this._env.configPath) {
      _Logger2.default.error(_Logger2.default.colors.red(`No ${ AtscmCli.ConfigName } found in`), _Logger2.default.format.path(this._env.cwd));

      process.exitCode = 1;
      return false;
    }

    return true;
  }

  /**
   * Checks if we have both a valid module and config file path
   * @return {boolean} `true` if both module and config were found
   */
  requireModuleAndConfig() {
    return this.requireModule() && this.requireConfig();
  }

  /* get version() {
    return {
      cli: pkg.version,
      local: this.environment && this.environment.modulePackage ?
        this.environment.modulePackage.version :
        false,
    };
  } */

  /**
   * Prints cli and (if available) local module version
   */
  ___printVersion() {
    _Logger2.default.info(`CLI version: ${ _package2.default.version }`);

    if (this._env.modulePackage && this._env.modulePackage.version) {
      _Logger2.default.info(`Local version: ${ this._env.modulePackage.version }`);
    }
  }

  /**
   * Prints the project configuration. **Only works inside a valid project cwd.**
   */
  printConfig() {
    if (this.requireModuleAndConfig()) {
      _Logger2.default.error(_Logger2.default.colors.red(`Not implemented: Print config (path: ${ _Logger2.default.format.path(this._env.configPath) })`));
    }
  }

  parseArguments() {
    return new Promise((resolve, reject) => {
      this.optionsParser = (0, _yargs2.default)(this._argv).usage('Usage: $0 [usage]').option(cliOptions.global).command(`${ AtscmCli.Command.Run } [tasks..]`, '(default) Run tasks.', cliOptions.run).command(AtscmCli.Command.Docs, 'Open documentation', {}, () => this.command = AtscmCli.Command.Docs).global(Object.keys(cliOptions.global)).strict().fail((msg, err, y) => reject(new _UsageError2.default(msg, y)));

      resolve(this.options = this.optionsParser.argv);
    });
  }

  getEnvironment() {
    return new Promise(resolve => {
      super.launch({
        cwd: this.options.cwd,
        configPath: this.options.projectfile
      }, env => resolve(this.environment = env));
    });
  }

  getVersion() {
    return this.getEnvironment().then(env => ({
      cli: _package2.default.version,
      local: env.modulePackage ? env.modulePackage.version : false
    }));
  }

  printVersion() {
    return this.getVersion().then(version => {
      console.log('called', version);
      _Logger2.default.info(`CLI version ${ version.cli }`);

      if (version.local) {
        _Logger2.default.info(`Local version ${ version.local }`);
      }
    });
  }

  runCommand() {
    if (!this.options) {
      throw new Error('Need to run AtscmCli#parseArguments before');
    }

    if (this.options.help) {
      this.optionsParser.showHelp(); // FIXME: Call with Logger
    } else if (this.options.version) {
      return this.printVersion();
    } else if (this.options.config) {
      _Logger2.default.error(_Logger2.default.colors.red('Printing config is not implemented yet'));
    } else {
      _Logger2.default.error(_Logger2.default.colors.red(`Running command ${ this.command || AtscmCli.Command.Run } is not implemented yet`));
    }
  }

  launch() {
    const runViaCli = (0, _fs.realpathSync)(process.argv[1]) === require.resolve('./bin/atscm');

    const app = this.parseArguments(runViaCli ? AtscmCli.Command.Run : false)
    // .then(Logger.applyOptions)
    .then(() => this.runCommand());
    //.then(() => this.options.version ? this.printVersion() : false);
    // .then(() => Logger.info('Test'));

    if (runViaCli) {
      return app.catch(err => {
        _Logger2.default.error(_Logger2.default.colors.red(err.message));

        if (err instanceof _UsageError2.default) {
          _Logger2.default.info(err.parser.help());
        }
      });
    }

    return app;

    /* return new Promise((resolve, reject) => {
      const runViaCli = realpathSync(process.argv[1]) === require.resolve('./bin/atscm');
       let app = this.parseArguments();
        if (runViaCli) {
        app.then(err => {
          console.Logger('----- called -----');
          Logger.error(Logger.colors.red(err));
          resolve();
        });
      } else {
        app.then(resolve, reject);
      }
    }); */
  }

  /**
   * Starts atscm-cli with the commands an options given through stdin. The command run is picked by
   * evaluating:
   *  1. if `--help` is used print help
   *  2. if `--version` is used print atscm-cli and (if installed) atscm version.
   *  3. if `--config` is used print the project config or fail if no Atviseproject is found.
   *  4. Run explicit commands (one of run, docs, ...)
   *  5. Run `run` command if none is used explicit.
   * @param {function()} [callback] Called after launch completed. Useful for testing.
   *
  launch(callback) {
    let usage = AtscmCli.Command.Run;
     const yArgsInstance = yargs(this._argv)
      .usage('$0 [usage]')
      .option(cliOptions.GlobalOptions)
      .command(`${AtscmCli.Command.Run} [tasks..]`, '(default) Run tasks.', cliOptions.run)
      .command(AtscmCli.Command.Docs, 'Open documentation', {}, () => (usage = AtscmCli.Command.Docs))
      .GlobalOptions(Object.keys(cliOptions.GlobalOptions));
     const opts = yArgsInstance.argv;
     // Initialize logger
    Logger.applyOptions(opts);
     super.launch({
      cwd: opts.cwd,
      configPath: opts.projectfile,
    }, (env => {
      /**
       * The {@link Liftoff} environment found
       * @type {{}}
       *
      this._env = env;
       // Handle exceptions if this method is executed via cli
      const runViaCli = realpathSync(process.argv[1]) === require.resolve('./bin/atscm');
       if (runViaCli) {
        Logger.warn(Logger.colors.yellow('executed via cli'));
      }
       if (callback) {
        callback();
      } else if (opts.help) {
        yArgsInstance.showHelp('Logger');
      } else if (opts.version) {
        this.printVersion();
      } else if (opts.config) {
        this.printConfig();
      } else {
        Logger.info(`Running command ${usage}`);
        Logger.error(Logger.colors.red('Running commands is not implemented yet'));
      }
    }));
  } */

}
exports.default = AtscmCli;