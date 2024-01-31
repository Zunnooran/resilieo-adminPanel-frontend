import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Checkbox, Form, Input, Typography } from 'antd';
import { AxiosError } from 'axios';

import { ISignInForm } from './core/_models';
import useSignIn from './core/hooks/use-sign-in';

const { Title } = Typography;

function SignIn() {
  const { error, isError, isLoading, isLoadingVerifyToken, mutate } = useSignIn();
  const errorMessage = error instanceof AxiosError ? error?.response?.data?.message : '';

  const onFinish = (values: ISignInForm) => {
    // console.log(values);
    mutate(values);
  };

  // const handleForgotPassword = (e: FormEvent) => {
  //   e.preventDefault();
  // console.log('Handle password recovery logic here');
  // };

  return (
    <div className='flex justify-center items-center h-lvh bg-slate-100'>
      <Card style={{ width: 500 }} className='shadow-lg'>
        <div className='flex justify-center'>
          <Title level={2}>Admin Login</Title>
        </div>
        {isError && errorMessage && <Alert className='w-max' type='error' message={errorMessage} closable />}
        <br />
        <Form initialValues={{ email: '', password: '' }} onFinish={onFinish}>
          <Form.Item
            name='email'
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              {
                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Please enter a valid email address!',
              },
            ]}
          >
            <Input prefix={<MailOutlined />} type='email' placeholder='Email Address' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} type='password' placeholder='Password' />
          </Form.Item>
          {/* <a style={{ float: 'right' }} href='' onClick={handleForgotPassword}>
            Forgot password
          </a> */}
          <Form.Item>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button
              loading={isLoading || isLoadingVerifyToken}
              className='bg-blue-600 text-white'
              type='primary'
              htmlType='submit'
              block
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default SignIn;
