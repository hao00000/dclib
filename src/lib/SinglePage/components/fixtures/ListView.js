import React from 'react'
import PropTypes from 'prop-types'
import { ListRenderer } from '@lib/SchemaX/utils/fragments'

const ListView = ({ title, listItems, section, renderHandler, state }) => (
  <div className={'list-view'}>
    {!renderHandler
      ? ListRenderer(listItems, section, state)
      : renderHandler(listItems, section, state)}
  </div>
)

ListView.propTypes = {
  listItems: PropTypes.array,
  section: PropTypes.object,
  title: PropTypes.string,
  renderHandler: PropTypes.func,
  state: PropTypes.object
}

export default ListView
