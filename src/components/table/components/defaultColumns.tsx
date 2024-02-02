import { useCallback, useEffect, useMemo, useState } from 'react';

import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import moment from 'moment';

import EditableCell from './EditableCell';
import { EditableRow } from './EditableRow';
import { ColumnTypes, Days } from './types';

interface DataType {
  key: React.Key;
  day?: Days | any;
}

export default function useCreateColumns(
  data: any,
  isActions: boolean,
  isView: boolean,
  isEditable: boolean,
  isEditableIcon: boolean,
  isDelete: boolean,
  handelUpdate: (data: any) => void
) {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [editId, setEditId] = useState<Partial<any>>();
  const [deleteId, setDeleteId] = useState<Partial<any>>();
  const [viewId, setViewId] = useState<Partial<any>>();

  useEffect(() => {
    if (data) {
      setDataSource(() =>
        data.map(({ _id, ...rest }: any) => ({
          key: _id ?? 0,
          ...rest,
        }))
      );
    }
  }, [data]);

  const clear = () => {
    setDeleteId(undefined);
    setEditId(undefined);
    setViewId(undefined);
  };

  const handelView = useCallback(
    (record: Partial<any> & { key: React.Key }) => {
      setViewId(record);
    },
    [setViewId]
  );
  const handelEdit = useCallback(
    (record: Partial<any> & { key: React.Key }) => {
      setEditId(record);
    },
    [setEditId]
  );

  const handelDelete = useCallback(
    (record: Partial<any> & { key: React.Key }) => {
      setDeleteId(record);
    },
    [setDeleteId]
  );
  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = useMemo(() => {
    const actionColumn: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
      {
        title: 'Action',
        key: 'action',
        dataIndex: 'action',
        width: '25%',
        editable: false,
        render: (_: any, record: any) => {
          return (
            <Space size='middle'>
              {isView && <EyeOutlined onClick={() => handelView(record)} />}
              {isEditableIcon && <EditOutlined onClick={() => handelEdit(record)} />}
              {isDelete && <DeleteOutlined className='text-red-500' onClick={() => handelDelete(record)} />}
            </Space>
          );
        },
      },
    ];
    const columnsData = Object.keys(data[0]) ?? [];

    if (columnsData.length) {
      const columns = columnsData
        .filter((c) => c !== '_id')
        .map((c) => ({
          title: c.charAt(0).toUpperCase() + c.slice(1),
          dataIndex: c,
          width: c === 'number' ? '5%' : '25%',
          editable: isEditable,
        }));

      if (isActions) return [...columns, ...actionColumn];
      return [...columns];
    }

    return [];
  }, [data, isActions, isView, isEditable, isDelete, isEditableIcon, handelEdit, handelDelete, handelView]);

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];

    const index = newData.findIndex((item) => row.key === item.key);

    if (index >= 0) newData[index] = { ...newData[index], ...row };
    setDataSource(newData);
    handelUpdate(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (col.dataIndex === 'day' && data.length > 0) {
      return {
        ...col,
        render: (_text: string, record: DataType) => moment().day(record?.day).format('dddd'),
      };
    }
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return { columns, components, dataSource, deleteId, editId, viewId, clear };
}
