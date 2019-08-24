import React from 'react';
import ReactDOM from 'react-dom';
import Strategy from './Strategy';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Strategy />, div);
  ReactDOM.unmountComponentAtNode(div);
});
