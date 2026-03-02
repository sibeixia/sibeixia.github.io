import React from 'react'
import { useNavigate } from 'react-router-dom'
import './DigitalTwin.css'

function DigitalTwin() {
  const navigate = useNavigate()

  return (
    <div className="digital-twin-page">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate('/')}>
          Back
        </button>
        <h1 className="page-title">Digital Twin</h1>
      </div>

      <div className="page-content">
        {/* Video Player Section */}
        <div className="video-section">
          <div className="video-player">
            <video 
              className="digital-twin-video"
              controls
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/images/jewelry-3d.mp4" type="video/mp4" />
              <source src="/images/jewelry-3d.webm" type="video/webm" />
              <source src="/images/jewelry-3d.mov" type="video/quicktime" />
              <div className="video-placeholder">
                <div className="video-icon">▶</div>
                <p className="video-placeholder-text">3D Digital Twin Video</p>
                <p className="video-error-text">Your browser does not support the video tag.</p>
              </div>
            </video>
          </div>
        </div>

        {/* Digital Twin Information */}
        <div className="info-section">
          <h2 className="section-title">Digital Twin Information</h2>
          <div className="info-cards">
            <div className="info-card">360° Digital Display</div>
            <div className="info-card">Synchronized with Physical Product</div>
            <div className="info-card">NFT Platform Trading Support</div>
          </div>
        </div>

        {/* Share on Social Media */}
        <div className="info-section">
          <h2 className="section-title">Share on Social Media</h2>
          <div className="social-buttons">
            <button className="social-btn instagram">
              <span className="social-icon">📷</span>
              <span>Instagram</span>
            </button>
            <button className="social-btn facebook">
              <span className="social-icon">f</span>
              <span>Facebook</span>
            </button>
            <button className="social-btn tiktok">
              <span className="social-icon">♪</span>
              <span>TikTok</span>
            </button>
            <button className="social-btn twitter">
              <span className="social-icon">𝕏</span>
              <span>X</span>
            </button>
          </div>
        </div>

        {/* NFT Trading Information */}
        <div className="info-section">
          <h2 className="section-title">NFT Trading Information</h2>
          <p className="nft-text">Digital Twin version available for trading on NFT platform</p>
          <p className="nft-price">Price synchronized with physical product: $15,000</p>
          <button className="nft-button">View NFT Platform</button>
        </div>
      </div>
    </div>
  )
}

export default DigitalTwin

