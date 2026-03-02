# 数字产品护照 - 包包产品展示

一个现代化的数字产品护照网站，参考 [Tod's 数字产品护照](https://sibeixia.github.io/projects_data/dpp) 的设计风格，专门用于展示包包产品的详细信息。

## 功能特性

### 📑 六个主要标签页

1. **Digital Twin (数字孪生)**
   - 产品主图展示
   - 360° 视图功能（待实现）
   - 产品规格信息

2. **Authentication (认证)**
   - 真实性验证状态
   - 认证详情信息
   - 证书和认证文件

3. **Product Info (产品信息)**
   - 产品详细信息
   - 材料组成和百分比
   - 尺寸和规格

4. **Supply Chain (供应链)**
   - 完整的供应链旅程时间线
   - 供应链合作伙伴信息

5. **Sustainability (可持续性)**
   - 可持续性概述
   - 碳足迹、水资源使用、可回收性等指标
   - 环保认证

6. **Care Guide (护理指南)**
   - 清洁说明
   - 保养建议
   - 存储推荐

## 使用方法

### 本地运行

1. 直接在浏览器中打开 `index.html` 文件
2. 或使用本地服务器：

```bash
# 使用Python
python -m http.server 8000

# 使用Node.js
npx http-server

# 使用PHP
php -S localhost:8000
```

然后访问 `http://localhost:8000`

## 数据结构

产品数据存储在 `app.js` 文件中的 `productData` 对象。数据结构如下：

```javascript
const productData = {
    name: "产品名称",
    subtitle: "产品副标题",
    productId: "产品ID",
    image: "产品图片URL",
    
    digitalTwin: { ... },
    authentication: { ... },
    productInfo: { ... },
    supplyChain: { ... },
    sustainability: { ... },
    careGuide: { ... }
};
```

## 如何添加您的包包数据

1. 打开 `app.js` 文件
2. 找到 `productData` 对象（大约在第3行）
3. 用您的包包数据替换示例数据
4. 保存文件并刷新浏览器

### 数据字段说明

- **name**: 产品名称（大写，如 "CLASSIC LEATHER HANDBAG"）
- **subtitle**: 产品副标题/描述
- **productId**: 产品唯一标识符
- **image**: 产品主图URL
- **digitalTwin**: 数字孪生相关信息
- **authentication**: 认证和验证信息
- **productInfo**: 产品详细信息、材料、规格
- **supplyChain**: 供应链旅程和合作伙伴
- **sustainability**: 可持续性指标和认证
- **careGuide**: 护理指南和保养说明

## 技术栈

- **HTML5**: 语义化标记
- **CSS3**: 现代化样式，响应式设计
- **JavaScript (ES6+)**: 原生JavaScript，无依赖

## 设计特点

- 简洁现代的设计风格
- 清晰的标签页导航
- 响应式布局，支持移动设备
- 流畅的页面切换动画
- 专业的产品信息展示

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 待实现功能

- [ ] 360° 3D 产品视图（可集成 Three.js）
- [ ] 图片缩放功能
- [ ] 多语言支持
- [ ] 产品分享功能

## 许可证

MIT License

## 联系方式

准备好您的包包数据后，可以直接替换 `app.js` 中的 `productData` 对象。
