import * as React from 'react';
require('../libs/vs2015.css');
import { hot } from 'react-hot-loader';
import { Form, Input, Button, Icon, Modal } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import * as CSSModules from 'react-css-modules';
const style = require('./style.scss');
import { markdown } from 'markdown';
import article_api from '../../model/api';

interface ArticleUpdateComponentState {
  title:string;
  md_content:string;
  tag:string;
  html_content:string;
  commit:boolean;
  cover:string;
  brief:string;
  author:string;
}
@CSSModules(style, {allowMultiple: true})
class ArticleUpdateComponent extends React.Component<RouteComponentProps<any>, ArticleUpdateComponentState> {
  private handle_title_change:(e) => void;
  constructor(props) {
    super(props);
    this.state = {
      title:'',
      md_content:'',
      tag:'',
      html_content:'',
      cover: 'https://gw.alicdn.com/tfs/TB15lFuuGmWBuNjy1XaXXXCbXXa-900-500.jpg',
      brief: '',
      commit:false,
      author: '',
    };
    this.handleOk = this.handleOk.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.change_input_value = this.change_input_value.bind(this);
    this.handle_preview = this.handle_preview.bind(this);
  }

  componentDidMount() {
    this.get_article();
  }

  render() {
    return (
      <div styleName="update-article-area" className="vh-center">
        <div styleName="left-area">
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
              <Input placeholder="封面连接"  value={ this.state.cover } onChange={ this.change_input_value('cover') }/>
            </FormItem>
            <FormItem>
              <Input placeholder="简介"  value={ this.state.brief } onChange={ this.change_input_value('brief') }/>
            </FormItem>
            <FormItem>
              <Input placeholder="作者签名"  value={ this.state.author } onChange={ this.change_input_value('author') }/>
            </FormItem>
            <FormItem>
              <TextArea value={ this.state.md_content } placeholder="Autosize height with minimum and maximum number of lines" autosize={{ minRows: 20}} onChange={ this.change_input_value('md_content') }/>
            </FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              提交
            </Button>
          </Form>
        </div>
        <div styleName="right-area">
          <div styleName="preview" >
            <div dangerouslySetInnerHTML={{__html: this.state.html_content}}></div>
          </div>
        </div>
        <Modal
          title="文章修改成功"
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

    const html_content = markdown.toHTML(this.state.md_content);
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
      let callback_fn = undefined;
      if (state === 'md_content') {
        callback_fn = this.convert_markdown_to_html;
      }
      (this.setState as any)({
        [state]: e.target.value || '',
      },                     callback_fn);
    };
  }

   handleSubmit(e) {
    e.preventDefault();
    this.convert_markdown_to_html(async () => {
      const article_data = {
        title: this.state.title,
        tag: this.state.tag,
        content: this.state.html_content,
        md_content: this.state.md_content,
        brief: this.state.brief,
        cover: this.state.cover,
        author: this.state.author,
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

  async get_article() {
    const { match } = this.props;
    const article_data = await article_api.get_article_by_id(match.params.id);
    if (article_data) {
      const { title, tag, md_content, html_content, author, brief} = article_data;
      this.setState(
        {
          title, tag, md_content, html_content, author, brief,
        },
        this.convert_markdown_to_html);
    }
  }
}
export default hot(module)(ArticleUpdateComponent);