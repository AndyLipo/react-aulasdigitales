import { Link } from "react-router"

export const Inicio = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center px-6 py-20 bg-slate-100">
            <h1 className="text-4xl font-bold text-slate-800">
                Bienvenido a TiendaShop
            </h1>
            <p className="text-slate-600 mt-4 max-w-xl">
                Encontrá la mejor indumentaria al mejor precio. Explorá nuestro catálogo
                y descubrí las últimas novedades.
            </p>
            <Link
                to="/productos"
                className="mt-6 bg-slate-800 text-white px-6 py-3 rounded hover:bg-slate-700"
            >
                Ver productos
            </Link>
        </div>
    )
}