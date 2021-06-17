import React from 'react'
import ReactDom from "react-dom"
import App from "app/App"
import { Provider } from 'react-redux';
import { store } from "store";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database"
import { firebaseConfig } from "firebase/config"
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from 'app/auth/AuthProvider';


/** This config is for React-Redux-Firebase

    To use Firebase to store the list of User Profiles in real-time database,
    `userProfile` is required to be set with the collection name (eg. `users`) in the config
    Example: { userProfile: "users" }
    Read more here: http://react-redux-firebase.com/docs/recipes/profile.html#basic

    If User Profiles are stored in firestore instead of real-time database,
    add the following to the config.
    { useFirestoreForProfile: true  } 
    Read more here: http://react-redux-firebase.com/docs/recipes/profile.html#profile-in-firestore
 */
const rrfConfig = {};
firebase.initializeApp(firebaseConfig);

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    // createFirestoreInstance, //--> Required if we are using Firestore
};

const RootElement = document.getElementById('root')
RootElement?.setAttribute("style", "height: 100vh; width: 100vw;")

ReactDom.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <AuthProvider>
                <HashRouter hashType="noslash">
                    <App />
                </HashRouter>
            </AuthProvider>
        </ReactReduxFirebaseProvider>
    </Provider>,
    RootElement
)
