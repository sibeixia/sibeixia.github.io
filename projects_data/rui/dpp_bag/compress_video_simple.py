#!/usr/bin/env python3
"""
使用 imageio-ffmpeg 压缩视频分辨率
"""

import subprocess
import os
import sys

def get_ffmpeg_path():
    """获取 ffmpeg 路径"""
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except:
        return None

def compress_video(input_path, output_path, width=1280, height=720):
    """
    压缩视频分辨率
    """
    if not os.path.exists(input_path):
        print(f"错误：找不到文件 {input_path}")
        return False
    
    ffmpeg_path = get_ffmpeg_path()
    if not ffmpeg_path:
        print("错误：无法找到 ffmpeg")
        return False
    
    original_size = os.path.getsize(input_path) / 1024  # KB
    
    # ffmpeg 压缩命令
    cmd = [
        ffmpeg_path,
        '-i', input_path,
        '-vf', f'scale={width}:{height}',
        '-crf', '23',  # 质量参数（18-28，数值越小质量越高）
        '-preset', 'medium',
        '-c:v', 'libx264',
        '-c:a', 'copy',  # 保持音频不变
        '-y',  # 覆盖输出文件
        output_path
    ]
    
    try:
        print(f"正在压缩视频：{input_path}")
        print(f"原始大小：{original_size:.1f} KB")
        print(f"原始分辨率：1080x1920")
        print(f"目标分辨率：{width}x{height}")
        print("正在处理，请稍候...")
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0:
            compressed_size = os.path.getsize(output_path) / 1024  # KB
            reduction = (1 - compressed_size / original_size) * 100
            
            print(f"\n压缩完成！")
            print(f"原始大小：{original_size:.1f} KB (1080x1920)")
            print(f"压缩后：{compressed_size:.1f} KB ({width}x{height})")
            print(f"减少了：{reduction:.1f}%")
            return True
        else:
            print(f"压缩失败：{result.stderr}")
            return False
    except Exception as e:
        print(f"发生错误：{e}")
        return False

if __name__ == "__main__":
    input_file = "images/digital-twin.mp4"
    output_file = "images/digital-twin-compressed.mp4"
    
    # 提供分辨率选项
    print("请选择目标分辨率：")
    print("1. 720p (1280x720) - 推荐，适合网页显示")
    print("2. 480p (854x480) - 更小，适合移动设备")
    print("3. 360p (640x360) - 最小，快速加载")
    
    choice = input("请输入选项 (1/2/3，默认1): ").strip() or "1"
    
    resolutions = {
        "1": (1280, 720),
        "2": (854, 480),
        "3": (640, 360)
    }
    
    width, height = resolutions.get(choice, (1280, 720))
    
    # 压缩视频
    if compress_video(input_file, output_file, width, height):
        # 备份原文件并替换
        backup_file = input_file + ".backup"
        print(f"\n备份原文件到: {backup_file}")
        if os.path.exists(backup_file):
            os.remove(backup_file)
        os.rename(input_file, backup_file)
        os.rename(output_file, input_file)
        print(f"已替换原文件，原文件备份为: {backup_file}")
        print("\n完成！请刷新浏览器查看效果。")
    else:
        print("压缩失败，请检查错误信息。")
        sys.exit(1)



