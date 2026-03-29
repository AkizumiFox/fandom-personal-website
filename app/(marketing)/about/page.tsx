import Link from "next/link";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/typography/section-heading";

export default function AboutPage() {
  return (
    <SectionShell className="py-10 md:py-14">
      <SectionHeading title="秋墨｜一個慢熱的人類（跟一隻狐狸）" />
      <p className="mb-6 text-sm text-muted">
        延伸閱讀：
        <Link href="/writing/keywords-100" className="ml-1 underline underline-offset-2 transition hover:text-foreground">
          構成我的 100 個關鍵詞
        </Link>
      </p>
      <div className="mx-auto max-w-4xl space-y-10 text-[1.06rem] leading-9 text-muted md:text-[1.14rem]">
        <section>
          <p>
            嗨，我是秋墨。主要以黑狐狸的樣子出沒，但老實說，我有時候覺得自己更像蜥蜴，偶爾又像一隻白老鼠。
            目前在台北讀大四，延畢預備中，活動範圍通常在公館，偶爾漂去中壢。
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-foreground">我是什麼樣的人？</h2>
          <p className="mt-4">
            我偏慢熱，也有點怕生。在不熟的人多的場合會緊張，而且因為臉盲很嚴重，有時候看起來像是冷，
            其實是我真的認不出你。如果你願意多跟我講幾次話，我會慢慢打開。
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-foreground">毛毛與獸圈日常</h2>
          <p className="mt-4">
            現在有一隻全毛狐狸、一隻半毛蜥蜴。努力念書其中一個超現實原因，就是想委託更多不同工作室的毛。
            熟人應該都聽過我每天哀嚎好想買毛，審美上我通常偏好美系多於日系。
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-foreground">文學腦袋</h2>
          <p className="mt-4">
            平常主要看台灣近代文學、純文學，特別喜歡極短篇與短篇。最近在練習寫極短篇，目標先累積 50 篇，
            再考慮自費出一本自己的短篇集。成熟的作品會慢慢放到我的
            <a
              href="/bookshelf"
              target="_blank"
              rel="noreferrer"
              className="ml-1 underline underline-offset-2 transition hover:text-foreground"
            >
              書架
            </a>
            。
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-foreground">吃吃喝喝人生</h2>
          <p className="mt-4">
            我很愛探店，雖然預算有限，吃的多半是平民小吃；但只要時間和錢都允許，我很樂意到處吃。
            我曾經把台北必比登整輪吃完，也做了
            <a
              href="https://docs.google.com/spreadsheets/d/1P_i7hgWvSejgQaEGvacGZxL5GqCqXbqNflIs8T9o-Ts/edit?gid=0#gid=0"
              target="_blank"
              rel="noreferrer"
              className="ml-1 underline underline-offset-2 transition hover:text-foreground"
            >
              評價列表
            </a>
            。
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-foreground">會讓我眼睛發亮的東西</h2>
          <ul className="mt-4 list-disc space-y-1 pl-6">
            <li>音樂劇（百老匯系）</li>
            <li>德州撲克、日本麻將、保齡球、飛鏢</li>
            <li>遊戲、動畫、網路文化</li>
            <li>獸文化與角色創作</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-foreground">如果你想來聊聊</h2>
          <p className="mt-4">
            非常歡迎你來找我聊天。聊毛、聊吃的、聊小說、聊音樂劇、聊課業（資工／經濟／哲學）都可以。
            我不一定是最會開話題的人，但我會認真聽、認真回。
          </p>
        </section>

        <section className="hidden">
          <h2 className="text-3xl font-semibold text-foreground">構成我的 100 個關鍵詞</h2>

          <div className="mt-6 space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground">音樂劇</h3>
              <ul className="mt-3 list-disc space-y-1 pl-6">
                <li>Chicago</li>
                <li>The Lion King</li>
                <li>Next to Normal</li>
                <li>Cats</li>
                <li>Miss Saigon</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground">音樂</h3>
              <ul className="mt-3 list-disc space-y-1 pl-6">
                <li>蘇芮《酒矸倘賣無》</li>
                <li>ABBA《Dancing Queen》</li>
                <li>ABBA《Gimme! Gimme! Gimme!》</li>
                <li>ABBA《Money, Money, Money》</li>
                <li>蘇打綠《他舉起右手點名》</li>
                <li>阿密特《母系社會》</li>
                <li>Lady Gaga《Abracadabra》</li>
                <li>節奏天國《僕らの時代》</li>
                <li>何瑞康《刑者》</li>
                <li>Creepy Nuts《かつて天才だった俺たちへ》</li>
                <li>藍心湄《濃粧搖滾》</li>
                <li>伍佰《挪威的森林》</li>
                <li>ナナヲアカリ《奇縁ロマンス》</li>
                <li>Mili《world.execte(me); (Key Ingredient ver.) (Instrumental)》</li>
                <li>mihimaru GT《気分上々↑↑》</li>
                <li>ALI《Wild Side》</li>
                <li>MaiMai《夢花火》</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground">遊戲</h3>
              <ul className="mt-3 list-disc space-y-1 pl-6">
                <li>Celeste</li>
                <li>Chunithm</li>
                <li>太鼓達人</li>
                <li>Deemo</li>
                <li>Cytus</li>
                <li>Cytus II</li>
                <li>IIDX</li>
                <li>DANCERUSH STARDOM</li>
                <li>寶可夢 日/月</li>
                <li>寶可夢 阿爾宙斯</li>
                <li>大家的節奏天國</li>
                <li>Picross 3D</li>
                <li>TETRIS THE GRAND MASTER</li>
                <li>日本麻將（天鳳/雀魂）</li>
                <li>德州撲克（Natural 8）</li>
                <li>保齡球</li>
                <li>飛鏢</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground">動畫</h3>
              <ul className="mt-3 list-disc space-y-1 pl-6">
                <li>小林家的龍女僕</li>
                <li>動物方城市</li>
                <li>齊木楠雄的災難</li>
                <li>別對映像研出手！</li>
                <li>輝夜姬想讓人告白</li>
                <li>藍色時期</li>
                <li>入間同學入魔了！</li>
                <li>來自深淵</li>
                <li>孤獨搖滾</li>
                <li>涼宮春日的憂鬱</li>
                <li>擅長逃跑的殿下</li>
                <li>魔法少女小圓</li>
                <li>膽大黨</li>
                <li>K-ON！輕音部</li>
                <li>在沖繩喜歡上的女孩方言講得太過令人困擾</li>
                <li>怪人的沙拉碗</li>
                <li>棋靈王</li>
                <li>Carole & Tuesday</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground">網路</h3>
              <ul className="mt-3 list-disc space-y-1 pl-6">
                <li>LNG</li>
                <li>台灣通勤第一品牌</li>
                <li>Ryan Higa</li>
                <li>桃鈴ねね</li>
                <li>角巻わため</li>
                <li>QuizKnock</li>
                <li>2015 年代左右的 YouTuber 跟實況圈</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground">喜劇</h3>
              <ul className="mt-3 list-disc space-y-1 pl-6">
                <li>華旭《天爆幹黑》</li>
                <li>藍恩、華旭、品喬《三流笑話》</li>
                <li>Bo Burnham《Make Happy》</li>
                <li>Bo Burnham《The Inside Outtakes》</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground">影視作品</h3>
              <ul className="mt-3 list-disc space-y-1 pl-6">
                <li>The Good Place</li>
                <li>Lucifer</li>
                <li>Silicon Valley</li>
                <li>The Big Bang Theory</li>
                <li>Zootopia</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground">書</h3>
              <ul className="mt-3 list-disc space-y-1 pl-6">
                <li>寺尾哲也《子彈是餘生》</li>
                <li>白先勇《Danny Boy》</li>
                <li>林奕含《房思琪的初戀樂園》</li>
                <li>奧爾德斯·赫胥黎《美麗新世界》</li>
                <li>李奕樵《遊戲自黑暗》</li>
                <li>吳明益《天橋上的魔術師》</li>
                <li>金庸《笑傲江湖》</li>
                <li>夏慕聰《軍犬》</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground">其他書</h3>
              <ul className="mt-3 list-disc space-y-1 pl-6">
                <li>毛慶生《古典新論一》</li>
                <li>Joshua Angrist &amp; Jörn-Steffen Pischke《Mastering &apos;Metrics》</li>
                <li>劉邦鋒《由片語學習C程式設計（第二版）》</li>
                <li>Jay Cummings《Real Analysis》</li>
                <li>《米其林指南》・〈必比登推介〉</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground">課程</h3>
              <ul className="mt-3 list-disc space-y-1 pl-6">
                <li>蔡國榮《微積分》</li>
                <li>蔡國榮《線性代數導論》</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground">其他</h3>
              <ul className="mt-3 list-disc space-y-1 pl-6">
                <li>獸文化</li>
                <li>酉心麥面（麵店）</li>
                <li>アトリエあまのじゃく（獸裝工作室）</li>
                <li>Dragon X2（獸裝工作室）</li>
                <li>飆飆先生（獸繪師）</li>
                <li>狼尾（獸繪師）</li>
                <li>強化學習</li>
                <li>辯論社</li>
                <li>武陵高中</li>
                <li>台灣大學</li>
                <li>LaTeX（排版語言）</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-foreground">社群</h2>
          <ul className="mt-4 flex flex-wrap gap-6">
            <li>
              <a href="https://www.facebook.com/AkizumiFox" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-foreground">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://x.com/AkizumiFox" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-foreground">
                Twitter / X
              </a>
            </li>
            <li>
              <a href="https://github.com/AkizumiFox" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-foreground">
                GitHub
              </a>
            </li>
          </ul>
        </section>
      </div>
    </SectionShell>
  );
}
