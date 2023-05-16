import { Breadcrumb, Button, Form, Input, Layout, theme } from 'antd';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../AuthContext';
import Navigation from '../components/Navigation';

const { Content, Footer } = Layout;

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, signupDisable } = useAuth()

    const handleSignUp = (e) => {
        // Save the email and password
        signup(email, password)
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
                        { title: "Home" },
                        { title: "Sign Up" },
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
                        name='basic'
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={() => handleSignUp()}
                        autoComplete='off'
                    >
                        <Form.Item
                            label='Email'
                            name='email'
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
                            <Button type="primary" htmlType="submit" disabled={signupDisable}>
                                Sign Up
                            </Button>
                        </Form.Item>
                    </Form>

                    <div>
                        Already have an account?
                        <Link to="/signIn">
                            <Button>
                                Log in
                            </Button>
                        </Link>
                    </div>
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                IDEA FACTORY ©2023
            </Footer>
        </Layout>
        // <div className='sign-in-container'>

        //     <h1>Sign Up</h1>

        //     <Form
        //         name="basic"
        //         labelCol={{
        //             span: 8,
        //         }}
        //         wrapperCol={{
        //             span: 16,
        //         }}
        //         style={{
        //             maxWidth: 600,
        //         }}
        //         initialValues={{
        //             remember: true,
        //         }}
        //         onFinish={() => handleSignUp()}
        //         autoComplete="off"
        //     >
        //         <Form.Item
        //             label="Email"
        //             name="email"
        //             rules={[
        //                 {
        //                     required: true,
        //                     message: 'Please input your email!',
        //                 },
        //             ]}
        //             onChange={(e) => setEmail(e.target.value)}
        //         >
        //             <Input />
        //         </Form.Item>

        //         <Form.Item
        //             label="Password"
        //             name="password"
        //             rules={[
        //                 {
        //                     required: true,
        //                     message: 'Please input your password!',
        //                 },
        //             ]}
        //             onChange={(e) => setPassword(e.target.value)}
        //         >
        //             <Input.Password />
        //         </Form.Item>

        //         <Form.Item
        //             wrapperCol={{
        //                 offset: 8,
        //                 span: 16,
        //             }}
        //         >
        //             <Button type="primary" htmlType="submit" disabled={signupDisable}>
        //                 Submit
        //             </Button>

        //         </Form.Item>
        //     </Form>

        // <div className="w-100 text-center mt-2">
        //     Already have an account?
        //     <Link to="/signIn">
        //         <Button>
        //             Log in
        //         </Button>
        //     </Link>
        // </div>
        // </div>
    )
}

export default SignUp
