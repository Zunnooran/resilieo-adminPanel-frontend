import { Table } from 'antd';

export type EditableTableProps = Parameters<typeof Table>[0];
export type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export interface EditableRowProps {
  index: number;
}

export enum Days {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}
