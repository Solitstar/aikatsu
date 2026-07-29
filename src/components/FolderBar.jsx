import { useState, useRef, useEffect } from 'react';

const FolderBar = ({
  folders,
  activeFolder,
  onSelectFolder,
  onCreateFolder,
  onRenameFolder,
  onDeleteFolder,
}) => {
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [menuId, setMenuId] = useState(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const inputRef = useRef(null);
  const menuRef = useRef(null);
  const containerRef = useRef(null);
  const menuBtnRefs = useRef({});

  useEffect(() => {
    if (showCreate && inputRef.current) inputRef.current.focus();
  }, [showCreate]);

  useEffect(() => {
    if (editingId && inputRef.current) inputRef.current.focus();
  }, [editingId]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 计算弹出菜单位置（相对于外层容器，避免被 overflow 裁剪）
  useEffect(() => {
    if (menuId !== null && containerRef.current && menuBtnRefs.current[menuId]) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const btnRect = menuBtnRefs.current[menuId].getBoundingClientRect();
      setMenuPos({
        top: btnRect.bottom - containerRect.top + 4,
        left: btnRect.left - containerRect.left,
      });
    }
  }, [menuId]);

  const handleCreate = () => {
    if (newName.trim()) {
      onCreateFolder(newName.trim());
      setNewName('');
      setShowCreate(false);
    }
  };

  const handleRename = (id) => {
    if (editName.trim()) {
      onRenameFolder(id, editName.trim());
      setEditingId(null);
      setEditName('');
    }
  };

  const tabs = [
    { id: null, label: '全部', count: null },
    { id: '__uncategorized__', label: '未分类', count: null },
    ...folders.map(f => ({
      id: f.id,
      label: f.name,
      count: f.itemIds.length,
      folder: f,
    })),
  ];

  const activeFolderId = activeFolder === undefined ? null : activeFolder;

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
      {tabs.map((tab) => {
        const isActive = activeFolderId === tab.id;
        const isBuiltin = tab.id === null || tab.id === '__uncategorized__';
        const isEditing = editingId !== null && editingId === tab.id;

        return (
          <div key={String(tab.id)} className="relative flex-shrink-0 group">
            {/* 重命名编辑模式 */}
            {isEditing ? (
              <div className="flex items-center gap-1">
                <input
                  ref={inputRef}
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRename(tab.id);
                    if (e.key === 'Escape') { setEditingId(null); setEditName(''); }
                  }}
                  className="w-32 px-2.5 py-1.5 rounded-full bg-card-bg border border-accent/40 text-xs
                             text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                  autoFocus
                />
                <button
                  onMouseDown={(e) => { e.preventDefault(); handleRename(tab.id); }}
                  className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center hover:bg-accent/80 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={() => onSelectFolder(tab.id)}
                title={tab.label}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-accent text-white shadow-sm'
                    : 'bg-card-bg text-text-secondary hover:bg-accent/10 border border-accent/10'
                }`}
              >
                <span className="max-w-[100px] overflow-hidden text-ellipsis">{tab.label}</span>
                {tab.count !== null && tab.count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0 ${
                    isActive ? 'bg-white/20 text-white' : 'bg-accent/10 text-accent'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            )}

            {/* 自定义文件夹的"..."按钮 */}
            {!isBuiltin && !isEditing && (
              <button
                ref={(el) => { menuBtnRefs.current[tab.id] = el; }}
                onClick={() => setMenuId(menuId === tab.id ? null : tab.id)}
                className={`absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center
                  ${isActive ? 'bg-white/30 text-white hover:bg-white/50' : 'bg-bg-primary text-text-secondary hover:bg-accent/10 opacity-0 group-hover:opacity-100'}
                  transition-opacity`}
                title="更多操作"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                  <circle cx="3" cy="8" r="1.5" />
                  <circle cx="8" cy="8" r="1.5" />
                  <circle cx="13" cy="8" r="1.5" />
                </svg>
              </button>
            )}
          </div>
        );
      })}

      {/* 新建文件夹 */}
      {showCreate ? (
        <div className="flex items-center gap-1 flex-shrink-0">
          <input
            ref={inputRef}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreate();
              if (e.key === 'Escape') { setShowCreate(false); setNewName(''); }
            }}
            placeholder="文件夹名..."
            className="w-32 px-2.5 py-1.5 rounded-full bg-card-bg border border-accent/30 text-xs
                       text-text-primary placeholder:text-text-secondary/40
                       focus:outline-none focus:border-accent"
          />
          <button
            onClick={handleCreate}
            className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center hover:bg-accent/80 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </button>
          <button
            onClick={() => { setShowCreate(false); setNewName(''); }}
            className="w-7 h-7 rounded-full bg-bg-primary text-text-secondary flex items-center justify-center hover:bg-accent/10 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowCreate(true)}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-card-bg border border-dashed border-accent/20
                     text-accent/60 hover:text-accent hover:border-accent/40
                     flex items-center justify-center transition-all duration-200"
          title="新建文件夹"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
          </svg>
        </button>
      )}
      </div>

      {/* 弹出菜单 */}
      {menuId !== null && (() => {
        const tab = tabs.find(t => t.id === menuId);
        if (!tab || tab.id === null || tab.id === '__uncategorized__') return null;
        if (editingId !== null && editingId === tab.id) return null;
        return (
          <div
            ref={menuRef}
            className="absolute bg-card-bg rounded-xl shadow-soft border border-accent/10 py-1 z-50 min-w-[110px]"
            style={{ top: menuPos.top, left: menuPos.left }}
          >
            <button
              onClick={() => {
                setEditingId(tab.id);
                setEditName(tab.label);
                setMenuId(null);
              }}
              className="w-full text-left px-3 py-2 text-xs text-text-primary hover:bg-accent/5 transition-colors flex items-center gap-2"
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              重命名
            </button>
            <button
              onClick={() => {
                onDeleteFolder(tab.id);
                if (activeFolderId === tab.id) onSelectFolder(null);
                setMenuId(null);
              }}
              className="w-full text-left px-3 py-2 text-xs text-rose-500 hover:bg-rose-50 transition-colors flex items-center gap-2"
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              删除文件夹
            </button>
          </div>
        );
      })()}
    </div>
  );
};

export default FolderBar;
