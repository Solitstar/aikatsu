"""
将 dist/images 目录下的所有 PNG 图片批量转换为 WebP 格式
用法: python scripts/convert_to_webp.py
"""
import os
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("错误: 需要安装 Pillow 库")
    print("请运行: pip install Pillow")
    sys.exit(1)

# 项目根目录（脚本在 scripts/ 下）
ROOT = Path(__file__).resolve().parent.parent
IMAGES_DIR = ROOT / "dist" / "images"

def convert_png_to_webp(quality=85):
    """将 dist/images 下所有 PNG 转换为 WebP"""
    if not IMAGES_DIR.exists():
        print(f"错误: 目录不存在 {IMAGES_DIR}")
        sys.exit(1)

    png_files = list(IMAGES_DIR.glob("*.png"))
    if not png_files:
        print(f"在 {IMAGES_DIR} 中未找到 PNG 文件")
        return

    print(f"找到 {len(png_files)} 个 PNG 文件\n")

    converted = 0
    skipped = 0
    failed = 0
    total_saved = 0

    for png_path in png_files:
        webp_path = png_path.with_suffix(".webp")
        png_size = png_path.stat().st_size

        # 如果 WebP 已存在且比 PNG 新，跳过
        if webp_path.exists() and webp_path.stat().st_mtime > png_path.stat().st_mtime:
            print(f"  ⏭ {png_path.name} → 已有新版 WebP，跳过")
            skipped += 1
            continue

        try:
            img = Image.open(png_path)

            # 保持 RGBA 模式支持透明通道
            if img.mode in ("RGBA", "LA", "P"):
                img = img.convert("RGBA")
            else:
                img = img.convert("RGB")

            img.save(webp_path, "WEBP", quality=quality, method=6)
            webp_size = webp_path.stat().st_size
            saved = png_size - webp_size
            pct = (saved / png_size * 100) if png_size > 0 else 0
            total_saved += saved

            converted += 1
            print(f"  ✓ {png_path.name} → {webp_path.name} "
                  f"({_format_size(png_size)} → {_format_size(webp_size)}, -{pct:.0f}%)")

        except Exception as e:
            failed += 1
            print(f"  ✗ {png_path.name} 转换失败: {e}")

    print(f"\n{'='*50}")
    print(f"完成: {converted} 成功 | {skipped} 跳过 | {failed} 失败")
    if total_saved > 0:
        print(f"共节省: {_format_size(total_saved)}")
    print(f"{'='*50}")


def _format_size(size_bytes):
    """格式化文件大小"""
    for unit in ("B", "KB", "MB", "GB"):
        if size_bytes < 1024:
            return f"{size_bytes:.1f} {unit}"
        size_bytes /= 1024
    return f"{size_bytes:.1f} TB"


if __name__ == "__main__":
    quality = 85
    if len(sys.argv) > 1:
        try:
            quality = int(sys.argv[1])
            quality = max(1, min(100, quality))
        except ValueError:
            pass
    print(f"WebP 质量参数: {quality}")
    convert_png_to_webp(quality)
