import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, theme } from 'antd';
import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../AuthContext';

const { useToken } = theme;

const items = [
  {
    key: 'login',
    label: (
      <NavLink to={"/signin"}>
        <a>Login</a>
      </NavLink>
    )
  },
  {
    key: 'sign up',
    label: (
      <NavLink to={"/signup"}>
        <a>Sign up</a>
      </NavLink>
    )
  },
];


const NewUserDropdown = () => {
  const { user, login } = useAuth();
  const { token } = useToken();
  const navigate = useNavigate();
  function jump() {
    navigate(`/signin`);
  }
  
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: 'none',
  };
    return (
      <Dropdown
        menu={{
          items
        }}
        // dropdownRender={(menu) => (
        //   <NavLink to={"/signin"}>
        //     <div style={contentStyle}>
        //       {React.cloneElement(menu, {
        //         style: menuStyle,
        //       })}
        //       <Divider
        //         style={{
        //           margin: 0,
        //         }}
        //       />
        //       <Space
        //         style={{
        //           padding: 8,
        //         }}
        //       >
        //         <Button type="primary">Sign in / Sign Up</Button>
        //       </Space>
        //     </div>
                      
        //   </NavLink>
          
          
        // )}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            New User ?
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    );
  }
  
export default NewUserDropdown;