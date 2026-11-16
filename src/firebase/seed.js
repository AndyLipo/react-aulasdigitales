import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore"
import { db } from "./config"

export const reiniciarCatalogoElectronica = async () => {
    const productosRef = collection(db, "productos")

    // 1. Borrar todo lo que haya
    const existentes = await getDocs(productosRef)
    for (const d of existentes.docs) {
        await deleteDoc(doc(db, "productos", d.id))
    }

    // 2. Importar solo electrónica
    const res = await fetch("https://fakestoreapi.com/products/category/electronics")
    const productos = await res.json()

    for (const producto of productos) {
        await addDoc(productosRef, {
            nombre: producto.title,
            precio: producto.price,
            categoria: "Electrónica",
            imagen: producto.image,
            descripcion: producto.description,
            stock: 10
        })
    }

    console.log(`Catálogo reiniciado: ${productos.length} productos de electrónica.`)
}