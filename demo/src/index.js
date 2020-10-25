import React, {Component} from 'react'
import {render} from 'react-dom'
import Test from './test';

import { Provider } from '../../src'

export default class Demo extends Component {
  render() {
    return (
      <Provider>
       
      <div>
        <h1>react-ipfs-provider Demo</h1>
        <Test />
      </div>
    </Provider>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))
