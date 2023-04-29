import React, { useState } from 'react'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSignUp = (e) => {
        // Save the email and password
        e.preventDefault();

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
        // <div className='sign-in-container'>
        //     <form onSubmit={handleSignUp}>
        //         <h1>Create a new account for Idea Factory!</h1>
        //         <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
        //         <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
        //         <button type="submit">SignUp</button>
        //     </form>
        // </div>

        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4"> Sign Up</h2>
                    <Form onSubmit={handleSignUp}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button type="submit" className="w-100">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account?
                <Link to="/signIn">
                    <Button>
                        <p>Log In</p>
                    </Button>
                </Link>
            </div>
        </>

    )
}

export default SignUp
