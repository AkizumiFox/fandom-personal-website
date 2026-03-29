# Personal Website

Next.js + TypeScript + Tailwind personal site for:

- 獸設 / 獸圖 / 毛裝
- 文字創作
- 生活興趣
- 社群媒體
- 文章雜談

## Start

```bash
npm install
npm run dev
```

## Quick Content Map

| 區塊 | Route | 主要編輯位置 | 格式 |
|---|---|---|---|
| 獸設 / 獸圖 / 毛裝 | `/fandom/gallery` | `content/collections/fandom/gallery-items.json` | JSON |
| 文字創作 | `/bookshelf`, `/bookshelf/[slug]` | `content/collections/bookshelf/*.md` | Markdown |
| 生活興趣 | `/hobbies` | `content/collections/hobbies/items.json` | JSON |
| 社群媒體 | `/social` | `content/collections/social/links.json` | JSON |
| 文章雜談 | `/writing`, `/writing/[slug]` | `content/collections/writing/*.mdx` | MDX |

## Full Authoring Guide

See the full guide with schema and examples:

- `docs/content-authoring-guide.md`
