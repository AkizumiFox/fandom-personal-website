# Personal Website

秋墨（Akizumi）的個人網站。Next.js (App Router) + TypeScript + Tailwind CSS。

設計語言：「ink at night」— 深色優先的墨色基底、琥珀色光暈點綴，保留淺色紙感主題（右上角可切換，狀態存於 cookie）。

## Start

```bash
npm install
npm run dev
```

其他指令：

```bash
npm run build      # production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run check      # lint + typecheck + build
```

## Project Layout

| 目錄 | 用途 |
|---|---|
| `app/` | 路由與頁面（App Router） |
| `components/` | UI 元件，依領域分類（layout / marketing / fandom / bookshelf / typography / cards） |
| `content/` | 站台內容（資料檔與創作集） |
| `lib/` | 內容載入器與工具函式 |
| `public/` | 靜態資產（圖庫、品牌、狐狸動畫） |
| `docs/` | 內容撰寫指南 |

設計 token（色彩、圓角、字體、動態）集中在 `app/globals.css` 的 CSS 變數，`tailwind.config.ts` 映射為 Tailwind 色名。新增樣式請優先重用 `surface-card` / `surface-panel` / `ui-chip` / `section-kicker` 等共用 class。

## Quick Content Map

| 區塊 | Route | 主要編輯位置 | 格式 |
|---|---|---|---|
| 獸設 / 獸圖 / 毛裝 | `/fandom/gallery` | `content/collections/fandom/gallery-items.json` | JSON |
| 文字創作 | `/bookshelf`, `/bookshelf/[slug]` | `content/collections/bookshelf/*.md` | Markdown |
| 生活興趣 | `/hobbies` | `content/collections/hobbies/items.json` | JSON |
| 社群媒體 | `/social` | `content/collections/social/links.json` | JSON |
| 文章雜談 | `/writing`, `/writing/[slug]` | `content/collections/writing/*.mdx` | Markdown（gray-matter front matter） |

完整 schema 與範例見 `docs/content-authoring-guide.md`。

## Dev Notes（低記憶體機器注意事項）

`next.config.ts` 中有兩個刻意的設定，請勿移除：

- `turbopack.root: __dirname` — 避免家目錄的雜散 lockfile 讓 Next 把 workspace root 推斷成 `~`。
- `experimental.turbopackFileSystemCacheForDev: false` — Next 16 的 Turbopack 開發持久快取會在首次載入後寫入近 1GB 檔案，在 8GB 記憶體的機器上會造成系統卡死。關閉後 on-demand 編譯依然夠快。

若 `~/package-lock.json` 之類的雜散檔案存在，建議手動刪除。
