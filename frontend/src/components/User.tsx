import { Button, Col, Row, Typography } from 'antd';
import React from 'react';

interface IUserProps {
  userEmail: string;
  getUser: () => void;
}

const User: React.FC<IUserProps> = ({ userEmail, getUser }) => {
  const logOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    getUser();
  };

  return (
    <Row style={{ marginTop: 200 }}>
      <Col span={24} style={{ textAlign: 'center' }}>
        <Typography.Title>Welcome, {userEmail}!</Typography.Title>
      </Col>
      <Col span={24} style={{ textAlign: 'center' }}>
        <Button type="primary" onClick={logOut}>
          Log out
        </Button>
      </Col>
    </Row>
  );
};

export default User;
