import React from 'react'
import { useNavigate } from 'react-router-dom'
import './SupplyChain.css'

function SupplyChain() {
  const navigate = useNavigate()

  return (
    <div className="supply-chain-page">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate('/')}>
          Back
        </button>
        <h1 className="page-title">Supply Chain</h1>
      </div>

      <div className="page-content">
        {/* Material Sourcing */}
        <div className="info-card">
          <h2 className="card-title">Material Sourcing</h2>
          <div className="sourcing-section">
            <div className="sourcing-item">
              <h3 className="sourcing-title">Japanese Akoya Pearl Farms (Japan)</h3>
              <p className="sourcing-description">
                Cultured saltwater pearls selected and graded for luster, shape, and surface quality.
              </p>
            </div>
            <div className="sourcing-item">
              <h3 className="sourcing-title">Platinum Suppliers and Refining Partners (Switzerland)</h3>
              <p className="sourcing-description">
                Responsibly sourced and refined platinum used for chain, settings, and clasp components.
              </p>
            </div>
          </div>
        </div>

        {/* Manufacturing & Craftsmanship */}
        <div className="info-card">
          <h2 className="card-title">Manufacturing & Craftsmanship</h2>
          <div className="manufacturing-section">
            <div className="manufacturing-item">
              <h3 className="manufacturing-title">Jewelry Workshop</h3>
              <ul className="manufacturing-list">
                <li>Handcrafted assembly by skilled artisans</li>
                <li>Pearl arrangement, balancing, and secure setting</li>
                <li>Precision polishing and finishing of platinum components</li>
              </ul>
            </div>
            <div className="manufacturing-item">
              <h3 className="manufacturing-title">Special Craft Processes</h3>
              <ul className="manufacturing-list">
                <li>Pearl grading and matching</li>
                <li>Fine platinum finishing to ensure durability and long-term wear</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Carbon Emission Information */}
        <div className="info-card">
          <h2 className="card-title">Carbon Emission Information</h2>
          <div className="route-info">
            <div className="route-item">
              <span className="route-label">Route 1:</span>
              <span className="route-value">Japanese Akoya Pearl Farms (Japan) → Pearl Processing & Sorting Facility</span>
            </div>
            <div className="route-item">
              <span className="route-label">Transport 1:</span>
              <span className="route-value">Certified secure regional transportation</span>
            </div>
            <div className="route-item">
              <span className="route-label">Route 2:</span>
              <span className="route-value">Pearl Processing & Sorting Facility → Jewelry Workshop (Switzerland)</span>
            </div>
            <div className="route-item">
              <span className="route-label">Transport 2:</span>
              <span className="route-value">Certified secure transportation</span>
            </div>
            <div className="route-item">
              <span className="route-label">Route 3:</span>
              <span className="route-value">Platinum Suppliers & Refining Partners (Switzerland) → Jewelry Workshop (Switzerland)</span>
            </div>
            <div className="route-item">
              <span className="route-label">Transport 3:</span>
              <span className="route-value">Certified secure transportation</span>
            </div>
            <div className="route-item">
              <span className="route-label">Route 4:</span>
              <span className="route-value">Jewelry Workshop (Switzerland) → Global Distributor</span>
            </div>
            <div className="route-item">
              <span className="route-label">Transport 4:</span>
              <span className="route-value">International freight (emissions managed through logistics efficiency measures)</span>
            </div>
            <div className="route-item">
              <span className="route-label">Route 5:</span>
              <span className="route-value">Global Distributor → Authorized Retail Stores</span>
            </div>
            <div className="route-item">
              <span className="route-label">Transport 5:</span>
              <span className="route-value">Regional ground transportation</span>
            </div>
            <div className="route-item carbon-emission">
              <span className="route-label">Carbon Emission:</span>
              <span className="route-value">Estimated: 0.40–0.60 kg CO₂e / piece</span>
            </div>
            <div className="route-item carbon-note">
              <p className="carbon-note-text">
                Carbon emission values represent estimated transportation-related emissions across material sourcing, processing, manufacturing logistics, international distribution, and retail delivery stages. Manufacturing-related emissions are reported separately in the Sustainability section.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupplyChain

