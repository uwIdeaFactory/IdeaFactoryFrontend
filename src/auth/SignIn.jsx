import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, message, Form, Input } from 'antd';
import { useAuth } from '../AuthContext';


const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, googleLogin, loginDisable } = useAuth()

    const handleGoogleSignIn = () => {
        googleLogin();
    }


    const handleSignIn = (e) => {
        login(email, password)
    }

    return (
        <div className='sign-in-container'>

            <h1>Log In</h1>

            <Form
                name="basic"
                labelCol={{
                    span: 8,
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

                {/* <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item> */}

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
            {/* <button onClick={handleGoogleSignIn}>Log In with Google</button> */}
            <Button onClick={() => handleGoogleSignIn()}>
                Log In with Google
            </Button>

            <div className="w-100 text-center mt-2">
                Don't have an account?
                <NavLink to="/signUp">
                    <Button borderRadiusLG='80'>
                        Sign Up
                    </Button>
                </NavLink>
            </div>
        </div>


    )
}

export default SignIn
