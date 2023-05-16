import { DownOutlined } from '@ant-design/icons';
import { Divider, Dropdown, Space, theme } from 'antd';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { auth } from '../firebase';

const { useToken } = theme;
const OldUserDropdown = () => {
  const { user, signout } = useAuth()
  const { token } = useToken();

  const [username, setUsername] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/user/" + user.uid)
      .then(res => res.data)
      // set the username
      .then(res_ => setUsername(res_.username));
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
        key: 'profile',
        label: (
        <NavLink to={"/userProfile/" + user.uid}>
          <a>
              My Profile
          </a>
        </NavLink>

        ),
    }, 
    {
        key: 'upload',
        label: (
        <NavLink to={"/projectUpload"}>
          <a>
              Upload
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