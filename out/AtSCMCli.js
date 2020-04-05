"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _path = require("path");

var _os = require("os");

var _liftoff = _interopRequireDefault(require("liftoff"));

var _yargs = _interopRequireDefault(require("yargs"));

var _gulplog = _interopRequireDefault(require("gulplog"));

var _interpret = require("interpret");

var _chalk = require("chalk");

var _package = _interopRequireDefault(require("../package.json"));

var _Logger = _interopRequireDefault(require("./lib/util/Logger"));

var _Options = _interopRequireWildcard(require("./cli/Options"));

var _Commands = _interopRequireDefault(require("./cli/Commands"));

var _UsageError = _interopRequireDefault(require("./lib/error/UsageError"));

var _fs2 = require("./lib/util/fs");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The main class. Handles arguments and runs commands.
 * @extends {Liftoff}
 */
class AtSCMCli extends _liftoff.default {
  /**
   * The name under which the module is available from the command line.
   * @type {string}
   */
  static get BinName() {
    return Object.keys(_package.default.bin)[0];
  }
  /**
   * The filename used for configuration files.
   * @type {string}
   */


  static get ConfigName() {
    return 'Atviseproject';
  }
  /**
   * Reports an error and exits the process with return code `1`.
   * @param {Error} err The error that occurred.
   */


  _reportCliError(err) {
    _Logger.default.error(_Logger.default.colors.red(err.message));

    if (err instanceof _UsageError.default) {
      _Logger.default.info(err.help);
    } else {
      _Logger.default.debug(err.stack);

      if (err instanceof SyntaxError && this._failedRequires.length) {
        _Logger.default.info((0, _chalk.yellow)(`You may have to install the '${this._failedRequires[0]}' module.`));

        _Logger.default.info(['Other failed requires:', ...this._failedRequires].join(`${_os.EOL} - `));
      }
    }

    process.exitCode = 1;
  }
  /**
   * Creates a new {@link AtSCMCli} object based on command line arguments.
   * @param {string[]} argv The command line arguments to use. If no command is provided and neither
   * `--help` nor `--version` are used, the command `run` is added.
   * @throws {UsageError} Throws an error if option parsing fails.
   */


  constructor(argv = []) {
    super({
      name: AtSCMCli.BinName,
      configName: AtSCMCli.ConfigName,
      extensions: _interpret.jsVariants
    });
    this.on('require', function (name) {
      _Logger.default.debug('Requiring external module', _Logger.default.colors.magenta(name));
    });
    /** If requiring an external module failed.
     * @type {string[]} */

    this._failedRequires = [];
    this.on('requireFail', function (name) {
      this._failedRequires.push(name);

      _Logger.default.debug(_Logger.default.colors.red('Failed to load external module'), _Logger.default.colors.magenta(name));
    });
    /**
     * `true` if the instance was created by running the binaries, `false` if used programmatically.
     * @type {Boolean}
     */

    this.runViaCli = (0, _fs.realpathSync)(process.argv[1]) === require.resolve('./bin/atscm');
    /**
     * The raw, unparsed command line arguments the Cli was created with.
     * @type {String[]}
     */

    this._argv = argv; // If no command is given, default to "run"

    const commandNames = _Commands.default.map(c => c.name);
    /**
     * The options parsed from {@link AtSCMCli#_argv}. Note that **these options are not complete**
     * until {@link AtSCMCli#launch} was called.
     * @type {Object}
     */


    this.options = (0, _yargs.default)(argv).version(false).help(false).env('ATSCM').option(_Options.GlobalOptions).fail((msg, e, y) => {
      const err = new _UsageError.default(msg, y.help());

      if (this.runViaCli) {
        _gulplog.default.on('error', () => {}); // Prevent logger to throw an error


        this._reportCliError(err);
      } else {
        throw err;
      }
    }).argv;

    if (!this.options.help && !this.options.version) {
      if (this.options._.filter(e => commandNames.includes(e)).length === 0) {
        this._argv.unshift('run');
      }
    } // Initialize logger


    _Logger.default.applyOptions(this.options);

    const globalOptionNames = Object.keys(_Options.GlobalOptions);
    /**
     * An instance of {@link yargs} responible for parsing options.
     * @type {yargs}
     */

    this.argumentsParser = _Commands.default.reduce((parser, command) => parser.command(command.usage, command.description, y => {
      y.usage(`Usage: $0 ${command.usage}`);
      y.option(command.options);
      y.group(Object.keys(command.options), 'Command specific options:');
      y.group(globalOptionNames, 'Global options:');
      y.strict(command.strict);
      y.help('help', _Options.default.help.desc);
      y.demandCommand(...command.demandCommand);
    }, () => this.command = command), (0, _yargs.default)().env('ATSCM').usage('Usage: $0 [cmd=run]').version(false).options(_Options.GlobalOptions).global(globalOptionNames).strict().help('help', _Options.default.help.desc).alias('help', 'h'));
  }
  /**
   * Used to expose project config overrides via environment variables. All project options are
   * exposed as `ATSCM_PROJECT__{KEY}={VALUE}`.
   * @param {Object} config The object to expose.
   * @param {string} key The key currently handled.
   * @param {string} [base=ATSCM_PROJECT__] The parent key.
   */


  _exposeOverride(config, key, base = 'ATSCM_PROJECT__') {
    const currentKey = `${base}${key.toUpperCase()}`;

    if (typeof config[key] === 'object') {
      const c = config[key];
      Object.keys(c).forEach(k => this._exposeOverride(c, k, `${currentKey}__`));
    } else {
      process.env[currentKey] = config[key];

      _Logger.default.debug(`Setting ${currentKey}:`, _Logger.default.format.value(config[key]));
    }
  }
  /**
   * Parses arguments and exposes the project options as environment variables.
   * @return {Promise<Object, UsageError>} Rejected with a {@link UsageError} if parsing failed,
   * otherwise fulfilled with the parsed arguments.
   */


  parseArguments() {
    return new Promise((resolve, reject) => {
      this.options = this.argumentsParser.fail((msg, err, y) => reject(new _UsageError.default(msg, y.help()))).parse(this._argv);
      Object.keys(this.options.project).forEach(key => this._exposeOverride(this.options.project, key));
      resolve(this.options);
    });
  }
  /**
   * Returns a {@link Liftoff.Environment} for the Cli.
   * @param {boolean} [findUp=false] If the environment should be searched for in parent
   * directories.
   * @return {Promise<Object>} Fulfilled with a {@link Liftoff} environment.
   */


  getEnvironment(findUp = true) {
    return new Promise(resolve => {
      super.launch({
        cwd: this.options.cwd,
        configPath: findUp ? this.options.projectfile : (0, _path.join)(this.options.cwd || process.cwd(), `${this.constructor.ConfigName}.js`),
        require: this.options.require
      }, env => resolve(this.environment = env));
    });
  }
  /**
   * Gets a {@link Liftoff.Environment} and validates a config file and a local module was found.
   * @return {Promise<Object, Error>} Resolved with the {@link Liftoff environment}, rejected if the
   * config file or the local module cannot be found.
   */


  requireEnvironment() {
    return this.getEnvironment().then(env => {
      if (!env.modulePath) {
        throw new Error(`Local ${AtSCMCli.BinName} not found`);
      }

      if (!env.configPath) {
        throw new Error('No config file found');
      }

      return env;
    });
  }
  /**
   * Returns the CLI version and, if a local module could be found, the local version.
   * @return {Promise<{cli: string, local: ?string}>} Fulfilled with the found cli and local
   * version.
   */


  async getVersion() {
    const env = await this.getEnvironment();
    const projectPackage = env.modulePath && (await (0, _fs2.readJson)((0, _path.join)(env.cwd, 'package.json')).catch(() => undefined));
    return {
      cli: _package.default.version,
      local: env.modulePath ? env.modulePackage.version : undefined,
      server: projectPackage && projectPackage.engines && projectPackage.engines.atserver
    };
  }
  /**
   * Gets and prints the CLI version and, if a local module could be found, the local version.
   * @return {Promise<{cli: string, local: ?string}>} Fulfilled with the found cli and local
   * version.
   */


  async printVersion() {
    const {
      cli,
      local,
      server
    } = await this.getVersion();
    const versions = [['atscm-cli', cli], local && ['atscm', local], server && ['atvise server', server]].filter(v => v);
    const maxLength = versions.reduce((length, [label]) => Math.max(length, label.length), 0);
    versions.forEach(([label, version]) => _Logger.default.info(label.padEnd(maxLength + 1), _Logger.default.format.number(version)));
  }
  /**
   * Runs the command specified in the command line arguments ({@link AtSCMCli#_argv}). **Note that
   * this will only work if {@link AtSCMCli#parseArguments} was called before.**.
   * @return {Promise<*, Error>} Fulfilled if the command succeeded.
   */


  runCommand() {
    if (this.options.version) {
      return this.printVersion();
    }

    if (this.command) {
      return (this.command.requiresEnvironment(this) ? this.requireEnvironment() : Promise.resolve()).then(() => this.command.run(this));
    }

    _Logger.default.warn('No command specified');

    return Promise.resolve(this);
  }
  /**
   * Parses arguments and runs the specified command.
   * @return {Promise<*, Error>} Fulfilled if the command succeeded. Note that, if the instance is
   * run through the binary all rejections will be handled.
   */


  launch() {
    const app = this.parseArguments().then(() => {
      if (process.env.ATSCM_DEBUG || this.options.debug) {
        process.env.ATSCM_DEBUG = process.env.ATSCM_DEBUG || 'true';

        require('source-map-support').install(); // eslint-disable-line global-require

      }
    }).then(() => this.runCommand());

    if (this.runViaCli) {
      return app.catch(err => this._reportCliError(err));
    }

    return app;
  }

}

exports.default = AtSCMCli;
//# sourceMappingURL=AtSCMCli.js.map