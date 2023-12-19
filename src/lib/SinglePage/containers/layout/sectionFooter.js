import { compose } from 'recompose'
import SectionFooter from '@lib/SinglePage/components/layout/SectionFooter'

// import { compose, withProps } from 'recompose'

// const addProps = withProps(({ section }) => ({ section }))

// const enhance = compose(addProps)
const enhance = compose()
export default enhance(SectionFooter)
