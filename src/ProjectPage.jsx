import { Breadcrumb, Layout, theme, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { NavLink, useParams } from 'react-router-dom'
import ProjectPageBody from './components/ProjectPageBody';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
const { Content, Footer } = Layout;

const ProjectPage = () => {
  const { pid } = useParams();
  const [project, setProject] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/project/" + pid)
      .then(res => res.data)
      .then(setProject);
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
          <Breadcrumb.Item>{project.pname}</Breadcrumb.Item>
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

export default ProjectPage;