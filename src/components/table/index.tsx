import { Table } from 'antd';

import useCreateColumns from './components/defaultColumns';
import { ColumnTypes } from './components/types';

function CreateTable({
  data,
  setEditId,
  setDeleteId,
  setViewId,
  isActions = false,
  isView = false,
  isEditable = false,
  isDelete = false,
  isEditableIcon = false,
  handelUpdate,
}: any) {
  const { columns, components, dataSource } = useCreateColumns(
    data,
    isActions,
    isView,
    setViewId,
    setDeleteId,
    setEditId,
    isEditable,
    isEditableIcon,
    isDelete,
    handelUpdate
  );

  return (
    <Table
      style={{ width: '100%' }}
      scroll={{ x: 360 }}
      pagination={false}
      components={components}
      rowClassName='editable-row'
      columns={columns as ColumnTypes}
      dataSource={dataSource}
    />
  );
}

export default CreateTable;
