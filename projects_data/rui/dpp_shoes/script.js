// 示例产品数据
const productData = {
    productName: "环保运动鞋 - 经典款",
    productId: "DPP-SHOE-2024-001",
    carbonFootprint: "8.5 kg CO₂",
    recyclability: "85%",
    materials: [
        {
            name: "有机棉",
            percentage: 45,
            origin: "土耳其有机农场",
            certification: "GOTS认证",
            recyclable: true,
            description: "100%有机种植，无农药使用"
        },
        {
            name: "再生聚酯纤维",
            percentage: 30,
            origin: "回收塑料瓶",
            certification: "GRS认证",
            recyclable: true,
            description: "由12个回收塑料瓶制成"
        },
        {
            name: "天然橡胶",
            percentage: 15,
            origin: "马来西亚可持续橡胶园",
            certification: "FSC认证",
            recyclable: true,
            description: "可持续采集，保护森林生态"
        },
        {
            name: "植物基皮革",
            percentage: 10,
            origin: "意大利",
            certification: "Vegan认证",
            recyclable: true,
            description: "由植物纤维制成，无动物成分"
        }
    ],
    manufacturing: {
        factory: "绿色制鞋工厂",
        location: "中国，福建省",
        date: "2024年3月15日",
        workers: "120名员工",
        certifications: ["ISO 14001", "SA8000", "OEKO-TEX"],
        process: "采用节能生产工艺，使用可再生能源，废水循环利用"
    },
    environment: {
        carbonFootprint: {
            value: "8.5",
            unit: "kg CO₂",
            comparison: "比行业平均低35%",
            description: "通过使用可持续材料和清洁能源实现"
        },
        waterUsage: {
            value: "2,100",
            unit: "升",
            comparison: "比传统工艺节省40%",
            description: "采用闭环水循环系统"
        },
        wasteReduction: {
            value: "92%",
            unit: "",
            comparison: "零废料生产",
            description: "所有生产废料均回收再利用"
        },
        renewableEnergy: {
            value: "100%",
            unit: "",
            comparison: "完全使用可再生能源",
            description: "工厂100%使用太阳能和风能"
        }
    },
    lifecycle: [
        {
            stage: "原材料采购",
            date: "2024年1月10日",
            description: "从认证供应商采购有机棉、再生聚酯纤维等可持续材料，所有材料均通过严格的质量和环保标准检验。"
        },
        {
            stage: "生产制造",
            date: "2024年3月15日",
            description: "在绿色工厂完成生产，采用节能设备和清洁工艺，确保生产过程对环境的影响最小化。"
        },
        {
            stage: "质量检测",
            date: "2024年3月20日",
            description: "通过多项质量检测，包括耐用性测试、环保标准验证，确保产品符合DPP标准。"
        },
        {
            stage: "包装运输",
            date: "2024年3月25日",
            description: "使用100%可回收包装材料，采用碳中和运输方式，减少运输过程中的碳排放。"
        },
        {
            stage: "销售交付",
            date: "2024年4月1日",
            description: "产品上架销售，消费者可通过扫描二维码查看完整的数字产品护照信息。"
        },
        {
            stage: "使用阶段",
            date: "进行中",
            description: "产品在使用过程中，建议定期清洁保养以延长使用寿命。产品设计支持维修和部件更换。"
        },
        {
            stage: "回收再利用",
            date: "未来",
            description: "产品使用寿命结束后，可通过回收计划送回，85%的材料可回收再利用，实现循环经济。"
        }
    ]
};

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupTabs();
});

// 初始化页面内容
function initializePage() {
    // 设置产品基本信息
    document.getElementById('productName').textContent = productData.productName;
    document.getElementById('productId').textContent = productData.productId;
    document.getElementById('carbonFootprint').textContent = productData.carbonFootprint;
    document.getElementById('recyclability').textContent = productData.recyclability;

    // 加载材料信息
    loadMaterials();
    
    // 加载制造信息
    loadManufacturing();
    
    // 加载环境影响数据
    loadEnvironment();
    
    // 加载生命周期信息
    loadLifecycle();
}

// 设置标签页切换
function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');

            // 移除所有活动状态
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            // 添加活动状态
            tab.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// 加载材料信息
function loadMaterials() {
    const materialsList = document.getElementById('materialsList');
    materialsList.innerHTML = '';

    productData.materials.forEach(material => {
        const materialCard = document.createElement('div');
        materialCard.className = 'material-card';

        materialCard.innerHTML = `
            <div class="material-header">
                <span class="material-name">${material.name}</span>
                <span class="material-percentage">${material.percentage}%</span>
            </div>
            <p style="color: var(--text-secondary); margin-bottom: 16px;">${material.description}</p>
            <div class="material-details">
                <div class="material-detail">
                    <span class="material-detail-label">来源</span>
                    <span class="material-detail-value">${material.origin}</span>
                </div>
                <div class="material-detail">
                    <span class="material-detail-label">认证</span>
                    <span class="material-detail-value">${material.certification}</span>
                </div>
                <div class="material-detail">
                    <span class="material-detail-label">可回收</span>
                    <span class="material-detail-value">${material.recyclable ? '是' : '否'}</span>
                </div>
            </div>
        `;

        materialsList.appendChild(materialCard);
    });
}

// 加载制造信息
function loadManufacturing() {
    const manufacturingInfo = document.getElementById('manufacturingInfo');
    const mfg = productData.manufacturing;

    manufacturingInfo.innerHTML = `
        <div class="manufacturing-card">
            <h4>🏭 生产工厂</h4>
            <p><strong>工厂名称：</strong>${mfg.factory}</p>
            <p><strong>位置：</strong>${mfg.location}</p>
            <p><strong>生产日期：</strong>${mfg.date}</p>
            <p><strong>员工数量：</strong>${mfg.workers}</p>
        </div>
        <div class="manufacturing-card">
            <h4>✅ 认证标准</h4>
            <p>${mfg.certifications.map(cert => `<span style="display: inline-block; background: var(--primary-color); color: white; padding: 4px 12px; border-radius: 4px; margin: 4px; font-size: 12px;">${cert}</span>`).join('')}</p>
        </div>
        <div class="manufacturing-card">
            <h4>🌱 生产工艺</h4>
            <p>${mfg.process}</p>
        </div>
    `;
}

// 加载环境影响数据
function loadEnvironment() {
    const environmentMetrics = document.getElementById('environmentMetrics');
    const env = productData.environment;

    const metrics = [
        {
            icon: '🌍',
            value: env.carbonFootprint.value,
            unit: env.carbonFootprint.unit,
            label: '碳足迹',
            description: env.carbonFootprint.description
        },
        {
            icon: '💧',
            value: env.waterUsage.value,
            unit: env.waterUsage.unit,
            label: '用水量',
            description: env.waterUsage.description
        },
        {
            icon: '♻️',
            value: env.wasteReduction.value,
            unit: env.wasteReduction.unit,
            label: '废料减少',
            description: env.wasteReduction.description
        },
        {
            icon: '⚡',
            value: env.renewableEnergy.value,
            unit: env.renewableEnergy.unit,
            label: '可再生能源',
            description: env.renewableEnergy.description
        }
    ];

    environmentMetrics.innerHTML = '';

    metrics.forEach(metric => {
        const metricCard = document.createElement('div');
        metricCard.className = 'metric-card';

        metricCard.innerHTML = `
            <div class="metric-icon">${metric.icon}</div>
            <div class="metric-value">${metric.value} ${metric.unit}</div>
            <div class="metric-label">${metric.label}</div>
            <div class="metric-description">${metric.description}</div>
        `;

        environmentMetrics.appendChild(metricCard);
    });
}

// 加载生命周期信息
function loadLifecycle() {
    const lifecycleTimeline = document.getElementById('lifecycleTimeline');
    lifecycleTimeline.innerHTML = '';

    productData.lifecycle.forEach(stage => {
        const lifecycleItem = document.createElement('div');
        lifecycleItem.className = 'lifecycle-item';

        lifecycleItem.innerHTML = `
            <h4>${stage.stage}</h4>
            <div class="date">${stage.date}</div>
            <div class="description">${stage.description}</div>
        `;

        lifecycleTimeline.appendChild(lifecycleItem);
    });
}

// 可以添加更多交互功能，比如：
// - 二维码生成
// - 数据导出
// - 分享功能
// - 多语言支持等








