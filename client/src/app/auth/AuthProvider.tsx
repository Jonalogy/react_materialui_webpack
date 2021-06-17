import React from "react"
import { authContext, useProvideAuth } from "app/auth/useAuth"

export const AuthProvider: React.FC = ({ children }) => {
    const auth = useProvideAuth();

    return (
        <authContext.Provider value={auth} >
            { children }
        </authContext.Provider>
    )
}
