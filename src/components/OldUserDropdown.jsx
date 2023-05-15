import { DownOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Space, theme } from 'antd';
import React from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import { useEffect, useState } from 'react';

const { useToken } = theme;
const OldUserDropdown = () => {
  const { user, signout } = useAuth()
  let link = "http://127.0.0.1:5173/userProfile/" + user.uid
  const { token } = useToken();

  const [username, setUsername] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/user/" + user.uid)
      .then(res => res.data)
      .then(console.log);
  }, []);

  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const items = [
    {
        key: '1',
        label: (
        <a href = {link}>
            My Profile
        </a>
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
            <Button type="primary" danger>Sign Out</Button>
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