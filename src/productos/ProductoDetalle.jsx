import { useParams } from "react-router"
import { useEffect, useState } from "react"
import { getProductoPorId } from "../firebase/productosService"
import { useCarrito } from "../carrito/carritoContext"

export const ProductoDetalle = () => {
    const { id } = useParams()
    const [producto, setProducto] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)
    const { agregarAlCarrito } = useCarrito()
    const [agregado, setAgregado] = useState(false)

    useEffect(() => {
        setCargando(true)
        getProductoPorId(id)
            .then((data) => setProducto(data))
            .catch((err) => {
                console.error("Error al cargar producto:", err)
                setError("No se pudo cargar el producto.")
            })
            .finally(() => setCargando(false))
    }, [id])

    if (cargando) {
        return <p className="text-center mt-12">Cargando producto...</p>
    }

    if (error) {
        return <p className="text-center mt-12 text-red-600">{error}</p>
    }

    if (!producto) {
        return <p className="text-center mt-12">Producto no encontrado</p>
    }

    const handleAgregar = () => {
        agregarAlCarrito(producto)
        setAgregado(true)
        setTimeout(() => setAgregado(false), 1500)
    }

    return (
        <div className="max-w-3xl mx-auto p-6 flex flex-col md:flex-row gap-8">
            <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full md:w-1/2 aspect-square object-contain bg-white rounded-lg border"
            />
            <div className="flex-1">
                <p className="text-sm text-slate-500 uppercase">{producto.categoria}</p>
                <h1 className="text-2xl font-bold mt-1">{producto.nombre}</h1>
                <p className="text-2xl font-semibold mt-4">
                    ${producto.precio.toLocaleString("es-AR")}
                </p>
                <p className="text-slate-600 mt-2">Stock disponible: {producto.stock}</p>

                <button
                    onClick={handleAgregar}
                    disabled={producto.stock <= 0}
                    className="mt-6 bg-slate-800 text-white rounded py-3 px-6 hover:bg-slate-700">
                    {producto.stock <= 0 ? "Sin stock" : agregado ? "¡Agregado!" : "Agregar al carrito"}
                </button>
            </div>
        </div>
    )
}