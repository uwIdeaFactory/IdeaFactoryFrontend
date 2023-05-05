import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
// import { getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import { useAuth } from '../AuthContext';


export const AuthDetails = () => {
    const { user, login, googleLogin } = useAuth()

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Sign out successful")
            // Redirect to the sign in page
            window.location.href = "/SignIn"
        }).catch((error) => {
            // An error happened.
            console.log("Sign out failed")
        });
    }

    return (
        <div>
            {user ? <><h1>Logged in as {user.email} <button onClick={handleSignOut}>SignOut</button></h1></> : <><h1>Not logged in</h1></>}
        </div>
    )
}

export default AuthDetails
