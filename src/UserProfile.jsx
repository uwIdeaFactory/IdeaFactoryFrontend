import React from 'react'
import { Breadcrumb, Layout, theme, Button } from 'antd';
import { UploadOutlined, HomeOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import UserRelatedProjects from './components/UserRelatedProjects';
import Skill from './components/Skill';
import Experience from './components/Experience';
import BasicInformation from './components/BasicInformation';
import Navigation from './components/Navigation';

const { Content, Footer } = Layout;

const UserProfile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3000/user/J2lhMMs3P9UISWlzfhKIYj9xOIA3")
      // .then(res => res.data)
      .then(res => res.data)
      .then(setUser)
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
          <Breadcrumb.Item>{user.username}'s Profile</Breadcrumb.Item>
        </Breadcrumb>
        <BasicInformation 
          {...user}
        >
        </BasicInformation>
        <Experience></Experience>
        <Skill></Skill>
        <UserRelatedProjects></UserRelatedProjects>
      </Content>

      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  )
}

export default UserProfile;

