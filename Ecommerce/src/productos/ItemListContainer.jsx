import { useEffect, useState } from "react"
import { Item } from "./Item"

export const ItemListContainer = () => {
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        fetch("/productos.json")
            .then((res) => res.json())
            .then((data) => setProductos(data))
            .catch((error) => console.error("Error al cargar productos:", error))
            .finally(() => setCargando(false))
    }, [])

    if (cargando) {
        return <p className="text-center mt-12">Cargando productos...</p>
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
            {productos.map((producto) => (
                <Item key={producto.id} producto={producto} />
            ))}
        </div>
    )
}