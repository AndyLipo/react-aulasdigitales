import { useEffect, useState } from "react"
import { ProductoForm } from "./ProductoForm"
import {
    getProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} from "../firebase/productosService"

export const AdminProductos = () => {
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)
    const [productoEditando, setProductoEditando] = useState(null)
    const [mostrandoForm, setMostrandoForm] = useState(false)

    const cargarProductos = () => {
        setCargando(true)
        getProductos()
            .then((data) => setProductos(data))
            .catch((err) => {
                console.error("Error al cargar productos:", err)
                setError("No se pudieron cargar los productos.")
            })
            .finally(() => setCargando(false))
    }

    useEffect(() => {
        cargarProductos()
    }, [])

    const handleGuardar = async (datos) => {
        try {
            if (productoEditando) {
                await actualizarProducto(productoEditando.id, datos)
            } else {
                await crearProducto(datos)
            }
            setMostrandoForm(false)
            setProductoEditando(null)
            cargarProductos()
        } catch (err) {
            console.error("Error al guardar producto:", err)
            setError("No se pudo guardar el producto. Intentá de nuevo.")
        }
    }

    const handleEditar = (producto) => {
        setProductoEditando(producto)
        setMostrandoForm(true)
    }

    const handleEliminar = async (id, nombre) => {
        const confirmar = window.confirm(`¿Seguro que querés eliminar "${nombre}"? Esta acción no se puede deshacer.`)
        if (!confirmar) return

        try {
            await eliminarProducto(id)
            cargarProductos()
        } catch (err) {
            console.error("Error al eliminar producto:", err)
            setError("No se pudo eliminar el producto.")
        }
    }

    const handleNuevo = () => {
        setProductoEditando(null)
        setMostrandoForm(true)
    }

    if (cargando) {
        return <p className="text-center mt-12">Cargando panel de administración...</p>
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Administración de productos</h1>
                {!mostrandoForm && (
                    <button
                        onClick={handleNuevo}
                        className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700"
                    >
                        + Nuevo producto
                    </button>
                )}
            </div>

            {error && (
                <p className="text-red-600 bg-red-50 border border-red-200 rounded px-4 py-2 mb-4">
                    {error}
                </p>
            )}

            {mostrandoForm ? (
                <div className="bg-slate-50 border rounded-lg p-6 mb-6">
                    <h2 className="font-semibold mb-4">
                        {productoEditando ? "Editar producto" : "Nuevo producto"}
                    </h2>
                    <ProductoForm
                        productoInicial={productoEditando}
                        onGuardar={handleGuardar}
                        onCancelar={() => {
                            setMostrandoForm(false)
                            setProductoEditando(null)
                        }}
                    />
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {productos.map((producto) => (
                        <div
                            key={producto.id}
                            className="flex items-center justify-between border rounded-lg px-4 py-3"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                    className="w-12 h-12 object-contain bg-white border rounded"
                                />
                                <div>
                                    <p className="font-medium">{producto.nombre}</p>
                                    <p className="text-sm text-slate-500">
                                        ${producto.precio.toLocaleString("es-AR")} · Stock: {producto.stock}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEditar(producto)}
                                    className="text-sm px-3 py-1 rounded border hover:bg-slate-100"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleEliminar(producto.id, producto.nombre)}
                                    className="text-sm px-3 py-1 rounded border border-red-300 text-red-600 hover:bg-red-50"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}