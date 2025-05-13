import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import axios from "axios";


export const AuthContext = createContext()


const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const googleProvider = new GoogleAuthProvider();



    const createUser = async (name, image, email, password) => {

        const res = await createUserWithEmailAndPassword(auth, email, password)

        if (res.user.email) {
            updateProfile(auth.currentUser, {
                displayName: name, photoURL: image
            })
        }

        return res?.user

    }

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setLoading(true)
                setUser(currentUser)
                setLoading(false)
                const email = currentUser?.email
                const res = await axios.post('https://mini-mission-server.vercel.app/jwt', { email })
                const token = res?.data?.token
                localStorage.setItem('access-token', token)
            } else {
                // logOutUser()
                setLoading(false)
                setUser(null)
                localStorage.removeItem('access-token')

            }
        })
        return () => {
            unSubscribe()
        }
    }, [])

    const authInfo = {
        createUser,
        user,
        loading,
        logOutUser,
        signInWithGoogle,
        signInUser
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    )

};

export default AuthProvider;