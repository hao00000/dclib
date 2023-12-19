import { branch, compose, renderNothing } from 'recompose'
import { connect } from 'react-redux'
import FormView from '@lib/SinglePage/components/fixtures/form/FormView'
import { postFormData } from '@lib/SchemaX/actions/PageActions'
import {
  actionSetInputForm,
  actionSetFormFieldData,
  actionSetSourceDataField
} from '@lib/SchemaX/actions/SourceActions'
import get from 'lodash/get'
import has from 'lodash/has'
import reduce from 'lodash/reduce'
import { ensureFormDataHasEmpties, parseUserURI, queryStringBuilder } from '@lib/SchemaX/utils'
import FormFieldList from '@lib/SinglePage/components/fixtures/form/FormFieldList'
import HorizontalFieldTemplate from '@lib/SinglePage/components/fixtures/form/HorizontalFieldTemplate'

const mapStateToProps = (state, { section, pageData, provider = {} }) => {
  // !(required) as data is required for initial state value, need to map it with defaultValues from latest JSON change.
  return ({ state, section, pageData, provider })
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSubmitDataToRedux: (data) => dispatch(actionSetInputForm.setFormData(data)),
    postFormData: (serverURI, formData, pageData, section) => dispatch(postFormData(serverURI, formData, pageData, section)),
    setFormValue: (payload, path, formField) => {
      dispatch(actionSetFormFieldData.setFormFieldData(payload, path, formField))
    },
    setFormSnap: (payload, sourceDataStore, dataField) => {
      dispatch(actionSetSourceDataField.setDataField(payload, sourceDataStore, dataField))
    }
  }
}

const mergeProps = (sProps, dProps, oProps) => {
  const { state, section, pageData, provider: { pageControllers, serverURI, changePage } } = sProps
  const { postFormData, setFormSnap, setFormValue } = dProps
  const fieldTemplate = get(section, 'fieldTemplate')
  const { structure: { schema, uiSchema }, data, sectionKey } = section
  const qs = parseUserURI()
  const pagePath = get(pageData, 'pageMeta.pageController', '')
  const controller = pagePath && pageControllers[pagePath]

  const onSubmit = (controller, section) => (data) => {
    let formData = data.formData, parsedData = ensureFormDataHasEmpties(data.formData)
    if (controller && section.onSubmit && section.onSubmit.handlerFunction && !section.onSubmit.handlerFunction.includes('UNUSED')) {
      formData = controller[section.onSubmit.handlerFunction](data, state, section)
    }

    const { sourceDataStore, sourceDataField } = section

    const dataField = (!sourceDataField || sourceDataField === sourceDataStore)
      ? sourceDataStore
      : `${sourceDataField}`

    if (controller && section.onSubmit && section.onSubmit.parserFunction && !section.onSubmit.parserFunction.includes('UNUSED')) {
      parsedData = controller[section.onSubmit.parserFunction](data, state, section)
    }
    setFormSnap(parsedData, sourceDataStore || 'formData', dataField)

    postFormData(serverURI, formData, pageData, section)

    if (has(section, 'onSubmit.addToQueryString')) {
      let formEntries = {}
      // following operations will merge to construct formEntries object
      const addToQueryString = get(section, 'onSubmit.addToQueryString')
      // addToQueryString is bool
      if (!Array.isArray(addToQueryString)) {
        if (addToQueryString) {
          formEntries = {
            ...qs,
            ...ensureFormDataHasEmpties(data.formData)
          }
        }
      } else {
        formEntries = reduce(addToQueryString, (acc, ele, ind) => {
          return { ...acc, [ele]: data.formData[ele] || '' }
        }, { ...qs })
      }

      if (Object.keys(formEntries).length > 0) {
        formEntries = reduce(formEntries, (acc, val, key) => {
          return { ...acc, [key]: encodeURIComponent(val) }
        }, {})
        const urlString = queryStringBuilder(pageData.path, formEntries)

        if (window.location.hash.length > 2 && Object.keys(formEntries).length > 0) {
          changePage(urlString)
        }
      }
    }
  }

  const onBlur = (controller, section, data) => (originalField, val = '') => {
    const field = originalField.split('_').pop()
    const obj = controller[section.onBlur](field, val, data, state)
    const fieldValue = obj ? obj.val : val
    const { sourceDataStore, sourceDataField } = section
    const dataField = (!sourceDataField || sourceDataField === sourceDataStore) ? `${sourceDataStore}` : `${sourceDataField}`

    setFormValue(fieldValue, dataField, field)
  }

  const controllerFunctions = !controller ? {} : {
    onChange: controller && section.onChange && controller[section.onChange],
    onSubmit: onSubmit(controller, section),
    onError: controller && section.onError && controller[section.onError]
  }

  if (controller && section.onBlur) {
    controllerFunctions.onBlur = onBlur(controller, section, data)
  }

  // const fields = uiSchema && uiSchema['ui:field'] && { [uiSchema['ui:field']]: FormFieldList }
  const fields = uiSchema && uiSchema['ui:field'] && {
    [uiSchema['ui:field']]: uiSchema['ui:field'] !== 'default' && uiSchema['ui:field'] !== 'bindFormFieldList' && controller && controller[uiSchema['ui:field']]
      ? controller[uiSchema['ui:field']] : FormFieldList
  }
  const customFieldTemplate = controller && fieldTemplate && controller[fieldTemplate] ? controller[fieldTemplate] : HorizontalFieldTemplate
  const formProps = {
    ...controllerFunctions,
    idPrefix: `id_${sectionKey}`,
    schema: typeof schema === 'object' ? schema : controller && typeof controller[schema] === 'function' ? controller[schema](state) : {},
    uiSchema: uiSchema,
    fields: fields,
    formData: Array.isArray(data) ? data.reduce((result, ele, k) => ({ ...result, [k]: ele }), {}) : { ...data, ...qs },
    FieldTemplate: customFieldTemplate
  }

  return {
    formProps,
    section
  }
}

const nothingOr = branch(
  ({ formProps }) => (!formProps.formData || Object.keys(formProps.formData).length < 1),
  renderNothing
)

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps)
const enhance = compose(connector, nothingOr)
export default enhance(FormView)
