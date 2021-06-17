import React, { createContext, useContext, useState, useEffect } from "react";
import firebase from "firebase/app"
import "firebase/auth"
import { FirebaseReducer } from "react-redux-firebase";
import { useHistory } from "react-router";

/** Notes
 * See inspiration from [here](https://usehooks.com/useAuth/)
*/

type TEmail = string
type TPassword = string
// type TResetCode = string
type TUserID = string
type TAuth = ReturnType<typeof useProvideAuth>
export type TCredentials = {
    email: TEmail;
    password: TPassword
}

export const authContext = createContext({} as TAuth);

export const useAuthContext = () => useContext(authContext)

// Provider hook that creates auth object and handles state
export const useProvideAuth = () => {
    
    /** TODO:
        * The following variable [userId] is mean to hold user profile details. As of Sprint02, there's no decision made on user profile yet
        * Also do consider if storing user profile here is the right thing to do when there's already redux
    */
    const [userId, setUser] = useState<TUserID | null | false>(null);

    // Wrap any Firebase methods we want to use making sure ...
    // ... to save the user to state.
    const signin = (credentials: TCredentials, cb?: Function) => {
        return firebase
            .auth()
            .signInWithEmailAndPassword(credentials.email, credentials.password)
            .then((authResponse) => {
                if (authResponse.user) {
                    setUser(authResponse.user.uid);
                    cb?.()
                    return
                }

                throw Error("[user] object is empty")
            })
            .catch(error => {
                console.error("Login Failed", error)
            });
    };

    const signout = (cb?: Function) => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                setUser(false)
                return cb?.()
            });
    };

    // const signup = (email: TEmail, password: TPassword) => {
    //     return firebase
    //         .auth()
    //         .createUserWithEmailAndPassword(email, password)
    //         .then((response) => {
    //             setUser(response.user);
    //             return response.user;
    //         });
    // };


    // const sendPasswordResetEmail = (email: TEmail) => {
    //     return firebase
    //         .auth()
    //         .sendPasswordResetEmail(email)
    //         .then(() => {
    //             return true;
    //         });
    // };

    // const confirmPasswordReset = (code: TResetCode, password: TPassword) => {
    //     return firebase
    //         .auth()
    //         .confirmPasswordReset(code, password)
    //         .then(() => {
    //             return true;
    //         });
    // };

    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any ...
    // ... component that utilizes this hook to re-render with the ...
    // ... latest auth object.
    useEffect(() => {
        const unsubscribe = firebase
            .auth()
            .onAuthStateChanged(auth =>
                setUser(auth ? auth.uid : false)
            );

        // Cleanup subscription on unmount
        return unsubscribe;
    }, []);

    // Return the user object and auth methods
    return {
        userId,
        signin,
        signout
        // signup,
        // sendPasswordResetEmail,
        // confirmPasswordReset,
    };
}
