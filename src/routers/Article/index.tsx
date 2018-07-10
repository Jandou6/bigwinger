import * as React from 'react';
import { hot } from 'react-hot-loader';
import * as CSSModules from 'react-css-modules';
const style = require('./style.scss');
import PageCommonComponent from '../../component/common';
import TableComponent from '../../component/table';
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
          <TableComponent data={ this.state.article_list }/>
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