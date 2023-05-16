import { Breadcrumb, Layout } from 'antd';
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import Navigation from './components/Navigation';
import UserProfileUpdateForm from './components/UserProfileUpdateForm';

const { Content, Footer } = Layout;

const UserProfileUpdatePage = () => {
  const [value, setValue] = useState('');
  const { user, login } = useAuth();

  return (
    <Layout className="layout">
      <Navigation></Navigation>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>User Profile Update</Breadcrumb.Item>
        </Breadcrumb>
        <UserProfileUpdateForm {...user}></UserProfileUpdateForm>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        IDEA FACTORY ©2023
      </Footer>
    </Layout>
  );
};
export default UserProfileUpdatePage;