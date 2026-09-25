import { useParams } from "react-router"
import { useEffect, useState } from "react"

export const ProductoDetalle = () => {
    const { id } = useParams()
    const [producto, setProducto] = useState(null)
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        fetch("/productos.json")
            .then((res) => res.json())
            .then((data) => {
                const encontrado = data.find((p) => p.id === Number(id))
                setProducto(encontrado)
            })
            .catch((error) => console.error("Error al cargar producto:", error))
            .finally(() => setCargando(false))
    }, [id])

    if (cargando) {
        return <p className="text-center mt-12">Cargando producto...</p>
    }

    if (!producto) {
        return <p className="text-center mt-12">Producto no encontrado</p>
    }

    return (
        <div className="max-w-3xl mx-auto p-6 flex flex-col md:flex-row gap-8">
            <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full md:w-1/2 aspect-square object-cover rounded-lg"
            />
            <div className="flex-1">
                <p className="text-sm text-slate-500 uppercase">{producto.categoria}</p>
                <h1 className="text-2xl font-bold mt-1">{producto.nombre}</h1>
                <p className="text-2xl font-semibold mt-4">
                    ${producto.precio.toLocaleString("es-AR")}
                </p>
                <p className="text-slate-600 mt-2">Stock disponible: {producto.stock}</p>

                <button className="mt-6 bg-slate-800 text-white rounded py-3 px-6 hover:bg-slate-700">
                    Agregar al carrito
                </button>
            </div>
        </div>
    )
}