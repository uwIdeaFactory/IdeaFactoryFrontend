import { DownOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Space, theme } from 'antd';
import React from 'react';
import { useAuth } from '../AuthContext';
import NewUserDropdown from './NewUserDropdown';
import OldUserDropdown from './OldUserDropdown';
const { useToken } = theme;



const IconDropdown = () => {
  const { user, login } = useAuth();
  const { token } = useToken();
  
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: 'none',
  };
  if (!user) {
    return (<NewUserDropdown></NewUserDropdown>);
  } else {
    return(<OldUserDropdown></OldUserDropdown>) ;
  }
  
};
export default IconDropdown;