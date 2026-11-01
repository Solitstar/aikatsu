/* global __APP_VERSION__ */
import { useState, useEffect } from 'react';

// 构建时由 vite.config.js 注入，等于本次部署 version.json 里的 timestamp。
// 用它作为基线：页面即使是浏览器缓存里的旧版本，也能立即发现线上已更新。
const BUILD_VERSION = typeof __APP_VERSION__ === 'string' ? __APP_VERSION__ : '';
const BASE = import.meta.env.BASE_URL;

/**
 * 生成一个指向同一个 version.json、但字面不同的地址。
 * GitHub Pages 的 CDN 会把 version.json 缓存 10 分钟，且忽略查询参数
 * （?t=xxx 命中的仍是同一个缓存条目），更新提示因此最长会延迟 10 分钟。
 * 重复斜杠与百分号编码会被 CDN 当成不同缓存键，但都指向同一个文件，
 * 因此每次都能读到当前部署的最新版本。
 */
function versionUrl() {
  const slashes = '/'.repeat(2 + Math.floor(Math.random() * 30));
  let file = '';
  for (const ch of 'version.json') {
    if (Math.random() < 0.5) {
      const hex = ch.charCodeAt(0).toString(16);
      file += '%' + (Math.random() < 0.5 ? hex.toUpperCase() : hex.toLowerCase());
    } else {
      file += ch;
    }
  }
  return `${BASE}${slashes}${file}`;
}

async function fetchVersionTimestamp() {
  // 变体地址失败时（非 GitHub Pages 等环境）回退到常规地址
  for (const url of [versionUrl(), `${BASE}version.json`]) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) continue;
      const data = await res.json();
      if (data && data.timestamp != null) return String(data.timestamp);
    } catch {
      // 忽略网络错误，继续尝试下一个地址
    }
  }
  return null;
}

/**
 * 定期检查 version.json，检测网站更新
 * 构建版本已知时（BUILD_VERSION 非空）加载即可判断页面是否过期，
 * 之后每 15 秒轮询一次，发现新版本时 hasUpdate = true
 */
export function useVersionCheck() {
  const [hasUpdate, setHasUpdate] = useState(false);

  useEffect(() => {
    let baseline = BUILD_VERSION || null;
    let stopped = false;
    let timer = null;

    const stop = () => {
      stopped = true;
      if (timer) clearInterval(timer);
    };

    const check = async () => {
      if (stopped) return;
      const timestamp = await fetchVersionTimestamp();
      if (!timestamp || stopped) return;
      // 没有构建版本时，以首次成功读取的版本作为基线
      if (!baseline) {
        baseline = timestamp;
        return;
      }
      if (timestamp !== baseline) {
        setHasUpdate(true);
        stop();
      }
    };

    check();
    timer = setInterval(check, 15000);

    // 后台标签页的定时器会被浏览器节流，切回前台时立即补一次检查
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') check();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  const dismiss = () => setHasUpdate(false);

  return { hasUpdate, dismiss };
}
