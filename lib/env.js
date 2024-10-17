/* global Bare */
module.exports = typeof Bare !== 'undefined' ? require('bare-env') : process.env
