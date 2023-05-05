import { Breadcrumb, Layout, Menu, theme, Input, Button } from 'antd';
import { ProfileOutlined, UploadOutlined, HomeOutlined } from '@ant-design/icons';
import { NavLink, useParams } from 'react-router-dom'
import ProjectPageBody from './components/ProjectPageBody';
import axios from 'axios';
import { useEffect, useState } from 'react';
const { Header, Content, Footer } = Layout;
const { Search } = Input;

const ProjectPage = () => {
  const { pid } = useParams();
  const [project, setProject] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/projects/" + pid)
      .then(res => res.data)
      .then(setProject);
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
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          {
            <ProjectPageBody {...project} />
          }
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

export default ProjectPage;