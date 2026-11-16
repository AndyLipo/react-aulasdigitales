import { useState, useEffect } from "react"

export const ProductoForm = ({ productoInicial, onGuardar, onCancelar }) => {
    const [form, setForm] = useState({
        nombre: "",
        precio: "",
        categoria: "",
        imagen: "",
        descripcion: "",
        stock: ""
    })
    const [errores, setErrores] = useState({})
    const [guardando, setGuardando] = useState(false)

    useEffect(() => {
        if (productoInicial) {
            setForm({
                nombre: productoInicial.nombre || "",
                precio: productoInicial.precio || "",
                categoria: productoInicial.categoria || "",
                imagen: productoInicial.imagen || "",
                descripcion: productoInicial.descripcion || "",
                stock: productoInicial.stock || ""
            })
        }
    }, [productoInicial])

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const validar = () => {
        const nuevosErrores = {}

        if (!form.nombre.trim()) {
            nuevosErrores.nombre = "El nombre es obligatorio."
        }
        if (!form.precio || Number(form.precio) <= 0) {
            nuevosErrores.precio = "El precio debe ser mayor a cero."
        }
        if (!form.categoria.trim()) {
            nuevosErrores.categoria = "La categoría es obligatoria."
        }
        if (!form.stock || Number(form.stock) < 0) {
            nuevosErrores.stock = "El stock no puede ser negativo."
        }

        setErrores(nuevosErrores)
        return Object.keys(nuevosErrores).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validar()) {
            return
        }

        setGuardando(true)
        try {
            await onGuardar({
                nombre: form.nombre.trim(),
                precio: Number(form.precio),
                categoria: form.categoria.trim(),
                imagen: form.imagen.trim(),
                descripcion: form.descripcion.trim(),
                stock: Number(form.stock)
            })
        } finally {
            setGuardando(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
            <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
                {errores.nombre && <p className="text-red-600 text-sm mt-1">{errores.nombre}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Precio</label>
                <input
                    type="number"
                    name="precio"
                    value={form.precio}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
                {errores.precio && <p className="text-red-600 text-sm mt-1">{errores.precio}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Categoría</label>
                <input
                    type="text"
                    name="categoria"
                    value={form.categoria}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
                {errores.categoria && <p className="text-red-600 text-sm mt-1">{errores.categoria}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">URL de imagen</label>
                <input
                    type="text"
                    name="imagen"
                    value={form.imagen}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <textarea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border rounded px-3 py-2"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Stock</label>
                <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                />
                {errores.stock && <p className="text-red-600 text-sm mt-1">{errores.stock}</p>}
            </div>

            <div className="flex gap-3 mt-2">
                <button
                    type="submit"
                    disabled={guardando}
                    className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 disabled:opacity-50"
                >
                    {guardando ? "Guardando..." : productoInicial ? "Guardar cambios" : "Crear producto"}
                </button>
                {onCancelar && (
                    <button
                        type="button"
                        onClick={onCancelar}
                        className="px-4 py-2 rounded border hover:bg-slate-100"
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    )
}