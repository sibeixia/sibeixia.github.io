import React from 'react'
import { useNavigate } from 'react-router-dom'
import './CareGuide.css'

function CareGuide() {
  const navigate = useNavigate()

  return (
    <div className="care-guide-page">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate('/')}>
          Back
        </button>
        <h1 className="page-title">Care Guide</h1>
      </div>

      <div className="page-content">
        {/* Care Instructions */}
        <div className="info-card">
          <h2 className="card-title">Care Instructions</h2>
          <div className="care-list">
            <div className="care-item">
              <span>Gently wipe the pearls and platinum components with a soft, dry, lint-free cloth after each wear to remove skin oils and moisture</span>
            </div>
            <div className="care-item">
              <span>Avoid contact with water, perfumes, cosmetics, hairspray, and household chemicals, as pearls are sensitive to acids and solvents</span>
            </div>
            <div className="care-item">
              <span>Do not expose the jewelry to high heat, extreme temperature changes, or prolonged direct sunlight</span>
            </div>
            <div className="care-item">
              <span>Avoid pulling, twisting, or impact that may loosen pearl settings or damage the stringing material</span>
            </div>
            <div className="care-item">
              <span>Wear the necklace after applying makeup and fragrance, and remove it before bathing, swimming, or sleeping</span>
            </div>
            <div className="care-item">
              <span>Store the necklace separately from other jewelry to prevent scratching of pearls and platinum surfaces</span>
            </div>
            <div className="care-item">
              <span>When not in use, keep the jewelry in a soft-lined jewelry box or protective pouch in a cool, dry environment</span>
            </div>
            <div className="care-item">
              <span>Have the necklace professionally inspected and restrung every 1–2 years, depending on frequency of wear</span>
            </div>
            <div className="care-item">
              <span>Pearls should always be the last item worn and the first item removed.</span>
            </div>
          </div>
        </div>

        {/* Care & Longevity Notes */}
        <div className="info-card">
          <h2 className="card-title">Care & Longevity Notes</h2>
          <ul className="longevity-list">
            <li>Cultured Akoya pearls are organic materials and require gentler care than gemstones</li>
            <li>Platinum is highly durable but benefits from periodic professional cleaning to maintain its finish</li>
            <li>Proper care and regular maintenance significantly extend product lifespan, supporting long-term use and reduced environmental impact</li>
          </ul>
        </div>

        {/* Recycling & Reuse Program */}
        <div className="info-card">
          <h2 className="card-title">Recycling & Reuse Program</h2>
          <h3 className="program-subtitle">Jewelry Circular Care Program</h3>
          <ul className="program-list">
            <li>Eligible jewelry may be returned for professional refurbishment, repair, or component reuse</li>
            <li>Platinum components can be recovered and recycled through authorized precious metal recycling partners</li>
            <li>Pearls are individually assessed for potential reuse or responsible disposal based on condition</li>
            <li>The program supports participation in certified second-hand and resale platforms, helping extend product lifespan and promote circular value</li>
            <li>Guidance is provided for environmentally responsible end-of-life management in alignment with Digital Product Passport (DPP) principles</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CareGuide

