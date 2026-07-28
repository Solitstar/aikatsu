import { useState, useRef, useEffect } from 'react';

const FolderBar = ({
  folders,           // 当前类型的文件夹列表
  activeFolder,      // 当前选中文件夹ID (null=全部, '__uncategorized__'=未分类)
  onSelectFolder,    // 选择文件夹回调
  onCreateFolder,    // 创建文件夹
  onRenameFolder,    // 重命名
  onDeleteFolder,    // 删除
}) => {
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [menuId, setMenuId] = useState(null);
  const inputRef = useRef(null);
  const menuRef = useRef(null);

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

  const uncategorizedCount = 0; // 由父组件计算传入

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
    <div className="relative" ref={menuRef}>
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
      {tabs.map((tab) => {
        const isActive = activeFolderId === tab.id;
        const isBuiltin = tab.id === null || tab.id === '__uncategorized__';
        const isEditing = editingId === tab.id;

        return (
          <div key={String(tab.id)} className="relative flex-shrink-0 group">
            {/* 编辑模式：重命名输入框 */}
            {isEditing ? (
              <div className="flex items-center gap-1" key={tab.id}>
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
                  placeholder="输入名称..."
                  autoFocus
                />
                <button
                  onMouseDown={(e) => { e.preventDefault(); handleRename(tab.id); }}
                  className="w-6 h-6 rounded-full bg-accent text-white text-xs flex items-center justify-center hover:bg-accent/80 transition-colors"
                >
                  ✓
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

            {/* 自定义文件夹的操作菜单（非编辑模式） */}
            {!isBuiltin && !isEditing && (
              <button
                onClick={() => setMenuId(menuId === tab.id ? null : tab.id)}
                className={`absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px]
                  ${isActive ? 'bg-white/30 text-white hover:bg-white/50' : 'bg-bg-primary text-text-secondary hover:bg-accent/10 opacity-0 group-hover:opacity-100'}
                  transition-opacity`}
                title="更多操作"
              >
                ···
              </button>
            )}

            {/* 弹出菜单 */}
            {menuId === tab.id && !isEditing && (
              <div className="absolute top-full mt-1 left-0 bg-card-bg rounded-xl shadow-soft border border-accent/10 py-1 z-50 min-w-[100px]">
                <button
                  onClick={() => {
                    setEditingId(tab.id);
                    setEditName(tab.label);
                    setMenuId(null);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-text-primary hover:bg-accent/5 transition-colors"
                >
                  ✏️ 重命名
                </button>
                <button
                  onClick={() => {
                    onDeleteFolder(tab.id);
                    if (activeFolderId === tab.id) onSelectFolder(null);
                    setMenuId(null);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-rose-500 hover:bg-rose-50 transition-colors"
                >
                  🗑 删除
                </button>
              </div>
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
            className="w-7 h-7 rounded-full bg-accent text-white text-xs flex items-center justify-center hover:bg-accent/80 transition-colors"
          >
            ✓
          </button>
          <button
            onClick={() => { setShowCreate(false); setNewName(''); }}
            className="w-7 h-7 rounded-full bg-bg-primary text-text-secondary text-xs flex items-center justify-center hover:bg-accent/10 transition-colors"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowCreate(true)}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-card-bg border border-dashed border-accent/20
                     text-accent/60 hover:text-accent hover:border-accent/40
                     flex items-center justify-center text-lg transition-all duration-200"
          title="新建文件夹"
        >
          +
        </button>
      )}
      </div>
    </div>
  );
};

export default FolderBar;
