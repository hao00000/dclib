import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, UncontrolledAlert } from 'reactstrap'
import get from 'lodash/get'
import find from 'lodash/find'
import startCase from 'lodash/startCase'
import { timestampToHours, formatBytes, setHealthStatusColor, queryStringBuilder, stringBuilder, getQueryParams } from '@lib/SchemaX/utils'
import SecondNavBarSection from '@lib/SchemaX/containers/secondNavBarSection'

const ContentHeader = ({ contentHeaderProps: { appInfo, appContext, handleSideBar }, versions = [], envs, appCompatibility, appName, errorMessage, appContextQueryString, pagesDict, envColor, buildDebugVersionLink, peersList = [], selectedPagePath, bodySize, contextLayer }) => {
  const healthUrl = (pagesDict && pagesDict['/platform/health/healthChecks']) ? queryStringBuilder('/platform/health/healthChecks', appContextQueryString) : ''
  const customQueryParams = appContextQueryString + '&' + stringBuilder({ 'type': 'fast', 'refresh': '' })
  const seriesUrl = (pagesDict && pagesDict['/platform/runtime/timeSeriesStats']) ? queryStringBuilder('/platform/runtime/timeSeriesStats', customQueryParams) : ''
  const appInfoUrl = (pagesDict && pagesDict['/platform/runtime/appInfo']) ? queryStringBuilder('/platform/runtime/appInfo', appContextQueryString) : ''
  const threadDumpUrl = (pagesDict && pagesDict['/platform/runtime/threadDumpDebugger']) ? queryStringBuilder('/platform/runtime/threadDumpDebugger', appContextQueryString) : ''
  const healthStatusVal = get(appInfo, 'healthStatus', '-')
  const healthStatusColor = healthStatusVal ? setHealthStatusColor(healthStatusVal) : 'bdg-default'
  const versionMatch = window.location.pathname.match(/\/version\/(.*)\/index.html/)
  const urlVersion = versionMatch && versionMatch.length > 0 ? versionMatch[1] : undefined
  const snapChangeHandler = (e) => {
    const selectedVersion = e.target.value
    const url = buildDebugVersionLink(selectedVersion)
    window.location.href = url
  }

  const onInstanceChange = (e) => {
    const val = e.target.value
    const instance = find(peersList, peer => (`${peer.host}:${peer.adminPort}` === val))
    const queryParams = getQueryParams()
    queryParams.host = get(instance, 'host', queryParams.host)
    queryParams.port = get(instance, 'adminPort', queryParams.port)
    const newUrl = queryStringBuilder(selectedPagePath, queryParams)
    window.location.href = newUrl
  }

  const urlString = queryStringBuilder('/', appContextQueryString)

  return (
    <header>
      <Row className={`aside first-nav-bar-row ${envColor}`}>
        <Col className='left-content'>
          {
            bodySize === 'sidebar-hide'
              ? <span className='logo'>
                <span className='apple-logo'><i className='fa fa-apple apple-icon' /></span>
                <span className='service-name' onClick={() => { window.location.href = urlString }}>{appContext.serviceName}
                  {contextLayer && <span className='config-layer' onClick={() => { window.location.href = urlString }}>({contextLayer})</span>}
                </span>
              </span>
              : ''
          }
          <span className='bdg bdg-default'>{get(appInfo, 'container', '-').toUpperCase()}</span>
          <span className={`bdg ${healthStatusColor}`} title={'Health status'} ><a className='health-status' href={healthUrl}>{get(appInfo, 'healthStatus', '-')}</a></span>
          <span className='bdg bdg-default'>{get(appInfo, 'partition', '-')}</span>
        </Col>
        <Col className='right-content'>
          <ul role='presentation pull-right'>
            <li>
              <div className='progress'>
                <div
                  className='progress-bar progress-bar-blue'
                  role='progressbar'
                  title={'Memory Used'}
                  style={{ width: '50%' }}
                >
                  <a href={seriesUrl}>{formatBytes(get(appInfo, 'totalMemory', 0) - get(appInfo, 'freeMemory', 0))}</a>
                </div>
                <div
                  className='progress-bar progress-bar-success'
                  role='progressbar'
                  title={'Memory total (-Xms)'}
                  style={{ width: '40%' }}
                >
                  <a href={seriesUrl}>{formatBytes(get(appInfo, 'totalMemory', 0))}</a>
                </div>
                <div
                  className='progress-bar progress-bar-default'
                  role='progressbar'
                  title={'Memory max (-Xmx)'}
                  style={{ width: '10%' }}
                >
                  <a href={seriesUrl}>&nbsp;</a>
                </div>
              </div>
            </li>
            <li>
              <span>
                {' '}
                <b className='uptime-title'>Uptime </b>
                {timestampToHours(get(appInfo, 'uptime', 0)).length > 8 && <br />}
                <a href={appInfoUrl}><small className='uptime-value'>{timestampToHours(get(appInfo, 'uptime', 0))}</small></a>
              </span>
            </li>
            <li>
              <span>
                {' '}
                <b className='thread-title'>Threads </b><br />
                {get(appInfo, 'threadCount', '-').length > 8 && <br />}
                <a href={threadDumpUrl}><small className='thread-value'>{get(appInfo, 'threadCount', '-')}</small></a>
              </span>
            </li>
          </ul>
        </Col>
      </Row>
      <Row className={`aside second-nav-bar-row`}>
        <Col>
          <Row className='left-content'>
            <ul role='presentation'>
              <li>
                <span role='button' onClick={handleSideBar}>
                  <i className='fa fa-bars' />
                </span>
              </li>
              <li>
                <div className='custom-select'>
                  <select
                    className='form-control'
                    value={`${appContext.host}:${appContext.port}`}
                    onChange={e => onInstanceChange(e)}
                  >
                    {peersList.length && peersList.map((val, key) => {
                      return <option key={key} value={`${val.host}:${val.adminPort}`}>{val.host + ':' + val.adminPort}</option>
                    })}
                  </select>
                </div>
              </li>
              {Array.isArray(versions) &&
                versions.find(snap => snap.current === true) &&
                <li>
                  <div className='custom-select'>
                    <select
                      className='form-control'
                      onChange={(e) => snapChangeHandler(e)}
                      value={urlVersion || get(versions.find(snap => snap.current === true), 'version', '-')}
                    >
                      {versions.map((snap, i) => {
                        return <option key={i}>{snap.version}</option>
                      })}
                    </select>
                  </div>
                </li>}
              <li>
                <span>
                  {' '}
                  <b className='compatability-title'>{startCase(appName)} Compatibility </b><br />
                  <small>{appCompatibility || '-'}</small>
                </span>
              </li>
              <li className='app-title-container'>
                <span>
                  {' '}
                  <b>App {startCase(appName)} </b><br />
                  <small>{get(appInfo, `${appName}CompatibilityVersion`, '-')}</small>
                </span>
              </li>
              <li className='error-container'>
                {errorMessage &&
                  <div className='error-message'>
                    <UncontrolledAlert color='danger'><i className='fa fa-exclamation-circle' />Service info cannot load due to errors for: <p className='error-list'>{errorMessage}</p></UncontrolledAlert>
                  </div>}
              </li>
            </ul>
          </Row>
        </Col>
        <Col>
          <Row className='version-container'>
            <div className='ml-auto'>
              <SecondNavBarSection />
            </div>
          </Row>
        </Col>
      </Row>
    </header >
  )
}

ContentHeader.propTypes = {
  contentHeaderProps: PropTypes.object,
  appContextQueryString: PropTypes.string,
  pagesDict: PropTypes.object,
  envColor: PropTypes.string,
  errorMessage: PropTypes.string,
  appCompatibility: PropTypes.string,
  appName: PropTypes.string,
  versions: PropTypes.array,
  envs: PropTypes.object,
  buildDebugVersionLink: PropTypes.func,
  peersList: PropTypes.array,
  selectedPagePath: PropTypes.string,
  bodySize: PropTypes.string,
  contextLayer: PropTypes.string
}

export default ContentHeader
