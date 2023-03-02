import React from 'react'
import './App.css'
import ProductPage from 'pages/ProductPage'
import { useRoutes } from 'react-router-dom'

function App() {
  const elements = useRoutes([
    {
      path: '/',
      element: <ProductPage />
    }
  ])
  return <div className='App'>{elements}</div>
}

export default App
