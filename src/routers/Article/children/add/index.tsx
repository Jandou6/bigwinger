import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Form, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
import { Link } from 'react-router-dom';
import * as CSSModules from 'react-css-modules';
const style = require('./style.scss');
import { markdown } from 'markdown';
import article_api from '../../model/api';
interface ArticleAddComponentState {
  title:string;
  content:string;
  tag:string;
}
@CSSModules(style, {allowMultiple: true})
class ArticleAddComponent extends React.Component<{}, ArticleAddComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      title:'',
      content:'',
      tag:'',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.change_input_value = this.change_input_value.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const article_info = Object.assign({}, this.state, {
      content: markdown.toHTML(this.state.content),
    });
    article_api.add_article(article_info);
  }
  render() {
    return (
      <div>
        <Link to="/article">
          <Button type="primary">
            <Icon type="left" />返回
          </Button>
        </Link>
        <Form onSubmit={this.handleSubmit} styleName="login-form">
          <FormItem>
            <Input placeholder="标题"  value={ this.state.title } onChange={ this.change_input_value('title') }/>
          </FormItem>
          <FormItem>
            <Input placeholder="tag" value={ this.state.tag }  onChange={ this.change_input_value('tag') }/>
          </FormItem>
          <FormItem>
            <TextArea value={ this.state.content } placeholder="Autosize height with minimum and maximum number of lines" autosize={{ minRows: 20}} onChange={ this.change_input_value('content') }/>
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              提交
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }

  change_input_value(state:string) {
    return (e) => {
      (this.setState as any)({
        [state]: e.target.value || '',
      });
    };
  }
}

export default hot(module)(ArticleAddComponent);