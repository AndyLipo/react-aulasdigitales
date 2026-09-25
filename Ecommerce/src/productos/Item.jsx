import { Link } from "react-router"

export const Item = ({ producto }) => {
    const { id, nombre, precio, imagen, categoria } = producto

    return (
        <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <img
                src={imagen}
                alt={nombre}
                className="w-full aspect-square object-cover"
            />
            <div className="p-4">
                <p className="text-xs text-slate-500 uppercase">{categoria}</p>
                <h3 className="font-semibold">{nombre}</h3>
                <p className="text-lg font-bold mt-1">${precio.toLocaleString("es-AR")}</p>
                <Link
                    to={`/producto/${id}`}
                    className="block text-center mt-3 bg-slate-800 text-white rounded py-2 hover:bg-slate-700"
                >
                    Ver detalle
                </Link>
            </div>
        </div>
    )
}