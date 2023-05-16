import { DownOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Space, theme } from 'antd';
import React from 'react';
import { useAuth } from '../AuthContext';
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom'

const { useToken } = theme;
// const items = [
//   {
//     key: '1',
//     label: (
//       <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
//         My Profile (disabled)
//       </a>
//     ),
//     disabled: true,
//   },
//   {
//     key: '2',
//     type: 'group',
//     label: 'My Projects',
//     disabled: true,
//     children: [
//       {
//         key: '1-1',
//         label: 'Hosting Projects',
//         disabled: true,
//       },
//       {
//         key: '1-2',
//         label: 'Joined Projects',
//         disabled: true,
//       },
//     ],
// },
// ];
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