#! /usr/bin/env node

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const ora = require('ora')
const projectPath = process.cwd()

// 读取配置文件
function readConfig() {
  const configPath = path.join(projectPath, 'tinypack.config.js')

  if (!fs.existsSync(configPath)) {
    throw new Error('找不到 "tinypack.config.js" 配置文件.')
  }

  const config = require(configPath)
  return config
}

// 编译代码
function compile(config) {
  const bundleFile = require('./lib/bundle')
  try {
    const result = bundleFile(config)
    return result
  } catch (e) {
    throw e
  }
}

// 输出文件
function emit(result) {
  try {
    fs.writeFileSync(path.join(projectPath, config.output), result)
  } catch (e) {
    fs.mkdirSync(path.dirname(config.output))
    fs.writeFileSync(path.join(projectPath, config.output), result)
  }
}

function run() {
  // 读取配置文件
  const spinner = ora()
  spinner.start()
  try {
    spinner.info('读取配置文件...')
    const config = readConfig()
    spinner.info('编译打包代码...')
    const result = compile(config)
    spinner.info('输出文件...')
    emit(result)
    spinner.succeed()
    chalk.yellow('已生成对应文件.')
  } catch (e) {
    spinner.fail()
    chalk.red(e)
  }
}

run()
