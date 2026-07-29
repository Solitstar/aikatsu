# 将 dist/images 下所有 PNG 批量转为 WebP
# 用法: .\scripts\convert_to_webp.ps1
#       .\scripts\convert_to_webp.ps1 -Quality 90

param(
    [int]$Quality = 85
)

$root = Split-Path -Parent $PSScriptRoot
$pythonScript = Join-Path $root "scripts\convert_to_webp.py"

# 检查 Pillow 是否已安装
$hasPillow = python -c "from PIL import Image" 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "正在安装 Pillow..." -ForegroundColor Yellow
    pip install Pillow
    if ($LASTEXITCODE -ne 0) {
        Write-Host "安装失败，请手动运行: pip install Pillow" -ForegroundColor Red
        exit 1
    }
}

Write-Host "开始转换 PNG → WebP (质量: $Quality)..." -ForegroundColor Cyan
python $pythonScript $Quality
