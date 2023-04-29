import React, { useState } from 'react'
import { auth } from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Link } from "react-router-dom";
// import { Form, Button, Card, Alert } from 'react-bootstrap'
import { getAuth, signInWithRedirect } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { Button, Checkbox, Form, Input } from 'antd';


const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const provider = new GoogleAuthProvider();

    const GoogleAuth = getAuth();

    const handleGoogleSignIn = () => {
        signInWithRedirect(GoogleAuth, provider);
        // Redirect to the auth page
        // window.location.href = "/authDetails"
    }


    const handleSignIn = (e) => {
        // Save the email and password
        // e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                console.log(userCredential)
                // const user = userCredential.user;
                // ...

                // Redirect to the main page
                window.location.href = "/authDetails"
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Error signing in")
                console.log(errorCode, errorMessage)
            });

    }
    return (
        <div className='sign-in-container'>

            {/* <form onSubmit={handleSignIn}>
                <h1>Log In</h1>
                <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type="submit">Log In</button>
            </form>

            <button onClick={handleGoogleSignIn}>Log In with Google</button>

            <div className="w-100 text-center mt-2">
                Don't have an account?
                <Link to="/signUp">
                    <Button>
                        <p>Sign Up</p>
                    </Button>
                </Link>
            </div> */}

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
                    <Button type="primary" htmlType="submit">
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
                <Link to="/signUp">
                    <Button>
                        Sign Up
                    </Button>
                </Link>
            </div>
        </div>


    )
}

export default SignIn
