import * as React from 'react';
import { Table, Divider } from 'antd';
import {
  Link,
} from 'react-router-dom';
const { Column } = Table;

interface TableComponentProps {
  data:any;
}

export default class TableComponent extends React.Component<TableComponentProps, {}> {
  constructor(props) {
    super(props);
  }
  render() {
    const { data } = this.props;
    if (!data.length) { return false; }
    return(
      <Table dataSource={data}>
        <Column
          title="文章名"
          dataIndex="title"
          key="title"
        />
      <Column
        title="标签"
        dataIndex="tag"
        key="tag"
      />
      <Column
        title="创建时间"
        dataIndex="createdAt"
        key="createdAt"
      />
      <Column
        title="Action"
        key="action"
        dataIndex="id"
        render={(id:number, record:any) => (
          <span>
            <Link to={'/article/update/' + id}>
              <span>修改</span>
            </Link>
            <Divider type="vertical" />
            <a href="javascript:;">Delete</a>
            <Divider type="vertical" />
          </span>
        )}
      />
    </Table>
    );
  }
}