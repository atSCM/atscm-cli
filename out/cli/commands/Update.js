'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _semver = require('semver');

var _Logger = require('../../lib/util/Logger');

var _Logger2 = _interopRequireDefault(_Logger);

var _Command = require('../../lib/cli/Command');

var _Command2 = _interopRequireDefault(_Command);

var _ExternalCommand = require('../../lib/util/ExternalCommand');

var _ExternalCommand2 = _interopRequireDefault(_ExternalCommand);

var _Options = require('../Options');

var _Options2 = _interopRequireDefault(_Options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The command invoked by running "update".
 */
class UpdateCommand extends _Command2.default {

  /**
   * Creates a new {@link UpdateCommand} with the specified name and description.
   * @param {string} name The command's name.
   * @param {string} description The command's description.
   */
  constructor(name, description) {
    super(name, description, {
      options: {
        beta: _Options2.default.beta
      }
    });
  }

  /**
   * Checks atscm's dist-tags in the npm registry and resolves with the latest version available.
   * @param {boolean} [useBetaRelease=false] If beta versions should be used.
   * @return {Promise<string>} Fulfilled with the latest atscm version available.
   */
  getLatestVersion(useBetaRelease = false) {
    return (0, _axios.get)('https://registry.npmjs.org/-/package/atscm/dist-tags').then(res => res.data[useBetaRelease ? 'beta' : 'latest']);
  }

  /**
   * Checks if an update is required with the given latest and current version.
   * @param {string} latestVersion The latest version available.
   * @param {string} currentVersion The current version to check against.
   * @return {boolean|string} Returns `false` if no update is required or the version to install if
   * an update is required.
   */
  updateNeeded(latestVersion, currentVersion) {
    _Logger2.default.debug('Latest version:    ', _Logger2.default.format.value(latestVersion));
    _Logger2.default.debug('Current version:   ', _Logger2.default.format.value(currentVersion));

    return (0, _semver.gt)(latestVersion, currentVersion) && latestVersion;
  }

  /**
   * Runs `npm install --save-dev atscm@latest` in a separate process.
   * @param {AtSCMCli} cli The cli instance used.
   * @param {boolean} [useBetaRelease=false] If beta versions should be used.
   * @return {Promise<string, Error>} Fulfilled with npm's stdout or rejected with a spawn error or
   * error code.
   */
  update(cli, useBetaRelease = false) {
    return _ExternalCommand2.default.run('npm', ['install', '--save-dev', `atscm@${useBetaRelease ? 'beta' : 'latest'}`], {
      spawn: {
        cwd: cli.environment.cwd
      }
    });
  }

  /**
   * Updates atscm if a newer version is available.
   * @param {AtSCMCli} cli The cli instance used.
   * @return {Promise<*>} Resolved if the command completed suceessfully, rejected with the error
   * that occurred otherwise.
   */
  run(cli) {
    return Promise.all([this.getLatestVersion(cli.options.beta), Promise.resolve(cli.environment.modulePackage.version)]).then(versions => this.updateNeeded(...versions)).then(needed => {
      if (needed) {
        _Logger2.default.info('Updating to version', _Logger2.default.format.value(needed));

        return this.update(cli, cli.options.beta).then(() => _Logger2.default.info('Done.'));
      }

      return _Logger2.default.info('Already up-to-date.');
    });
  }

  /**
   * This command always needs to be run inside an existant atscm project.
   * @return {boolean} Always `true`.
   */
  requiresEnvironment() {
    return true;
  }

}
exports.default = UpdateCommand;
//# sourceMappingURL=Update.js.map