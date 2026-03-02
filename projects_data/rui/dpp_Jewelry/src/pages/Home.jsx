import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <div className="home-container">
        {/* Product Image Section */}
        <div className="product-image-section">
          <div className="product-image-container">
            <img 
              src="/images/jewelry-front.png" 
              alt="Luxury Jewelry - Front View"
              className="product-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="product-image-placeholder" style={{display: 'none'}}>
              <div className="jewelry-display">
                <div className="jewelry-icon">💎</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Title Section */}
        <div className="product-title-section">
          <h1 className="product-title">LUXURY JEWELRY COLLECTION</h1>
          <p className="product-subtitle">High-End Fine Jewelry - Handcrafted Excellence</p>
          <p className="product-id">JC2026001</p>
        </div>

        {/* Navigation Buttons */}
        <div className="nav-buttons">
          <button 
            className="nav-button"
            onClick={() => navigate('/digital-twin')}
          >
            Digital Twin
          </button>
          <button 
            className="nav-button"
            onClick={() => navigate('/authentication')}
          >
            Authentication
          </button>
          <button 
            className="nav-button"
            onClick={() => navigate('/product-info')}
          >
            Product Info
          </button>
          <button 
            className="nav-button"
            onClick={() => navigate('/supply-chain')}
          >
            Supply Chain
          </button>
          <button 
            className="nav-button"
            onClick={() => navigate('/sustainability')}
          >
            Sustainability
          </button>
          <button 
            className="nav-button"
            onClick={() => navigate('/care-guide')}
          >
            Care Guide
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home

