import { Route, Routes } from 'react-router'
import './App.css'
import { Layout } from './layout/Layout'
import { ProductosLayout } from './productos/ProductosLayout'
import { ProductoDetalle } from './productos/ProductoDetalle'
import { Inicio } from './header/NavInicio'

function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path='productos' element={<ProductosLayout />} />
        <Route path='producto/:id' element={<ProductoDetalle />} />
        <Route path='carrito' element={<h1>Carrito</h1>} />
      </Route>
    </Routes>
  )
}

export default App