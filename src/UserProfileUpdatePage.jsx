import { Button } from 'antd';
import { ProfileOutlined, HomeOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom'
import { Breadcrumb, Layout, Menu } from 'antd';
import UserProfileUpdateForm from './components/UserProfileUpdateForm';
import { useState } from 'react';
import Navigation from './components/Navigation';
import React from 'react';
import ReactDOM from 'react-dom';
import { useAuth } from './AuthContext';

const { Header, Content, Footer } = Layout;

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
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default UserProfileUpdatePage;