import { useState, useEffect, useRef } from 'react';

/**
 * 定期检查 version.json，检测网站更新
 * 每 15 秒轮询一次，发现新版本时 hasUpdate = true
 */
export function useVersionCheck() {
  const [hasUpdate, setHasUpdate] = useState(false);
  const currentVersion = useRef(null);

  useEffect(() => {
    // 首次加载：读取并记录当前版本
    fetch('/aikatsu/version.json?t=' + Date.now())
      .then((res) => res.json())
      .then((data) => {
        currentVersion.current = data.timestamp;
      })
      .catch(() => {
        // 首次加载失败，记录当前时间作为版本
        currentVersion.current = Date.now();
      });

    // 每 15 秒检查一次
    const interval = setInterval(() => {
      fetch('/aikatsu/version.json?t=' + Date.now())
        .then((res) => res.json())
        .then((data) => {
          if (
            currentVersion.current &&
            data.timestamp !== currentVersion.current
          ) {
            setHasUpdate(true);
            clearInterval(interval);
          }
        })
        .catch(() => {});
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const dismiss = () => setHasUpdate(false);

  return { hasUpdate, dismiss };
}
