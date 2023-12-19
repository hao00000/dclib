/* global process */
import React from 'react'
import ReactDOM from 'react-dom'
import { AOSDebugApplication } from '@lib'
import dataObj from '../mockData/appConfig.json'
import pageSchemas from './pageSchemas'

import CacheDebuggerController from './controllers/cacheDebuggerController'
import ViewConfigController from './controllers/viewConfigController'
import ViewInfoController from './controllers/viewInfoController'
import Page0DemoController from './controllers/page0DemoController'
import Page1DemoController from './controllers/page1DemoController'
import Page2DemoController from './controllers/page2DemoController'
import TurnstileContainer from './pageContainers/turnstile/TurnstileContainer'
import HydraContainer from './pageContainers/hydra/HydraContainer'
import TableSchemaController from './controllers/tableSchemaController'
import AppController from './controllers/appController'
import { AddressService, Aspen, BlackWord, Director } from './modules'

const modules = [BlackWord, Director, Aspen, AddressService]

const provider = {
  pageControllers: {
    'controllers/page0DemoController.js': Page0DemoController,
    'controllers/cacheDebuggerController.js': CacheDebuggerController,
    'controllers/page1DemoController.js': Page1DemoController,
    'controllers/page2DemoController.js': Page2DemoController,
    'controllers/tableSchemaController.js': TableSchemaController,
    'controllers/viewConfigController.js': ViewConfigController,
    'controllers/viewInfoController.js': ViewInfoController
  },
  pageContainers: {
    'pageContainers/turnstile/TurnstileContainer': TurnstileContainer,
    'pageContainers/hydra/HydraContainer': HydraContainer
  },
  appControllers: {
    'controllers/appController.js': AppController
  },
  modules,
  pageSchemas: pageSchemas,

  // <OPTIONAL>
  // whether to override for some test cases and DcLib development
  serverURI: process.env.URI,
  isDcLib: true
}

const appConfig = dataObj

const App = () => (
  <div>
    <AOSDebugApplication appConfig={appConfig} provider={provider} />
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
