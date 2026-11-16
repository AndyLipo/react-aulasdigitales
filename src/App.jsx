import { Route, Routes } from 'react-router'
import './App.css'
import { Layout } from './layout/Layout'
import { ProductosLayout } from './productos/ProductosLayout'
import { ProductoDetalle } from './productos/ProductoDetalle'
import { Inicio } from './pages/Inicio'
import { SobreNosotros } from './pages/SobreNosotros'
import { Carrito } from './pages/Carrito'
import { AdminProductos } from './admin/adminProducto'
import { Login } from './auth/login'
import { RutaProtegida } from './auth/rutaProtegida'

function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path='sobre-nosotros' element={<SobreNosotros />} />
        <Route path='productos' element={<ProductosLayout />} />
        <Route path='producto/:id' element={<ProductoDetalle />} />
        <Route path='carrito' element={<Carrito />} />
        <Route path='admin' element={<AdminProductos />} />
        <Route path='login' element={<Login />} />
        <Route
          path='admin'
          element={
            <RutaProtegida>
              <AdminProductos />
            </RutaProtegida>
          }
        />
      </Route>
    </Routes>
  )
}

export default App