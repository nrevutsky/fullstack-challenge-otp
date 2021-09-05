import React, { useState, useEffect } from 'react';
import LogIn from './components/LogIn';
import { apiClient } from './api';
import { Spin } from 'antd';
import User from './components/User';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    setIsLoading(true);

    try {
      const res = await apiClient.getUser();

      setUserEmail(res.data.email);
    } catch {
      setUserEmail('');
    }

    setIsLoading(false);
  };

  if (isLoading) return <Spin size="large" className="spinner" />;

  return (
    <>
      {!userEmail && <LogIn getUser={getUser} />}
      {userEmail && <User getUser={getUser} userEmail={userEmail} />}
    </>
  );
};

export default App;
