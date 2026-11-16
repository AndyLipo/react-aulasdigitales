import { Navigate } from "react-router"
import { useAuth } from "./AuthContext"

export const RutaProtegida = ({ children }) => {
    const { usuario, cargando } = useAuth()

    if (cargando) {
        return <p className="text-center mt-12">Verificando sesión...</p>
    }

    if (!usuario) {
        return <Navigate to="/login" replace />
    }

    return children
}