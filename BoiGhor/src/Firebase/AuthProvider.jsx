// AuthProvider.jsx
import React, { useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile
} from "firebase/auth";
import { auth } from "../Firebase/firebase.init";
import { AuthContex } from "../Firebase/AuthContex";

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    const singinwithgoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const logoutUser = () => {
        setLoading(true)
        return signOut(auth);
    };
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        registerUser,
        loginUser,
        logoutUser, singinwithgoogle, updateUserProfile
    };

    return (
        <AuthContex value={authInfo}>
            {children}
        </AuthContex>
    );
};

export default AuthProvider;
