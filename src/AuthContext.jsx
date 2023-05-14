import React from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithRedirect,
    signInWithPopup,
    signOut,
    getAuth
} from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { auth } from './firebase';
import { Button, message, Form, Input } from 'antd';
import axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [loginDisable, setLoginDisable] = useState(false);
    const [signupDisable, setSignupDisable] = useState(false);

    function login(email, password) {
        // return signInWithEmailAndPassword(auth, email, password);
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                console.log(userCredential)
                // const user = userCredential.user;
                // ...

                // Redirect to the main page
                message.success('LogIn Success as ' + userCredential.user.email);
                // Wait for 1 second
                setTimeout(() => {
                    window.location.href = "/"
                }, 1000);
                // window.location.href = "/authDetails"
                setLoginDisable(true);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                setLoginDisable(false);

                if (errorCode === "auth/wrong-password") {
                    message.error('Wrong password');
                }
                else if (errorCode === "auth/user-not-found") {
                    message.error('User not found');
                }
            });
    }

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                console.log(userCredential)

                axios.post('http://localhost:3000/user/create', {
                    email: userCredential.user.email,
                    uid: userCredential.user.uid,
                })
                console.log("User created")

                // Redirect to the main page
                message.success('SignUp Success as ' + userCredential.user.email);
                // Wait for 1 second
                setTimeout(() => {
                    window.location.href = "/userProfileUpdate/"
                }, 1000);
                setSignupDisable(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Error signing up")
                console.log(errorCode, errorMessage)
                setSignupDisable(false);

                if (errorCode === "auth/email-already-in-use") {
                    message.error('Email already in use');
                }
                else if (errorCode === "auth/invalid-email") {
                    message.error('Invalid email');
                }
                else if (errorCode === "auth/weak-password") {
                    message.error('Weak password');
                }

            });
    }

    function googleLogin() {
        // const googleAuthProvider = new GoogleAuthProvider();
        // googleAuthProvider.setCustomParameters({
        //     prompt: 'select_account'
        // });
        // log in with redirect
        // return signInWithRedirect(auth, googleAuthProvider);

        const provider = new GoogleAuthProvider();
        const GoogleAuth = getAuth();
        return signInWithRedirect(GoogleAuth, provider);
    }

    function signout() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("Auth state changed")
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        user,
        login,
        signup,
        googleLogin,
        signout,
        loginDisable,
        signupDisable
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}