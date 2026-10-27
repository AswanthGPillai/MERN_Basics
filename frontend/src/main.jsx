import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router";
import MainRoutes from './Routes/MainRoutes'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <MainRoutes />
  </BrowserRouter>,
)
