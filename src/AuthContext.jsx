import React from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithRedirect,
    signInWithPopup,
    signOut
} from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { auth } from './firebase';
import { Button, message, Form, Input } from 'antd';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

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
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                if (errorCode === "auth/wrong-password") {
                    message.error('Wrong password');
                }
                else if (errorCode === "auth/user-not-found") {
                    message.error('User not found');
                }
            });
    }

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function googleLogin() {
        const googleAuthProvider = new GoogleAuthProvider();
        googleAuthProvider.setCustomParameters({
            prompt: 'select_account'
        });
        // log in with redirect
        // return signInWithRedirect(auth, googleAuthProvider);
        return signInWithPopup(auth, googleAuthProvider);
    }

    function signout() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
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
        signout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}