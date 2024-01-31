import { useState } from 'react';

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, Table } from 'antd';

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
          className='p-0 m-0'
          name={`exercises[${record.key}].time`}
          rules={[{ required: true, message: 'Please enter the time!' }]}
        >
          <Input value={text} onChange={(e) => handleTableInputChange(record.key, 'time', e.target.value)} />
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
          <Input value={text} onChange={(e) => handleTableInputChange(record.key, 'location', e.target.value)} />
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
    if (isSuccessCreateFeeling) setIsCreateModal(false);
  };

  return (
    <div>
      <Modal
        title='Create Feeling'
        width={800}
        okButtonProps={{ className: 'bg-blue-600' }}
        open={isCreateModal}
        onCancel={() => setIsCreateModal(false)}
        footer={[
          <Button key='cancel' onClick={() => setIsCreateModal(false)}>
            Cancel
          </Button>,
          <Button key='submit' className='bg-blue-500 text-white hover:text-white' onClick={() => form.submit()}>
            {isLoadingCreateFeeling ? 'loading' : 'Save'}
          </Button>,
        ]}
      >
        <Form form={form} onFinish={onFinish} layout='vertical' initialValues={initialValues}>
          <div className='flex sm:flex-row flex-col gap-3 '>
            <Form.Item name='name' className='w-[100%]' rules={[{ required: true, message: 'Please enter the name!' }]}>
              <Input placeholder='Feeling Name' />
            </Form.Item>
            <Form.Item
              name='goodToKnow'
              className='w-[100%]'
              rules={[{ required: true, message: 'Please enter the Good To Know' }]}
            >
              <Input placeholder='Good To Know' />
            </Form.Item>
          </div>

          <Row gutter={16}>
            <Col span={24}>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.List name='explanatoryVideo'>
                    {(fields, { add, remove }) => (
                      <div className='flex flex-col '>
                        {fields.map(({ key, name, ...restField }) => (
                          <div className='flex'>
                            <Form.Item
                              className='w-[50%]'
                              {...restField}
                              name={name}
                              rules={[{ required: true, message: 'Missing explanatoryVideo' }]}
                            >
                              <Input placeholder='Explanatory Video' />
                            </Form.Item>
                            {fields.length > 1 && (
                              <MinusCircleOutlined className='mb-6 ml-3' onClick={() => remove(name)} />
                            )}
                          </div>
                        ))}
                        <Form.Item className='sm:absolute top-0 right-2'>
                          <Button
                            type='dashed'
                            style={{ width: '200px' }}
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add Explanatory Video
                          </Button>
                        </Form.Item>
                      </div>
                    )}
                  </Form.List>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.List name='signOf'>
                    {(fields, { add, remove }) => (
                      <div>
                        {fields.map(({ key, name, ...restField }) => (
                          <div className='flex '>
                            <Form.Item
                              {...restField}
                              name={name}
                              className='w-[50%]'
                              rules={[{ required: true, message: 'Missing Signs' }]}
                            >
                              <Input placeholder='Add Signs' />
                            </Form.Item>
                            {fields.length > 1 && (
                              <MinusCircleOutlined className='mb-6 ml-3' onClick={() => remove(name)} />
                            )}
                          </div>
                        ))}
                        <Form.Item className='sm:absolute top-0 right-2'>
                          <Button
                            type='dashed'
                            style={{ width: '200px' }}
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add Signs
                          </Button>
                        </Form.Item>
                      </div>
                    )}
                  </Form.List>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.List name='shadeOf'>
                    {(fields, { add, remove }) => (
                      <div>
                        {fields.map(({ key, name, ...restField }) => (
                          <div className='flex'>
                            <Form.Item
                              className='w-[50%]'
                              {...restField}
                              name={name}
                              rules={[{ required: true, message: 'Missing Shades' }]}
                            >
                              <Input placeholder='Add Shades' />
                            </Form.Item>
                            {fields.length > 1 && (
                              <MinusCircleOutlined className='mb-6 ml-3' onClick={() => remove(name)} />
                            )}
                          </div>
                        ))}
                        <Form.Item className='sm:absolute top-0 right-2'>
                          <Button
                            type='dashed'
                            style={{ width: '200px' }}
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add Shades
                          </Button>
                        </Form.Item>
                      </div>
                    )}
                  </Form.List>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.List name='howToDeal'>
                    {(fields, { add, remove }) => (
                      <div>
                        {fields.map(({ key, name, ...restField }) => (
                          <div className='flex'>
                            <Form.Item
                              {...restField}
                              name={name}
                              className='w-[50%]'
                              rules={[{ required: true, message: 'Missing How To Deal' }]}
                            >
                              <Input placeholder='Add How to Deal' />
                            </Form.Item>
                            {fields.length > 1 && (
                              <MinusCircleOutlined className='mb-6 ml-3' onClick={() => remove(name)} />
                            )}
                          </div>
                        ))}
                        <Form.Item className='sm:absolute top-0 right-2'>
                          <Button
                            type='dashed'
                            style={{ width: '200px' }}
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add How To Deal
                          </Button>
                        </Form.Item>
                      </div>
                    )}
                  </Form.List>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.List name='prevention'>
                    {(fields, { add, remove }) => (
                      <div>
                        {fields.map(({ key, name, ...restField }) => (
                          <div className='flex'>
                            <Form.Item
                              {...restField}
                              name={name}
                              className='w-[50%]'
                              rules={[{ required: true, message: 'Missing Signs' }]}
                            >
                              <Input placeholder='Add Prevention' />
                            </Form.Item>
                            {fields.length > 1 && (
                              <MinusCircleOutlined className='mb-6 ml-3' onClick={() => remove(name)} />
                            )}
                          </div>
                        ))}
                        <Form.Item className='sm:absolute top-0 right-2 '>
                          <Button
                            type='dashed'
                            style={{ width: '200px' }}
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Add prevention
                          </Button>
                        </Form.Item>
                      </div>
                    )}
                  </Form.List>
                </Col>
              </Row>
            </Col>
          </Row>
          <Table dataSource={getTableData()} columns={columns} pagination={false} size='middle' className='mb-4' />
          {/* <Form.Item className='sm:absolute top-0 right-2'>
            <Button type='dashed' style={{ width: '200px' }} onClick={handleAddRow} block icon={<PlusOutlined />}>
              Add Exercise
            </Button>
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
}

export default CreatePlan;
