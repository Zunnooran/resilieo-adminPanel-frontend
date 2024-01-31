import { Table } from 'antd';

import useCreateColumns from './components/defaultColumns';
import { ColumnTypes } from './components/types';

function CreateTable({ data, isActions = false, isView = false }: any) {
  const { columns } = useCreateColumns(data, isActions, isView);

  return (
    <Table
      style={{ width: '100%' }}
      scroll={{ x: 360 }}
      pagination={false}
      columns={columns as ColumnTypes}
      dataSource={data}
    />
  );
}

export default CreateTable;
