#!/bin/bash
# 启动本地服务器的脚本
# 确保在项目根目录运行此脚本

# 获取脚本所在目录
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# 检查 Python 是否安装
if command -v python3 &> /dev/null; then
    echo "正在启动服务器..."
    echo "访问地址: http://localhost:8000"
    echo "按 Ctrl+C 停止服务器"
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "正在启动服务器..."
    echo "访问地址: http://localhost:8000"
    echo "按 Ctrl+C 停止服务器"
    python -m http.server 8000
else
    echo "错误: 未找到 Python。请先安装 Python。"
    exit 1
fi



