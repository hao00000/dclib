import Adapter from 'enzyme-adapter-react-16'

import { render, mount, configure } from 'enzyme'

configure({ 'adapter': new Adapter() })

global.render = render

global.mount = mount
