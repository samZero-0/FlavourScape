import { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { app } from "../../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setDarkMode] = useState(false);


    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
      };

    const createAccount = async (email, password) => {
        setLoading(true);
        try {
            return await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error creating account:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email, password) => {
        setLoading(true);
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error signing in:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const googleSignin = async () => {
        setLoading(true);
        try {
            return await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error with Google sign-in:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logOut = async () => {
        setLoading(true);
        try {
            return await signOut(auth);
        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('state captured', currentUser?.email)

            if(currentUser?.email){
                const user = {email: currentUser.email};
                
                axios.post("https://assignment-11-flame.vercel.app/jwt", user, {withCredentials: true})
                .then(res =>{
                    setLoading(false);
                })
            }
            else{
                axios.post('https://assignment-11-flame.vercel.app/logout',{}, {withCredentials:true})
                .then(res => {console.log(res.data)
                    setLoading(false);
                })
            }

            
        })

        return () => {
            unsubscribe();
        }
    }, [])


    const userInfo = {
        createAccount,
        signIn,
        googleSignin,
        logOut,
        user,
        loading,
        setUser,
        toggleDarkMode,
        isDarkMode,
        setDarkMode
    };

   
    return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
