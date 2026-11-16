import { useEffect, useState } from "react"
import { Item } from "./Item"
import { getProductos } from "../firebase/productosService"

const PRODUCTOS_POR_PAGINA = 8

export const ItemListContainer = () => {
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)
    const [busqueda, setBusqueda] = useState("")
    const [pagina, setPagina] = useState(1)

    useEffect(() => {
        getProductos()
            .then((data) => setProductos(data))
            .catch((err) => {
                console.error("Error al cargar productos:", err)
                setError("No se pudieron cargar los productos. Intentá de nuevo más tarde.")
            })
            .finally(() => setCargando(false))
    }, [])

    const handleBusqueda = (e) => {
        setBusqueda(e.target.value)
        setPagina(1) // al buscar, volvemos a la primera página
    }

    if (cargando) {
        return <p className="text-center mt-12">Cargando productos...</p>
    }

    if (error) {
        return <p className="text-center mt-12 text-red-600">{error}</p>
    }

    // Filtrado: por nombre o categoría, sin distinguir mayúsculas
    const termino = busqueda.trim().toLowerCase()
    const filtrados = productos.filter(
        (p) =>
            p.nombre.toLowerCase().includes(termino) ||
            p.categoria.toLowerCase().includes(termino)
    )

    // Paginación
    const totalPaginas = Math.max(1, Math.ceil(filtrados.length / PRODUCTOS_POR_PAGINA))
    const inicio = (pagina - 1) * PRODUCTOS_POR_PAGINA
    const visibles = filtrados.slice(inicio, inicio + PRODUCTOS_POR_PAGINA)

    return (
        <div className="max-w-6xl mx-auto p-6">
            <input
                type="text"
                value={busqueda}
                onChange={handleBusqueda}
                placeholder="Buscar por nombre o categoría..."
                className="w-full max-w-md border rounded px-4 py-2 mb-6"
            />

            {filtrados.length === 0 ? (
                <p className="text-center text-slate-500 mt-12">
                    No se encontraron productos para "{busqueda}".
                </p>
            ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {visibles.map((producto) => (
                            <Item key={producto.id} producto={producto} />
                        ))}
                    </div>

                    <div className="flex justify-center items-center gap-4 mt-8">
                        <button
                            onClick={() => setPagina((p) => p - 1)}
                            disabled={pagina === 1}
                            className="px-4 py-2 rounded border hover:bg-slate-100 disabled:opacity-40"
                        >
                            Anterior
                        </button>
                        <span className="text-sm text-slate-600">
                            Página {pagina} de {totalPaginas}
                        </span>
                        <button
                            onClick={() => setPagina((p) => p + 1)}
                            disabled={pagina === totalPaginas}
                            className="px-4 py-2 rounded border hover:bg-slate-100 disabled:opacity-40"
                        >
                            Siguiente
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}