import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import {CustomKanban} from './components/Board'
import './index.css'
import Landing from './components/Landing'

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='' element={<Landing/>}/>
      <Route path='Board' element={<CustomKanban/>}/>
      <Route path='*' element={<div>404</div>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
