import { createContext } from 'react';

import { Form, FormInstance } from 'antd';

import { EditableRowProps } from './types';

const EditableContext = createContext<FormInstance<any> | null>(null);

function EditableRow({ index, ...props }: EditableRowProps) {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
}

export { EditableContext, EditableRow };
