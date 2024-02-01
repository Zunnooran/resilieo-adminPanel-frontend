import { useState } from 'react';

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, Input, Modal, Row, Table } from 'antd';

import ButtonUI from 'components/core-ui/button/button';

import { IFeelingCreate } from './core/_models';
import useCreateFeeling from './core/hooks/use-createFeeling';

interface IProps {
  isCreateModal: boolean;
  setIsCreateModal: (value: boolean) => void;
}

function CreatePlan({ isCreateModal, setIsCreateModal }: IProps) {
  const [form] = Form.useForm();
  const { createFeeling, isSuccessCreateFeeling, isLoadingCreateFeeling } = useCreateFeeling();

  // const [initialValues, setInitialValues] = useState<IFeelingCreate>({
  //   name: '',
  //   explanatoryVideo: [''],
  //   goodToKnow: '',
  //   signOf: [''],
  //   shadeOf: [''],
  //   howToDeal: [''],
  //   prevention: [''],
  //   scienceSays: [''],
  // });
  const initialValues = {
    name: '',
    explanatoryVideo: [''],
    goodToKnow: '',
    signOf: [''],
    shadeOf: [''],
    howToDeal: [''],
    prevention: [''],
    scienceSays: [''],
  };

  const [exercises, setExercises] = useState([
    { key: 0, day: 'Monday', activity: '', time: '', location: '' },
    { key: 1, day: 'Tuesday', activity: '', time: '', location: '' },
    { key: 2, day: 'Wednesday', activity: '', time: '', location: '' },
    { key: 3, day: 'Thursday', activity: '', time: '', location: '' },
    { key: 4, day: 'Friday', activity: '', time: '', location: '' },
    { key: 5, day: 'Saturday', activity: '', time: '', location: '' },
    { key: 6, day: 'Sunday', activity: '', time: '', location: '' },
  ]);

  const handleTableInputChange = (key: React.Key, dataIndex: string, value: any) => {
    const updatedExercises = exercises.map((item) => {
      if (item.key === key) {
        return { ...item, [dataIndex]: value };
      }
      return item;
    });
    setExercises(updatedExercises);
  };

  const getTableData = () => {
    return exercises.map((item, index) => ({
      key: index,
      day: item.day,
      activity: item.activity,
      time: item.time,
      location: item.location,
    }));
  };

  const columns = [
    {
      title: 'Day',
      dataIndex: 'day',
      key: 'day',
    },
    {
      title: 'Activity',
      dataIndex: 'activity',
      key: 'activity',
      render: (text: any, record: any) => (
        <Form.Item
          className='p-0 m-0'
          name={`exercises[${record.key}].activity`}
          rules={[{ required: true, message: 'Please enter the activity!' }]}
        >
          <Input
            className='py-2'
            value={text}
            onChange={(e) => {
              handleTableInputChange(record.key, 'activity', e.target.value);
            }}
          />
        </Form.Item>
      ),
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: (text: any, record: any) => (
        <Form.Item
          className='p-0 py-1 m-0'
          name={`exercises[${record.key}].time`}
          rules={[{ required: true, message: 'Please enter the time!' }]}
        >
          <Input
            value={text}
            className='py-2'
            onChange={(e) => handleTableInputChange(record.key, 'time', e.target.value)}
          />
        </Form.Item>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (text: any, record: any) => (
        <Form.Item
          className='p-0 m-0'
          name={`exercises[${record.key}].location`}
          rules={[{ required: true, message: 'Please enter the location!' }]}
        >
          <Input
            className='py-2'
            value={text}
            onChange={(e) => handleTableInputChange(record.key, 'location', e.target.value)}
          />
        </Form.Item>
      ),
    },
  ];

  const onFinish = (values: IFeelingCreate) => {
    const exercisesWithoutKey = exercises.map(({ key, ...rest }) => rest);
    createFeeling({
      name: values.name,
      explanatoryVideo: values.explanatoryVideo,
      goodToKnow: values.goodToKnow,
      signOf: values.signOf,
      shadeOf: values.shadeOf,
      howToDeal: values.howToDeal,
      prevention: values.prevention,
      scienceSays: values.scienceSays,
      exercises: exercisesWithoutKey,
    });
    if (isSuccessCreateFeeling) {
      setIsCreateModal(false);
      form.resetFields();
    }
  };

  const handleModalClose = () => {
    setIsCreateModal(false);
    form.resetFields();
  };

  return (
    <div>
      <Modal
        title={<span style={{ fontSize: '1.5rem' }}>Create Feeling</span>}
        width={800}
        okButtonProps={{ className: 'bg-blue-600' }}
        open={isCreateModal}
        onCancel={handleModalClose}
        footer={[
          <ButtonUI
            className='border border-gray-400 hover:bg-gray-200 hover:border-gray-200 transition hover:scale-95 px-7 me-4'
            variant='text'
            key='cancel'
            onClick={handleModalClose}
          >
            Cancel
          </ButtonUI>,
          <ButtonUI
            key='submit'
            className='bg-blue-500 px-7 border border-blue-500 transition hover:scale-95 hover:bg-blue-600'
            onClick={() => form.submit()}
            onSubmit={handleModalClose}
          >
            {isLoadingCreateFeeling ? 'loading' : 'Save'}
          </ButtonUI>,
        ]}
      >
        <Form form={form} onFinish={onFinish} layout='vertical' initialValues={initialValues}>
          <div className='flex sm:flex-row flex-col gap-3'>
            <Form.Item name='name' className='w-full' rules={[{ required: true, message: 'Please enter the name!' }]}>
              <Input className='py-2 ps-4' style={{ fontSize: '1rem' }} placeholder='Feeling Name' />
            </Form.Item>
            <Form.Item
              name='goodToKnow'
              className='w-full'
              rules={[{ required: true, message: 'Please enter the Good To Know' }]}
            >
              <Input className='py-2 ps-4' style={{ fontSize: '1rem' }} placeholder='Good To Know' />
            </Form.Item>
          </div>
          <Divider className='m-0 mb-5 bg-gray-300 h-0.5' />
          <Row gutter={16}>
            <Col span={24}>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.List name='explanatoryVideo'>
                    {(fields, { add, remove }) => (
                      <>
                        <Form.Item>
                          <Button
                            type='dashed'
                            className='py-5 flex items-center justify-center'
                            style={{ width: '250px' }}
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add Explanatory Video
                          </Button>
                        </Form.Item>
                        {fields.map(({ key, name, ...restField }) => (
                          <div className='flex'>
                            <Form.Item
                              className='w-full'
                              {...restField}
                              name={name}
                              rules={[{ required: true, message: 'Missing explanatoryVideo' }]}
                            >
                              <Input
                                className='py-2 ps-4'
                                style={{ fontSize: '1rem' }}
                                placeholder='Explanatory Video'
                              />
                            </Form.Item>
                            {fields.length > 1 && (
                              <MinusCircleOutlined className='mb-6 ml-3' onClick={() => remove(name)} />
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </Form.List>
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider className='m-0 mb-5 bg-gray-300 h-0.5' />
          <Row gutter={16}>
            <Col span={24}>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.List name='signOf'>
                    {(fields, { add, remove }) => (
                      <>
                        <Form.Item>
                          <Button
                            type='dashed'
                            className='py-5 flex items-center justify-center'
                            style={{ width: '250px' }}
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add Signs
                          </Button>
                        </Form.Item>
                        {fields.map(({ key, name, ...restField }) => (
                          <div className='flex '>
                            <Form.Item
                              {...restField}
                              name={name}
                              className='w-full'
                              rules={[{ required: true, message: 'Missing Signs' }]}
                            >
                              <Input className='py-2 ps-4' style={{ fontSize: '1rem' }} placeholder='Add Signs' />
                            </Form.Item>
                            {fields.length > 1 && (
                              <MinusCircleOutlined className='mb-6 ml-3' onClick={() => remove(name)} />
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </Form.List>
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider className='m-0 mb-5 bg-gray-300 h-0.5' />
          <Row gutter={16}>
            <Col span={24}>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.List name='shadeOf'>
                    {(fields, { add, remove }) => (
                      <>
                        <Form.Item>
                          <Button
                            type='dashed'
                            className='py-5 flex items-center justify-center'
                            style={{ width: '250px' }}
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add Shades
                          </Button>
                        </Form.Item>
                        {fields.map(({ key, name, ...restField }) => (
                          <div className='flex'>
                            <Form.Item
                              className='w-full'
                              {...restField}
                              name={name}
                              rules={[{ required: true, message: 'Missing Shades' }]}
                            >
                              <Input className='py-2 ps-4' style={{ fontSize: '1rem' }} placeholder='Add Shades' />
                            </Form.Item>
                            {fields.length > 1 && (
                              <MinusCircleOutlined className='mb-6 ml-3' onClick={() => remove(name)} />
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </Form.List>
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider className='m-0 mb-5 bg-gray-300 h-0.5' />
          <Row gutter={16}>
            <Col span={24}>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.List name='howToDeal'>
                    {(fields, { add, remove }) => (
                      <>
                        <Form.Item>
                          <Button
                            type='dashed'
                            className='py-5 flex items-center justify-center'
                            style={{ width: '250px' }}
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add How To Deal
                          </Button>
                        </Form.Item>
                        {fields.map(({ key, name, ...restField }) => (
                          <div className='flex'>
                            <Form.Item
                              {...restField}
                              name={name}
                              className='w-full'
                              rules={[{ required: true, message: 'Missing How To Deal' }]}
                            >
                              <Input className='py-2 ps-4' style={{ fontSize: '1rem' }} placeholder='Add How to Deal' />
                            </Form.Item>
                            {fields.length > 1 && (
                              <MinusCircleOutlined className='mb-6 ml-3' onClick={() => remove(name)} />
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </Form.List>
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider className='m-0 mb-5 bg-gray-300 h-0.5' />
          <Row gutter={16}>
            <Col span={24}>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.List name='prevention'>
                    {(fields, { add, remove }) => (
                      <>
                        <Form.Item>
                          <Button
                            type='dashed'
                            className='py-5 flex items-center justify-center'
                            style={{ width: '250px' }}
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add prevention
                          </Button>
                        </Form.Item>
                        {fields.map(({ key, name, ...restField }) => (
                          <div className='flex'>
                            <Form.Item
                              {...restField}
                              name={name}
                              className='w-full'
                              rules={[{ required: true, message: 'Missing Signs' }]}
                            >
                              <Input className='py-2 ps-4' style={{ fontSize: '1rem' }} placeholder='Add Prevention' />
                            </Form.Item>
                            {fields.length > 1 && (
                              <MinusCircleOutlined className='mb-6 ml-3' onClick={() => remove(name)} />
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </Form.List>
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider className='m-0 mb-5 bg-gray-300 h-0.5' />
          <Row gutter={16}>
            <Col span={24}>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.List name='scienceSays'>
                    {(fields, { add, remove }) => (
                      <>
                        <Form.Item>
                          <Button
                            type='dashed'
                            className='py-5 flex items-center justify-center'
                            style={{ width: '250px' }}
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add Science Says
                          </Button>
                        </Form.Item>
                        {fields.map(({ key, name, ...restField }) => (
                          <div className='flex'>
                            <Form.Item
                              {...restField}
                              name={name}
                              className='w-full'
                              rules={[{ required: true, message: 'Missing Science Says' }]}
                            >
                              <Input
                                className='py-2 ps-4'
                                style={{ fontSize: '1rem' }}
                                placeholder='Add Science Says'
                              />
                            </Form.Item>
                            {fields.length > 1 && (
                              <MinusCircleOutlined className='mb-6 ml-3' onClick={() => remove(name)} />
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </Form.List>
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider className='m-0 mb-5 bg-gray-300 h-0.5' />
          <Table dataSource={getTableData()} columns={columns} pagination={false} size='middle' className='mb-4' />
        </Form>
      </Modal>
    </div>
  );
}

export default CreatePlan;
