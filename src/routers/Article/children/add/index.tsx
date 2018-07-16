import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Form, Input, Button, Icon, Modal } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import * as CSSModules from 'react-css-modules';
const style = require('./style.scss');
import { markdown } from 'markdown';
import article_api from '../../model/api';

import '../libs/vs2015.css';
interface ArticleAddComponentState {
  title:string;
  content:string;
  tag:string;
  html_content:string;
  commit:boolean;
}
@CSSModules(style, {allowMultiple: true})
class ArticleAddComponent extends React.Component<RouteComponentProps<any>, ArticleAddComponentState> {
  private handle_title_change:(e) => void;
  constructor(props) {
    super(props);
    this.state = {
      title:'',
      content:'',
      tag:'',
      html_content:'',
      commit:false,
    };
    this.handleOk = this.handleOk.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.change_input_value = this.change_input_value.bind(this);
    this.handle_preview = this.handle_preview.bind(this);
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
            <Button type="primary" className="login-form-button" onClick={ this.handle_preview }>
              预览
            </Button>
            <Button type="primary" htmlType="submit" className="login-form-button">
              提交
            </Button>
          </FormItem>
        </Form>
        <div styleName="preview" >
          { this.state.html_content }
        </div>
        <Modal
          title="文章添加成功"
          visible={this.state.commit}
          onOk={this.handleOk}
        >
        <b>《{ this.state.title }》</b>
        </Modal>
      </div>
    );
  }

  handle_preview() {
    this.convert_markdown_to_html();
  }

  convert_markdown_to_html(callback = () => {}) {

    const html_content = markdown.toHTML(this.state.content);
    this.setState(
      {
        html_content,
      },
      () => {
        const code_block_list:any = document.querySelectorAll('p code');
        if (code_block_list) {
          code_block_list.forEach((block) => {
            (window as any).hljs.highlightBlock(block);
          });
        }
        callback();
      });
  }

  change_input_value(state:string) {
    return (e) => {
      (this.setState as any)({
        [state]: e.target.value || '',
      });
    };
  }

   handleSubmit(e) {
    e.preventDefault();
    this.convert_markdown_to_html(async () => {
      const article_data = {
        title: this.state.title,
        tag: this.state.tag,
        content: this.state.html_content,
      };
      const result = await article_api.add_article(article_data);
      if (result.code === 200) {
        this.setState({
          commit: true,
        });
      }
    });
  }
  handleOk() {
    this.props.history.push({
      pathname: '/article',
    });
  }
}
export default hot(module)(ArticleAddComponent);