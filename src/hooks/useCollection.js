import { useState, useEffect } from 'react';
import { getItemsWithMeta } from '../data/items';

const STORAGE_KEY = 'aikatsu_collection';

const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return {};
    const data = JSON.parse(saved);
    const normalized = {};
    Object.entries(data).forEach(([id, val]) => {
      if (typeof val === 'string') {
        normalized[id] = {
          status: val,
          priceRecords: [],
          wishQuantity: 1,
          wishPriceMin: 0,
          wishPriceMax: 0,
        };
      } else {
        // 迁移旧数据：旧的 wishPrice → wishPriceMin
        const oldWishPrice = val.wishPriceMin !== undefined ? 0 : (val.wishPrice || 0);
        normalized[id] = {
          status: val.status,
          version: val.version || null,
          // 旧数据只有单个 version+status，迁移为 versionStatuses
          versionStatuses: val.versionStatuses || (val.version && val.status ? { [val.version]: val.status } : {}),
          priceRecords: val.priceRecords && val.priceRecords.length > 0
            ? val.priceRecords
            : (val.price > 0
                ? [{ price: val.price || 0, quantity: val.quantity || 1 }]
                : [{ price: 0, quantity: val.quantity || 1 }]),
          wishQuantity: val.wishQuantity || 1,
          wishPriceMin: val.wishPriceMin !== undefined ? val.wishPriceMin : oldWishPrice,
          wishPriceMax: val.wishPriceMax || 0,
        };
      }
    });
    return normalized;
  } catch {
    return {};
  }
};

const saveToStorage = (statusMap) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(statusMap));
  } catch {
    console.error('Failed to save to localStorage');
  }
};

const getNextStatus = (current) => {
  if (current === null) return 'owned';
  if (current === 'owned') return 'wish';
  return null;
};

// 版本级收藏状态：versionStatuses = { [版本label]: 'owned' | 'wish' }
// 整件商品状态由各版本聚合：任一版本已拥有 → owned；否则任一心愿 → wish；否则 null
const deriveStatus = (versionStatuses) => {
  const vals = Object.values(versionStatuses || {});
  if (vals.includes('owned')) return 'owned';
  if (vals.includes('wish')) return 'wish';
  return null;
};

let _recordIdCounter = Date.now();

const generateRecordId = () => ++_recordIdCounter;

const computeFromRecords = (records) => {
  const quantity = records.reduce((sum, r) => sum + (r.quantity || 0), 0);
  const totalPrice = records.reduce((sum, r) => sum + (r.price || 0) * (r.quantity || 0), 0);
  return { quantity, totalPrice };
};

export const useCollection = () => {
  const [items, setItems] = useState(() => {
    const dataMap = loadFromStorage();
    return getItemsWithMeta()
      .filter(Boolean) // 防御：BASE_ITEMS 若有稀疏元素空洞直接跳过，避免 map 后 undefined
      .map(item => {
      const saved = dataMap[item.id];
      const records = saved?.priceRecords || [];
      const { quantity, totalPrice } = computeFromRecords(records);
      const versionStatuses = saved?.versionStatuses || {};
      return {
        ...item,
        // 版本级商品状态由 versionStatuses 聚合，普通商品回退到保存的 status
        status: deriveStatus(versionStatuses) || saved?.status || null,
        version: saved?.version || null,
        versionStatuses,
        priceRecords: records,
        quantity,
        totalPrice,
        wishQuantity: saved?.wishQuantity || 1,
        wishPriceMin: saved?.wishPriceMin || 0,
        wishPriceMax: saved?.wishPriceMax || 0,
      };
    });
  });
  useEffect(() => {
    const statusMap = {};
    items.forEach(item => {
      if (item.status) {
        statusMap[item.id] = {
          status: item.status,
          version: item.version || null,
          versionStatuses: item.versionStatuses || {},
          priceRecords: item.priceRecords || [],
          wishQuantity: item.wishQuantity || 1,
          wishPriceMin: item.wishPriceMin || 0,
          wishPriceMax: item.wishPriceMax || 0,
        };
      }
    });
    saveToStorage(statusMap);
  }, [items]);

  const toggleStatus = (id) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id !== id) return item;
        const nextStatus = getNextStatus(item.status);
        return {
          ...item,
          status: nextStatus,
          priceRecords: nextStatus === 'owned' ? [{ id: generateRecordId(), price: 0, quantity: 1 }] : [],
          quantity: nextStatus === 'owned' ? 1 : 0,
          totalPrice: 0,
        };
      })
    );
  };

  const setStatus = (id, status, version) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id !== id) return item;
        // 版本级商品：状态作用于指定版本，整件状态由各版本聚合
        if (version !== undefined && version !== null) {
          const nextVersionStatuses = { ...(item.versionStatuses || {}) };
          if (status) nextVersionStatuses[version] = status;
          else delete nextVersionStatuses[version];
          const hasOwned = Object.values(nextVersionStatuses).includes('owned');
          // 任一版本仍为已拥有时保留购入记录，否则清空
          const records = hasOwned
            ? (item.priceRecords.length > 0 ? item.priceRecords : [{ id: generateRecordId(), price: 0, quantity: 1 }])
            : [];
          const { quantity, totalPrice } = computeFromRecords(records);
          return {
            ...item,
            status: deriveStatus(nextVersionStatuses),
            version,
            versionStatuses: nextVersionStatuses,
            priceRecords: records,
            quantity,
            totalPrice,
          };
        }
        const records = status === 'owned'
          ? (item.priceRecords.length > 0 ? item.priceRecords : [{ id: generateRecordId(), price: 0, quantity: 1 }])
          : [];
        const { quantity, totalPrice } = computeFromRecords(records);
        return {
          ...item,
          status,
          version: version !== undefined ? version : item.version,
          priceRecords: records,
          quantity,
          totalPrice,
        };
      })
    );
  };

  const addPriceRecord = (id) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id !== id) return item;
        const records = [...item.priceRecords, { id: generateRecordId(), price: 0, quantity: 1 }];
        const { quantity, totalPrice } = computeFromRecords(records);
        return { ...item, priceRecords: records, quantity, totalPrice };
      })
    );
  };

  const removePriceRecord = (id, recordId) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id !== id) return item;
        const records = item.priceRecords.filter(r => r.id !== recordId);
        const { quantity, totalPrice } = computeFromRecords(records);
        // 版本级商品：收藏状态由各版本聚合决定，删除记录不改变版本标记
        const newStatus = item.versionStatuses && Object.keys(item.versionStatuses).length > 0
          ? deriveStatus(item.versionStatuses)
          : (quantity > 0 ? 'owned' : (item.status === 'wish' ? 'wish' : null));
        return { ...item, priceRecords: records, quantity, totalPrice, status: newStatus };
      })
    );
  };

  const updatePriceRecord = (id, recordId, field, value) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id !== id) return item;
        const records = item.priceRecords.map(r => {
          if (r.id !== recordId) return r;
          if (field === 'price') return { ...r, price: Math.max(0, parseFloat(value) || 0) };
          if (field === 'quantity') return { ...r, quantity: Math.max(0, Math.floor(value || 0)) };
          return r;
        });
        const { quantity, totalPrice } = computeFromRecords(records);
        return { ...item, priceRecords: records, quantity, totalPrice };
      })
    );
  };

  const setQuantity = (id, quantity) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id !== id) return item;
        const qty = Math.max(0, Math.floor(quantity || 0));
        return {
          ...item,
          quantity: qty,
          status: qty > 0 ? 'owned' : (item.status === 'wish' ? 'wish' : null),
        };
      })
    );
  };

  const increaseQuantity = (id) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id !== id) return item;
        const qty = (item.quantity || 0) + 1;
        return {
          ...item,
          quantity: qty,
          status: 'owned',
        };
      })
    );
  };

  const decreaseQuantity = (id) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id !== id) return item;
        const qty = Math.max(0, (item.quantity || 0) - 1);
        return {
          ...item,
          quantity: qty,
          status: qty > 0 ? 'owned' : (item.status === 'wish' ? 'wish' : null),
        };
      })
    );
  };

  const setWishQuantity = (id, quantity) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id !== id) return item;
        const qty = Math.max(1, Math.floor(quantity || 1));
        return { ...item, wishQuantity: qty };
      })
    );
  };

  const increaseWishQuantity = (id) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id !== id) return item;
        return { ...item, wishQuantity: (item.wishQuantity || 1) + 1 };
      })
    );
  };

  const decreaseWishQuantity = (id) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id !== id) return item;
        const qty = Math.max(1, (item.wishQuantity || 1) - 1);
        return { ...item, wishQuantity: qty };
      })
    );
  };

  const setWishPriceMin = (id, price) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id !== id) return item;
        const p = Math.max(0, parseFloat(price) || 0);
        return { ...item, wishPriceMin: p };
      })
    );
  };

  const setWishPriceMax = (id, price) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id !== id) return item;
        const p = Math.max(0, parseFloat(price) || 0);
        return { ...item, wishPriceMax: p };
      })
    );
  };

  const ownedCount = items.filter(item => item.status === 'owned').length;
  const ownedItems = items.filter(item => item.status === 'owned');
  const ownedTotalQuantity = items.reduce((sum, item) => sum + (item.status === 'owned' ? (item.quantity || 0) : 0), 0);
  const ownedTotalPrice = items.reduce((sum, item) => sum + (item.status === 'owned' ? (item.totalPrice || 0) : 0), 0);
  const wishCount = items.filter(item => item.status === 'wish').length;
  const wishItems = items.filter(item => item.status === 'wish');
  const wishTotalQuantity = items.reduce((sum, item) => sum + (item.status === 'wish' ? (item.wishQuantity || 0) : 0), 0);
  const wishTotalPriceMin = items.reduce((sum, item) => sum + (item.status === 'wish' ? (item.wishPriceMin || 0) * (item.wishQuantity || 0) : 0), 0);
  const wishTotalPriceMax = items.reduce((sum, item) => sum + (item.status === 'wish' ? (item.wishPriceMax || 0) * (item.wishQuantity || 0) : 0), 0);

  return {
    items,
    toggleStatus,
    setStatus,
    setQuantity,
    increaseQuantity,
    decreaseQuantity,
    addPriceRecord,
    removePriceRecord,
    updatePriceRecord,
    setWishQuantity,
    increaseWishQuantity,
    decreaseWishQuantity,
    setWishPriceMin,
    setWishPriceMax,
    ownedCount,
    ownedItems,
    ownedTotalQuantity,
    ownedTotalPrice,
    wishCount,
    wishItems,
    wishTotalQuantity,
    wishTotalPriceMin,
    wishTotalPriceMax,
    totalCount: items.length,
  };
};
