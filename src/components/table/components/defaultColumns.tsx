import { useMemo, useState } from 'react';

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

export default function useCreateColumns(data: any, isActions: boolean, isView: boolean) {
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = useMemo(() => {
    const actionColumn: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
      {
        title: 'Action',
        key: 'action',
        dataIndex: 'action',
        width: '25%',
        editable: false,
        // render: (_: any, record: any) => (
        render: () => (
          <Space size='middle'>
            {/* {console.log(record)} */}
            {isView && <EyeOutlined />}
            <EditOutlined />
            <DeleteOutlined className='text-red-500' />
          </Space>
        ),
      },
    ];
    const columnsData = Object.keys(data[0]) ?? [];

    if (columnsData.length) {
      const columns = columnsData
        .filter((c) => c !== '_id')
        .map((c) => ({
          title: c.charAt(0).toUpperCase() + c.slice(1),
          dataIndex: c,
          width: '25%',
          editable: false,
        }));

      if (isActions) return [...columns, ...actionColumn];
      return [...columns];
    }

    return [];
  }, [data, isActions, isView]);

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];

    const index = newData.findIndex((item) => row.key === item.key);

    if (index) newData[index] = { ...newData[index], ...row };

    setDataSource(newData);
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

  return { columns, components };
}
