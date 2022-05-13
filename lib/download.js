const { promisify } = require('util')
const DownloadGitRepo = require('download-git-repo')
const ora = require('ora')

module.exports.clone = async function(repo, desc) {
    const download = promisify(DownloadGitRepo)
    const process = ora(`下载...${repo}`)
    process.start()
    await download(repo, desc)
    process.succeed()
}