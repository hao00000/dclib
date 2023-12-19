import { compose, withStateHandlers } from 'recompose'
import JsonView from '@lib/SinglePage/components/fixtures/JsonView'

const addState = withStateHandlers(
  {
    displayFormat: 'raw'
  },
  {
    setDisplayFormatTo: () => (e, val) => {
      e.preventDefault()
      return ({ displayFormat: val })
    }
  }
)

// const connector = connect({}, {})
const enhance = compose(addState)
export default enhance(JsonView)
