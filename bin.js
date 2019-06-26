#!/usr/bin/env node
'use strict'

const shell = require('shelljs')
const path = require('path')

process.on('unhandledRejection', err => {
    throw err;
})

const commandArgs = process.argv.slice(2)

const webpackConf = path.resolve(__dirname, './webpack.config.js')

switch (commandArgs[0]) {
    case 'dev-server':
        shell.exec(`cross-env NODE_ENV=development webpack-dev-server --config ${webpackConf}`)
        break
    case 'dev':
        shell.exec(`cross-env NODE_ENV=development webpack --config ${webpackConf}`)
        break
    case 'build':
        shell.exec(`cross-env NODE_ENV=production webpack --config ${webpackConf}`)
        break
    default:
        console.log('Please specify an argument : build, dev or dev-server')
        break
}
