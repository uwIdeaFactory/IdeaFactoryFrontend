import { Breadcrumb, Layout, Menu, theme, Input, Button } from 'antd';
import { ProfileOutlined, UploadOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom'
import ProjectRow from './components/ProjectRow';
import Project from './components/Project';
import { Pagination } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
const { Header, Content, Footer } = Layout;
const { Search } = Input;

const MainPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get() // api here!!!
      .then(res => res.data)
      .then(setProjects);
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">

      <Header>
        <div className="logo"></div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items= {new Array(3).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
        <Search placeholder='Search' allowClear onSearch={onSearch} style={{ width: 200 }}/>
        <NavLink to={"/userProfile"}>
          <Button type="primary" icon={<ProfileOutlined />} size={20}>
            Profile
          </Button>
        </NavLink>
        <NavLink to={"/projectUpload"}>
              <Button type="primary" icon={<UploadOutlined />} size={20}>
                Upload
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
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          {projects.map((value) => {
            return (
              <Project
                key={value._id}
              />
            );
          })}

          <Pagination
            style={{
              textAlign: 'center',
           }}
          defaultCurrent={6} total={500} />
        </div>

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

const onSearch = value => alert(value);

export default MainPage;