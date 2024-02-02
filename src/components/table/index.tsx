import { useEffect } from 'react';

import { Table } from 'antd';

import useCreateColumns from './components/defaultColumns';
import { ColumnTypes } from './components/types';

function CreateTable({
  data,
  isActions = false,
  isView = false,
  isDelete = false,
  isEditableIcon = false,
  isPagination = false,
  isEditable = false,
  setEditId,
  setDeleteId,
  setViewId,
  handelUpdate,
}: any) {
  const { columns, components, dataSource, deleteId, editId, viewId, clear } = useCreateColumns(
    data,
    isActions,
    isView,
    isEditable,
    isEditableIcon,
    isDelete,
    handelUpdate
  );
  useEffect(() => {
    if (editId && setEditId) setEditId(editId);
    if (deleteId && setDeleteId) setDeleteId(deleteId);
    if (viewId && setViewId) setViewId(viewId);
    clear();
  }, [deleteId, editId, viewId, setEditId, setViewId, setDeleteId, clear]);

  return (
    <Table
      style={{ width: '100%' }}
      scroll={{ x: 360 }}
      pagination={isPagination}
      components={components}
      rowClassName='editable-row'
      columns={columns as ColumnTypes}
      dataSource={dataSource}
    />
  );
}

export default CreateTable;
