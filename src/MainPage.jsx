import { Breadcrumb, Layout, Menu, theme, Input, Button, Row } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom'
import Project from './components/Project';
import { Pagination } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useAuth } from './AuthContext';
import Navigation from './components/Navigation';


const { Content, Footer } = Layout;

const MainPage = () => {
  const [projects, setProjects] = useState([]);
  const { user, login } = useAuth()

  useEffect(() => {
    console.log(user)
    axios.get("http://localhost:3000/projects") // api here!!!
      .then(res => res.data)
      .then(setProjects);
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const projectGroups = [];
  for (let i = 0; i < projects.length; i += 3) {
    projectGroups.push(projects.slice(i, i + 3));
  }
  
  return (
    <Layout className="layout">
      <Navigation />
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
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          <NavLink to={"/projectUpload"}>
            <Button type="primary" icon={<UploadOutlined />} size={20}>
              Upload
            </Button>
          </NavLink>
          {projectGroups.map((group, index) => {
            return (
              <Row
                gutter={16}
                key={index}
                style={{
                  margin: '16px 0',
                }}>
                {group.map((value) => {
                  return (
                    <Project
                      key={value._id}
                      pid={value._id}
                      pname={value.pname}
                      preview={value.preview}
                      owner={value.uid}
                    />
                  )
                })}
              </Row>
              )
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
        {/* {authUser.email} */}
        {/* {AuthDetails.authUser} */}
        {/* <AuthDetails></AuthDetails> */}
      </Footer>
    </Layout>
  );
};

const onSearch = value => alert(value);

export default MainPage;