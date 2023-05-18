import { Breadcrumb, Layout, theme } from 'antd';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';
import { useAuth } from './AuthContext';
import BasicInformation from './components/BasicInformation';
import Navigation from './components/Navigation';
import UserRelatedProjects from './components/UserRelatedProjects';
import { auth } from './firebase';

const { Content, Footer } = Layout;

const UserProfile = () => {
  const { uid } = useParams();
  const [user_info, setUser] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    axios.get("http://35.165.101.117/user/" + uid)
      // .then(res => res.data)
      .then(res => res.data)
      .then(setUser)
  }, []);

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

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout">
      <Navigation></Navigation>

      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
          items={[
            {title: "Home"},
            {title: user_info.username + "'s Profile"}
          ]}
        >
        </Breadcrumb>
        {user_info.uid == user.uid &&
        <div>
            {user_info ? <><h1>Logged in as {user.email}
              {/* <button onClick={handleSignOut}>Sign Out</button> */}
            </h1></> : <><h1>Not logged in</h1></>}
        </div>}
        <BasicInformation
          {...user_info}
        >
        </BasicInformation>
        <UserRelatedProjects user={user_info}></UserRelatedProjects>
      </Content>

      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        IDEA FACTORY ©2023
      </Footer>
    </Layout>
  )
}

export default UserProfile;

