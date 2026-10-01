import { NavLink } from "react-router"
import { NavInicio } from "../header/NavInicio"
import { NavSobreNosotros } from "../header/NavSobreNosotros"
import { NavProductos } from "../header/NavProductos"
import Logo from "../assets/react.svg"
import { NavCarrito } from "../header/NavCarrito"


export const Navbar = () => {

    const linkClass = ({ isActive }) =>
        `px-3 py-2 rounded transition-colors ${isActive ? "active" : "text-slate-200 hover:text-white"}`
    const cartLinkClass = ({ isActive }) =>
        `text-slate-200 hover:text-white transition-colors ${isActive ? "active" : ""}`

    return (
        <nav className="flex flex-row justify-between items-center bg-slate-800 px-6 py-4 shadow-md">
            {/* logo */}
            <div>
                <NavLink to="/">
                    <img src={Logo} alt="Logo TiendaShop" className="h-10" />
                </NavLink>
            </div>
            {/* links navegacion */}
            <div className="flex flex-row items-center justify-center gap-4 flex-1 ml-8">
                <NavLink to="/" className={linkClass}>
                    <NavInicio />
                </NavLink>
                <NavLink to="/sobre-nosotros" className={linkClass}>
                    <NavSobreNosotros />
                </NavLink>
                <NavLink to="/productos" className={linkClass}>
                    <NavProductos />
                </NavLink>
            </div>
            {/* link navegacion carrito */}
            <div>
                <NavLink to="/carrito" className={cartLinkClass}>
                    <NavCarrito />
                </NavLink>
            </div>
        </nav>
    )
}