// 产品数据 - 等待用户提供包包数据
const productData = {
    name: "LEATHER SHOULDER BAG",
    subtitle: "Premium Leather Handbag",
    productId: "BAG2025F001",
    image: "images/main-product.jpg", // 主页：黑色包包图片
    
    digitalTwin: {
        video: "images/digital-twin.mp4", // Digital Twin页面：视频文件
        image: "", // 不使用图片
        infoCards: [
            "360° Digital Display",
            "Synchronized with Physical Product",
            "NFT Platform Trading Support"
        ],
        nftDescription: "Digital Twin version available for trading on NFT platform",
        nftPrice: "Price synchronized with physical product: $3,400"
    },
    
    authentication: {
        verified: true,
        brandStatement: "Embracing sustainability, uniqueness, and global impact, this product marks a new chapter in our journey. This collection seamlessly blends physical and digital realms, offering a unique experience. More than just a product, it embodies innovation. From cutting-edge design to sustainable practices, it reflects our commitment to excellence.",
        productId: "BAG2025F001",
        madeIn: "Italy",
        materialSource: "Italy",
        currentOwner: "Original Purchaser",
        purchaseDate: "2026-01-14",
        transferCount: 0
    },
    
    productInfo: {
        overview: "This bag features a soft-structured silhouette crafted from cowhide leather, allowing natural folds and creases to develop through regular use. It is available in two color options—chestnut brown and black—each highlighting the leather's texture and surface character in a distinct manner. The design incorporates a flap closure with restrained metal hardware, balancing secure functionality with a clean and understated appearance. An adjustable shoulder strap supports versatile carrying styles for everyday use. Overall, the product emphasizes material durability, functional clarity, and long-term use.",
        price: "$3,400",
        weight: "1.3 kg",
        colors: [
            { 
                name: "Black", 
                value: "#000000", 
                front: "images/black-front.jpg", // 黑色包包正面
                back: "images/black-back.jpg"   // 黑色包包背面
            },
            { 
                name: "Chestnut Brown", 
                value: "#8B4513", 
                front: "images/brown-front.jpg", // 棕色包包正面
                back: "images/brown-back.jpg"   // 棕色包包背面
            }
        ],
        specifications: {
            materialComposition: {
                title: "Material Composition",
                items: [
                    "Main material: Cowhide",
                    "Lining: Recycled nylon lining"
                ]
            },
            shoulderStrap: {
                title: "Shoulder Strap Specification",
                items: [
                    "Adjustable leather shoulder strap.",
                    "Maximum length: 120 cm",
                    "Minimum length: 80 cm",
                    "Maximum drop: 52 cm",
                    "Minimum drop: 30 cm"
                ]
            },
            closureDetails: {
                title: "Closure & Functional Details",
                items: [
                    "Closure: Flap closure",
                    "Shoulder strap: Leather shoulder strap with metal ring, designed for attaching bag charms or accessories",
                    "External pocket: Rear zip pocket",
                    "Internal pocket: Interior zip pocket"
                ]
            },
            dimensions: {
                title: "Dimensions",
                items: [
                    "Height: 25 cm",
                    "Width: 30 cm",
                    "Depth: 12 cm"
                ]
            }
        }
    },
    
    supplyChain: {
        information: {
            materialSource: "Cowhide leather sourced and tanned in Tuscany, Italy",
            manufacturingProcess: "Leather cutting, stitching, and bag assembly carried out in Tuscany, Italy",
            auxiliaryProcess: "Metal hardware sourcing and installation conducted in Italy",
            specialProcess: "Leather finishing and surface treatment conducted in Italy"
        },
        carbonEmission: {
            route1: "Tuscany tannery → Manufacturing workshop (Italy)",
            transport1: "Truck transportation",
            route2: "Italy manufacturing plant → International distribution center (United States)",
            transport2: "Sea freight",
            carbonEmission: "0.45–0.65 kg CO₂e (per product, estimated)"
        }
    },
    
    sustainability: {
        materialCircularity: {
            mainMaterial: "Cowhide leather (bio-based material)",
            lining: "Recycled nylon lining",
            description1: "Cowhide leather is a bio-based material. While it is not mechanically recyclable into new leather products, it can be reused, downcycled, or processed through specialized leather recycling and controlled waste management systems.",
            description2: "The recycled nylon lining contains post-industrial or post-consumer recycled content and is recyclable through established synthetic textile recovery streams."
        },
        carbonFootprint: {
            cowhide: "Carbon emissions from cowhide leather are primarily associated with the processing of livestock-derived raw material and leather tanning. Emissions are accounted for at the tanning and finishing stages.",
            nylon: "Recycled nylon significantly reduces greenhouse gas emissions compared to virgin nylon, with an estimated 40-60% lower carbon footprint. The exact percentage depends on the recycling method and energy source used.",
            total: "Estimated total carbon footprint: 0.45–0.65 kg CO₂e per product (includes both materials and transportation)."
        },
        waterFootprint: {
            cowhide: "Water consumption is mainly associated with tanning and finishing processes. Detailed water data are available at the tannery level upon request.",
            nylon: "Recycled nylon production requires substantially less water than virgin nylon, as it avoids polymerization from raw petrochemical feedstocks."
        },
        environmentalStandards: "Leather tanning and finishing processes are compliant with EU REACH regulations and applicable chemical safety requirements.",
        ecoPractices: "Vegetable tanning practices aligned with standards promoted by the Consorzio Vera Pelle (Italy), emphasizing reduced chemical impact and material longevity.",
        energyUsage: "Manufacturing processes partially utilize renewable energy, subject to facility-level infrastructure and availability.",
        philosophy: "This product prioritizes durability, repairability, and long service life as core sustainability strategies. The combination of high-quality cowhide leather and recycled nylon lining supports material efficiency, reduced environmental impact, and responsible end-of-life management.",
        certifications: [
            { name: "ISO Certified", description: "CERTIFIED ISO 14001:2015 COMPANY", icon: "ISO" },
            { name: "Eco Certified", description: "GOTS Certified", icon: "ECO" }
        ],
        commitment: {
            title: "Our Commitment by 2025:",
            goals: [
                "100% Sustainable Materials",
                "Carbon Neutral Production",
                "Zero Waste Emissions"
            ]
        }
    },
    
    careGuide: {
        instructions: [
            "Do not machine wash or hand wash",
            "Clean with a soft, dry cloth",
            "Avoid prolonged exposure to water, rain, and moisture",
            "If wet, allow to air dry naturally at room temperature",
            "Do not tumble dry or use heat sources",
            "Avoid contact with oils, solvents, alcohol, and abrasive surfaces",
            "Store in a cool, dry place away from direct sunlight",
            "When not in use, keep the bag stuffed with soft material to maintain its shape"
        ],
        recyclingProgram: {
            introduction: "Join our sustainable recycling program:",
            benefits: [
                "Earn shopping credits for recycling old garments",
                "Support second-hand trading platform",
                "Eco-friendly disposal guidance provided"
            ]
        }
    }
};

// 页面切换函数
function showPage(pageId) {
    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示目标页面
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// 返回主页
function goBack() {
    showPage('homePage');
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    loadProductData();
    setupNavigation();
});

// 加载产品数据
function loadProductData() {
    // 产品图片 - 使用相对路径，确保文件移动后仍能正常工作
    const productImage = document.getElementById('productMainImage');
    if (productImage) {
        productImage.src = productData.image;
        // 添加错误处理
        productImage.onerror = function() {
            console.warn('产品图片加载失败:', productData.image);
            this.style.display = 'none';
        };
    }
    
    // 产品头部
    document.getElementById('productName').textContent = productData.name;
    document.getElementById('productSubtitle').textContent = productData.subtitle;
    document.getElementById('productId').textContent = productData.productId;
    
    // Digital Twin - 使用相对路径，确保文件移动后仍能正常工作
    const digitalTwinVideo = document.getElementById('digitalTwinVideo');
    const digitalTwinImage = document.getElementById('digitalTwinImage');
    
    if (productData.digitalTwin.video) {
        if (digitalTwinVideo) {
            digitalTwinVideo.src = productData.digitalTwin.video;
            digitalTwinVideo.style.display = 'block';
            // 添加错误处理
            digitalTwinVideo.onerror = function() {
                console.warn('Digital Twin 视频加载失败:', productData.digitalTwin.video);
                this.style.display = 'none';
                if (digitalTwinImage && productData.digitalTwin.image) {
                    digitalTwinImage.src = productData.digitalTwin.image;
                    digitalTwinImage.style.display = 'block';
                }
            };
        }
        if (digitalTwinImage) {
            digitalTwinImage.style.display = 'none';
        }
    } else if (productData.digitalTwin.image) {
        if (digitalTwinImage) {
            digitalTwinImage.src = productData.digitalTwin.image;
            digitalTwinImage.style.display = 'block';
            digitalTwinImage.onerror = function() {
                console.warn('Digital Twin 图片加载失败:', productData.digitalTwin.image);
            };
        }
        if (digitalTwinVideo) {
            digitalTwinVideo.style.display = 'none';
        }
    }
    
    // Digital Twin 信息卡片
    const infoCardsContainer = document.getElementById('digitalTwinInfoCards');
    infoCardsContainer.innerHTML = productData.digitalTwin.infoCards.map(card => `
        <div class="info-card">${card}</div>
    `).join('');
    
    // NFT信息
    document.getElementById('nftDescription').textContent = productData.digitalTwin.nftDescription;
    document.getElementById('nftPrice').textContent = productData.digitalTwin.nftPrice;
    
    // Authentication
    displayAuthentication(productData.authentication, productData.productId);
    
    // Product Info
    displayProductInfo(productData.productInfo, productData.name, productData.productId, productData.image);
    
    // Supply Chain
    displaySupplyChain(productData.supplyChain);
    
    // Sustainability
    displaySustainability(productData.sustainability);
    
    // Care Guide
    displayCareGuide(productData.careGuide);
}

// 设置导航
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-button');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const pageId = button.getAttribute('data-page');
            showPage(pageId);
        });
    });
    
    // NFT平台按钮
    document.getElementById('viewNFTBtn')?.addEventListener('click', () => {
        alert('NFT Platform - To be implemented');
    });
    
    // 社交媒体分享按钮
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const platform = e.currentTarget.classList[1];
            alert(`Share on ${platform.charAt(0).toUpperCase() + platform.slice(1)} - To be implemented`);
        });
    });
}

// 显示认证信息
function displayAuthentication(auth, productId) {
    // Brand Statement
    document.getElementById('brandStatement').textContent = auth.brandStatement;
    
    // Product Information
    document.getElementById('authProductId').textContent = productId;
    document.getElementById('madeIn').textContent = auth.madeIn;
    document.getElementById('materialSource').textContent = auth.materialSource;
    
    // Ownership Information
    document.getElementById('currentOwner').textContent = auth.currentOwner;
    document.getElementById('purchaseDate').textContent = formatDate(auth.purchaseDate);
    document.getElementById('transferCount').textContent = auth.transferCount;
    
    // Transfer Ownership Button
    document.getElementById('transferOwnershipBtn')?.addEventListener('click', () => {
        alert('Transfer Ownership - To be implemented');
    });
}

// 显示产品信息
function displayProductInfo(info, productName, productId, defaultImage) {
    // 产品名称和型号
    document.getElementById('productNameInfo').textContent = productName;
    document.getElementById('productModelInfo').textContent = `Model: ${productId}`;
    
    // 主图 - 默认显示第一个颜色的正面，使用相对路径
    const mainImage = document.getElementById('productMainImageInfo');
    if (mainImage && info.colors && info.colors.length > 0) {
        mainImage.src = info.colors[0].front;
        // 添加错误处理
        mainImage.onerror = function() {
            console.warn('产品图片加载失败:', info.colors[0].front);
        };
    }
    
    // 缩略图 - 显示所有颜色的正反两面
    const thumbnails = document.getElementById('productThumbnails');
    const allThumbnails = [];
    info.colors.forEach((color, colorIndex) => {
        allThumbnails.push({
            image: color.front,
            label: `${color.name} - Front`,
            colorIndex: colorIndex,
            side: 'front'
        });
        allThumbnails.push({
            image: color.back,
            label: `${color.name} - Back`,
            colorIndex: colorIndex,
            side: 'back'
        });
    });
    
    thumbnails.innerHTML = allThumbnails.map((thumb, index) => `
        <div class="thumbnail-item ${index === 0 ? 'active' : ''}" data-image="${thumb.image}" data-color-index="${thumb.colorIndex}" data-side="${thumb.side}">
            <img src="${thumb.image}" alt="${thumb.label}" onerror="console.warn('缩略图加载失败:', '${thumb.image}')">
        </div>
    `).join('');
    
    // 点击缩略图切换主图
    thumbnails.querySelectorAll('.thumbnail-item').forEach(item => {
        item.addEventListener('click', () => {
            thumbnails.querySelectorAll('.thumbnail-item').forEach(t => t.classList.remove('active'));
            item.classList.add('active');
            mainImage.src = item.getAttribute('data-image');
        });
    });
    
    // Overview
    document.getElementById('overviewText').textContent = info.overview;
    
    // 价格和重量
    document.getElementById('productPrice').textContent = info.price;
    document.getElementById('productWeight').textContent = info.weight;
    
    // 颜色选择
    const colorSwatches = document.getElementById('colorSwatches');
    colorSwatches.innerHTML = info.colors.map((color, index) => `
        <div class="color-swatch ${index === 0 ? 'active' : ''}" data-color-index="${index}">
            <div class="color-circle" style="background-color: ${color.value}"></div>
            <span class="color-name">${color.name}</span>
        </div>
    `).join('');
    
    // 点击颜色选择器切换主图
    colorSwatches.querySelectorAll('.color-swatch').forEach(swatch => {
        swatch.addEventListener('click', () => {
            colorSwatches.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            const colorIndex = parseInt(swatch.getAttribute('data-color-index'));
            // 切换到该颜色的正面图片
            mainImage.src = info.colors[colorIndex].front;
            // 更新缩略图选中状态
            thumbnails.querySelectorAll('.thumbnail-item').forEach(t => {
                t.classList.remove('active');
                if (t.getAttribute('data-color-index') == colorIndex && t.getAttribute('data-side') == 'front') {
                    t.classList.add('active');
                }
            });
        });
    });
    
    // 规格和特性
    const specsContent = document.getElementById('specificationsContent');
    specsContent.innerHTML = `
        <div class="spec-subsection">
            <h4 class="spec-subtitle">${info.specifications.materialComposition.title}</h4>
            <div class="spec-group">
                ${info.specifications.materialComposition.items.map(item => `<p>${item}</p>`).join('')}
            </div>
        </div>
        
        <div class="spec-subsection">
            <h4 class="spec-subtitle">${info.specifications.shoulderStrap.title}</h4>
            <div class="spec-group">
                ${info.specifications.shoulderStrap.items.map(item => `<p>${item}</p>`).join('')}
            </div>
        </div>
        
        <div class="spec-subsection">
            <h4 class="spec-subtitle">${info.specifications.closureDetails.title}</h4>
            <div class="spec-group">
                ${info.specifications.closureDetails.items.map(item => `<p>${item}</p>`).join('')}
            </div>
        </div>
        
        <div class="spec-subsection">
            <h4 class="spec-subtitle">${info.specifications.dimensions.title}</h4>
            <div class="spec-group">
                ${info.specifications.dimensions.items.map(item => `<p>${item}</p>`).join('')}
            </div>
        </div>
    `;
}

// 显示供应链信息
function displaySupplyChain(supplyChain) {
    // Supply Chain Information
    const supplyChainInfo = document.getElementById('supplyChainInfo');
    supplyChainInfo.innerHTML = `
        <div class="info-item">
            <span class="info-label">Material Source:</span>
            <span class="info-value">${supplyChain.information.materialSource}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Manufacturing Process:</span>
            <span class="info-value">${supplyChain.information.manufacturingProcess}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Auxiliary Process:</span>
            <span class="info-value">${supplyChain.information.auxiliaryProcess}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Special Process:</span>
            <span class="info-value">${supplyChain.information.specialProcess}</span>
        </div>
    `;
    
    // Carbon Emission Information
    const carbonEmissionInfo = document.getElementById('carbonEmissionInfo');
    carbonEmissionInfo.innerHTML = `
        <div class="info-item">
            <span class="info-label">Route 1:</span>
            <span class="info-value">${supplyChain.carbonEmission.route1}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Transport 1:</span>
            <span class="info-value">${supplyChain.carbonEmission.transport1}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Route 2:</span>
            <span class="info-value">${supplyChain.carbonEmission.route2}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Transport 2:</span>
            <span class="info-value">${supplyChain.carbonEmission.transport2}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Estimated Carbon Emission:</span>
            <span class="info-value">${supplyChain.carbonEmission.carbonEmission}</span>
        </div>
    `;
}

// 显示可持续性信息
function displaySustainability(sustainability) {
    // Sustainability Information
    const sustainabilityInfo = document.getElementById('sustainabilityInfo');
    sustainabilityInfo.innerHTML = `
        <div class="info-item">
            <span class="info-label">Material Circularity:</span>
            <div class="info-value-block">
                <span class="info-value">Main material: ${sustainability.materialCircularity.mainMaterial}</span>
                <span class="info-value">Lining: ${sustainability.materialCircularity.lining}</span>
                <p class="info-description">${sustainability.materialCircularity.description1}</p>
                <p class="info-description">${sustainability.materialCircularity.description2}</p>
            </div>
        </div>
        <div class="info-item">
            <span class="info-label">Carbon Footprint:</span>
            <div class="info-value-block">
                <div class="info-subsection">
                    <strong class="info-subtitle">Cowhide leather:</strong>
                    <p class="info-description">${sustainability.carbonFootprint.cowhide}</p>
                </div>
                <div class="info-subsection">
                    <strong class="info-subtitle">Recycled nylon lining:</strong>
                    <p class="info-description">${sustainability.carbonFootprint.nylon}</p>
                </div>
                <div class="info-subsection">
                    <strong class="info-subtitle">Total product carbon footprint:</strong>
                    <p class="info-description">${sustainability.carbonFootprint.total}</p>
                </div>
            </div>
        </div>
        <div class="info-item">
            <span class="info-label">Water Footprint:</span>
            <div class="info-value-block">
                <div class="info-subsection">
                    <strong class="info-subtitle">Cowhide leather:</strong>
                    <p class="info-description">${sustainability.waterFootprint.cowhide}</p>
                </div>
                <div class="info-subsection">
                    <strong class="info-subtitle">Recycled nylon lining:</strong>
                    <p class="info-description">${sustainability.waterFootprint.nylon}</p>
                </div>
            </div>
        </div>
        <div class="info-item">
            <span class="info-label">Environmental Standards:</span>
            <span class="info-value">${sustainability.environmentalStandards}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Eco Practices:</span>
            <span class="info-value">${sustainability.ecoPractices}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Energy Usage:</span>
            <span class="info-value">${sustainability.energyUsage}</span>
        </div>
    `;
    
    // Sustainability Philosophy
    document.getElementById('sustainabilityPhilosophy').textContent = sustainability.philosophy;
    
    // Environmental Certifications
    const certificationsDisplay = document.getElementById('certificationsDisplay');
    certificationsDisplay.innerHTML = sustainability.certifications.map(cert => `
        <div class="certification-item">
            <div class="certification-icon ${cert.icon.toLowerCase()}">
                ${cert.icon === 'ISO' ? 
                    '<div class="iso-badge"><span>CERTIFIED</span><span>ISO 14001:2015</span><span>COMPANY</span></div>' : 
                    '<div class="eco-badge">♻️</div>'
                }
            </div>
            <span class="certification-name">${cert.name}</span>
        </div>
    `).join('');
    
    // Sustainability Commitment
    const commitmentContent = document.getElementById('commitmentContent');
    commitmentContent.innerHTML = `
        <h4 class="commitment-title">${sustainability.commitment.title}</h4>
        <ul class="commitment-list">
            ${sustainability.commitment.goals.map(goal => `<li>${goal}</li>`).join('')}
        </ul>
    `;
}

// 显示护理指南
function displayCareGuide(careGuide) {
    // Care Instructions
    const careInstructions = document.getElementById('careInstructions');
    careInstructions.innerHTML = careGuide.instructions.map((instruction, index) => `
        <div class="care-instruction-item ${index < careGuide.instructions.length - 1 ? 'has-border' : ''}">
            ${instruction}
        </div>
    `).join('');
    
    // Recycling Program
    const recyclingProgram = document.getElementById('recyclingProgram');
    recyclingProgram.innerHTML = `
        <p class="recycling-intro">${careGuide.recyclingProgram.introduction}</p>
        <ul class="recycling-benefits">
            ${careGuide.recyclingProgram.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
        </ul>
    `;
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
