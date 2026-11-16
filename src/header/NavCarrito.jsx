import { useCarrito } from "../carrito/carritoContext"

export const NavCarrito = () => {
    const { cantidadTotal } = useCarrito()

    return (
        <span>
            🛒 Carrito
            {cantidadTotal > 0 && (
                <span className="ml-2 bg-pink-500 text-white text-xs rounded-full px-2 py-0.5">
                    {cantidadTotal}
                </span>
            )}
        </span>
    )
}