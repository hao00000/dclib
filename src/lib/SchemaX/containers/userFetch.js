// import { branch, compose, renderNothing } from 'recompose'
import { connect } from 'react-redux'
import { userFetch, userFetchCancel } from '@lib/SchemaX/actions/UserFetch'
import UserFetch from '@lib/SchemaX/components/UserFetch'

const mapStateToProps = ({ user: { list: users, fetchStatus } }) => {
  console.log('userFetch', users)
  return { users, fetchStatus }
}

const mapDispatchToProps = {
  onFetch: (e) => userFetch(e.target.value),
  userFetchCancel
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(UserFetch)
