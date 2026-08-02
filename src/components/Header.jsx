import { useState, useEffect, useCallback } from 'react';

const Header = ({ activeTab, onTabChange }) => {
  const [showAbout, setShowAbout] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(
      '链接: https://pan.baidu.com/s/1npzIJw_LyAmH7q6YodruJQ  提取码: love'
    ).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  useEffect(() => {
    if (showAbout) {
      document.body.classList.add('modal-open');
      return () => document.body.classList.remove('modal-open');
    }
  }, [showAbout]);

  const tabs = [
    { key: 'collection', label: '图鉴' },
    { key: 'owned', label: '已拥有' },
    { key: 'wishlist', label: '心愿单' },
  ];

  return (
    <>
      <header className="bg-card-bg/80 backdrop-blur-sm sticky top-0 z-50 border-b border-accent/20 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center flex-shrink-0">
              <h1 className="font-quick text-base sm:text-2xl font-bold text-text-primary tracking-wide whitespace-nowrap">
                AIKATSU<span className="hidden sm:inline"> GOODS</span>
              </h1>
            </div>
            <nav className="flex gap-0.5 sm:gap-2 ml-1">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => onTabChange(tab.key)}
                  className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'bg-accent text-white shadow-md'
                      : 'text-text-secondary hover:bg-accent/10 hover:text-text-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              <button
                onClick={() => setShowAbout(true)}
                className="px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-text-secondary hover:bg-accent/10 hover:text-text-primary transition-all duration-300 whitespace-nowrap"
              >
                关于
              </button>
            </nav>
          </div>
        </div>
      </header>

      {showAbout && (
        <div
          className="fixed inset-0 z-[60] overflow-hidden"
          onClick={() => setShowAbout(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="absolute inset-0 overflow-y-auto flex items-start justify-center p-4 sm:items-center">
            <div
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-soft overflow-hidden my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-accent/10 px-4 py-3 border-b border-accent/20 flex items-center justify-between">
                <span className="font-semibold text-text-primary">关于本站</span>
                <button
                  onClick={() => setShowAbout(false)}
                  className="px-3 py-1 rounded-full bg-white/80 text-text-secondary text-sm hover:bg-white hover:text-text-primary transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 text-sm text-text-primary leading-relaxed space-y-3">
                <p>本网站为《偶像活动！》系列收藏爱好者自发建立的非盈利性资料整合平台，旨在为同好提供便捷的查询与展示参考。
                </p>
                <p>网站内所使用的大部分图片、角色形象、商标、标志、商品名称及活动名称等，其知识产权均归株式会社万代（BANDAI）、日升（SUNRISE）及其相关版权方所有。</p>
                <p>部分图片未使用官方图片，如cd方使用cd封面便于观看，鉴别正版请看官标。图鉴可能存在错误/名字叫法不同/仅供参考。</p>
                <p>本站仅作个人收藏与信息整理之用，不涉及任何商业行为，亦不主张任何版权归属。</p>
                <p>若内容涉及侵权或权利人要求删除，请与我们联系，我们将及时予以处理。</p>
                <p>感谢您的理解与支持。</p>

                <hr className="border-accent/20 my-4" />

                <p className="font-semibold">错误反馈说明</p>
                <p>本站内容力求准确，但因资料繁多，难免存在疏漏或信息不实之处。</p>
                <p>社畜精力有限，更新比较缓慢还望多见谅。</p>
                <p>如您在浏览过程中发现任何商品信息错误、图片不符、遗漏条目等问题，欢迎通过以下方式联系我们进行修正，我们将尽快核实并更新。</p>
                <p>您的每一次指正都将帮助本站变得更加完善，在此衷心感谢！</p>

                <div className="bg-accent/5 rounded-xl p-4 space-y-2">
                  <p className="font-medium">📩 联系方式</p>
                  <p>邮箱：srcret5@163.com</p>
                </div>

                <hr className="border-accent/20 my-4" />

                <p className="font-semibold"> 关于以前的图鉴</p>
                <p>图片已不再更新，需要的友友请自行下载（百度云盘）</p>

                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-bg-primary rounded-lg px-3 py-2 text-xs text-text-secondary break-all select-all">
                    链接: https://pan.baidu.com/s/1npzIJw_LyAmH7q6YodruJQ  提取码: love
                  </code>
                  <button
                    onClick={handleCopy}
                    className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      copied
                        ? 'bg-green-100 text-green-600'
                        : 'bg-accent/10 text-accent hover:bg-accent hover:text-white'
                    }`}
                  >
                    {copied ? '✓ 已复制' : '复制链接'}
                  </button>
                </div>

                <p className="text-text-secondary text-xs pt-2">制作：Solitstar</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
