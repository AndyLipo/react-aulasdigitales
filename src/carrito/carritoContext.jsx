import { createContext, useContext, useEffect, useState } from "react"

const CarritoContext = createContext()

export const useCarrito = () => useContext(CarritoContext)

const leerCarritoGuardado = () => {
    try {
        return JSON.parse(localStorage.getItem("carrito")) || []
    } catch {
        return []
    }
}

export const CarritoProvider = ({ children }) => {
    const [items, setItems] = useState(leerCarritoGuardado)

    // Persistir el carrito para que sobreviva a recargas
    useEffect(() => {
        try {
            localStorage.setItem("carrito", JSON.stringify(items))
        } catch {
            // si localStorage no está disponible, el carrito sigue funcionando en memoria
        }
    }, [items])

    const agregarAlCarrito = (producto, cantidad = 1) => {
        setItems((prev) => {
            const existente = prev.find((item) => item.id === producto.id)
            const stock = producto.stock ?? Infinity

            if (existente) {
                return prev.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: Math.min(item.cantidad + cantidad, stock) }
                        : item
                )
            }

            return [
                ...prev,
                {
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    imagen: producto.imagen,
                    stock: producto.stock,
                    cantidad: Math.min(cantidad, stock)
                }
            ]
        })
    }

    const eliminarDelCarrito = (id) => {
        setItems((prev) => prev.filter((item) => item.id !== id))
    }

    const vaciarCarrito = () => setItems([])

    const cantidadTotal = items.reduce((acc, item) => acc + item.cantidad, 0)
    const precioTotal = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

    return (
        <CarritoContext.Provider
            value={{
                items,
                agregarAlCarrito,
                eliminarDelCarrito,
                vaciarCarrito,
                cantidadTotal,
                precioTotal
            }}
        >
            {children}
        </CarritoContext.Provider>
    )
}