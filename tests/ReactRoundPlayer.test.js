import React from 'react'
import ReactRoundPlayer from '../src/ReactRoundPlayer'
import Enzyme, {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-player', () => ('ReactPlayer'))
  

describe('ReactRoundPlayer', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(
      <ReactRoundPlayer url='https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3' />
    )
    expect(rendered.toJSON()).toMatchSnapshot()
  })
})