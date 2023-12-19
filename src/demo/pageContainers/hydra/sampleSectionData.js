export const tableSection = {
  'type': 'TABLE',
  'title': 'employee table',
  'data': [
    {
      'id': 1,
      'first_name': 'Gibby',
      'last_name': 'Varnam',
      'email': 'gvarnam0@weibo.com',
      'gender': 'Male',
      'ip_address': '214.182.98.67'
    },
    {
      'id': 2,
      'first_name': 'Sharity',
      'last_name': 'Ferrige',
      'email': 'sferrige1@marketwatch.com',
      'gender': 'Female',
      'ip_address': '145.78.176.179'
    },
    {
      'id': 3,
      'first_name': 'Lonnard',
      'last_name': 'Yakobovitz',
      'email': 'lyakobovitz2@census.gov',
      'gender': 'Male',
      'ip_address': '195.217.173.251'
    }
  ],
  'tableSettings': {
    'defaultPageSize': 5
  }
}

export const jsonSection = {
  'type': 'JSON',
  'title': 'Thread Dump JSON',
  'desc': 'extra description',
  'data': [
    {
      'id': 1,
      'first_name': 'Gibby',
      'last_name': 'Varnam',
      'email': 'gvarnam0@weibo.com',
      'gender': 'Male',
      'ip_address': '214.182.98.67'
    },
    {
      'id': 2,
      'first_name': 'Sharity',
      'last_name': 'Ferrige',
      'email': 'sferrige1@marketwatch.com',
      'gender': 'Female',
      'ip_address': '145.78.176.179'
    },
    {
      'id': 3,
      'first_name': 'Lonnard',
      'last_name': 'Yakobovitz',
      'email': 'lyakobovitz2@census.gov',
      'gender': 'Male',
      'ip_address': '195.217.173.251'
    }
  ]
}

export const formSection = {
  'type': 'FORM',
  'title': 'Employee entry form',
  'sectionWrapper': 'Specify PATH to a wrapper container by title to wrap around the rendered section. This allows Tab/Collapse/Accordion to be implemented',
  'targetSection': 'write title of another section here. Data created upon form submission of this form can be used as data for the table/json section given in aggregation',
  'data': {
    'firstName': '',
    'lastName': '',
    'age': '',
    'insurance': ''
  },
  'structure': {
    'schema': {
      'type': 'object',
      'title': 'A regular form',
      'description': 'A simple form example.',
      'properties': {
        'firstName': {
          'type': 'string',
          'title': 'First Name'
        },
        'lastName': {
          'type': 'string',
          'title': 'Last Name'
        },
        'age': {
          'type': 'string',
          'title': 'Age'
        },
        'email': {
          'type': 'string',
          'title': 'Email'
        }
      }
    },
    'uiSchema': {
      'firstName': {
        'ui:autofocus': true,
        'ui:emptyValue': '',
        'ui:placeholder': 'Enter Your First Name'
      },
      'lastName': {
        'ui:emptyValue': '',
        'ui:placeholder': 'Enter Your Last Name'
      },
      'age': {
        'ui:emptyValue': '',
        'ui:placeholder': 'Enter Your Age'
      },
      'email': {
        'ui:emptyValue': '',
        'ui:placeholder': 'Enter Your Email'
      }
    }
  }
}

export const preSection = {
  'type': 'PRE',
  'title': 'Pre View',
  'desc': 'extra description',
  'data': [
    {
      'id': 1,
      'first_name': 'Gibby',
      'last_name': 'Varnam',
      'email': 'gvarnam0@weibo.com',
      'gender': 'Male',
      'ip_address': '214.182.98.67'
    },
    {
      'id': 2,
      'first_name': 'Sharity',
      'last_name': 'Ferrige',
      'email': 'sferrige1@marketwatch.com',
      'gender': 'Female',
      'ip_address': '145.78.176.179'
    },
    {
      'id': 3,
      'first_name': 'Lonnard',
      'last_name': 'Yakobovitz',
      'email': 'lyakobovitz2@census.gov',
      'gender': 'Male',
      'ip_address': '195.217.173.251'
    }
  ]
}

export const listSection = {
  'type': 'LIST',
  'title': 'List section - simplest use case',
  'data': [
    'debugMenu - /<APPHOSTANDADMINPORT>/debug',
    'WOAdaptors - /<APPHOSTANDADMINPORT>/debug/application/WOAdaptors',
    'healthDebugger - /<APPHOSTANDADMINPORT>/debug/application/health'
  ]
}

export const chartSection = {
  'type': 'CHART',
  'title': 'Series Chart (custom use case, multiple charts)',
  'multiple': 'dropdown | spreaded checkboxes ',
  'chartSettings': [
    {
      'type': 'LINE',
      'title': 'without styles, using default styles',
      'classNames': 'ui-line-chart',
      'projectile': {
        'xAxis': {
          'dataKey': 'name'
        }
      },
      'strokeDasharray': '3 3',
      'lines': [
        {
          'type': 'monotone',
          'stroke': 'darkgoldenrod',
          'activeDot': {
            'r': 6
          },
          'dataKey': 'pv'
        }
      ],
      'data': [
        { 'name': 'Page A', 'pv': 2200 },
        { 'name': 'Page B', 'pv': 3490 },
        { 'name': 'Page C', 'pv': 1600 },
        { 'name': 'Page D', 'pv': 5608 },
        { 'name': 'Page E', 'pv': 7000 },
        { 'name': 'Page F', 'pv': 8800 },
        { 'name': 'Page G', 'pv': 4000 }
      ]
    },
    {
      'type': 'LINE',
      'title': "user'overwritten set of styles",
      'classNames': 'ui-line-chart',
      'styles': {
        'width': 900,
        'height': 350,
        'marginTop': 5,
        'marginRight': 30,
        'marginBottom': 5,
        'marginLeft': 20
      },
      'projectile': {
        'xAxis': {
          'dataKey': 'name'
        }
      },
      'strokeDasharray': '3 3',
      'lines': [
        {
          'type': 'monotone',
          'stroke': '#f44274',
          'activeDot': {
            'r': 6
          },
          'dataKey': 'pv'
        }
      ],
      'data': [
        { 'name': 'Page A', 'pv': 2200 },
        { 'name': 'Page B', 'pv': 3490 },
        { 'name': 'Page C', 'pv': 1600 },
        { 'name': 'Page D', 'pv': 5608 },
        { 'name': 'Page E', 'pv': 7000 },
        { 'name': 'Page F', 'pv': 8800 },
        { 'name': 'Page G', 'pv': 4000 }
      ]
    },
    {
      'type': 'AREA',
      'title': 'area chart title with predefined data',
      'classNames': 'ui-area-chart',
      'projectile': {
        'xAxis': {
          'dataKey': 'name'
        }
      },
      'areas': [
        {
          'type': 'monotone',
          'dataKey': 'pv',
          'stroke': '#8884d8',
          'fill': '#8884d8'
        }
      ],
      'strokeDasharray': '3 3',
      'data': [
        { 'name': 'Page A', 'pv': 2200 },
        { 'name': 'Page B', 'pv': 3490 },
        { 'name': 'Page C', 'pv': 1600 },
        { 'name': 'Page D', 'pv': 5608 },
        { 'name': 'Page E', 'pv': 7000 },
        { 'name': 'Page F', 'pv': 8800 },
        { 'name': 'Page G', 'pv': 4000 }
      ]
    },
    {
      'type': 'BAR',
      'title': 'bar chart title with predefined data',
      'classNames': 'ui-bar-chart',
      'projectile': {
        'xAxis': {
          'dataKey': 'name'
        }
      },
      'bars': [
        {
          'dataKey': 'pv',
          'fill': '#8884d8'
        }
      ],
      'strokeDasharray': '3 3',
      'data': [
        { 'name': 'Page A', 'pv': 2200 },
        { 'name': 'Page B', 'pv': 3490 },
        { 'name': 'Page C', 'pv': 1600 },
        { 'name': 'Page D', 'pv': 5608 },
        { 'name': 'Page E', 'pv': 7000 },
        { 'name': 'Page F', 'pv': 8800 },
        { 'name': 'Page G', 'pv': 4000 }
      ]
    },
    {
      'type': 'PIE',
      'title': 'pie chart title with predefined data',
      'classNames': 'ui-pie-chart',
      'pieSettings': {
        'dataKey': 'pv',
        'cx': 100,
        'cy': 100,
        'outerRadius': 60,
        'fill': '#8884d8'
      },
      'data': [
        { 'name': 'Page A', 'pv': 2200 },
        { 'name': 'Page B', 'pv': 3490 },
        { 'name': 'Page C', 'pv': 1600 },
        { 'name': 'Page D', 'pv': 5608 },
        { 'name': 'Page E', 'pv': 7000 },
        { 'name': 'Page F', 'pv': 8800 },
        { 'name': 'Page G', 'pv': 4000 }
      ]
    },
    {
      'type': 'SCATTER',
      'title': 'scatter chart title with predefined data',
      'classNames': 'ui-scatter-chart',
      'projectile': {
        'xAxis': {
          'type': 'category',
          'dataKey': 'name',
          'name': 'name'
        },
        'yAxis': {
          'type': 'number',
          'dataKey': 'pv',
          'name': 'value'
        }
      },
      'dotColor': '#8884d8',
      'data': [
        { 'name': 'Page A', 'pv': 2200 },
        { 'name': 'Page B', 'pv': 3490 },
        { 'name': 'Page C', 'pv': 1600 },
        { 'name': 'Page D', 'pv': 5608 },
        { 'name': 'Page E', 'pv': 7000 },
        { 'name': 'Page F', 'pv': 8800 },
        { 'name': 'Page G', 'pv': 4000 }
      ]
    },
    {
      'type': 'SINGLESTATS',
      'title': 'single-stats chart title with predefined data',
      'classNames': 'ui-single-stats-chart',
      'data': [
        { 'name': 'Page A', 'pv': 2200 },
        { 'name': 'Page B', 'pv': 3490 },
        { 'name': 'Page C', 'pv': 1600 },
        { 'name': 'Page D', 'pv': 5608 },
        { 'name': 'Page E', 'pv': 7000 },
        { 'name': 'Page F', 'pv': 8800 },
        { 'name': 'Page G', 'pv': 4000 }
      ]
    }
  ]
}
