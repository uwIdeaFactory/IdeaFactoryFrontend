import { Layout, Menu, Input, Button } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom'
import { HomeOutlined, AppstoreOutlined, SearchOutlined } from '@ant-design/icons';
import { useAuth } from '../AuthContext';
const { Header } = Layout;
const { SubMenu } = Menu;

const Navigation = () => {
  const { user, login } = useAuth()
  return (
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
            <NavLink to={`/userProfile/${user.uid}`}>
              <Button type="primary" icon={<ProfileOutlined />} size={20}>
              </Button>
            </NavLink>
          </Menu.Item>
          {/* <Menu.Item key="search" style={{ position: 'absolute', right: 50 }}>
            <Input placeholder="Search" prefix={<SearchOutlined />} />
          </Menu.Item> */}
        </Menu>
      </Header>
  );
};

export default Navigation;