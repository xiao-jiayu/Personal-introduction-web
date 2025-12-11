# 個人作品集網站 | Personal Introduction Web

一個現代化、響應式的個人作品集網站，展示技能、經歷與作品。採用純 HTML、CSS、JavaScript 開發，具有互動式技能篩選功能與優雅的動畫效果。

## 🎨 功能特點

### 核心功能
- **響應式設計**：完美支援桌面版（1200px+）、平板版（768px-1199px）、手機版（<600px）
- **技能標籤篩選**：點擊技能標籤即時篩選相關技能卡片，非匹配卡片會淡化
- **作品集展示**：分類展示各項作品與專案成果
- **捲動互動**：手機版支援向下捲動自動隱藏 header，向上捲動時重新顯示

### 視覺效果
- **平滑動畫**：所有互動都配有流暢的過場動畫（300ms cubic-bezier）
- **顏色配置**：協調的 K-pop 風格配色（粉、藍、綠、中性灰）
- **陰影與深度**：使用多層陰影營造卡片深度感
- **Hover 效果**：卡片浮起、文字顏色變化等視覺反饋

### 無障礙設計
- 符合 WCAG 標準的語義 HTML
- 完整的 aria 標籤與 role 屬性
- 清晰的聚焦狀態（focus-visible）
- 適當的按鈕與觸控目標大小

## 📁 專案結構

```
Personal-introduction-web/
├── index.html          # HTML 主檔案
├── styles.css          # 樣式文件（包含響應式媒體查詢）
├── script.js           # JavaScript 互動邏輯
├── README.md           # 本文件
├── IMG_9742.jpg        # 頭像照片
└── 項目1-4.jpeg        # 作品集示意圖
```

## 🚀 快速開始

### 本地運行

#### 方法 1：使用 Live Server（推薦）
1. 在 VS Code 中安裝 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 擴充
2. 右鍵點擊 `index.html` → `Open with Live Server`

#### 方法 2：使用 Python HTTP 伺服器
```bash
cd /path/to/Personal-introduction-web
python3 -m http.server 8000
# 訪問 http://localhost:8000
```

#### 方法 3：直接打開檔案
直接用瀏覽器打開 `index.html`（部分功能可能受限）

### 線上訪問

網站已部署到 GitHub Pages：
```
https://xiao-jiayu.github.io/Personal-introduction-web/
```

## 🎯 主要功能說明

### 1. 技能篩選互動
- **位置**：技能區塊下方的標籤雲
- **操作**：點擊任意技能標籤
- **效果**：
  - 匹配的技能卡片：上浮 12px、增亮、飽和度提升
  - 非匹配卡片：淡化（20% 透明度）、縮小、去飽和
  - 再點一次同標籤可恢復全部卡片
- **性能**：使用 requestAnimationFrame 優化動畫

### 2. 響應式佈局
- **寬度 1200px+**：技能卡片 4 列，作品集 4 列
- **寬度 768px-1199px**：技能卡片 2 列，作品集 2 列
- **寬度 < 600px**：單列佈局，優化手機閱讀
- **寬度 < 768px（手機）**：
  - Header 高度縮小（14px 上下 padding）
  - 導覽改為可換行 pill 按鈕（圓角 999px）
  - 啟用捲動隱藏/顯示 header 功能

### 3. 捲動隱藏 Header（手機版限定）
```javascript
// 向下捲動 > 6px 時隱藏 header
// 向上捲動 > 6px 時顯示 header
```

### 4. Scrollspy（導覽高亮）
自動根據目前捲動位置高亮對應的導覽項目

## 🛠️ 技術棧

| 技術 | 版本/說明 |
|------|---------|
| HTML | HTML5，語義標籤 |
| CSS | CSS3，Grid / Flexbox，媒體查詢 |
| JavaScript | Vanilla JS，無框架依賴 |
| 字體 | Google Fonts（Inter, Noto Sans TC/KR） |
| 部署 | GitHub Pages（gh-pages 分支） |

## 📐 設計系統

### 配色方案
```css
--accent-pink: #f8b8c8;      /* 溫柔粉（highlight） */
--accent-blue: #70b6d0;      /* 清爽藍（主要色） */
--accent-green: #608f76;     /* 柔和綠（次要色） */
--accent-neutral: #dfe4e0;   /* 柔和中性 */
--text-color: #111827;       /* 深灰 */
```

### 圓角規範
- 小元素（按鈕、標籤）：5-10px
- 卡片：16px
- 極圓形（pill 按鈕）：999px

### 陰影規範
```css
/* 柔和陰影 */
box-shadow: 0 20px 60px rgba(16,24,40,0.06);

/* 強化陰影（Hover） */
box-shadow: 0 28px 80px rgba(16,24,40,0.07);

/* 濾鏡效果（篩選時） */
filter: grayscale(1) brightness(0.65);  /* 淡化 */
filter: saturate(1.1) brightness(1.08); /* 增亮 */
```

### 動畫時序
```css
transition: transform 200ms ease, opacity 200ms ease, filter 200ms ease;
/* cubic-bezier(.2,.8,.2,1) 用於卡片浮起等明顯變化 */
```

## 📝 檔案詳解

### index.html
- **行 1-10**：文件頭（meta、viewport、charset）
- **行 12-30**：Header 與導覽列
- **行 32-50**：關於我區塊
- **行 53-130**：技能區塊（卡片 + 標籤）
- **行 133-190**：經歷區塊
- **行 193-240**：作品集區塊
- **行 243-270**：聯絡區塊與表單
- **行 272-274**：Footer 與指令碼

### styles.css（776 行）
- **行 1-50**：全局設定與 CSS 變數
- **行 51-170**：Header、導覽、Section 基本樣式
- **行 171-240**：桌面版媒體查詢（max-width: 768px）
- **行 242-280**：技能、經歷、作品集卡片樣式
- **行 281-400**：標籤與按鈕樣式
- **行 401-550**：聯絡表單、Footer、篩選效果
- **行 574-610**：超小螢幕媒體查詢（max-width: 600px）
- **行 620-645**：超小螢幕進一步優化（max-width: 420px）

### script.js（249 行）
- **行 1-65**：技能標籤篩選核心邏輯
- **行 71-110**：聯絡表單 mailto 處理
- **行 113-140**：導覽平滑捲動與 Scrollspy
- **行 143-200**：頁面加載動畫
- **行 206-245**：手機版捲動隱藏 header

## 🔍 開發與自訂

### 修改內容
1. **關於我介紹**：編輯 `index.html` 行 39-45 的 `.about-text` 段落
2. **技能卡片**：在 `index.html` 行 56-75 的 `.skills-grid` 內新增 `.skill-category` 區塊
3. **技能標籤**：在 `index.html` 行 91-104 的 `.skills-tags` 內新增 `<a class="tag">` 元素
4. **作品集項目**：在 `index.html` 行 168-237 內複製 `.portfolio-item` 區塊

### 修改樣式
1. **配色**：編輯 `styles.css` 行 8-19 的 CSS 變數
2. **響應式斷點**：修改 `styles.css` 內的 `@media` 查詢（目前為 768px、600px、420px）
3. **動畫速度**：調整 `transition` 的時間值（預設 200-260ms）

### 新增功能
1. **新媒體查詢**：在 `styles.css` 末尾添加新的 `@media` 區塊
2. **新互動**：在 `script.js` 末尾添加新的 `DOMContentLoaded` 監聽器或全局函數

## 🌐 部署流程

### GitHub Pages 設定（已完成）
1. Repository 有 `main` 與 `gh-pages` 分支
2. GitHub Settings → Pages → Source 設為 `gh-pages` 分支
3. 部署網址：`https://xiao-jiayu.github.io/Personal-introduction-web/`

### 發佈更新
```bash
# 本地開發
# 修改檔案後...

git add .
git commit -m "Descriptive commit message"
git push origin main

# 同步到 gh-pages 分支（可選）
git push origin main:gh-pages

# 等待 GitHub Pages 重新部署（1-2 分鐘）
```

## 📱 測試清單

### 功能測試
- [ ] 技能標籤篩選：每個標籤都能正確高亮對應卡片
- [ ] 再次點擊標籤恢復全部卡片
- [ ] 聯絡表單能啟動 mailto
- [ ] 導覽連結正常跳轉
- [ ] Scrollspy 正確高亮當前章節

### 響應式測試
- [ ] **桌面版（1200px+）**：4 列網格，Header 寬敞
- [ ] **平板版（768px-1199px）**：2 列網格
- [ ] **手機版（< 768px）**：單列，Header 縮小，nav 變 pill 按鈕
- [ ] **超小螢幕（< 600px）**：字體調整，標籤單列

### 手機版特定
- [ ] 向下捲動時 Header 隱藏
- [ ] 向上捲動時 Header 重新出現
- [ ] 捲動動畫流暢（無抖動）

### 瀏覽器相容性
- [ ] Chrome/Edge：完美支援
- [ ] Firefox：完美支援
- [ ] Safari（iOS）：完美支援
- [ ] 舊版 IE：不保證支援（使用現代 CSS）

## 🔐 隱私與安全

- 聯絡表單使用 `mailto:` 協定，不傳送任何資料到伺服器
- 所有資料處理在客戶端進行
- 無第三方追蹤代碼

## 📞 聯絡方式

如有任何問題或建議，歡迎聯繫：
- 📧 Email：414570136@m365.fju.edu.tw
- 📱 Phone：0968-971-966
- 🐙 GitHub：https://github.com/xiao-jiayu
- 📸 Instagram：@xiaojiayu__

## 📄 授權

此專案採用 MIT 授權。詳見 [LICENSE](LICENSE) 文件。

---

**最後更新**：2025 年 12 月 10 日  
**維護者**：蕭家妤

版本回復（版本控制練習）：
嘗試更新「關於我」區塊的文字內容，但後來發現該修改不符合網站整體風格，因此決定回復成原本版本。由於該 commit 已推送至遠端，為了保持版本歷史的完整性，我使用 git revert 撤銷這次文字更新，並保留所有變更紀錄。

A/B 版本實驗（簡易 A/B Test）：
進度條的百分比較難精準設定，我無法判斷各技能的熟練度應如何量化，容易造成誤導或不一致的呈現。且相比進度條的呈現，我更喜歡標籤雲＋卡片能做出互動動畫的效果。

心得：
在這次製作個人簡歷網站的專案中，我除了熟悉GitHub和Copilot的基本操作，也實際遇到許多需要自己排查的問題。首先是無法成功push的狀況，最後發現是舊憑證失效，因此建立新的token作為密碼後就順利解決。第二個問題是圖片無法放在正確位置，原本以為是路徑設定出錯，但後來直接調整程式碼才成功定位。第三個問題則是聯絡資訊的文字完全沒有顯示，我嘗試了多次修改才發現真正原因不是程式錯誤，而是文字顏色和背景色相同，導致根本看不見。最後一個是互動效果時有時無，因為我還沒能完全理解Copilot生成的所有程式碼，只能讓它反覆排查，直到效果穩定運作。
除了內容開發，我也花了不少時間調整UI。因為一開始並沒有明確的畫面想像，我參考了常用App的介面和配色，再透過指令讓Copilot調整。也處理了電腦與手機顯示差異，例如手機版因header占比過大且固定導致內容被擋住，透過不斷測試與微調，才讓網站能在不同裝置上都能順利瀏覽。
過程中因為大量查詢相關內容，演算法後續也繼續推送相關資訊，讓我能在做完這份作業後可以繼續接觸，希望之後能做出更有個人特色、有更多功能的網站。