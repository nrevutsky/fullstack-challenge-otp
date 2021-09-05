import React, { useState } from 'react';
import { Button, Card, Form, Input, message, Spin } from 'antd';
import { apiClient } from '../api';

interface IFormLogInValues {
  email: string;
}

interface IFormOTPValues extends IFormLogInValues {
  otp: string;
}

interface ILogInProps {
  getUser: () => void;
}

const LogIn: React.FC<ILogInProps> = ({ getUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowOTP, setIsShowOTP] = useState(false);
  const [email, setEmail] = useState('');

  const logIn = async (values: IFormLogInValues): Promise<void> => {
    setIsLoading(true);

    const res = await apiClient.logIn({ email: values.email });

    if (res.data.message === 'Effected' && res.status === 200) {
      setIsShowOTP(true);
      message.success('We sent OTP code to your email');
    } else {
      message.error('Unknown error');
    }

    setIsLoading(false);
  };

  const checkOTP = async (values: IFormOTPValues): Promise<void> => {
    setIsLoading(true);

    apiClient.checkOTP({ email: values.email, otp: values.otp }).then(
      (res) => {
        if (res.data.accessToken && res.data.refreshToken) {
          localStorage.setItem('accessToken', res.data.accessToken);
          localStorage.setItem('refreshToken', res.data.refreshToken);

          getUser();
        } else {
          message.warning('Incorrect OTP code');
        }

        setIsLoading(false);
      },
      () => {
        message.warning('Incorrect OTP code');
        setIsLoading(false);
      }
    );
  };

  return (
    <>
      {isLoading && <Spin size="large" className="spinner" />}

      <Card
        title={isLoading}
        hoverable
        style={{
          width: 500,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Form onFinish={isShowOTP ? checkOTP : logIn}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email' }]}
            style={{ display: isShowOTP ? 'none' : 'block' }}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          {isShowOTP && (
            <Form.Item
              label="OTP code"
              name="otp"
              rules={[{ required: true, message: 'Please input OTP code' }]}
            >
              <Input />
            </Form.Item>
          )}

          <div style={{ margin: 50 }} />

          {isShowOTP && (
            <Button onClick={() => setIsShowOTP(false)}>Change email</Button>
          )}

          <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
            {isShowOTP ? 'Log In' : 'Send OTP'}
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default LogIn;
