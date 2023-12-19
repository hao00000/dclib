import createReduxAction from '@lib/SchemaX/utils/'

export const { actions: actionSetAppConfig, getUpdateState: updateStateWithPageSection } = createReduxAction({
  name: 'pageData',
  path: '@path',
  customName: '@@factory/SET_PAGE_DATA_TO_APP_CONFIG',
  customField: true
})
