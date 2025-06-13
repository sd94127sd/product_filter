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

### 性能優化
- 使用 `useMemo` 緩存計算結果
- 搜索防抖 (300ms) 減少不必要的計算  
- 分頁顯示避免DOM過多
- 響應式圖片和懶加載
---
