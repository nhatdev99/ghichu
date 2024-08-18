import React, { createContext, useEffect, useState } from 'react';
import { auth, db } from './firebase/firebaseConfig';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const signIn = (userData) => setUser(userData);
    const signOut = () => setUser(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                // Người dùng đã đăng nhập
                const userDoc = await db.collection('user').doc(authUser.uid).get();
                setUser({
                    uid: authUser.uid,
                    email: authUser.email,
                    name: userDoc.data().name,
                });
            } else {
                // Người dùng đã đăng xuất
                setUser(null);
            }
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
