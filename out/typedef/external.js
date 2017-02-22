/**
 * @external {Liftoff} https://github.com/js-cli/js-liftoff
 */

/**
 * A {@link Liftoff} environment.
 * @typedef {Object} Liftoff.Environment
 * @property {String} cwd The resulting working directory.
 * @property {String} [configPath] Path to the config file found.
 * @property {String} [configBase] The directory the config file is in.
 * @property {String} [modulePath] Path to the local module found.
 * @property {Object} [modulePackage={}] The parsed package.json of the local module found.
 */

/**
 * @external {gulplog} https://github.com/gulpjs/gulplog
 */

/**
 * @external {chalk} https://github.com/chalk/chalk
 */

/**
 * @external {yargs} http://yargs.js.org
 */

/**
 * @external {node.stream.Readable} https://nodejs.org/api/stream.html#stream_class_stream_readable
 */
"use strict";

var cov_2o79lxgcuw = function () {
  var path = "/home/ubuntu/atscm-cli/src/typedef/external.js",
      hash = "81fa4bdf49d708de571d37954773f34c24514e8a",
      global = new Function('return this')(),
      gcv = "__coverage__",
      coverageData = {
    path: "/home/ubuntu/atscm-cli/src/typedef/external.js",
    statementMap: {},
    fnMap: {},
    branchMap: {},
    s: {},
    f: {},
    b: {},
    _coverageSchema: "332fd63041d2c1bcb487cc26dd0d5f7d97098a6c"
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();