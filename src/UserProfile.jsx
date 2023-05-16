import React from 'react'
import { Breadcrumb, Layout, theme } from 'antd';
import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import './App.css'
import axios from 'axios';
import { auth } from './firebase'
import { signOut } from 'firebase/auth'
import UserRelatedProjects from './components/UserRelatedProjects';
import Skill from './components/Skill';
import Experience from './components/Experience';
import BasicInformation from './components/BasicInformation';
import Navigation from './components/Navigation';
import { useAuth } from './AuthContext';

const { Content, Footer } = Layout;

const UserProfile = () => {
  const { uid } = useParams();
  const [user_info, setUser] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    // axios.get("http://localhost:3000/user/J2lhMMs3P9UISWlzfhKIYj9xOIA3")
    axios.get("http://localhost:3000/user/" + uid)
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
              <button onClick={handleSignOut}>SignOut</button>
            </h1></> : <><h1>Not logged in</h1></>}
        </div>}
        <BasicInformation
          {...user_info}
        >
        </BasicInformation>
        {/* <Experience></Experience>
        <Skill></Skill> */}
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

