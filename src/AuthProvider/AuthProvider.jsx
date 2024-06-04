import app from '@/firebaseConfig/firebase.config';
import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updatePhoneNumber, updateProfile } from 'firebase/auth'


export const AuthContext = createContext(null);
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }



    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        setLoading(true)
        signOut(auth)
    }
    const updateUserProfile = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name, phoneNumber: "01342344"
        });
    }
    const updateUserPhoneNumber = (phone) => {
        return updatePhoneNumber(auth.currentUser, {
            phoneNumber: phone
        })
    }
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
    }, [])


    const authInfo = {
        user,
        createUser,
        signIn,
        loading,
        logOut,
        updateUserProfile,
        updateUserPhoneNumber
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;