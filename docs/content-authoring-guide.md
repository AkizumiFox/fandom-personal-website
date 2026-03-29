# Content Authoring Guide

This guide explains where to add or update content for each primary section:

- 獸設 / 獸圖 / 毛裝
- 文字創作
- 生活興趣
- 社群媒體
- 文章雜談

---

## 1) 獸設 / 獸圖 / 毛裝

- **Routes**: `/fandom/gallery` (and `/fandom` redirects here)
- **Primary file**: `content/collections/fandom/gallery-items.json`

### Schema

```json
{
  "description": "可選",
  "items": [
    {
      "id": "commission-01",
      "title": "作品名稱",
      "category": "commission",
      "description": "簡介",
      "image": "/images/example.png"
    }
  ]
}
```

- `category` only accepts:
  - `commission` (獸設)
  - `ocs` (獸圖)
  - `fursuit` (毛裝)
- `image` should point to files under `public/`.

---

## 2) 文字創作

- **Routes**: `/bookshelf`, `/bookshelf/[slug]`
- **Primary directory**: `content/collections/bookshelf/*.md`

### File naming

- Filename becomes slug, for example:
  - `06_新作品.md` -> slug `06_新作品`
- Display title auto-removes numeric prefix (`06_`).

### Example

```md
第一段會被當成 preview 摘要（若不是標題或引用）。

這裡是正文...
```

---

## 3) 生活興趣

- **Route**: `/hobbies`
- **Primary file**: `content/collections/hobbies/items.json`

### Schema

```json
{
  "description": "可選",
  "items": ["看音樂劇", "保齡球", "飛鏢"]
}
```

---

## 4) 社群媒體

- **Route**: `/social`
- **Primary file**: `content/collections/social/links.json`

### Schema

```json
{
  "description": "可選",
  "links": [
    { "label": "Facebook", "href": "https://www.facebook.com/" },
    { "label": "Twitter / X", "href": "https://x.com/your-handle" }
  ]
}
```

Footer and social page now read from the same social loader.

---

## 5) 文章雜談

- **Routes**: `/writing`, `/writing/[slug]`
- **Primary directory**: `content/collections/writing/*.mdx`

### Frontmatter

```mdx
---
title: "文章標題"
excerpt: "列表摘要"
tags:
  - 標籤A
  - 標籤B
publishedAt: "2026-03-26"
---
```

- `publishedAt` is optional. If provided, writing list sorts by newest date first.
- If omitted, entries fallback to slug-based order.

---

## Notes for maintainers

- New architecture is domain-based:
  - `lib/content/fandom.ts`
  - `lib/content/bookshelf.ts`
  - `lib/content/hobbies.ts`
  - `lib/content/social.ts`
  - `lib/content/writing.ts`
- Homepage sections are composed from `components/marketing/home/*`.
- Content should be added under `content/collections/*`.
