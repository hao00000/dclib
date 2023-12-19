import React from 'react'
import { compose, lifecycle } from 'recompose'
import {
  actionSetSourceDataStore,
  actionSetSourceDataField,
  actionSetTestDataWithCustomPath,
  actionSetTestDataWithFixedPath
} from '@lib/SchemaX/actions/SourceActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionSetCurrentPageData } from '@lib/SchemaX/actions/PageActions'
import { push } from 'react-router-redux'

const mapStateToProps = ({ source: { chartData } }) => ({ chartData })
const mapDispatchToProps = (dispatch) => bindActionCreators({
  changePage: (payload) => push(payload),
  setPageData: payload => actionSetCurrentPageData.setPageData(payload),
  setDataStore: actionSetSourceDataStore.setDataStore,
  setDataField: actionSetSourceDataField.setDataField,
  setTestDataWithCustomPath: actionSetTestDataWithCustomPath.setTestData,
  setTestDataWithFixedPath: actionSetTestDataWithFixedPath.setTestData
}, dispatch)

const addLife = lifecycle({
  async componentDidMount () {
    // SetDataStore <customPath: false>, ignoring 2nd param, honoring targetDS path
    //    params: (payload, 'dataStore' <any>, targetDS)
    // SetDataField params <customPath: true>, honoring all params for a custom, dynamic path
    //    params: (payload, targetDS, targetDF)

    /* TEST CASE 1
     * store all payload to test1DS
     * edit employee object with the new object of desire
     */
    const runTestCase1 = async () => {
      const payload = { employee: { fName: 'Joanna', lName: 'Doe', age: 36, title: 'VI' }, employeeList: [{ fName: 'Johnny' }, { fName: 'Jennifer' }] }
      await this.props.setDataStore(payload, 'dataStore', 'test1DS')
      const newPayload = { fName: 'Yves', lName: 'Saint Lauren' }
      await this.props.setDataField(newPayload, 'test1DS', 'employee')
    }

    await runTestCase1()

    /* TEST CASE 2
     * store all payload to test2DS
      * edit employeeRes to have only 1 prop which is employeeList
      * expect { test2DS: { employeeList: [{ fName: 'Bunny ' }] } }
      * */
    const runTestCase2 = async () => {
      const payload = { employee: { fName: 'Joanna', lName: 'Doe', age: 36, title: 'VI' }, employeeList: [{ fName: 'Johnny' }, { fName: 'Jennifer' }] }
      await this.props.setDataStore(payload, 'dataStore', 'test2DS')
      const newPayload = [{ fName: 'Bunny' }]
      await this.props.setDataField(newPayload, 'test2DS', 'employeeList')
    }

    await runTestCase2()

    /* TEST CASE 3
     * store all payload to test3DS
      * edit employeeRes to have only 1 prop which is employeeList
      * expect { test3DS: { employee: {}, employeeList: [{ fName: 'Bunny ' }] } }
      * */
    const runTestCase3 = async () => {
      const payload = {
        employeeRes: {
          employee: { fName: 'Joanna', lName: 'Doe', age: 36, title: 'VI' },
          employeeList: [{ fName: 'Johnny' }, { fName: 'Jennifer', age: 33 }]
        }
      }
      await this.props.setDataStore(payload, 'dataStore', 'test3DS')

      setTimeout(async () => {
        const newPayload = {
          employee: { fName: 'Joanna', lName: 'Doe', age: 36, title: 'VI' },
          employeeList: [{ fName: 'Jenny', age: 44 }, { fName: 'Jerry', age: 33 }]
        }
        await this.props.setDataField(newPayload, 'test3DS', 'employeeRes')
      }, 1000)
    }

    await runTestCase3()

    // TEST CASE 4 - run setDataStore twice with Number (negative to positive) payload
    // TEST CASE 5 - run setDataStore twice with Boolean payload
    // TEST CASE 6 - run setDataStore twice with Object payload (similar to testCase2)
    // TEST CASE 7 - run setDataStore twice with Array payload (similar to testCase2)
    // TEST CASE 8 - run setDataStore and setDataField with String payload
    // TEST CASE 9 - run setDataStore and setDataField with Boolean payload

    /* TEST CASE 11 - updating employee object */
    // await runTestCase11()

    /*    const runTestCase11 = async () => {
      const payload = { employeeRes: { employee: { fName: 'Joanna', lName: 'Doe' }, employeeList: [{ fName: 'Johnny' }, { fName: 'Jennifer' }] } }
      await this.props.setTestDataWithCustomPath(payload, 'myDS', '')

      // (payload, sourceDataStore, dataField)
      await this.props.setTestDataWithCustomPath({ fName: 'Yves', lName: 'Saint Lauren' }, 'myDS', 'myDF.employeeRes.employee')
    } */
  }
})

const connector = connect(mapStateToProps, mapDispatchToProps)
const enhance = compose(connector, addLife)
const TestComp = () => <div />
export default enhance(TestComp)
