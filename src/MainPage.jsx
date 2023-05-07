import { Breadcrumb, Layout, Space, theme, Input, Button, Row, Spin } from 'antd';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { user, login } = useAuth()
  const [numProjects, setNumProjects] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProjects = async (page, pageSize) => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/projects", {
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
    fetchProjects(currentPage);
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
    fetchProjects(page, pageSize);
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
          items={[
            {title: "Home"}
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
          { isLoading ? (
            <div>
              <Spin 
                size='large' 
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh'}}
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

const onSearch = value => alert(value);

export default MainPage;