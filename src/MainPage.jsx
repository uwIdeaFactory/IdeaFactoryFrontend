import { Breadcrumb, Layout, Space, theme, Input, Button, Row, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import Project from './components/Project';
import { Pagination } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useAuth } from './AuthContext';
import Navigation from './components/Navigation';
import {  Menu} from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import { HomeOutlined, AppstoreOutlined, SearchOutlined } from '@ant-design/icons';
const { Header } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;


const { Content, Footer } = Layout;
const MainPage = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { user, login } = useAuth()
  const [numProjects, setNumProjects] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProjects = async (page, pageSize, text) => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/projects/" + text, {
        params: {
          page: page,
          limit: pageSize
        }
      })
      setProjects(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects(currentPage, pageSize, "");
  }, []);

  // get counts of projects
  useEffect(() => {
    axios.get("http://localhost:3000/projects/count")
      .then(res => res.data)
      .then(setNumProjects);
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const projectGroups = [];
  for (let i = 0; i < projects.length; i += 3) {
    projectGroups.push(projects.slice(i, i + 3));
  }

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
    fetchProjects(page, pageSize, "");
  }

  return (
    <Layout className="layout">
      <Header>
        <div className="logo"></div>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="mail" icon={<HomeOutlined />}>
            <NavLink to={"/"}> Home </NavLink>
          </Menu.Item>
          <Menu.Item key="app" icon={<AppstoreOutlined />}>
            Navigation 2
          </Menu.Item>
          <SubMenu key="SubMenu" icon={<AppstoreOutlined />} title="Navigation 3">
            <Menu.ItemGroup title="Item 1">
              <Menu.Item key="setting:1">Option 1</Menu.Item>
              <Menu.Item key="setting:2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Item 2">
              <Menu.Item key="setting:3">Option 3</Menu.Item>
              <Menu.Item key="setting:4">Option 4</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <Menu.Item key="profile" style={{ position: 'absolute', right: 0 }}>
            <NavLink to="/userProfile">
              <Button type="primary" icon={<ProfileOutlined />} size={20}>
              </Button>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="search" style={{ position: 'absolute', right: 50 }}>
            <Search placeholder='Search' allowClear onSearch={value => {fetchProjects(currentPage, pageSize, value)}} prefix={<SearchOutlined />}/>
          </Menu.Item>
        </Menu>
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
          items={[
            { title: "Home" }
          ]}
        >
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
          {isLoading ? (
            <div>
              <Spin
                size='large'
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh'
                }}
              />
            </div>
          ) : (
            <div>
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
            </div>
          )}
          <Pagination
            style={{
              textAlign: 'center',
            }}
            defaultCurrent={currentPage} total={numProjects} onChange={onPageChange}
          />
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

export default MainPage;