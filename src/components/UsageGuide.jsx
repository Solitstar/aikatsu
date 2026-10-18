import { useCallback, useEffect, useState } from 'react';

// 首次访问标记：记录在 localStorage，用户清缓存后会再次看到
const GUIDE_SEEN_KEY = 'aikatsu_guide_seen_v1';

const SECTIONS = [
  {
    title: '搜索',
    desc: '顶部搜索框支持商品名、角色名（中文 / 罗马音 / 拼音）、日文关键词，以及种类、材质等关键词。',
  },
  {
    title: '筛选',
    desc: '「系列」下拉里除了初代 / 明代 / 星代等，还有「组合」分组（如 WM、Soleil、Tristar），选中后只显示该组合全员同框的商品。角色、种类、角色数可以叠加筛选。',
  },
  {
    title: '标记收藏',
    desc: '点任意商品卡打开详情，选择「已拥有」或「心愿单」。多版本商品（初版 / 再贩）可以分别标记。',
  },
  {
    title: '价格与数量',
    desc: '已拥有可记录购入价与数量；心愿单可设置心理价区间和期望数量，保存后卡片上会直接显示价格。',
  },
  {
    title: '文件夹',
    desc: '在「已拥有 / 心愿单」页面新建文件夹，把商品分组管理，方便整理不同主题或系列。',
  },
  {
    title: '导出',
    desc: '「已拥有 / 心愿单」页面右上角可导出分享图片（PNG）或表格（CSV），方便备份与分享。',
  },
  {
    title: '收集进度',
    desc: '页面顶部会显示总收集进度和角色分布，可以直观看到还缺哪些。',
  },
  {
    title: '数据存在本机',
    desc: '所有收藏与价格记录都保存在你自己的浏览器里，不会上传到服务器；清除浏览器数据会导致记录丢失。',
  },
];

// 首次访问自动弹出的指导
export const useUsageGuide = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(GUIDE_SEEN_KEY)) setOpen(true);
    } catch {
      // localStorage 不可用（隐私模式等）时静默跳过，不阻断使用
    }
  }, []);

  const dismiss = useCallback(() => {
    setOpen(false);
    try {
      localStorage.setItem(GUIDE_SEEN_KEY, '1');
    } catch {
      // 忽略写入失败
    }
  }, []);

  return { open, setOpen, dismiss };
};

const UsageGuide = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return;
    document.body.classList.add('modal-open');
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="absolute inset-0 overflow-y-auto flex items-start justify-center p-4 sm:items-center">
        <div
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-soft overflow-hidden my-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-accent/10 px-4 py-3 border-b border-accent/20 flex items-center justify-between">
            <span className="font-semibold text-text-primary">使用指导</span>
            <button
              onClick={onClose}
              className="px-3 py-1 rounded-full bg-white/80 text-text-secondary text-sm hover:bg-white hover:text-text-primary transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="p-5 sm:p-6">
            <p className="text-sm text-text-secondary mb-4">
              第一次来？花一分钟看看这里能做什么，之后随时可以点顶部的「指导」再看。
            </p>

            <div className="space-y-4 max-h-[58vh] overflow-y-auto pr-1">
              {SECTIONS.map((section, i) => (
                <div key={section.title} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-text-primary mb-0.5">{section.title}</p>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">{section.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="mt-5 w-full py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              开始使用
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageGuide;
