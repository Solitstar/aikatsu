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
        normalized[id] = { status: val, quantity: 1, price: 0, wishQuantity: 1, wishPrice: 0 };
      } else {
        normalized[id] = {
          status: val.status,
          quantity: val.quantity || 1,
          price: val.price || 0,
          wishQuantity: val.wishQuantity || 1,
          wishPrice: val.wishPrice || 0,
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

export const useCollection = () => {
  const [items, setItems] = useState(() => {
    const dataMap = loadFromStorage();
    return getItemsWithMeta().map(item => ({
      ...item,
      status: dataMap[item.id]?.status || null,
      quantity: dataMap[item.id]?.status === 'owned' ? (dataMap[item.id]?.quantity || 1) : 0,
      price: dataMap[item.id]?.price || 0,
      wishQuantity: dataMap[item.id]?.wishQuantity || 1,
      wishPrice: dataMap[item.id]?.wishPrice || 0,
    }));
  });

  useEffect(() => {
    const statusMap = {};
    items.forEach(item => {
      if (item.status) {
        statusMap[item.id] = {
          status: item.status,
          quantity: item.status === 'owned' ? (item.quantity || 1) : 0,
          price: item.price || 0,
          wishQuantity: item.wishQuantity || 1,
          wishPrice: item.wishPrice || 0,
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
          quantity: nextStatus === 'owned' ? 1 : 0,
        };
      })
    );
  };

  const setStatus = (id, status) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id !== id) return item;
        return {
          ...item,
          status,
          quantity: status === 'owned' ? (item.quantity > 0 ? item.quantity : 1) : 0,
        };
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

  const setPrice = (id, price) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id !== id) return item;
        const p = Math.max(0, parseFloat(price) || 0);
        return { ...item, price: p };
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

  const setWishPrice = (id, price) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id !== id) return item;
        const p = Math.max(0, parseFloat(price) || 0);
        return { ...item, wishPrice: p };
      })
    );
  };

  const ownedCount = items.filter(item => item.status === 'owned').length;
  const ownedTotalQuantity = items.reduce((sum, item) => sum + (item.status === 'owned' ? (item.quantity || 0) : 0), 0);
  const ownedTotalPrice = items.reduce((sum, item) => sum + (item.status === 'owned' ? (item.price || 0) * (item.quantity || 0) : 0), 0);
  const wishCount = items.filter(item => item.status === 'wish').length;
  const wishItems = items.filter(item => item.status === 'wish');
  const wishTotalQuantity = items.reduce((sum, item) => sum + (item.status === 'wish' ? (item.wishQuantity || 0) : 0), 0);
  const wishTotalPrice = items.reduce((sum, item) => sum + (item.status === 'wish' ? (item.wishPrice || 0) * (item.wishQuantity || 0) : 0), 0);

  return {
    items,
    toggleStatus,
    setStatus,
    setQuantity,
    increaseQuantity,
    decreaseQuantity,
    setPrice,
    setWishQuantity,
    increaseWishQuantity,
    decreaseWishQuantity,
    setWishPrice,
    ownedCount,
    ownedTotalQuantity,
    ownedTotalPrice,
    wishCount,
    wishItems,
    wishTotalQuantity,
    wishTotalPrice,
    totalCount: items.length,
  };
};
