import { HomeOutlined, LoginOutlined, ProfileOutlined, SearchOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Input, Layout, Menu, Pagination, Row, Spin, theme } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from './AuthContext';
import IconDropdown from './components/IconDropdown';
import Project from './components/Project';
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
      const res = await axios.get("http://35.165.101.117/projects/" + text, {
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

    axios.get("http://35.165.101.117/projects/count")
      .then(res => res.data)
      .then(setNumProjects);
  }, [currentPage, pageSize]);

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

  // return the navlink to user profile if the user is logged in, 
  // otherwise return the navlink to login page
  const getNavLinkToUserProfile = () => {
    if (user) {
      return (
        <Menu.Item key="profile" style={{ position: 'absolute', right: 0 }}>
          <NavLink to={user ? `/userProfile/${user.uid}` : '/userProfile/J2lhMMs3P9UISWlzfhKIYj9xOIA3'}>
            <Button type="primary" icon={<ProfileOutlined />} size={20}>
            </Button>
          </NavLink>
        </Menu.Item>
      )
    } else {
      return (
        <Menu.Item key="login" style={{ position: 'absolute', right: 0 }}>
          <NavLink to={"/signIn"}>
            <Button type="primary" size={20} icon={<LoginOutlined />} />
          </NavLink>
        </Menu.Item>
      )
    }
  }

  return (
    <Layout className="layout">
      <Header>
        <div className="logo"></div>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <NavLink to={"/"}> Home </NavLink>
          </Menu.Item>
          <Menu.Item 
            key="search" 
            style={{ position: 'absolute', right: 100 }}
          >
            <Input
              placeholder='Search'
              allowClear={true}
              prefix={<SearchOutlined />}
              
              onPressEnter={ value => { fetchProjects(currentPage, pageSize, value) }}
            />
          </Menu.Item>
          <Menu.Item 
            key="user" 
            style={{ position: 'absolute', right: 0 }}
          >
            <IconDropdown></IconDropdown>
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
          {/* <NavLink to={"/projectUpload"}>
            <Button type="primary" icon={<UploadOutlined />} size={20}>
              Upload
            </Button>
          </NavLink> */}
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
        IDEA FACTORY ©2023
      </Footer>
    </Layout>
  );
};

export default MainPage;
