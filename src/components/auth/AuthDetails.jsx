import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
// import { getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth";

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null)
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                setAuthUser(user)
            } else {
                // User is signed out
                setAuthUser(null)
            }
        });

        // const handleRedirectResult = () => {
        //     getRedirectResult(auth)
        //         .then((result) => {
        //             // This gives you a Google Access Token. You can use it to access Google APIs.
        //             const credential = GoogleAuthProvider.credentialFromResult(result);
        //             const token = credential.accessToken;
        //             // The signed-in user info.
        //             const user = result.user;
        //             // setAuthUser(user + " " + token)
        //             // ...
        //             console.log('Redirect result:', result);
        //         }).catch((error) => {
        //             // Handle Errors here.
        //             const errorCode = error.code;
        //             const errorMessage = error.message;
        //             // The email of the user's account used.
        //             const email = error.email;
        //             // The AuthCredential type that was used.
        //             const credential = GoogleAuthProvider.credentialFromError(error);
        //             // ...
        //             console.error('Redirect error:', error);
        //         });
        // }

        return () => {
            // Unsubscribe auth listener on unmount
            listen()
            // handleRedirectResult()
        }



    }, [])

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
            {authUser ? <><h1>Logged in as {authUser.email} <button onClick={handleSignOut}>SignOut</button></h1></> : <><h1>Not logged in</h1></>}
        </div>
    )
}

export default AuthDetails
