import app from '@/firebaseConfig/firebase.config';
import { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, getRedirectResult, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut, updatePhoneNumber, updateProfile } from 'firebase/auth'
import UseAxiosPublic from '@/Hooks/UseAxiosPublic';


export const AuthContext = createContext(null);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);
    const axiosPublic = UseAxiosPublic()

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }



    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        setLoading(false)
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
    // useEffect(() => {
    //     onAuthStateChanged(auth, (currentUser) => {
    //         setUser(currentUser)
    //         setLoading(false)
    //         if (currentUser) {
    //             axiosPublic.post('/jwt', currentUser.email)
    //                 .then(res => {
    //                     if (res.data.token) {
    //                         localStorage.setItem('access-token', res.data.token)
    //                     }
    //                 })
    //         }
    //         else {
    //             localStorage.removeItem("access-token")
    //         }
    //     })
    // }, [axiosPublic])


    const googleSignInPopup = async () => {
        // const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            return result;
        } catch (error) {
            console.error('Google sign-in error with popup:', error);
            throw error;
        }
    };

    // const googleSignInRedirect = async () => {
    //     // const provider = new GoogleAuthProvider();
    //     try {
    //         await signInWithRedirect(auth, provider);
    //         // The rest of the sign-in flow is handled automatically after the redirect.
    //     } catch (error) {
    //         console.error('Google sign-in error with redirect:', error);
    //         throw error;
    //     }
    // };

    // useEffect(() => {
    //     getRedirectResult(auth)
    //         .then((result) => {
    //             if (result) {
    //                 setUser(result.user);
    //                 // Handle successful sign-in with result.user
    //                 console.log('Redirect sign-in result:', result.user);
    //                 const userInfo = { email: result.user?.email };
    //                 axiosPublic.post('/jwt', userInfo)
    //                     .then(res => {
    //                         if (res.data?.token) {
    //                             localStorage.setItem('access-token', res.data?.token);
    //                         }
    //                         setLoading(false);
    //                     })
    //                     .catch(error => {
    //                         console.error('Error during JWT token fetch:', error);
    //                         setLoading(false);
    //                     });
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Error after redirect sign-in:', error);
    //             setLoading(false);
    //         });
    // }, [axiosPublic]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if (currentUser) {
                const userInfo = { email: currentUser?.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data?.token) {
                            localStorage.setItem('access-token', res.data?.token)
                        }
                        setLoading(false)

                    })
            }
            else {
                localStorage.removeItem('access-token')
                setLoading(false)

            }
        });
        return () => {
            return unsubscribe;
        }
    }, [axiosPublic])


    const authInfo = {
        user,
        createUser,
        signIn,
        loading,
        logOut,
        updateUserProfile,
        updateUserPhoneNumber,
        googleSignInPopup,
        // googleSignInRedirect
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;