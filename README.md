# FeiFei Tools

前端實用工具集 - 17+ 個免費線上工具，無需安裝，即開即用。

[![Deploy to GitHub Pages](https://github.com/fei3363/feifei-tool/actions/workflows/static.yml/badge.svg)](https://github.com/fei3363/feifei-tool/actions/workflows/static.yml)

**網站連結**: [https://tool.feifei.tw](https://tool.feifei.tw)

---

## 特色功能

- **Mobile-First RWD** - 手機優先的響應式設計
- **Dark Mode** - 深色模式支援，自動偵測系統偏好
- **即開即用** - 純前端實作，無需後端服務
- **離線可用** - 所有運算在本地完成，隱私安全
- **無障礙設計** - Skip Link、ARIA Labels、鍵盤導覽

---

## 工具列表

### 文字處理工具

| 工具 | 說明 |
|------|------|
| [字數統計](https://tool.feifei.tw/text-stats.html) | 統計中英文字數、詞數、行數 |
| [繁簡轉換](https://tool.feifei.tw/chinese-conversion.html) | 繁體/簡體中文互轉 |
| [繁簡轉換 Pro](https://tool.feifei.tw/conversion.html) | 保留原始格式的繁簡轉換 |
| [盤古之白](https://tool.feifei.tw/pangu.html) | 中英文間自動加空白 |
| [文字差異比對](https://tool.feifei.tw/text-diff-tool.html) | 比較兩段文字的差異 |
| [文字取代](https://tool.feifei.tw/highlight_replace.html) | 批量識別和取代文字 |
| [信箱提取](https://tool.feifei.tw/email.html) | 從文字中提取信箱與暱稱 |

### 圖片處理工具

| 工具 | 說明 |
|------|------|
| [PDF 轉 PNG](https://tool.feifei.tw/pdf-to-png.html) | 將 PDF 轉換為圖片 |
| [縮小圖片](https://tool.feifei.tw/resize-image.html) | 調整圖片尺寸大小 |
| [裁剪圖片](https://tool.feifei.tw/card.html) | 自動裁剪空白和水印 |
| [EXIF 讀取](https://tool.feifei.tw/exif.html) | 讀取照片 EXIF 資訊 |

### 開發者工具

| 工具 | 說明 |
|------|------|
| [終端指令提取](https://tool.feifei.tw/bash.html) | 從終端輸出中提取指令 |
| [編碼/加解密](https://tool.feifei.tw/encry.html) | Base64、MD5、SHA、AES |
| [HTML 轉 Markdown](https://tool.feifei.tw/html-to-markdown.html) | 將 HTML 轉換為 Markdown |
| [Windows 轉 WSL](https://tool.feifei.tw/windows-to-wsl.html) | 路徑格式轉換 |
| [ISO 差異對照](https://tool.feifei.tw/iso-diff-tool.html) | ISO 文件版本比對 |

---

## 技術

| 技術 | 用途 |
|------|------|
| [Tailwind CSS](https://tailwindcss.com/) | UI 框架 (CDN) |
| [Noto Sans TC](https://fonts.google.com/noto/specimen/Noto+Sans+TC) | 中文字體 |
| [PDF.js](https://mozilla.github.io/pdf.js/) | PDF 處理 |
| [OpenCC](https://github.com/nk2028/opencc-js) | 繁簡轉換 |
| [Pangu.js](https://github.com/vinta/pangu.js) | 中英文空白 |
| [CryptoJS](https://github.com/brix/crypto-js) | 加密演算法 |
| [Turndown](https://github.com/mixmark-io/turndown) | HTML 轉 Markdown |
| [EXIF.js](https://github.com/exif-js/exif-js) | EXIF 讀取 |
| [diff-match-patch](https://github.com/google/diff-match-patch) | 文字差異比對 |
| [JSZip](https://stuk.github.io/jszip/) | ZIP 壓縮 |

---

## 專案結構

```
feifei-tool/
├── index.html              # 首頁（工具目錄）
├── *.html                   # 各工具頁面
├── Update.md               # 更新指南
├── README.md               # 專案說明
└── .github/
    ├── scripts/
    │   └── update_toc.py   # 目錄自動更新腳本
    └── workflows/
        ├── update-toc.yml  # 目錄更新 workflow
        └── static.yml      # GitHub Pages 部署
```

---

## 本地開發

### 快速開始

```bash
# Clone 專案
git clone https://github.com/user/feifei-tool.git
cd feifei-tool

# 啟動本地伺服器（任選一種）
python -m http.server 8080
# 或
npx serve .
# 或
php -S localhost:8080
```

開啟瀏覽器訪問 `http://localhost:8080`

### 新增工具

詳見 [Update.md](./Update.md) 更新指南。

簡要步驟：
1. 建立新的 HTML 檔案（可複製現有模板）
2. 在 `.github/scripts/update_toc.py` 新增設定
3. 推送到 main 分支

---

## 自動化流程

### GitHub Actions

| Workflow | 觸發條件 | 功能 |
|----------|----------|------|
| 自動更新工具目錄 | 推送 HTML 檔案 | 更新 index.html 目錄 |
| Deploy to Pages | 目錄更新完成 | 部署到 GitHub Pages |

### 目錄自動更新

當推送新的 HTML 工具頁面時：
1. `update-toc.yml` 執行 Python 腳本
2. 腳本讀取各 HTML 的 title/description
3. 自動生成 Tailwind 卡片並更新 index.html
4. 提交變更並觸發部署

---

## 設計規範

### 色彩

| 用途 | Light | Dark |
|------|-------|------|
| 背景 | `gray-50` | `gray-900` |
| 卡片 | `white` | `gray-800` |
| 主色 | `blue-600` | `blue-400` |

### 斷點

| 斷點 | 尺寸 | 說明 |
|------|------|------|
| 預設 | < 640px | 手機 |
| `sm` | >= 640px | 大手機 |
| `md` | >= 768px | 平板 |
| `lg` | >= 1024px | 桌機 |

### 導覽

- **手機** (< md): 固定底部導覽列，5 欄 Grid
- **桌機** (>= md): 固定頂部 Header + 麵包屑

---

## 授權

MIT License

---

## 作者

**FeiFei** - [tool.feifei.tw](https://tool.feifei.tw)
