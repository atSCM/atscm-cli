"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readJson = readJson;

var _fs = require("fs");

/* eslint-disable import/prefer-default-export */

/**
 * Reads a file and parses it's contents as JSON.
 * @param {string} path The file to read.
 * @return {Promise<any>} The parsed file contents.
 */
async function readJson(path) {
  return JSON.parse((await _fs.promises.readFile(path, 'utf8')));
}
//# sourceMappingURL=fs.js.map