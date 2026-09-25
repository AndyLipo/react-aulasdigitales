import { NavLink } from "react-router"
import { Inicio } from "../header/NavInicio"
import { SobreNosotros } from "../header/NavSobreNosotros"
import { Productos } from "../header/NavProductos"
import { Carrito } from "../header/NavCarrito"
import Logo from "../assets/react.svg"

export const Navbar = () => {

    return (
        <nav className="flex flex-row justify-between items-center">
            {/* logo */}
            <div className="bg-blue-500">
                <NavLink
                    to="/"
                >
                    <img src={Logo} alt="Img de logo" />
                </NavLink>
            </div>
            {/* links navegacion */}
            <div className="bg-pink-500 flex flex-row items-center justify-evenly flex-1">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    <Inicio />
                </NavLink>
                <NavLink
                    to="/sobre-nosotros"
                    className={({ isActive }) => isActive ? "active" : ""}>
                    <SobreNosotros />
                </NavLink>
                <NavLink to="/productos"
                    className={({ isActive }) => isActive ? "active" : ""}>
                    <Productos />
                </NavLink>
            </div>
            {/* link navegacion carrito */}
            <div className="bg-cyan-500">
                <NavLink to="/carrito" className={({ isActive }) => isActive ? "active" : ""}>
                    <Carrito />
                </NavLink>
            </div>
        </nav>
    )
}
