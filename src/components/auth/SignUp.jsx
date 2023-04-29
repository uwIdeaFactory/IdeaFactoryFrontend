import React, { useState } from 'react'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
// import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { Button, Checkbox, Form, Input } from 'antd';

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSignUp = (e) => {
        // Save the email and password
        // e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                console.log(userCredential)
                // const user = userCredential.user;
                // Redirect to the sign in page
                window.location.href = "/signIn"
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Error signing up")
                console.log(errorCode, errorMessage)
            });

    }
    return (

        <div className='sign-in-container'>

            <h1>Sign Up</h1>

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
                onFinish={() => handleSignUp()}
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
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>

                </Form.Item>
            </Form>

            <div className="w-100 text-center mt-2">
                Already have an account?
                <Link to="/signIn">
                    <Button>
                        Log in
                    </Button>
                </Link>
            </div>
        </div>

    )
}

export default SignUp
