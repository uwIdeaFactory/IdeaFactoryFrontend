import { DownOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Space, theme } from 'antd';
import React from 'react';
import { useAuth } from '../AuthContext';
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'

const { useToken } = theme;
const OldUserDropdown = () => {
  const { user, signout } = useAuth()
  let link = "/userProfile/" + user.uid
  const { token } = useToken();

  const [username, setUsername] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/user/" + user.uid)
      .then(res => res.data)
  }, []);

  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("Sign out successful")
        // Redirect to the sign in page
        window.location.href = "/"
    }).catch(() => {
        // An error happened.
        console.log("Sign out failed")
    });
  }

  const items = [
    {
        key: '1',
        label: (
        <NavLink to={link}>
          <a>
              My Profile
          </a>
        </NavLink>

        ),
    }, 
    {
        key: '2',
        type: 'group',
        label: 'My Projects',
        children: [
          {
            key: '1-1',
            label: 'Hosting Projects',
          },
          {
            key: '1-2',
            label: 'Joined Projects',
          },
        ],
    },
];

  const menuStyle = {
    boxShadow: 'none',
  };
  return (
    <Dropdown
      menu={{
        items,
      }}
      dropdownRender={(menu) => (
        <div style={contentStyle}>
          {React.cloneElement(menu, {
            style: menuStyle,
          })}
          <Divider
            style={{
              margin: 0,
            }}
          />
          <Space
            style={{
              padding: 8,
            }}
          >
            <button onClick={handleSignOut}>Sign Out</button>
          </Space>
        </div>
      )}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
            {username}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};
export default OldUserDropdown;