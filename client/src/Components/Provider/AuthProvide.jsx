import React, { createContext, useEffect, useState } from 'react'

export const MyContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const contenxtProperty = {
        user,
        setUser,
    }

    return (
        <MyContext.Provider value={contenxtProperty}>
            {children}
        </MyContext.Provider>
    )
}

export default AuthProvider