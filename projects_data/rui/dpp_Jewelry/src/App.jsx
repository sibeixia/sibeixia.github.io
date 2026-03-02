import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DigitalTwin from './pages/DigitalTwin'
import Authentication from './pages/Authentication'
import ProductInfo from './pages/ProductInfo'
import SupplyChain from './pages/SupplyChain'
import Sustainability from './pages/Sustainability'
import CareGuide from './pages/CareGuide'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/digital-twin" element={<DigitalTwin />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/product-info" element={<ProductInfo />} />
        <Route path="/supply-chain" element={<SupplyChain />} />
        <Route path="/sustainability" element={<Sustainability />} />
        <Route path="/care-guide" element={<CareGuide />} />
      </Routes>
    </Router>
  )
}

export default App





