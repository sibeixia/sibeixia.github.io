# 数字产品护照 - 使用说明

## 文件结构

```
项目文件夹/
├── index.html          # 主页面文件
├── styles.css          # 样式文件
├── app.js              # 应用逻辑和数据
├── images/             # 图片文件夹
│   ├── main-product.jpg
│   ├── digital-twin.mp4
│   └── ...
├── start-server.sh     # 启动服务器脚本（可选）
└── README-使用说明.md  # 本文件
```

## 重要提示：文件路径

**所有文件都使用相对路径，这意味着：**

✅ **可以移动整个项目文件夹到任何位置**  
✅ **可以重命名项目文件夹**  
✅ **只要保持文件之间的相对位置不变，就能正常工作**

### 相对路径说明

- `styles.css` - 与 `index.html` 在同一目录
- `app.js` - 与 `index.html` 在同一目录
- `images/` - 与 `index.html` 在同一目录下的子文件夹

## 使用方法

### 方法 1：使用本地服务器（推荐）

#### macOS/Linux:
```bash
# 方法 A: 使用提供的脚本
./start-server.sh

# 方法 B: 手动启动
python3 -m http.server 8000
```

#### Windows:
```cmd
# 方法 A: 使用提供的脚本（需要 Git Bash 或 WSL）
start-server.sh

# 方法 B: 手动启动
python -m http.server 8000
```

然后在浏览器中访问：`http://localhost:8000`

### 方法 2：直接打开文件

直接双击 `index.html` 文件在浏览器中打开（某些功能可能受限）

## 移动文件时的注意事项

### ✅ 可以做的：
- 移动整个项目文件夹到任何位置
- 重命名项目文件夹
- 在文件夹内添加新文件

### ❌ 不要做的：
- 不要单独移动 `index.html`、`styles.css` 或 `app.js` 到其他位置
- 不要移动或重命名 `images` 文件夹
- 不要改变 `images` 文件夹内的文件结构

## 修改内容

### 修改产品数据

编辑 `app.js` 文件中的 `productData` 对象（大约在第 2 行）

### 更换图片

1. 将新图片放入 `images` 文件夹
2. 在 `app.js` 中更新对应的路径

例如：
```javascript
image: "images/你的新图片.jpg"
```

### 修改样式

编辑 `styles.css` 文件

## 故障排除

### 图片不显示
- 检查图片文件是否在 `images` 文件夹中
- 检查 `app.js` 中的路径是否正确
- 打开浏览器开发者工具（F12）查看控制台错误

### 样式不生效
- 检查 `styles.css` 是否与 `index.html` 在同一目录
- 清除浏览器缓存（Ctrl+F5 或 Cmd+Shift+R）

### 服务器无法启动
- 确保已安装 Python
- 检查端口 8000 是否被占用
- 尝试使用其他端口：`python3 -m http.server 8080`

## 技术支持

如果遇到问题，请检查：
1. 浏览器控制台（F12）的错误信息
2. 文件路径是否正确
3. 文件是否完整



