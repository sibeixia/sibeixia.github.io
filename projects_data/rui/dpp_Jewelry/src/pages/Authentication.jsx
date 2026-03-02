import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Authentication.css'

function Authentication() {
  const navigate = useNavigate()

  return (
    <div className="authentication-page">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate('/')}>
          Back
        </button>
        <h1 className="page-title">Authentication</h1>
      </div>

      <div className="page-content">
        {/* Verification Status */}
        <div className="verification-section">
          <div className="verification-icon">
            <div className="checkmark">✓</div>
          </div>
          <h2 className="verified-title">Verified</h2>
          <p className="verified-text">This product is authentic</p>
        </div>

        {/* Brand Statement */}
        <div className="info-card">
          <h3 className="card-title">Brand Statement</h3>
          <p className="card-text">
            Embracing sustainability, uniqueness, and global impact, our Luxury Jewelry Collection marks a new chapter in our journey. This collection seamlessly blends physical and digital realms, offering a unique experience. More than just jewelry, it embodies innovation. From cutting-edge design to sustainable practices, it reflects our commitment to excellence.
          </p>
        </div>

        {/* Product Information */}
        <div className="info-card">
          <h3 className="card-title">Product Information</h3>
          <div className="info-row">
            <span className="info-label">Product ID:</span>
            <span className="info-value">JC2026001</span>
          </div>
          <div className="info-row">
            <span className="info-label">Made in:</span>
            <span className="info-value">Switzerland</span>
          </div>
          <div className="info-row">
            <span className="info-label">Material Source:</span>
            <span className="info-value">Ethically Sourced</span>
          </div>
          <div className="info-row">
            <span className="info-label">Status:</span>
            <span className="info-value verified-status">Verified</span>
          </div>
        </div>

        {/* Ownership Information */}
        <div className="info-card">
          <h3 className="card-title">Ownership Information</h3>
          <div className="info-row">
            <span className="info-label">Current Owner:</span>
            <span className="info-value">Original Purchaser</span>
          </div>
          <div className="info-row">
            <span className="info-label">Purchase Date:</span>
            <span className="info-value">2024-01-15</span>
          </div>
          <div className="info-row">
            <span className="info-label">Transfer Count:</span>
            <span className="info-value">0</span>
          </div>
        </div>

        {/* Transfer Ownership Button */}
        <button className="transfer-button">Transfer Ownership</button>
      </div>
    </div>
  )
}

export default Authentication

