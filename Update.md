# FeiFei Tools 更新指南

本文件說明如何新增或更新工具頁面，確保風格一致性與自動化流程正常運作。

---

## 目錄

- [新增工具頁面](#新增工具頁面)
- [AI 生成 Prompt](#ai-生成-prompt)
- [更新自動化設定](#更新自動化設定)
- [設計規範](#設計規範)
- [檢查清單](#檢查清單)

---

## 新增工具頁面

### 步驟一：建立 HTML 檔案

1. 複製現有工具頁面作為模板（建議使用 `text-stats.html`）
2. 修改以下內容：
   - `<title>` - 工具名稱 | FeiFei Tools
   - `<meta name="description">` - 工具描述（50 字內為佳）
   - `<meta name="keywords">` - 相關關鍵字
   - `<link rel="canonical">` - 標準網址
   - Open Graph 和 Twitter Card 標籤
   - JSON-LD 結構化資料
   - `<h1>` 標題和圖示
   - 主要功能區塊

### 步驟二：更新自動化設定

編輯 `.github/scripts/update_toc.py`，新增以下設定：

```python
# 1. 在 TOOL_CATEGORIES 新增分類
TOOL_CATEGORIES = {
    # ...
    'your-tool.html': 'text',  # 可選: text, image, dev
}

# 2. 在 TOOL_ICONS 新增圖示
TOOL_ICONS = {
    # ...
    'your-tool.html': '🔧',  # 選擇適合的 emoji
}

# 3. 在 TOOL_KEYWORDS 新增搜尋關鍵字
TOOL_KEYWORDS = {
    # ...
    'your-tool.html': '關鍵字1 關鍵字2 keyword1 keyword2',
}
```

### 步驟三：推送更新

```bash
git add .
git commit -m "新增: XXX 工具"
git push
```

GitHub Actions 會自動：
1. 執行 `update_toc.py` 更新首頁目錄
2. 部署到 GitHub Pages

---

## AI 生成 Prompt

使用以下 Prompt 請 AI 協助生成新工具頁面：

### 基礎 Prompt

```
請幫我建立一個 FeiFei Tools 的工具頁面，工具名稱是「XXX」，功能是 YYY。

請使用以下技術規範：
- Tailwind CSS（CDN 版本）
- Dark Mode 支援（class 策略）
- Mobile-first RWD 設計
- 繁體中文介面

頁面結構需包含：
1. SEO meta 標籤（title, description, keywords, canonical）
2. Open Graph 和 Twitter Card 標籤
3. Google Analytics（ID: G-B20B804DQS）
4. 防止主題閃爍的 script
5. JSON-LD 結構化資料
6. Desktop Header（md 以上顯示，sticky）
7. Mobile Bottom Nav（md 以下顯示，fixed bottom）
8. 主要功能區塊
9. Toast 通知元件
10. 主題切換功能

請參考以下模板結構：
- 字體：Noto Sans TC
- 主色：blue-600
- 圓角：rounded-xl
- 觸控區域：min-height 44px

網站網域：https://tool.feifei.tw
```

### 完整模板 Prompt

```
請建立一個 FeiFei Tools 工具頁面。

## 工具資訊
- 名稱：[工具名稱]
- 功能：[功能描述]
- 分類：[文字工具 / 圖片工具 / 開發工具]
- 圖示：[emoji]

## 技術需求
- Tailwind CSS CDN
- Dark Mode（class 策略，localStorage 持久化）
- Mobile-first RWD
- 無障礙設計（skip link, aria labels）

## 頁面結構

### Head 區塊
- charset UTF-8, viewport
- SEO: title, description, keywords, canonical
- Open Graph: type, url, title, description, image
- Twitter Card: card, title, description
- GA4: G-B20B804DQS
- 主題閃爍防止 script
- Tailwind CSS + config（darkMode: 'class'）
- Google Fonts: Noto Sans TC
- 工具專用函式庫（如有需要）
- JSON-LD WebApplication 結構化資料

### Body 區塊
1. Skip Link（跳至主要內容）
2. Desktop Header
   - Logo + 網站名稱
   - 麵包屑導覽
   - 主題切換按鈕
3. Main Content
   - 標題區（圖示 + h1 + 描述）
   - 功能區塊
   - 使用說明（選填）
4. Mobile Bottom Nav（5 欄 grid）
   - 首頁 / 文字 / 圖片 / 開發 / 主題
5. Toast 通知元件

### JavaScript
- toggleTheme() 函數
- showToast() 函數
- 工具主要功能

## 樣式規範
- 背景：bg-gray-50 dark:bg-gray-900
- 文字：text-gray-900 dark:text-gray-100
- 卡片：bg-white dark:bg-gray-800
- 輸入框：border-gray-300 dark:border-gray-600
- 主按鈕：bg-blue-600 hover:bg-blue-700
- 次按鈕：bg-gray-200 dark:bg-gray-700
- 圓角：rounded-xl
- 間距：space-y-6, gap-4
- 觸控：min-h-[44px] min-w-[44px]

## 參考連結
網站：https://tool.feifei.tw
```

---

## 更新自動化設定

### 檔案位置

```
.github/
├── scripts/
│   └── update_toc.py      # 目錄更新腳本
└── workflows/
    ├── update-toc.yml     # 目錄更新 workflow
    └── static.yml         # 部署 workflow
```

### 分類對照表

| 分類 | 代碼 | 說明 |
|------|------|------|
| 文字工具 | `text` | 文字處理相關 |
| 圖片工具 | `image` | 圖片處理相關 |
| 開發工具 | `dev` | 開發者相關 |

### 標記說明

index.html 中的標記位置：

```html
<!-- 文字工具區 -->
<!--TEXT_TOOLS_START-->
... 自動生成的卡片 ...
<!--TEXT_TOOLS_END-->

<!-- 圖片工具區 -->
<!--IMAGE_TOOLS_START-->
... 自動生成的卡片 ...
<!--IMAGE_TOOLS_END-->

<!-- 開發工具區 -->
<!--DEV_TOOLS_START-->
... 自動生成的卡片 ...
<!--DEV_TOOLS_END-->
```

> ⚠️ 請勿手動編輯標記之間的內容，會被自動覆蓋。

---

## 設計規範

### 色彩系統

| 用途 | Light Mode | Dark Mode |
|------|------------|-----------|
| 背景 | gray-50 | gray-900 |
| 卡片 | white | gray-800 |
| 文字 | gray-900 | gray-100 |
| 次要文字 | gray-600 | gray-400 |
| 主色 | blue-600 | blue-400 |
| 成功 | green-600 | green-400 |
| 警告 | amber-500 | amber-400 |
| 錯誤 | red-600 | red-400 |

### 斷點設計

| 斷點 | 尺寸 | 用途 |
|------|------|------|
| 預設 | < 640px | 手機 |
| sm | >= 640px | 大手機 |
| md | >= 768px | 平板 |
| lg | >= 1024px | 桌機 |
| xl | >= 1280px | 大桌機 |

### 元件規範

#### 按鈕
```html
<!-- 主要按鈕 -->
<button class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors touch-target">
    按鈕文字
</button>

<!-- 次要按鈕 -->
<button class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-xl transition-colors touch-target">
    按鈕文字
</button>
```

#### 輸入框
```html
<textarea class="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[150px] touch-target"></textarea>
```

#### 提示區塊
```html
<div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-sm text-blue-800 dark:text-blue-200">
    <p class="font-medium mb-1">標題</p>
    <p>內容說明</p>
</div>
```

---

## 檢查清單

### 新增工具前

- [ ] 確認工具名稱和功能描述
- [ ] 選擇適當的分類（text/image/dev）
- [ ] 選擇適當的圖示 emoji
- [ ] 準備搜尋關鍵字（中英文）

### 開發完成後

- [ ] SEO 標籤完整（title, description, keywords）
- [ ] Open Graph 標籤完整
- [ ] Twitter Card 標籤完整
- [ ] JSON-LD 結構化資料正確
- [ ] GA 代碼正確（G-B20B804DQS）
- [ ] Dark Mode 正常運作
- [ ] 手機版導覽正常
- [ ] 桌機版導覽正常
- [ ] Toast 通知正常
- [ ] 主要功能正常運作
- [ ] 無 JavaScript 錯誤
- [ ] 無障礙設計（skip link 等）

### 自動化設定

- [ ] `TOOL_CATEGORIES` 已新增
- [ ] `TOOL_ICONS` 已新增
- [ ] `TOOL_KEYWORDS` 已新增

### 推送前

- [ ] 本地測試通過
- [ ] 檔案名稱正確（小寫、連字號）
- [ ] commit message 清楚

---

## 常見問題

### Q: 新工具沒有出現在首頁？

檢查：
1. 是否在 `TOOL_CATEGORIES` 中設定分類
2. GitHub Actions 是否成功執行
3. index.html 中是否有對應的標記

### Q: 描述被截斷？

這是正常行為，腳本會自動將超過 50 字的描述截斷並加上 `...`。

### Q: 如何手動觸發更新？

在 GitHub Actions 頁面，選擇 "自動更新工具目錄" workflow，點擊 "Run workflow"。

### Q: 如何修改工具排序？

工具按照檔案名稱字母順序排列。如需調整，可修改 `update_toc.py` 中的排序邏輯。

---

## 聯絡資訊

- 網站：https://tool.feifei.tw
- GitHub：https://github.com/[your-repo]
