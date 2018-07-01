import * as React from 'react';
import { hot } from 'react-hot-loader';
import * as CSSModules from 'react-css-modules';
const style = require('./style.scss');
import PageCommonComponent from '../../component/common';

@CSSModules(style, {allowMultiple: true})
class HomeComponent extends React.Component {
  render() {
    return (
      <div styleName="home-page">
        <PageCommonComponent/>
      </div>
    );
  }
}

export default hot(module)(HomeComponent);