import { createContext, useEffect, useState } from "react";
import {  createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword,signInWithPopup,signOut  } from "firebase/auth";
import { app } from "../../firebase/firebase.config";
// import auth from '../firebase/firebase.config'

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const auth = getAuth(app);
    const [user,setUser] = useState(null);
    const [loading,setLoading] =useState(true);
    const provider = new GoogleAuthProvider();

    const createAccount = (email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email,password) =>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = ()=>{
        signOut(auth);
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            setLoading(false)
        })
        return ()=>{
            unSubscribe()
        }
    },[])

    const googleSignin = () =>{
        return signInWithPopup(auth,provider)
    }

    const userInfo ={
        createAccount,
        loading,
        setUser,
        signIn,
        logOut,
        googleSignin,
        user
    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;