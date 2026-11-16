import { Link } from "react-router"
import { useCarrito } from "../carrito/carritoContext"

export const Carrito = () => {
    const { items, eliminarDelCarrito, vaciarCarrito, precioTotal } = useCarrito()

    if (items.length === 0) {
        return (
            <div className="text-center px-6 py-24">
                <h1 className="text-2xl font-bold text-slate-800">Tu carrito está vacío</h1>
                <Link
                    to="/productos"
                    className="inline-block mt-6 bg-slate-800 text-white px-6 py-3 rounded hover:bg-slate-700"
                >
                    Ver productos
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-bold mb-6">Carrito de compras</h1>

            <div className="flex flex-col gap-3">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between border rounded-lg px-4 py-3"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={item.imagen}
                                alt={item.nombre}
                                className="w-14 h-14 object-contain bg-white border rounded"
                            />
                            <div>
                                <p className="font-medium">{item.nombre}</p>
                                <p className="text-sm text-slate-500">
                                    {item.cantidad} x ${item.precio.toLocaleString("es-AR")}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="font-semibold">
                                ${(item.precio * item.cantidad).toLocaleString("es-AR")}
                            </p>
                            <button
                                onClick={() => eliminarDelCarrito(item.id)}
                                className="text-sm px-3 py-1 rounded border border-red-300 text-red-600 hover:bg-red-50"
                            >
                                Quitar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center mt-6 border-t pt-4">
                <button
                    onClick={vaciarCarrito}
                    className="text-sm px-4 py-2 rounded border hover:bg-slate-100"
                >
                    Vaciar carrito
                </button>
                <p className="text-xl font-bold">
                    Total: ${precioTotal.toLocaleString("es-AR")}
                </p>
            </div>
        </div>
    )
}