import { useState } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "./AuthContext"

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [cargando, setCargando] = useState(false)

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setCargando(true)

        try {
            await login(email, password)
            navigate("/admin")
        } catch (err) {
            console.error(err)
            setError("Email o contraseña incorrectos.")
        } finally {
            setCargando(false)
        }
    }

    return (
        <div className="max-w-sm mx-auto px-6 py-16">
            <h1 className="text-2xl font-bold mb-6">Iniciar sesión</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <button
                    type="submit"
                    disabled={cargando}
                    className="bg-slate-800 text-white py-2 rounded hover:bg-slate-700 disabled:opacity-50"
                >
                    {cargando ? "Ingresando..." : "Ingresar"}
                </button>
            </form>
        </div>
    )
}