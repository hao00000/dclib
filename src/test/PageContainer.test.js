import React from 'react'
import {mount} from 'enzyme'
import TurnstileContainer from '../demo/pageContainers/turnstile/TurnstileContainer'

describe('Page container test', () => {
  let component
  beforeAll(done => {
    component = mount(<TurnstileContainer.TurnstileContainer />)
    setTimeout(done, 5)
  })

  it('should render the component', () => {
    expect(component.html()).toMatchSnapshot()
  })
})
