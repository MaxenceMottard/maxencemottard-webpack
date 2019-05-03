#!/usr/bin/env node
'use strict'

const shell = require('shelljs')
const path = require('path')

process.on('unhandledRejection', err => {
    throw err;
})

const commandArgs = process.argv.slice(2)

const reactConf = path.resolve(__dirname, './webpack.config.js')

switch (commandArgs[0]) {
    case 'dev':
        shell.exec(`cross-env NODE_ENV=development webpack-dev-server --config ${reactConf}`)
        break
    case 'build':
        shell.exec(`cross-env NODE_ENV=production webpack --config ${reactConf}`)
        break
    default:
        console.log('Please specify an argument build/dev')
        break
}
