import { Button, Col, Form, Input, Modal, Row } from 'antd';
import TextArea from 'antd/es/input/TextArea';

interface IProps {
  isCreateModal: boolean;
  setIsCreateModal: (value: boolean) => void;
}

function CreatePlan({ isCreateModal, setIsCreateModal }: IProps) {
  const [form] = Form.useForm();

  // const onFinish = (values: any) => {
  const onFinish = () => {
    // console.log('Received values:', values);
    // Handle form submission logic here
    setIsCreateModal(false);
  };

  return (
    <div>
      <Modal
        title='Create Feeling'
        okButtonProps={{ className: 'bg-blue-600' }}
        open={isCreateModal}
        onCancel={() => setIsCreateModal(false)}
        footer={[
          <Button key='cancel' onClick={() => setIsCreateModal(false)}>
            Cancel
          </Button>,
          <Button key='submit' type='primary' onClick={() => form.submit()}>
            Save
          </Button>,
        ]}
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout='vertical'
          initialValues={{
            explanatoryVideo: ['https://www.youtube.com/watch?v=wnHW6o8WMas'],
          }}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Please enter the name!' }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label='Explanatory Video'
                name='explanatoryVideo'
                rules={[{ required: true, message: 'Please enter at least one video URL!' }]}
              >
                <TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>

          {/* Add other form items based on your data structure */}
        </Form>
      </Modal>
    </div>
  );
}

export default CreatePlan;
