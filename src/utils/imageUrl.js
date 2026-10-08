/**
 * imgur 缩略图：在图片 id 与扩展名之间插入尺寸档位字母。
 * m = 320px、l = 640px、h = 1024px，均为等比缩放、不裁切；
 * 原图本身小于目标档位时 imgur 直接返回原图，不会放大。
 * 非 imgur 链接（含带查询参数的链接）原样返回。
 */
const IMGUR_RE = /^(https?:\/\/i\.imgur\.com\/[A-Za-z0-9]+)(\.[A-Za-z0-9]+)$/;

export const withImgurSize = (url, size) => {
  if (!url) return url;
  const m = IMGUR_RE.exec(url);
  return m ? `${m[1]}${size}${m[2]}` : url;
};

// 使用档位：详情大图用 1024px、弹窗缩略图用 320px
export const DETAIL_IMG_SIZE = 'h';
export const THUMB_IMG_SIZE = 'm';

/**
 * 列表卡片的档位按视口宽度选择：
 * 手机 3 列时卡片只有约 100~130px 宽，用 320px 档已足够（体积约 1/3）；
 * 桌面 6 列卡片约 186px，Retina 下需要 640px，故保持 640px 档。
 */
export const getCardImgSize = () =>
  (typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches)
    ? 'm'
    : 'l';
