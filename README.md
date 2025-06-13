## 🛠 技術架構

- **前端框架**: Next.js 15 + React 19
- **開發語言**: TypeScript
- **樣式方案**: Tailwind CSS
- **數據處理**: 自定義Hook + useMemo優化
- **響應式**: CSS Grid + Flexbox

## 📁 項目結構

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 主頁面
│   ├── layout.tsx         # 佈局組件
│   └── globals.css        # 全域樣式
├── components/            # React組件
│   ├── ProductFilter.tsx  # 篩選器組件
│   ├── ProductList.tsx    # 商品列表組件
│   ├── StatsDashboard.tsx # 統計儀表板
│   ├── LoadingSpinner.tsx # 載入動畫
│   └── index.ts          # 組件導出
├── hook/                  # 自定義Hook
│   └── useProductsFilter.ts # 篩選邏輯Hook
├── lib/                   # 工具函數
│   ├── type.ts           # TypeScript類型定義
│   └── data-utils.ts     # 數據處理工具
└── data/                  # 數據文件
    └── items.json        # 10,000筆商品數據
```

## 🎯 使用方法

### 安裝依賴
```bash
npm install
```

### 啟動開發服務器
```bash
npm run dev
```

### 構建生產版本
```bash
npm run build
npm start
```

## 🔍 功能演示

### 1. 搜索功能
- 輸入 "2" 會顯示 Item 2, Item 12, Item 20... (數字智能排序)
- 支援模糊匹配和防抖優化

### 2. 篩選功能
- **類別篩選**: 點擊類別標籤進行多選
- **價格範圍**: 輸入最低價和最高價
- **庫存篩選**: 切換顯示有庫存商品

### 3. 排序功能
- 名稱 A-Z / Z-A (智能數字排序)
- 價格 低-高 / 高-低

### 4. 響應式設計
- **桌面端**: 表格視圖，完整資訊展示
- **手機端**: 卡片視圖，每行最多2個商品

## 🎨 設計亮點

### 智能搜索排序
搜索結果按以下優先級排序：
1. 完全匹配優先
2. 開頭匹配優先
3. 數字智能排序 (Item 2 在 Item 10 之前)

### 性能優化
- 使用 `useMemo` 緩存計算結果
- 搜索防抖 (300ms) 減少不必要的計算  
- 分頁顯示避免DOM過多
- 響應式圖片和懶加載

## 🔧 技術細節


### 防抖Hook實現
```typescript
const useDebounce = <T,>(value: T, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    
    return debouncedValue;
};
```

## 📊 數據說明

- **總數據量**: 10,000 筆商品
- **類別**: A, B, C, D, E (5個類別)
- **價格範圍**: $1 - $1000
- **庫存比例**: 約50%有庫存

## 🌟 特色功能

1. **智能搜索**: 不只是簡單的字符串匹配，還包含智能排序
2. **高性能**: 處理10,000筆資料仍保持流暢體驗
3. **響應式**: 完美適配桌面和手機設備
4. **用戶友好**: 直觀的UI設計和操作體驗
5. **可擴展**: 模組化設計，易於添加新功能

## 🔗 GitHub連結

[查看完整源代碼和演示](https://github.com/your-username/product-filter)

## 📱 設備支援

- 桌面端: Chrome, Firefox, Safari, Edge
- 手機端: iOS Safari, Android Chrome
- 平板端: 自適應佈局

## 🚀 性能表現

- 首次載入: < 2秒
- 篩選響應: < 100ms
- 搜索防抖: 300ms
- 分頁切換: 即時響應

---
