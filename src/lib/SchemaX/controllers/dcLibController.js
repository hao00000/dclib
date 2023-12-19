import words from 'lodash/words'

const getAllHandlersSuccessHandler = (response, state) => {
  const { spec } = response
  const handlers = (spec !== '[]')
    ? spec
      .split(',')
      .reduce((acc, curr) => acc.concat(words(curr).join('')), [])
      .filter(n => n !== 'expire')
    : []
  return handlers
}

export default {
  getAllHandlersSuccessHandler
}
