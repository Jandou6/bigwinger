import * as React from 'react';
import { hot } from 'react-hot-loader';
import * as CSSModules from 'react-css-modules';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
const style = require('./style.scss');
import PageCommonComponent from '../../component/common';
import AddCom from './children/add';
import UpdateCom from './children/update';
import ArticleList from './children/lists';

interface ArticleComponentState {
  article_list:any;
}
@CSSModules(style, {allowMultiple: true})
class ArticleComponent extends React.Component<{}, ArticleComponentState> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="page">
        <PageCommonComponent>
            <Switch>
              <Route key="/article/add" path="/article/add" component={ AddCom }/>
              <Route key="/article/update" path="/article/update/:id" component={ UpdateCom }/>
              <Route key="/article" path="/article" component={ ArticleList }/>
            </Switch>
        </PageCommonComponent>
      </div>
    );
  }
}

export default hot(module)(ArticleComponent);