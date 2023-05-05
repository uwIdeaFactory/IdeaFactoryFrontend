import React, { useState } from 'react'
import { auth } from '../firebase'
import { NavLink } from 'react-router-dom'
// import { Form, Button, Card, Alert } from 'react-bootstrap'
import { signInWithEmailAndPassword, getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { Button, message, Form, Input } from 'antd';
import { useAuth } from '../AuthContext';


const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { user, login } = useAuth()

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

        // signInWithEmailAndPassword(auth, email, password)
        //     .then((userCredential) => {
        //         // Signed in
        //         console.log(userCredential)
        //         // const user = userCredential.user;
        //         // ...

        //         // Redirect to the main page
        //         message.success('LogIn Success as ' + userCredential.user.email);
        //         // Wait for 1 second
        //         setTimeout(() => {
        //             window.location.href = "/"
        //         }, 1000);
        //         // window.location.href = "/authDetails"
        //     }).catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         console.log(errorCode, errorMessage)
        //         if (errorCode === "auth/wrong-password") {
        //             message.error('Wrong password');
        //         }
        //         else if (errorCode === "auth/user-not-found") {
        //             message.error('User not found');
        //         }
        //     });

        login(email, password)

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
                {/* <NavLink to="/signUp"> */}
                <Button borderRadiusLG='80'>
                    Sign Up
                </Button>
                {/* </NavLink> */}
            </div>
        </div>


    )
}

export default SignIn
