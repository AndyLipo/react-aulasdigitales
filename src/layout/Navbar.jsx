import { NavLink, useNavigate } from "react-router"
import { NavInicio } from "../header/NavInicio"
import { NavSobreNosotros } from "../header/NavSobreNosotros"
import { NavProductos } from "../header/NavProductos"
import { NavCarrito } from "../header/NavCarrito"
import { useAuth } from "../auth/AuthContext"
import Logo from "../assets/react.svg"

export const Navbar = () => {
    const { usuario, logout } = useAuth()
    const navigate = useNavigate()

    const linkClass = ({ isActive }) =>
        `px-3 py-2 rounded transition-colors ${isActive ? "active" : "text-slate-200 hover:text-white"}`

    const handleLogout = async () => {
        await logout()
        navigate("/")
    }
    return (
        <nav className="flex flex-row justify-between items-center bg-slate-800 px-6 py-4 shadow-md">
            {/* logo */}
            <div>
                <NavLink to="/">
                    <img src={Logo} alt="Logo TiendaShop" className="h-10" />
                </NavLink>
            </div>
            {/* links navegacion */}
            <div className="flex flex-row items-center justify-center gap-8 flex-1">
                <NavLink to="/" className={linkClass}><NavInicio /></NavLink>
                <NavLink to="/sobre-nosotros" className={linkClass}><NavSobreNosotros /></NavLink>
                <NavLink to="/productos" className={linkClass}><NavProductos /></NavLink>
                {usuario && (
                    <NavLink to="/admin" className={linkClass}>Admin</NavLink>
                )}
            </div>
            {/* carrito + sesión */}
            <div className="flex flex-row items-center gap-4">
                <NavLink to="/carrito" className={linkClass}>
                    <NavCarrito />
                </NavLink>
                {usuario ? (
                    <button
                        onClick={handleLogout}
                        className="text-sm text-slate-200 hover:text-white underline"
                    >
                        Cerrar sesión
                    </button>
                ) : (
                    <NavLink to="/login" className={linkClass}>Ingresar</NavLink>
                )}
            </div>
        </nav>
    )
}