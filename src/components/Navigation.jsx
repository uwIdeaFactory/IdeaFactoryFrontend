import { Layout, Menu, Input, Button } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom'
import { HomeOutlined, AppstoreOutlined, SearchOutlined } from '@ant-design/icons';
import { useAuth } from '../AuthContext';
import IconDropdown from './IconDropdown';
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
          <Menu.Item key="profile" style={{ position: 'absolute', right: 0 }}>
            <IconDropdown></IconDropdown>
          </Menu.Item>
        </Menu>
      </Header>
  );
};

export default Navigation;