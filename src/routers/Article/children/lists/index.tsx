import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Button } from 'antd';
import * as CSSModules from 'react-css-modules';
import {
  Link,
} from 'react-router-dom';
const style = require('./style.scss');
import TableComponent from '../../../../component/table';
import article_api from '../../model/api';

interface ArticleListComponentState {
  article_list:any;
}
@CSSModules(style, {allowMultiple: true})
class ArticleListComponent extends React.Component<{}, ArticleListComponentState> {
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
      <div>
        <Link to="/article/add">
          <Button type="primary">添加</Button>
        </Link>
        <TableComponent data={ this.state.article_list }/>
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

export default hot(module)(ArticleListComponent);