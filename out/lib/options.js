'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const config = {
  desc: 'Print project configuration. Useful when debugging Atviseproject file.',
  type: 'boolean'
};

const cwd = {
  desc: 'Manually set the CWD.',
  type: 'string',
  requiresArg: true
};

const help = {
  desc: 'Show this help.',
  type: 'boolean'
};

const logLevel = {
  alias: 'L',
  count: true,
  desc: 'Set the Logger level. -L for least verbose and -LLLL for most verbose. -LLL is default.'
};

const projectfile = {
  alias: 'p',
  desc: 'Manually set path of Atviseproject file to use. ' + 'This will set the CWD to the Atviseproject file\'s directory as well.',
  type: 'string',
  requiresArg: true
};

const silent = {
  alias: 'S',
  type: 'boolean',
  desc: 'Suppress all logging.'
};

const version = {
  alias: 'v',
  desc: 'Print version.',
  type: 'boolean'
};

const global = exports.global = {
  projectfile,
  cwd,
  config,
  version,
  help,
  silent,
  logLevel
};

const run = exports.run = {};