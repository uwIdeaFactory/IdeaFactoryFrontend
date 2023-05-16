import { HomeOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import IconDropdown from './IconDropdown';

const { Header } = Layout;

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