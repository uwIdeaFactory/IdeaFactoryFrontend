import { Button } from 'antd';
import { ProfileOutlined, HomeOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom'
import { Breadcrumb, Layout, Menu } from 'antd';
import ProjectUploadForm from './components/ProjectUploadForm';
import { useState } from 'react';
import Navigation from './components/Navigation';
import React from 'react';
import ReactDOM from 'react-dom';

const { Header, Content, Footer } = Layout;

const ProjectUploadPage = () => {
  const [value, setValue] = useState('');

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
          <Breadcrumb.Item>Upload</Breadcrumb.Item>
        </Breadcrumb>
        <ProjectUploadForm></ProjectUploadForm>
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
export default ProjectUploadPage;