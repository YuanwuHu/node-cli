#!/usr/bin/env node
const program = require('commander')
// 获取当前版本号
const { version } = require('../package.json')
//初始化
const init = require('../lib/init')
const update = require('../lib/refresh')
program.version(version)

program
    .command('init <name>')
    .description('init project')
    .action(init)

program
    .command('refresh')
    .description('refresh routers and menu')
    .action(update)    
program.parse(process.argv)