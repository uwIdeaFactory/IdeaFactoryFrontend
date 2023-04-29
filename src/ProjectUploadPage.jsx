import { Input, Button } from 'antd';
import { useState } from 'react';
import { ProfileOutlined, HomeOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom'
import { Breadcrumb, Layout, Menu } from 'antd';
import ProjectUploadForm from './components/ProjectUploadForm';
const { Header, Content, Footer } = Layout;
const { TextArea } = Input;
const ProjectUploadPage = () => {
  const [value, setValue] = useState('');
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
        <NavLink to={"/userProfile"}>
          <Button type="primary" icon={<ProfileOutlined />} size={20}>
            Profile
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
          <Breadcrumb.Item>Project</Breadcrumb.Item>
          <Breadcrumb.Item>Upload</Breadcrumb.Item>
          </Breadcrumb>
      {/* <TextArea placeholder="Title" autoSize />
            <div
              style={{
                margin: '24px 0',
              }}
            />
            <TextArea
              placeholder="Brief"
              autoSize={{
                minRows: 2,
                maxRows: 6,
              }}
            />
            <div
              style={{
                margin: '24px 0',
              }}
            />
            <TextArea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Description"
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
      /> */}
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