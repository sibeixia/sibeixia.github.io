import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ProductInfo.css'

function ProductInfo() {
  const navigate = useNavigate()

  return (
    <div className="product-info-page">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate('/')}>
          Back
        </button>
        <h1 className="page-title">Product Info</h1>
      </div>

      <div className="page-content">
        {/* Main Product Image - Front View */}
        <div className="main-image-section">
          <div className="main-image-container">
            <img 
              src="/images/jewelry-front.png" 
              alt="Luxury Jewelry - Front View"
              className="main-product-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="main-image-placeholder" style={{display: 'none'}}>
              <div className="jewelry-display-large">💎</div>
            </div>
          </div>
        </div>

        {/* Product Thumbnails - Back and Side Views */}
        <div className="thumbnail-section">
          <div className="thumbnail">
            <img 
              src="/images/jewelry-back.png" 
              alt="Luxury Jewelry - Back View"
              className="thumbnail-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="thumbnail-placeholder" style={{display: 'none'}}>💎</div>
          </div>
          <div className="thumbnail">
            <img 
              src="/images/jewelry-side.png" 
              alt="Luxury Jewelry - Side View"
              className="thumbnail-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="thumbnail-placeholder" style={{display: 'none'}}>💎</div>
          </div>
        </div>

        {/* Product Title */}
        <div className="product-header">
          <h2 className="product-name">LUXURY JEWELRY COLLECTION</h2>
          <p className="product-model">Model: JC2026001</p>
        </div>

        {/* Overview */}
        <div className="section">
          <h3 className="section-title">Overview</h3>
          <p className="section-text">
            Embrace refined elegance with this luxury pearl jewelry piece, crafted with Japanese Akoya pearls and platinum to reflect timeless sophistication and contemporary design. Designed for discerning collectors, this piece highlights natural beauty, material durability, and fine craftsmanship, making it suitable for both formal occasions and everyday elegance.
          </p>
        </div>

        {/* Price and Weight */}
        <div className="specs-row">
          <div className="spec-item">
            <span className="spec-label">Price</span>
            <span className="spec-value">$15,000</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Weight</span>
            <span className="spec-value">25g</span>
          </div>
        </div>

        {/* Core Features */}
        <div className="section">
          <h3 className="section-title">Core Features</h3>
          <div className="features">
            <span className="feature-tag">Handcrafted</span>
            <span className="feature-tag">Material Transparency</span>
            <span className="feature-tag">Responsible Sourcing</span>
          </div>
        </div>

        {/* Specifications & Features */}
        <div className="section">
          <h3 className="section-title">Specifications & Features</h3>
          <div className="specifications">
            <div className="spec-group">
              <h4 className="spec-group-title">Material Composition:</h4>
              <ul className="spec-list">
                <li>Japanese Akoya Pearls (Cultured, Japan)</li>
                <li>Platinum (High-purity precious metal)</li>
                <li>Ethically sourced materials</li>
              </ul>
            </div>
            <div className="spec-group">
              <h4 className="spec-group-title">Craftsmanship:</h4>
              <ul className="spec-list">
                <li>Handcrafted by skilled artisans</li>
                <li>Precision pearl setting techniques</li>
                <li>Balanced integration of traditional jewelry craftsmanship and modern design</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo

