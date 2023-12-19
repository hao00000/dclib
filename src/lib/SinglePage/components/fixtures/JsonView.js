import React from 'react'
import JSONTree from 'react-json-tree'
import PropTypes from 'prop-types'
import { Button, ButtonGroup } from 'reactstrap'

const JsonView = ({ section, displayFormat, setDisplayFormatTo }) => {
  const { data } = section

  const jsonTreeTheme = {
    base00: '#1C2023',
    base01: '#393F45',
    base02: '#565E65',
    base03: '#747C84',
    base04: '#ADB3BA',
    base05: '#C7CCD1',
    base06: '#DFE2E5',
    base07: '#F3F4F5',
    base08: '#C7AE95',
    base09: '#C7C795',
    base0A: '#AEC795',
    base0B: '#95C7AE',
    base0C: '#95AEC7',
    base0D: '#AE95C7',
    base0E: '#C795AE',
    base0F: '#C79595'
  }

  const clickHandler = val => (e) => setDisplayFormatTo(e, val)

  const renderFormat =
    displayFormat === 'raw'
      ? (<pre>
        {JSON.stringify(data, null, 2)}
      </pre>)
      : (<JSONTree
        data={data}
        theme={jsonTreeTheme}
        labelRenderer={u => <strong id={u[0]}>{u[0]}</strong>}
        shouldExpandNode={() => { return true }}
      />)

  return (
    <div className='json-view'>
      <ButtonGroup size='sm' className={'pull-right'}>
        <Button disabled={(displayFormat === 'raw')} className={'json-format-toggle-btn'} onClick={clickHandler('raw')}>
          {'Raw'}
        </Button>
        <Button disabled={(displayFormat === 'formatted')} className={'json-format-toggle-btn'} onClick={clickHandler('formatted')}>
          {'Formatted'}
        </Button>
      </ButtonGroup>
      <br />
      <div className='render-format'>
        {renderFormat}
      </div>
    </div>
  )
}

JsonView.propTypes = {
  section: PropTypes.object,
  displayFormat: PropTypes.string,
  setDisplayFormatTo: PropTypes.func
}

export default JsonView
