#!/usr/bin/env node
'use strict'

const shell = require('shelljs')
const path = require('path')

process.on('unhandledRejection', err => {
    throw err;
})

const commandArgs = process.argv.slice(2)

const scriptIndex = commandArgs.findIndex(
    x => x === 'react' || x === 'wordpress' || x === 'static'
)

const script = scriptIndex === -1 ? commandArgs[0] : commandArgs[scriptIndex]
const nodeArgs = commandArgs.slice(scriptIndex + 1, commandArgs.length)

const reactConf = path.resolve(__dirname, '../react/webpack.config.js')

switch (script) {
    case 'react':
        if (nodeArgs.indexOf('dev') !== -1) {
            shell.exec(`cross-env NODE_ENV=development webpack-dev-server --config ${reactConf}`)
        } else if (nodeArgs.indexOf('build') !== -1) {
            shell.exec(`cross-env NODE_ENV=production webpack --config ${reactConf}`)
        }
        break

}
