import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Button } from 'antd';
import * as CSSModules from 'react-css-modules';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
const style = require('./style.scss');
import PageCommonComponent from '../../component/common';
import TableComponent from '../../component/table';
import AddCom from './children/add';
import article_api from './model/api';

interface ArticleComponentState {
  article_list:any;
}
@CSSModules(style, {allowMultiple: true})
class ArticleComponent extends React.Component<{}, ArticleComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      article_list: [],
    };
  }
  componentDidMount() {
    this.get_article_data();
  }
  render() {
    return (
      <div className="page">
        <PageCommonComponent>
            <Switch>
              <Route key="/article/add" path="/article/add" component={ AddCom }/>
              <Route key="/article" render={() => (
                <div>
                  <Link to="/article/add">
                    <Button type="primary">添加</Button>
                  </Link>
                  <TableComponent data={ this.state.article_list }/>
                </div>
              )}/>
            </Switch>
        </PageCommonComponent>
      </div>
    );
  }

  async get_article_data() {
    const article_list = await article_api.get_article_list();
    this.setState({
      article_list,
    });
  }
}

export default hot(module)(ArticleComponent);