import { Breadcrumb, Button, Form, Input, Layout, theme } from 'antd';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Navigation from '../components/Navigation';

const { Content, Footer } = Layout;

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, googleLogin, loginDisable } = useAuth()

    const handleGoogleSignIn = () => {
        googleLogin();
    }

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const handleSignIn = () => {
        login(email, password)
    }

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
                        { title: "Home" },
                        { title: "Sign In" },
                    ]}
                >
                </Breadcrumb>
                <div
                    style={{
                        padding: 30,
                        textAlign: 'center',
                        background: colorBgContainer,
                    }}
                >
                    <Form
                        name="basic"
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                            // padding: '0 30px'
                            // textAlign: 'center',
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={() => handleSignIn()}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit" disabled={loginDisable}>
                                Submit
                            </Button>

                        </Form.Item>
                    </Form>
                    <div style={{ padding: '10px 0' }}>
                        <Button onClick={() => handleGoogleSignIn()}>
                            Log In with Google
                        </Button>
                    </div>
                    <div>
                        Don't have an account?
                        <NavLink to="/signUp">
                            <Button borderRadiusLG='80'>
                                Sign Up
                            </Button>
                        </NavLink>
                    </div>
                </div>
            </Content>
            <Footer 
                style={{
                    textAlign: 'center',
            }}>
                IDEA FACTORY ©2023
            </Footer>
        </Layout>



    )
}

export default SignIn
