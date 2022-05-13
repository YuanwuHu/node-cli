const { promisify } = require('util')
const figlet = promisify(require('figlet'))  
const ora = require('ora')

const clear = require('clear')
const chalk = require('chalk')
const log = content => console.log(chalk.green(content))
const { clone } = require('./download')
const open = require('open')

const spawn = async (...args) => {
    const { spawn } = require('child_process')
    return new Promise(resolve => {
        const proc = spawn(...args)
        proc.stdout.pipe(process.stdout)
        proc.stderr.pipe(process.stderr)
        proc.on('close', () => {
            resolve()
        })
    })
}

module.exports = async name => {
    // 打印欢迎页面
    clear()
    const data = await figlet('Sence Welcome')
    log(data)

    //克隆项目
    log(`🚀 创建项目：${name}`)
    await clone('github:YuanwuHu/vue-template', name)

    // 自动安装依赖
    const process = ora(`安装依赖`)
    process.start()
    await spawn('npm',['install'],{cwd: `./${name}`, shell: true})
    process.succeed()
    
    log(`
🐱‍🚀安装完成：
To get start
======================
    cd ${name}
    npm run serve
======================    
`)

    // 打开浏览器
    // open(`http://localhost:8080`)

    // 启动
    // await spawn('npm', ['run', 'serve'], {cwd: `./${name}`, shell: true})
}