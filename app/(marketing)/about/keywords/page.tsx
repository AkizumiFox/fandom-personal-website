import Link from "next/link";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/typography/section-heading";

const keywordSections: { title: string; items: string[] }[] = [
  {
    title: "音樂劇",
    items: ["Chicago", "The Lion King", "Next to Normal", "Cats", "Miss Saigon"]
  },
  {
    title: "音樂",
    items: [
      "蘇芮《酒矸倘賣無》",
      "ABBA《Dancing Queen》",
      "ABBA《Gimme! Gimme! Gimme!》",
      "ABBA《Money, Money, Money》",
      "蘇打綠《他舉起右手點名》",
      "阿密特《母系社會》",
      "Lady Gaga《Abracadabra》",
      "節奏天國《僕らの時代》",
      "何瑞康《刑者》",
      "Creepy Nuts《かつて天才だった俺たちへ》",
      "藍心湄《濃粧搖滾》",
      "伍佰《挪威的森林》",
      "ナナヲアカリ《奇縁ロマンス》",
      "Mili《world.execte(me); (Key Ingredient ver.) (Instrumental)》",
      "mihimaru GT《気分上々↑↑》",
      "ALI《Wild Side》",
      "MaiMai《夢花火》"
    ]
  },
  {
    title: "遊戲",
    items: [
      "Celeste",
      "Chunithm",
      "太鼓達人",
      "Deemo",
      "Cytus",
      "Cytus II",
      "IIDX",
      "DANCERUSH STARDOM",
      "寶可夢 日/月",
      "寶可夢 阿爾宙斯",
      "大家的節奏天國",
      "Picross 3D",
      "TETRIS THE GRAND MASTER",
      "日本麻將（天鳳/雀魂）",
      "德州撲克（Natural 8）",
      "保齡球",
      "飛鏢"
    ]
  },
  {
    title: "動畫",
    items: [
      "小林家的龍女僕",
      "動物方城市",
      "齊木楠雄的災難",
      "別對映像研出手！",
      "輝夜姬想讓人告白",
      "藍色時期",
      "入間同學入魔了！",
      "來自深淵",
      "孤獨搖滾",
      "涼宮春日的憂鬱",
      "擅長逃跑的殿下",
      "魔法少女小圓",
      "膽大黨",
      "K-ON！！輕音部",
      "在沖繩喜歡上的女孩方言講得太過令人困擾",
      "怪人的沙拉碗",
      "棋靈王",
      "Carole & Tuesday"
    ]
  },
  {
    title: "網路",
    items: ["LNG", "台灣通勤第一品牌", "Ryan Higa", "桃鈴ねね", "角巻わため", "QuizKnock", "2015 年代左右的 YouTuber 跟實況圈"]
  },
  {
    title: "喜劇",
    items: ["華旭《天爆幹黑》", "藍恩、華旭、品喬《三流笑話》", "Bo Burnham《Make Happy》", "Bo Burnham《The Inside Outtakes》"]
  },
  {
    title: "影視作品",
    items: ["The Good Place", "Lucifer", "Silicon Valley", "The Big Bang Theory", "Zootopia"]
  },
  {
    title: "書",
    items: [
      "寺尾哲也《子彈是餘生》",
      "白先勇《Danny Boy》",
      "林奕含《房思琪的初戀樂園》",
      "奧爾德斯·赫胥黎《美麗新世界》",
      "李奕樵《遊戲自黑暗》",
      "吳明益《天橋上的魔術師》",
      "金庸《笑傲江湖》",
      "夏慕聰《軍犬》"
    ]
  },
  {
    title: "其他書",
    items: [
      "毛慶生《古典新論一》",
      "Joshua Angrist & Jörn-Steffen Pischke《Mastering 'Metrics》",
      "劉邦鋒《由片語學習C程式設計（第二版）》",
      "Jay Cummings《Real Analysis》",
      "《米其林指南》・〈必比登推介〉"
    ]
  },
  {
    title: "課程",
    items: ["蔡國榮《微積分》", "蔡國榮《線性代數導論》"]
  },
  {
    title: "其他",
    items: [
      "獸文化",
      "酉心麥面（麵店）",
      "アトリエあまのじゃく（獸裝工作室）",
      "Dragon X2（獸裝工作室）",
      "飆飆先生（獸繪師）",
      "狼尾（獸繪師）",
      "強化學習",
      "辯論社",
      "武陵高中",
      "台灣大學",
      "LaTeX（排版語言）"
    ]
  }
];

export default function AboutKeywordsPage() {
  return (
    <SectionShell className="py-10 md:py-14">
      <SectionHeading title="構成我的 100 個關鍵詞" />
      <p className="mb-8 text-sm text-muted">
        <Link href="/about" className="underline underline-offset-2 transition hover:text-foreground">
          ← 回到完整自我介紹
        </Link>
      </p>

      <div className="mx-auto max-w-4xl space-y-10 text-[1.02rem] leading-8 text-muted md:text-[1.08rem]">
        {keywordSections.map((section) => (
          <section key={section.title}>
            <h2 className="text-3xl font-semibold text-foreground">{section.title}</h2>
            <ul className="mt-4 list-disc space-y-1 pl-6">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </SectionShell>
  );
}
