export const BlackWord = {
  moduleName: 'BlackWord',
  moduleProvider: {
    fruit: 'Papaya',
    id: 'name1',
    appControllers: {
      'controllers/blackwordController.js': {
        sdLink: () => {}
      }
    }
  },
  moduleConfig: {
    title: 'BlackWord',
    menu: [
      {
        title: 'BlackWord',
        subMenu: [
          {
            title: 'BlackWord'
          }
        ]
      },
      {
        title: 'SAPPromo',
        subMenu: [
          {
            title: 'SAPPromo'
          }
        ]
      }
    ]
  }
}

export const Director = {
  moduleName: 'Director',
  moduleProvider: {
    age: 36,
    id: 'profile3',
    appControllers: {
      'controllers/directorController.js': {
        fnX: () => {}
      }
    }
  },
  moduleConfig: {
    title: 'Director',
    menu: [
      {
        title: 'Director',
        subMenu: [
          {
            title: 'Director'
          }
        ]
      }
    ]
  }
}

export const Aspen = {
  moduleName: 'Aspen',
  moduleProvider: {},
  moduleConfig: {
    title: 'Aspen',
    menu: [
      {
        title: 'Aspen',
        subMenu: [
          {
            title: 'Aspen'
          }
        ]
      }
    ],
    dependents: [
      {
        'type': 'SCHEMA_PAGE',
        'title': 'Aspen page',
        'pageSource': '/src/mockData/schemas/cacheDebugger/pageSchemas/cacheDebuggerLinkedPage5.json',
        'path': '/DSS/Cache/cacheDebuggerLinkedPage5'
      }
    ]
  }
}

export const AddressService = {
  moduleName: 'AddressService',
  moduleProvider: {},
  moduleConfig: {
    title: 'AddressService',
    menu: [
      {
        title: 'AddressService',
        subMenu: [
          {
            title: 'AddressService'
          }
        ]
      },
      {
        title: 'SAPPromo',
        subMenu: [
          {
            title: 'SAPPromo'
          }
        ]
      }
    ],
    dependents: [
      {
        'type': 'SCHEMA_PAGE',
        'title': 'Page X',
        'pageSource': '/pageSchemas/pageX/pageXSpecifications.json',
        'path': '/platform/configuration/pageX'
      },
      {
        'type': 'SCHEMA_PAGE',
        'title': 'Page Y',
        'pageSource': '/pageSchemas/pageY/pageYSpecifications.json',
        'path': '/platform/configuration/pageY'
      },
      {
        'type': 'SCHEMA_PAGE',
        'title': 'Page Z',
        'pageSource': '/pageSchemas/pageZ/pageZSpecifications.json',
        'path': '/platform/configuration/pageZ'
      }
    ]
  }
}
