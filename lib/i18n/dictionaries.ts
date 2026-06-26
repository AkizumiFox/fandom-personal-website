import type { Locale } from "./config";

const zh = {
  nav: {
    fandom: "獸設 / 獸圖 / 毛裝",
    bookshelf: "文字創作",
    hobbies: "生活興趣",
    social: "社群媒體",
    writing: "文章雜談"
  },
  common: {
    home: "秋墨首頁",
    updating: "更新中",
    all: "全部",
    close: "關閉",
    authorTbd: "作者待補",
    noWorks: "尚無可展示作品"
  },
  theme: {
    toLight: "切換為淺色模式",
    toDark: "切換為深色模式"
  },
  language: {
    switch: "切換語言"
  },
  meta: {
    title: "秋墨的網站",
    description: "一隻黑色狐狸的個狐網站，包含我是誰、我委託圖片跟照片、文字創作等等的內容。"
  },
  hero: {
    tagline: "一隻寫小說的黑色狐狸",
    bio: "純文學、極短篇小說寫作者。對於探店、美食有興趣，喜歡在各地探索美食，目標是把全台的米其林必比登吃過一輪。",
    about: "自我介紹",
    keywords: "100 關鍵詞",
    cardAria: "秋墨 電子名片"
  },
  card: {
    title: "秋墨 · 電子名片",
    hint: "掃描 QR code，把這張名片帶走，或單獨追蹤。",
    followOnly: "或單獨追蹤",
    siteLabel: "掃我，收下名片",
    siteCaption: "認親 · 加好友",
    flipToBack: "翻到背面（QR code）",
    flipToFront: "翻回正面",
    expand: "全屏顯示名片",
    closeFull: "關閉全屏",
    backToFront: "翻回正面",
    scanAria: "{label}：{caption}"
  },
  highlights: {
    bookshelf: { title: "文字創作", short: "創作", note: "小說與極短篇" },
    updates: { title: "文章雜談", short: "雜談", note: "近況與雜記" },
    fandom: { title: "獸設 / 獸圖 / 毛裝", short: "獸設", note: "圖庫、TG貼圖與3D模型整理" }
  },
  facets: {
    fandomRandom: "隨機展示作品",
    gotoCategoryAria: "前往 {name} 類別"
  },
  fox: {
    help: "連續點擊狐狸三次可開啟互動模式。開啟後可點擊狐狸身上的熱區觸發對話，並可重置或離開。",
    reset: "重置",
    leave: "離開",
    unlockAria: "連續點擊狐狸三次開啟互動模式",
    hotspotsGroupAria: "狐狸互動熱區"
  },
  sections: {
    writing: { title: "文章雜談", description: "近況、筆記，和一些想記下來的事。" },
    bookshelf: { title: "文字創作", description: "寫完的小說都收在這裡。", empty: "目前還沒有作品。" },
    social: {
      title: "社群媒體",
      description: "每個平台都可以私訊我，最常出沒在 X、Facebook、Instagram 與 Threads。",
      chip: "社群"
    },
    hobbies: { title: "生活興趣", description: "平常喜歡做的事。", chip: "興趣" },
    gallery: {
      title: "圖庫",
      stickersIntro: "這裡是秋墨的 Telegram 貼圖包。繪師：",
      stickersCta: "前往 TG 貼圖",
      modelLabel: "模型：",
      remodelLabel: "改模：",
      colorLabel: "上色："
    }
  },
  gallery: {
    unnamed: "未命名作品",
    noDesc: "（尚未填寫描述）",
    openImageAria: "開啟圖片 {name}",
    locateImageAria: "定位到圖片 {name}",
    closeAria: "關閉"
  },
  reader: {
    settings: "閱讀設定",
    font: "字體",
    small: "小",
    medium: "中",
    large: "大",
    layout: "排版",
    horizontal: "橫書",
    vertical: "直書"
  },
  articleNav: {
    label: "文章導覽",
    prev: "← 前一篇",
    next: "後一篇 →",
    first: "已經是第一篇",
    last: "已經是最後一篇"
  },
  bookshelfReader: {
    back: "← 回到文字創作"
  },
  footer: {
    tagline: "秋墨 · Akizumi — 黑狐狸的小窩"
  },
  hobbiesMap: {
    看音樂劇: "看音樂劇",
    保齡球: "保齡球",
    飛鏢: "飛鏢",
    德州撲克: "德州撲克",
    日本麻將: "日本麻將"
  } as Record<string, string>,
  fandomCategories: {
    commission: "獸圖",
    ocs: "獸設",
    fursuit: "毛裝",
    stickers: "TG貼圖",
    model3d: "3D模型"
  }
};

export type Dictionary = typeof zh;

const en: Dictionary = {
  nav: {
    fandom: "Art / Fursona / Fursuit",
    bookshelf: "Fiction",
    hobbies: "Hobbies",
    social: "Social",
    writing: "Notes"
  },
  common: {
    home: "Akizumi home",
    updating: "Coming soon",
    all: "All",
    close: "Close",
    authorTbd: "Artist TBA",
    noWorks: "No works to show yet"
  },
  theme: {
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode"
  },
  language: {
    switch: "Switch language"
  },
  meta: {
    title: "Akizumi's site",
    description: "Personal site of a black fox — who I am, commissioned art and photos, fiction, and more."
  },
  hero: {
    tagline: "A black fox who writes fiction",
    bio: "A writer of literary and flash fiction. Loves exploring restaurants and food, with a goal of eating through every Michelin Bib Gourmand spot in Taiwan.",
    about: "About me",
    keywords: "100 keywords",
    cardAria: "Akizumi business card"
  },
  card: {
    title: "Akizumi · Business Card",
    hint: "Scan a QR code to take this card with you, or follow individually.",
    followOnly: "Or follow individually",
    siteLabel: "Scan me, take my card",
    siteCaption: "Say hi · Add me",
    flipToBack: "Flip to back (QR codes)",
    flipToFront: "Flip to front",
    expand: "Show card fullscreen",
    closeFull: "Exit fullscreen",
    backToFront: "Back to front",
    scanAria: "{label}: {caption}"
  },
  highlights: {
    bookshelf: { title: "Fiction", short: "Fiction", note: "Novels & flash fiction" },
    updates: { title: "Notes", short: "Notes", note: "Updates & jottings" },
    fandom: { title: "Art / Fursona / Fursuit", short: "Art", note: "Gallery, TG stickers & 3D model" }
  },
  facets: {
    fandomRandom: "Random featured work",
    gotoCategoryAria: "Go to {name} category"
  },
  fox: {
    help: "Tap the fox three times in a row to enter interactive mode. Then tap the hotspots on the fox to trigger dialogue, or reset / leave.",
    reset: "Reset",
    leave: "Leave",
    unlockAria: "Tap the fox three times to enter interactive mode",
    hotspotsGroupAria: "Fox interaction hotspots"
  },
  sections: {
    writing: { title: "Notes", description: "Updates, notes, and things worth writing down." },
    bookshelf: { title: "Fiction", description: "Finished stories all live here.", empty: "No works yet." },
    social: {
      title: "Social",
      description: "You can DM me on any platform — I'm most active on X, Facebook, Instagram and Threads.",
      chip: "Social"
    },
    hobbies: { title: "Hobbies", description: "Things I like to do.", chip: "Hobby" },
    gallery: {
      title: "Gallery",
      stickersIntro: "This is Akizumi's Telegram sticker pack. Artist: ",
      stickersCta: "Get the TG stickers",
      modelLabel: "Model: ",
      remodelLabel: "Remodel: ",
      colorLabel: "Coloring: "
    }
  },
  gallery: {
    unnamed: "Untitled work",
    noDesc: "(No description yet)",
    openImageAria: "Open image {name}",
    locateImageAria: "Jump to image {name}",
    closeAria: "Close"
  },
  reader: {
    settings: "Reading settings",
    font: "Font",
    small: "S",
    medium: "M",
    large: "L",
    layout: "Layout",
    horizontal: "Horizontal",
    vertical: "Vertical"
  },
  articleNav: {
    label: "Article navigation",
    prev: "← Previous",
    next: "Next →",
    first: "This is the first one",
    last: "This is the last one"
  },
  bookshelfReader: {
    back: "← Back to Fiction"
  },
  footer: {
    tagline: "Akizumi — a black fox's little den"
  },
  hobbiesMap: {
    看音樂劇: "Musicals",
    保齡球: "Bowling",
    飛鏢: "Darts",
    德州撲克: "Texas Hold'em",
    日本麻將: "Japanese Mahjong"
  },
  fandomCategories: {
    commission: "Art",
    ocs: "Fursona",
    fursuit: "Fursuit",
    stickers: "TG Stickers",
    model3d: "3D Model"
  }
};

const ja: Dictionary = {
  nav: {
    fandom: "獣設定 / イラスト / 着ぐるみ",
    bookshelf: "小説",
    hobbies: "趣味",
    social: "SNS",
    writing: "ノート"
  },
  common: {
    home: "秋墨ホーム",
    updating: "準備中",
    all: "すべて",
    close: "閉じる",
    authorTbd: "作者未定",
    noWorks: "まだ作品がありません"
  },
  theme: {
    toLight: "ライトモードに切り替え",
    toDark: "ダークモードに切り替え"
  },
  language: {
    switch: "言語を切り替え"
  },
  meta: {
    title: "秋墨のサイト",
    description: "黒い狐の個人サイト。自己紹介、依頼イラストや写真、小説などを掲載しています。"
  },
  hero: {
    tagline: "小説を書く黒い狐",
    bio: "純文学・ショートショートの書き手。食べ歩きやグルメが好きで、各地で美味しいものを探すのが趣味。台湾のミシュラン・ビブグルマンを制覇するのが目標です。",
    about: "自己紹介",
    keywords: "100のキーワード",
    cardAria: "秋墨 デジタル名刺"
  },
  card: {
    title: "秋墨 · デジタル名刺",
    hint: "QRコードをスキャンしてこの名刺を保存、または個別にフォローできます。",
    followOnly: "個別にフォロー",
    siteLabel: "スキャンして名刺を保存",
    siteCaption: "あいさつ · 友達追加",
    flipToBack: "裏面へ（QRコード）",
    flipToFront: "表面へ戻る",
    expand: "名刺を全画面表示",
    closeFull: "全画面を閉じる",
    backToFront: "表面へ戻る",
    scanAria: "{label}：{caption}"
  },
  highlights: {
    bookshelf: { title: "小説", short: "小説", note: "小説・ショートショート" },
    updates: { title: "ノート", short: "ノート", note: "近況とメモ" },
    fandom: {
      title: "獣設定 / イラスト / 着ぐるみ",
      short: "獣設定",
      note: "ギャラリー・TGスタンプ・3Dモデル"
    }
  },
  facets: {
    fandomRandom: "ランダム表示作品",
    gotoCategoryAria: "{name} カテゴリへ移動"
  },
  fox: {
    help: "狐を3回連続でタップすると、インタラクティブモードが始まります。開始後は狐の体のホットスポットをタップで会話が始まり、リセットや終了もできます。",
    reset: "リセット",
    leave: "終了",
    unlockAria: "狐を3回タップしてインタラクティブモードを開始",
    hotspotsGroupAria: "狐のインタラクションホットスポット"
  },
  sections: {
    writing: { title: "ノート", description: "近況やメモ、書き留めておきたいこと。" },
    bookshelf: { title: "小説", description: "書き上げた小説はここにまとめています。", empty: "まだ作品がありません。" },
    social: {
      title: "SNS",
      description: "どのプラットフォームでもDMできます。X・Facebook・Instagram・Threadsによくいます。",
      chip: "SNS"
    },
    hobbies: { title: "趣味", description: "普段していること。", chip: "趣味" },
    gallery: {
      title: "ギャラリー",
      stickersIntro: "秋墨のTelegramスタンプです。絵師：",
      stickersCta: "TGスタンプへ",
      modelLabel: "モデル：",
      remodelLabel: "改造：",
      colorLabel: "塗り："
    }
  },
  gallery: {
    unnamed: "無題の作品",
    noDesc: "（説明はまだありません）",
    openImageAria: "画像 {name} を開く",
    locateImageAria: "画像 {name} へ移動",
    closeAria: "閉じる"
  },
  reader: {
    settings: "表示設定",
    font: "文字サイズ",
    small: "小",
    medium: "中",
    large: "大",
    layout: "組み方向",
    horizontal: "横書き",
    vertical: "縦書き"
  },
  articleNav: {
    label: "記事ナビゲーション",
    prev: "← 前の記事",
    next: "次の記事 →",
    first: "最初の記事です",
    last: "最後の記事です"
  },
  bookshelfReader: {
    back: "← 小説一覧へ戻る"
  },
  footer: {
    tagline: "秋墨 · Akizumi — 黒狐の小さな巣"
  },
  hobbiesMap: {
    看音樂劇: "ミュージカル鑑賞",
    保齡球: "ボウリング",
    飛鏢: "ダーツ",
    德州撲克: "テキサスホールデム",
    日本麻將: "麻雀"
  },
  fandomCategories: {
    commission: "イラスト",
    ocs: "獣設定",
    fursuit: "着ぐるみ",
    stickers: "TGスタンプ",
    model3d: "3Dモデル"
  }
};

export const dictionaries: Record<Locale, Dictionary> = { zh, en, ja };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
