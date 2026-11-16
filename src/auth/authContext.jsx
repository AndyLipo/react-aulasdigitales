import { createContext, useContext, useEffect, useState } from "react"
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from "firebase/auth"
import { auth } from "../firebase/config"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null)
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUsuario(user)
            setCargando(false)
        })

        return () => unsubscribe()
    }, [])

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const registrar = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    const value = {
        usuario,
        cargando,
        login,
        registrar,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}