import { useState, useMemo, useEffect } from 'react';
import { renderShareImageToCanvas } from './utils/exportImage';
import { useCollection } from './hooks/useCollection';
import { useVersionCheck } from './hooks/useVersionCheck';
import { useFolders } from './hooks/useFolders';
import { getCharactersBySeriesAndGender } from './data/characters';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import FilterBar from './components/FilterBar';
import CardGrid from './components/CardGrid';
import ItemModal from './components/ItemModal';
import SearchBar from './components/SearchBar';
import CollectionProgress from './components/CollectionProgress';
import FolderBar from './components/FolderBar';

function App() {
  const { items, toggleStatus, setStatus, addPriceRecord, removePriceRecord, updatePriceRecord, increaseWishQuantity, decreaseWishQuantity, setWishPriceMin, setWishPriceMax, ownedCount, ownedItems, ownedTotalQuantity, ownedTotalPrice, wishCount, wishItems, wishTotalQuantity, wishTotalPriceMin, wishTotalPriceMax, totalCount } = useCollection();
  const [activeTab, setActiveTab] = useState('collection');
  const [selectedItem, setSelectedItem] = useState(null);
  const [exportingImage, setExportingImage] = useState(false);
  const { hasUpdate, dismiss: dismissUpdate } = useVersionCheck();
  const { folders, createFolder, renameFolder, deleteFolder, addItemToFolder, removeItemFromFolder, getItemFolderId } = useFolders();
  const [activeFolder, setActiveFolder] = useState(null); // null=全部, '__uncategorized__'=未分类, folderId=指定文件夹

  const getInitialFilter = (param, defaultValue) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(param) || defaultValue;
  };

  const [filterSeries, setFilterSeries] = useState(() => getInitialFilter('series', '全部'));
  const [filterChar, setFilterChar] = useState(() => getInitialFilter('character', '全部'));
  const [filterType, setFilterType] = useState(() => getInitialFilter('type', '全部'));
  const [filterStatus, setFilterStatus] = useState(() => getInitialFilter('status', '全部'));
  const [searchKeyword, setSearchKeyword] = useState(() => getInitialFilter('search', ''));

  useEffect(() => {
    const availableChars = getCharactersBySeriesAndGender(filterSeries, '全部');
    if (filterChar !== '全部' && !availableChars.includes(filterChar)) {
      setFilterChar('全部');
    }
  }, [filterSeries, filterChar]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchSeries = filterSeries === '全部' || item.series.includes(filterSeries);
      const matchChar = filterChar === '全部' || item.character.includes(filterChar);
      const matchType = filterType === '全部' || item.type === filterType;
      const matchStatus = filterStatus === '全部' || item.status === filterStatus;
      const matchSearch = !searchKeyword ||
        item.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.character.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.type.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        (item.subtitle || '').toLowerCase().includes(searchKeyword.toLowerCase()) ||
        (item.characterRomaji || '').toLowerCase().includes(searchKeyword.toLowerCase()) ||
        (item.characterAlias || '').toLowerCase().includes(searchKeyword.toLowerCase()) ||
        (item.characterPinyin || '').toLowerCase().includes(searchKeyword.toLowerCase());

      // 文件夹过滤
      const folderType = activeTab === 'owned' ? 'owned' : activeTab === 'wishlist' ? 'wish' : null;
      let matchFolder = true;
      if (folderType && activeFolder !== null) {
        const fid = getItemFolderId(folderType, item.id);
        if (activeFolder === '__uncategorized__') {
          matchFolder = !fid;
        } else {
          matchFolder = fid === activeFolder;
        }
      }

      return matchSeries && matchChar && matchType && matchStatus && matchSearch && matchFolder;
    });
  }, [items, filterSeries, filterChar, filterType, filterStatus, searchKeyword, activeTab, activeFolder, getItemFolderId]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filterSeries !== '全部') params.set('series', filterSeries);
    if (filterChar !== '全部') params.set('character', filterChar);
    if (filterType !== '全部') params.set('type', filterType);
    if (searchKeyword) params.set('search', searchKeyword);
    const query = params.toString();
    const newUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }, [filterSeries, filterChar, filterType, searchKeyword]);

  const handleReset = () => {
    setFilterSeries('全部');
    setFilterChar('全部');
    setFilterType('全部');
    setSearchKeyword('');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setActiveFolder(null);
    if (tab === 'collection') {
      setFilterStatus('全部');
    } else if (tab === 'owned') {
      setFilterSeries('全部');
      setFilterChar('全部');
      setFilterType('全部');
      setSearchKeyword('');
      setFilterStatus('owned');
    } else if (tab === 'wishlist') {
      setFilterSeries('全部');
      setFilterChar('全部');
      setFilterType('全部');
      setSearchKeyword('');
      setFilterStatus('wish');
    }
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  // 文件夹操作
  const currentFolderType = activeTab === 'owned' ? 'owned' : activeTab === 'wishlist' ? 'wish' : null;

  const handleSelectFolder = (folderId) => {
    setActiveFolder(folderId);
  };

  const handleCreateFolder = (name) => {
    if (currentFolderType) createFolder(currentFolderType, name);
  };

  const handleRenameFolder = (folderId, newName) => {
    if (currentFolderType) renameFolder(currentFolderType, folderId, newName);
  };

  const handleDeleteFolder = (folderId) => {
    if (currentFolderType) deleteFolder(currentFolderType, folderId);
  };

  const handleMoveToFolder = (itemId, folderId) => {
    if (!currentFolderType) return;
    if (folderId === null) {
      // 从未分类中移除所有文件夹归属
      const currentFid = getItemFolderId(currentFolderType, itemId);
      if (currentFid) removeItemFromFolder(currentFolderType, currentFid, itemId);
    } else {
      addItemToFolder(currentFolderType, folderId, itemId);
    }
  };

  const handleCreateFolderForModal = (name) => {
    if (!currentFolderType) return null;
    const folder = createFolder(currentFolderType, name);
    return folder ? folder.id : null;
  };

  const handleModalToggle = (id, targetStatus) => {
    const currentItem = items.find(i => i.id === id);
    if (!currentItem) return;
    if (currentItem.status === targetStatus) {
      setStatus(id, null);
    } else {
      setStatus(id, targetStatus);
    }
  };

  const exportWishlistCSV = () => {
    if (wishItems.length === 0) {
      alert('心愿单是空的，没有可导出的内容~');
      return;
    }
    const headers = ['商品名称', '角色', '系列', '种类', '最低心理价(元)', '最高心理价(元)', '数量'];
    const rows = wishItems.map(item => [
      item.name,
      item.character,
      item.series,
      item.type,
      (item.wishPriceMin || 0).toFixed(2),
      (item.wishPriceMax || 0).toFixed(2),
      item.wishQuantity || 1,
    ]);
    const totalRow = ['心理总价范围', '', '', '', `¥${wishTotalPriceMin.toFixed(2)}`, `¥${wishTotalPriceMax.toFixed(2)}`, wishTotalQuantity];
    const csvContent = '\uFEFF' + [headers, ...rows, totalRow]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const date = new Date().toISOString().slice(0, 10);
    link.download = `心愿单_${date}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportWishlistImage = async () => {
    if (wishItems.length === 0) { alert('心愿单是空的，没有可导出的内容~'); return; }
    setExportingImage(true);
    try {
      const canvas = await renderShareImageToCanvas({
        items: wishItems,
        type: 'wish',
        totalQuantity: wishTotalQuantity,
        totalPriceMin: wishTotalPriceMin,
        totalPriceMax: wishTotalPriceMax,
      });
      const link = document.createElement('a');
      link.download = `心愿单_${new Date().toISOString().slice(0, 10)}.png`;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link); link.click(); document.body.removeChild(link);
    } catch (err) {
      console.error('导出图片失败:', err);
      alert('导出图片失败，请稍后再试~');
    } finally {
      setExportingImage(false);
    }
  };

  const exportOwnedCSV = () => {
    if (ownedItems.length === 0) {
      alert('收藏是空的，没有可导出的内容~');
      return;
    }
    const headers = ['商品名称', '角色', '系列', '种类', '购入单价(元)', '数量', '购入总价(元)'];
    const rows = ownedItems.map(item => [
      item.name,
      item.character,
      item.series,
      item.type,
      item.quantity > 0 ? ((item.totalPrice || 0) / item.quantity).toFixed(2) : '0.00',
      item.quantity || 0,
      (item.totalPrice || 0).toFixed(2),
    ]);
    const totalRow = ['合计', '', '', '', '', ownedTotalQuantity, ownedTotalPrice.toFixed(2)];
    const csvContent = '\uFEFF' + [headers, ...rows, totalRow]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const date = new Date().toISOString().slice(0, 10);
    link.download = `我的收藏_${date}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportOwnedImage = async () => {
    if (ownedItems.length === 0) { alert('收藏是空的，没有可导出的内容~'); return; }
    setExportingImage(true);
    try {
      const canvas = await renderShareImageToCanvas({
        items: ownedItems,
        type: 'owned',
        totalQuantity: ownedTotalQuantity,
        totalPrice: ownedTotalPrice,
      });
      const link = document.createElement('a');
      link.download = `我的收藏_${new Date().toISOString().slice(0, 10)}.png`;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link); link.click(); document.body.removeChild(link);
    } catch (err) {
      console.error('导出图片失败:', err);
      alert('导出图片失败，请稍后再试~');
    } finally {
      setExportingImage(false);
    }
  };

  const modalItem = selectedItem
    ? items.find(i => i.id === selectedItem.id) || selectedItem
    : null;

  return (
    <div className="min-h-screen bg-bg-primary">
      {hasUpdate && (
        <div className="sticky top-0 z-[100] bg-accent text-white px-4 py-2.5 flex items-center justify-center gap-3 shadow-md">
          <span className="text-sm font-medium">网站已更新，建议刷新页面</span>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-1 rounded-full bg-white text-accent text-sm font-bold hover:bg-white/90 transition-colors"
          >
            立即刷新
          </button>
          <button
            onClick={dismissUpdate}
            className="text-white/70 hover:text-white text-sm transition-colors"
          >
            ✕
          </button>
        </div>
      )}
      <Header activeTab={activeTab} onTabChange={handleTabChange} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="text-center mb-8">
          <h2 className="font-quick text-3xl sm:text-4xl font-bold text-text-primary mb-2">
            {activeTab === 'wishlist' ? 'WISHLIST' : activeTab === 'owned' ? 'MY COLLECTION' : 'GOODS COLLECTION'}
          </h2>
          <p className="text-text-secondary text-sm sm:text-base">
            {activeTab === 'wishlist' ? '你想要的周边都在这里' : activeTab === 'owned' ? '你已拥有的周边收藏' : '记录你的偶像活动周边收藏'}
          </p>
        </div>

        <StatsBar
          displayCount={filteredItems.length}
          ownedCount={ownedCount}
          ownedTotalQuantity={ownedTotalQuantity}
          wishCount={wishCount}
          wishTotalQuantity={wishTotalQuantity}
          totalCount={totalCount}
          activeTab={activeTab}
        />

        {(activeTab === 'owned' || activeTab === 'wishlist') && (
          <CollectionProgress items={items} ownedItems={ownedItems} />
        )}

        {activeTab === 'collection' && (
          <>
            <div className="mb-6">
              <SearchBar
                value={searchKeyword}
                onChange={setSearchKeyword}
                onClear={() => setSearchKeyword('')}
              />
            </div>

            <FilterBar
              filterSeries={filterSeries}
              filterChar={filterChar}
              filterType={filterType}
              onSeriesChange={setFilterSeries}
              onCharChange={setFilterChar}
              onTypeChange={setFilterType}
              onReset={handleReset}
            />
          </>
        )}

        {activeTab === 'wishlist' && (
          <>
            <div className="mb-4">
              <FolderBar
                folders={folders.wish}
                activeFolder={activeFolder}
                onSelectFolder={handleSelectFolder}
                onCreateFolder={handleCreateFolder}
                onRenameFolder={handleRenameFolder}
                onDeleteFolder={handleDeleteFolder}
              />
            </div>
            <div className="flex justify-end gap-3 mb-6">
            <button
              onClick={exportWishlistCSV}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-100 text-rose-600 font-medium text-sm
                         hover:bg-rose-200 transition-all duration-300 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              导出表格
            </button>
            <button
              onClick={exportWishlistImage}
              disabled={exportingImage}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-400 to-pink-400 text-white font-medium text-sm
                         hover:from-rose-500 hover:to-pink-500 transition-all duration-300 shadow-md disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {exportingImage ? '生成中...' : '导出图片'}
            </button>
          </div>
          </>
        )}

        {activeTab === 'owned' && (
          <>
            <div className="mb-4">
              <FolderBar
                folders={folders.owned}
                activeFolder={activeFolder}
                onSelectFolder={handleSelectFolder}
                onCreateFolder={handleCreateFolder}
                onRenameFolder={handleRenameFolder}
                onDeleteFolder={handleDeleteFolder}
              />
            </div>
            <div className="flex justify-end gap-3 mb-6">
            <button
              onClick={exportOwnedCSV}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-yellow-100 text-yellow-700 font-medium text-sm
                         hover:bg-yellow-200 transition-all duration-300 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              导出表格
            </button>
            <button
              onClick={exportOwnedImage}
              disabled={exportingImage}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-400 text-white font-medium text-sm
                         hover:from-yellow-500 hover:to-amber-500 transition-all duration-300 shadow-md disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {exportingImage ? '生成中...' : '导出图片'}
            </button>
          </div>
          </>
        )}

        <CardGrid items={filteredItems} onCardClick={handleCardClick} />

        <footer className="mt-16 pb-8 text-center">
          <p className="text-text-secondary text-xs sm:text-sm">
            Made by Solitstar
          </p>
          <p className="text-text-secondary/60 text-xs mt-1">
            点击卡片查看详情，在详情页切换收藏状态
          </p>
        </footer>
      </main>

      <ItemModal
        item={modalItem}
        onClose={() => setSelectedItem(null)}
        onToggleStatus={handleModalToggle}
        onAddPriceRecord={addPriceRecord}
        onRemovePriceRecord={removePriceRecord}
        onUpdatePriceRecord={updatePriceRecord}
        onIncreaseWishQty={increaseWishQuantity}
        onDecreaseWishQty={decreaseWishQuantity}
        onSetWishPriceMin={setWishPriceMin}
        onSetWishPriceMax={setWishPriceMax}
        folders={currentFolderType ? folders[currentFolderType] : []}
        itemFolderId={modalItem && currentFolderType ? getItemFolderId(currentFolderType, modalItem.id) : null}
        onMoveToFolder={(folderId) => modalItem && handleMoveToFolder(modalItem.id, folderId)}
        onCreateFolder={handleCreateFolderForModal}
      />
    </div>
  );
}

export default App;
