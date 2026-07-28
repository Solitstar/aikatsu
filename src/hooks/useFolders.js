import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'aikatsu_folders';

/**
 * 从 localStorage 读取文件夹数据
 * 格式: { owned: Folder[], wish: Folder[] }
 * Folder: { id, name, itemIds: number[], order: number, createdAt: number }
 */
function loadFolders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (data.owned && data.wish) return data;
    }
  } catch (e) { /* ignore */ }
  return { owned: [], wish: [] };
}

function saveFolders(folders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(folders));
}

let uidCounter = Date.now();
function uid() {
  return 'f_' + (++uidCounter).toString(36);
}

export function useFolders() {
  const [folders, setFolders] = useState(loadFolders);

  useEffect(() => {
    saveFolders(folders);
  }, [folders]);

  // 创建文件夹
  const createFolder = useCallback((type, name) => {
    const trimmed = name.trim();
    if (!trimmed) return null;
    const folder = {
      id: uid(),
      name: trimmed,
      itemIds: [],
      order: Date.now(),
      createdAt: Date.now(),
    };
    setFolders(prev => ({
      ...prev,
      [type]: [...prev[type], folder],
    }));
    return folder;
  }, []);

  // 重命名文件夹
  const renameFolder = useCallback((type, folderId, newName) => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    setFolders(prev => ({
      ...prev,
      [type]: prev[type].map(f =>
        f.id === folderId ? { ...f, name: trimmed } : f
      ),
    }));
  }, []);

  // 删除文件夹（其中物品归为"未分类"）
  const deleteFolder = useCallback((type, folderId) => {
    setFolders(prev => ({
      ...prev,
      [type]: prev[type].filter(f => f.id !== folderId),
    }));
  }, []);

  // 将物品添加到文件夹
  const addItemToFolder = useCallback((type, folderId, itemId) => {
    setFolders(prev => ({
      ...prev,
      [type]: prev[type].map(f => {
        // 先从其他文件夹移除
        if (f.id !== folderId && f.itemIds.includes(itemId)) {
          return { ...f, itemIds: f.itemIds.filter(id => id !== itemId) };
        }
        // 添加到目标文件夹
        if (f.id === folderId && !f.itemIds.includes(itemId)) {
          return { ...f, itemIds: [...f.itemIds, itemId] };
        }
        return f;
      }),
    }));
  }, []);

  // 从文件夹移除物品
  const removeItemFromFolder = useCallback((type, folderId, itemId) => {
    setFolders(prev => ({
      ...prev,
      [type]: prev[type].map(f =>
        f.id === folderId
          ? { ...f, itemIds: f.itemIds.filter(id => id !== itemId) }
          : f
      ),
    }));
  }, []);

  // 获取物品所在文件夹ID
  const getItemFolderId = useCallback((type, itemId) => {
    for (const f of folders[type]) {
      if (f.itemIds.includes(itemId)) return f.id;
    }
    return null;
  }, [folders]);

  // 移动文件夹顺序
  const moveFolder = useCallback((type, fromIndex, toIndex) => {
    setFolders(prev => {
      const list = [...prev[type]];
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return { ...prev, [type]: list };
    });
  }, []);

  return {
    folders,
    createFolder,
    renameFolder,
    deleteFolder,
    addItemToFolder,
    removeItemFromFolder,
    getItemFolderId,
    moveFolder,
  };
}
