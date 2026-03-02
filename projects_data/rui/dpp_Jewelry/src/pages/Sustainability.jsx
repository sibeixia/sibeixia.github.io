import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Sustainability.css'

function Sustainability() {
  const navigate = useNavigate()

  return (
    <div className="sustainability-page">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate('/')}>
          Back
        </button>
        <h1 className="page-title">Sustainability</h1>
      </div>

      <div className="page-content">
        {/* Sustainability Information */}
        <div className="info-card">
          <h2 className="card-title">Sustainability Information</h2>
          <div className="sustainability-content">
            <div className="sustainability-item">
              <span className="sustainability-label">Material Responsibility:</span>
              <div className="sustainability-value-group">
                <div className="value-item">
                  <span className="value-text"><strong>Platinum:</strong> Responsibly sourced precious metal with high durability and high recyclability</span>
                </div>
                <div className="value-item">
                  <span className="value-text"><strong>Japanese Akoya Pearls:</strong> Cultured saltwater pearls produced through controlled aquaculture practices in Japan</span>
                </div>
                <div className="value-item">
                  <span className="value-text"><strong>Packaging:</strong> Recyclable packaging materials</span>
                </div>
              </div>
            </div>
            <div className="sustainability-item">
              <span className="sustainability-label">Carbon Footprint:</span>
              <span className="sustainability-value">Estimated: 1.8–2.5 kg CO₂e / piece</span>
              <p className="sustainability-note">
                Cradle-to-gate manufacturing emissions, including pearl processing, precious metal processing, component fabrication, and jewelry assembly. Transportation-related emissions are disclosed separately in the Supply Chain section.
              </p>
            </div>
            <div className="sustainability-item">
              <span className="sustainability-label">Water Footprint:</span>
              <span className="sustainability-value">Estimated: ~1,500–2,000 L / piece</span>
              <p className="sustainability-note">
                Water usage is primarily associated with pearl cultivation processes and precious metal processing and finishing.
              </p>
            </div>
            <div className="sustainability-item full-width">
              <span className="sustainability-label">Environmental Standards & Compliance:</span>
              <ul className="compliance-list">
                <li>Manufacturing and sourcing partners operate in accordance with the Responsible Jewellery Council (RJC) Code of Practices, covering ethical sourcing, environmental responsibility, and supply chain transparency</li>
                <li>Japanese Akoya pearls are sourced from recognized pearl farms in Japan and supported by origin and quality documentation consistent with fine jewelry industry practices</li>
                <li>Platinum sourcing and refining follow internationally recognized responsible precious metal sourcing principles</li>
                <li>Designed to align with the European Union Digital Product Passport (DPP) regulatory framework, supporting material traceability, environmental transparency, and lifecycle information disclosure</li>
              </ul>
            </div>
            <div className="sustainability-item">
              <span className="sustainability-label">Energy Usage:</span>
              <span className="sustainability-value">Manufacturing and processing facilities incorporate renewable energy sources where available, supporting gradual reductions in operational environmental impact.</span>
            </div>
            <div className="sustainability-item full-width">
              <span className="sustainability-label">Sustainability Philosophy:</span>
              <p className="sustainability-text">
                This jewelry piece reflects a commitment to responsible material sourcing, refined craftsmanship, and long product lifecycles. By emphasizing durable platinum components and cultured Akoya pearls, the design supports repairability, reuse, and reduced environmental impact over time, while preserving timeless aesthetic and material value.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sustainability

