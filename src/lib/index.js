import merge from 'lodash/merge'
import * as schemaUtils from '@lib/SchemaX/utils'
import * as singlePageUtils from '@lib/SinglePage/utils'
import * as libUtils from '@lib/utils'

export * from '@lib/SinglePage/containers/fixtures'
export { Button } from './Button'
export { AOSDebugApplication } from './SchemaX'
export { SampleTable } from './SampleTable'

const utils = merge({}, schemaUtils, singlePageUtils, libUtils)
export { utils }
