import { Route, Routes } from 'react-router'
import './App.css'
import { Layout } from './layout/Layout'
import { ProductosLayout } from './productos/ProductosLayout'
import { ProductoDetalle } from './productos/ProductoDetalle'
import { Inicio } from './pages/Inicio'
import { SobreNosotros } from './pages/SobreNosotros'
import { Carrito } from './pages/Carrito'


function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path='sobre-nosotros' element={<SobreNosotros />} />
        <Route path='productos' element={<ProductosLayout />} />
        <Route path='producto/:id' element={<ProductoDetalle />} />
        <Route path='carrito' element={<Carrito />} />
      </Route>
    </Routes>
  )
}

export default App