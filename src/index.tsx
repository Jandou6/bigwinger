import * as React from 'react';
import { render } from 'react-dom';
import { RouterCompnent } from './routers';
import './base.scss';
function init() {
  const dom = document.getElementById('app');
  render(
    <RouterCompnent/>,
    dom,
  );
}

init();