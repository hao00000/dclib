import React, { Fragment } from 'react'
import PropType from 'prop-types'
import { Container, Row, Col, Button } from 'reactstrap'
import get from 'lodash/get'
import concat from 'lodash/concat'
import { actionObjBuilder } from '@lib/SchemaX/utils'
import Collapsible from '@lib/SchemaX/components/fixtures/Collapsible'

/*
* position-left, position-right are required classNames for SectionHeader to determine where to put the actions
*
* */

/*
COMPLETED:
- provided Elements for proper, conditional rendering
- provided a way to hook controller functions

TODO:
1) figure a way to provide parameterized targetURL
2) figure a way to allow event handlers to interact with loadAction, Redux state, etc.
3) move logics to container and clean-up
4) Retest
5) Provide support for :appContext
 */

const LinkAction = ({ label, config }) => <a href={get(config, 'targetURL', '#')} target={get(config, 'target', '_blank')}>{label}</a>

LinkAction.propTypes = {
  label: PropType.string,
  config: PropType.object
}

const ButtonAction = ({ label, config: { events } }) => <Button {...events}>{label}</Button>

ButtonAction.propTypes = {
  label: PropType.string,
  config: PropType.object
}

const SectionHeader = ({ section, pageData, provider: { pageControllers }, state, handleCollapse, children, isCollapsible, collapseSection }) => {
  const { title, actions = [], titleRenderFunction } = section

  const Element = {
    'LINK': LinkAction,
    'BUTTON': ButtonAction,
    'DIRECT_PATH': ButtonAction
  }

  const pagePath = get(pageData, 'pageMeta.pageController', '')
  const controller = pagePath && pageControllers && pageControllers[pagePath]

  let leftActions = [], rightActions = []
  actions.map(action => {
    const actionObj = actionObjBuilder(action, controller, state, section)

    if (action.classNames.includes('position-left')) {
      leftActions = concat(leftActions, actionObj)
    }

    if (action.classNames.includes('position-right')) {
      rightActions = concat(rightActions, actionObj)
    }
  })

  // if no classNames specified, defaulting to show all actions in the right side.
  if (leftActions.length < 1 && rightActions.length < 1) {
    rightActions = actions
  }

  const renderActions = (actions) => actions.map((action, key) => {
    const ActionElement = Element[action.type]
    return (<ActionElement {...action} key={key} />)
  })

  const hasTitleRenderFunction = titleRenderFunction && controller && controller[titleRenderFunction] && typeof controller[titleRenderFunction] === 'function'
  return (
    <Container className='card-title'>
      {(title || leftActions.length > 0 || rightActions.length > 0 || titleRenderFunction) &&
        <Fragment>
          {hasTitleRenderFunction
            ? <Col className='title-rendered'>{controller[titleRenderFunction](state, section)}</Col>
            : <Row className='title-regular'>
              <Col md={4} className={'text-left'}>{title && <h3>{title} </h3>} </Col>
              <Col md={4} className={'text-left'}>&nbsp; {renderActions(leftActions)}</Col>
              <Col md={3} className={'text-right'}>{renderActions(rightActions)}&nbsp;</Col>
              <Col md={1} className={'text-right'}>{isCollapsible && <span onClick={handleCollapse} className={`${collapseSection ? 'fa fa-chevron-up' : 'fa fa-chevron-down'}`} />}&nbsp;</Col>
            </Row>}
        </Fragment>
      }
      <div className='collapse-container'>
        {
          isCollapsible &&
          <Collapsible
            toggle={handleCollapse}
            label=''
            show={!collapseSection}
            children={children}
          />}
      </div>
    </Container >
  )
}

SectionHeader.propTypes = {
  section: PropType.object,
  provider: PropType.object,
  pageData: PropType.object,
  state: PropType.object,
  isCollapsible: PropType.bool,
  collapseSection: PropType.bool,
  children: PropType.any,
  handleCollapse: PropType.func
}

export default SectionHeader
