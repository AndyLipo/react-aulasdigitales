import { db } from "./config"
import {
    collection,
    getDocs,
    getDoc,
    doc,
    addDoc,
    updateDoc,
    deleteDoc
} from "firebase/firestore"

const productosRef = collection(db, "productos")

// Leer todos los productos
export const getProductos = async () => {
    const snapshot = await getDocs(productosRef)
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))
}

// Leer un producto por id
export const getProductoPorId = async (id) => {
    const docRef = doc(db, "productos", id)
    const snapshot = await getDoc(docRef)

    if (!snapshot.exists()) {
        return null
    }

    return { id: snapshot.id, ...snapshot.data() }
}

// Crear un producto nuevo
export const crearProducto = async (producto) => {
    const docRef = await addDoc(productosRef, producto)
    return docRef.id
}

// Actualizar un producto existente
export const actualizarProducto = async (id, cambios) => {
    const docRef = doc(db, "productos", id)
    await updateDoc(docRef, cambios)
}

// Eliminar un producto
export const eliminarProducto = async (id) => {
    const docRef = doc(db, "productos", id)
    await deleteDoc(docRef)
}