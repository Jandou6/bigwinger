import * as React from 'react';
import { Table, Icon, Divider } from 'antd';

const { Column, ColumnGroup } = Table;

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
        render={(text, record:any) => (
          <span>
            <a href="javascript:;">Action 一</a>
            <Divider type="vertical" />
            <a href="javascript:;">Delete</a>
            <Divider type="vertical" />
            <a href="javascript:;" className="ant-dropdown-link">
              More actions <Icon type="down" />
            </a>
          </span>
        )}
      />
    </Table>
    );
  }
}