// application dataStore for XHR per appConfig.json and JSON files for categories menu
// assumed being hosted elsewhere
import { createResource } from 'redux-rest-resource'
import get from 'lodash/get'
import { _throw } from '@lib/SchemaX/utils'

export const { types, actions, rootReducer } = createResource({
  name: 'appConfig',
  url: '',
  actions: {
    get: {
      method: () => {
        return 'GET'
      },
      url: (getState) => {
        const state = getState()
        const appConfigURI = get(state, '_init.provider.appConfigURI', '')
        if (!appConfigURI) {
          _throw(`Empty appConfigURI: ${appConfigURI} was passed!`)
          return ''
        } else {
          return `${appConfigURI}`
        }
      }
    }
  }
})
