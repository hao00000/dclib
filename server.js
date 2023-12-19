// experimental
const Bundler = require('parcel-bundler')
const express = require('express')
const chalk = require('chalk')
const httpProxyMiddleware = require('http-proxy-middleware')
const openBrowser = require('react-dev-utils/openBrowser')
const path = require('path')

const devServer = express()
// setup parcel
const bundle = new Bundler('./src/demo/index.html')
/*  , {
    outDir: path.resolve(__dirname, './docs'),
    // no cache on dev
    cache: false
  }) */

const addProxy = () => {
  const proxy = require(path.resolve(__dirname, './package.json')).proxy

  if (proxy) {
    devServer.use(
      '/src',
      httpProxyMiddleware({
        target: proxy,
        changeOrigin: true
      })
    )
  }
}

const runDevServer = (host, port, protocol) => {
  addProxy()
  // add parcel in as middleware
  devServer.use(bundle.middleware())
  devServer.listen(port, (err, result) => {
    if (err) return console.log(err)

    console.log('The app is running at:')
    console.log('  ' + chalk.cyan(protocol + '://' + host + ':' + port + '/'))
    console.log('To run on a different port, e,g, 5000 do ' + chalk.magenta('PORT=5000 yarn dev'))
    console.log('Note that the development build is not optimized.')
    console.log('To create a production build, use ' + chalk.cyan('yarn build') + '.')
    console.log(chalk.cyan('Starting the development server...'))
    openBrowser(protocol + '://' + host + ':' + port + '/')
  })
}

const run = (port) => {
  const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
  const host = process.env.HOST || 'localhost'
  runDevServer(host, port, protocol)
}

run(process.env.PORT || 3700)
