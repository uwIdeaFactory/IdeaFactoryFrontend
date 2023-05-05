import React from 'react'
import { Breadcrumb, Layout, Menu, theme, Card, Input, Button  } from 'antd';
import { UploadOutlined, HomeOutlined } from '@ant-design/icons';
const { Header, Content, Footer } = Layout;
import { NavLink } from 'react-router-dom'

import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import ProjectRow from './components/ProjectRow';
import UserRelatedProjects from './components/UserRelatedProjects';
import Skill from './components/Skill';
import Experience from './components/Experience';
import BasicInformation from './components/BasicInformation';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/user/J2lhMMs3P9UISWlzfhKIYj9xOIA3")
      // .then(res => res.data)
      .then(res => setUser(res.data));
  }, []);

  const {
      token: { colorBgContainer },
    } = theme.useToken();
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={new Array(15).fill(null).map((_, index) => {
              const key = index + 1;
              return {
                key,
                label: `nav ${key}`,
              };
            })}
          />
          <NavLink to={"/projectUpload"}>
            <Button type="primary" icon={<UploadOutlined />} size={20}>
              Upload
            </Button>
          </NavLink>
          <NavLink to={"/"}>
            <Button type="primary" icon={<HomeOutlined />} size={20}>
              Home
            </Button>
          </NavLink>
        </Header>
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
            <Breadcrumb.Item>User Profile</Breadcrumb.Item>
          </Breadcrumb>
          <BasicInformation>
            username: {user.username}
            contact: {user.contact}
            location: {user.location}
            bio: {user.bio}
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

