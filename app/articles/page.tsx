import { BookOpen, Calendar, User, Eye, MessageCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const articles = [
  {
    id: "shinkansen-evolution",
    title: "新幹線の進化：0系から最新車両まで",
    excerpt:
      "日本の新幹線技術の発展を振り返り、各世代の特徴と技術革新について詳しく解説します。高速鉄道技術の最前線を探ります。",
    author: "鉄道ライター 田中",
    date: "2024年9月1日",
    category: "技術解説",
    readTime: "8分",
    views: 1250,
    comments: 23,
    image: "/shinkansen-evolution-0-series-to-modern.jpg",
    featured: true,
  },
  {
    id: "local-railways",
    title: "地方私鉄の魅力：知られざる名車両たち",
    excerpt: "全国の地方私鉄で活躍する個性豊かな車両たちを紹介。地域に根ざした鉄道の魅力を探ります。",
    author: "鉄道写真家 佐藤",
    date: "2024年8月28日",
    category: "車両紹介",
    readTime: "6分",
    views: 890,
    comments: 15,
    image: "/local-private-railway-train-countryside-japan.jpg",
    featured: false,
  },
  {
    id: "jr-east-e235-series",
    title: "E235系の技術革新：山手線を変えた最新技術",
    excerpt:
      "山手線に導入されたE235系の先進技術について詳しく解説。省エネルギー性能と快適性の両立を実現した設計思想に迫ります。",
    author: "技術ジャーナリスト 山田",
    date: "2024年8月25日",
    category: "技術解説",
    readTime: "10分",
    views: 1580,
    comments: 31,
    image: "/modern-green-jr-train-e235-series.jpg",
    featured: false,
  },
  {
    id: "steam-locomotive-revival",
    title: "蒸気機関車復活の軌跡：観光列車としての新たな役割",
    excerpt: "各地で復活を遂げる蒸気機関車たち。観光資源としての価値と保存・運行の課題について考察します。",
    author: "鉄道史研究家 鈴木",
    date: "2024年8月20日",
    category: "歴史・文化",
    readTime: "7分",
    views: 720,
    comments: 18,
    image: "/steam-locomotive-black-smoke-countryside.jpg",
    featured: false,
  },
  {
    id: "urban-transit-future",
    title: "都市交通の未来：自動運転技術と鉄道",
    excerpt: "自動運転技術の発展が鉄道業界に与える影響を分析。将来の都市交通システムについて展望します。",
    author: "交通政策研究者 高橋",
    date: "2024年8月15日",
    category: "未来展望",
    readTime: "12分",
    views: 950,
    comments: 27,
    image: "/futuristic-automated-train-city-skyline.jpg",
    featured: false,
  },
  {
    id: "maintenance-technology",
    title: "鉄道車両のメンテナンス技術：安全運行を支える技術",
    excerpt: "鉄道の安全運行を支える車両メンテナンス技術の最前線。予防保全から状態監視技術まで幅広く紹介します。",
    author: "メンテナンス技術者 伊藤",
    date: "2024年8月10日",
    category: "技術解説",
    readTime: "9分",
    views: 680,
    comments: 12,
    image: "/train-maintenance-workshop-technicians.jpg",
    featured: false,
  },
]

const categories = ["すべて", "技術解説", "車両紹介", "歴史・文化", "未来展望"]

export default function ArticlesPage() {
  const featuredArticle = articles.find((article) => article.featured)
  const regularArticles = articles.filter((article) => !article.featured)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">鉄道情報サイト</h1>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                ホーム
              </Link>
              <Link href="/search" className="text-foreground hover:text-primary transition-colors">
                車両検索
              </Link>
              <Link href="/articles" className="text-primary font-medium">
                コラム
              </Link>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                コミュニティ
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-card-foreground mb-4 text-balance">鉄道コラム</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              専門家による深い洞察と最新の鉄道技術情報をお届けします
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "すべて" ? "default" : "outline"}
                className={
                  category === "すべて"
                    ? "bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:bg-accent hover:text-accent-foreground bg-transparent"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Article */}
        {featuredArticle && (
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-6">注目の記事</h3>
            <Card className="bg-card border-border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-video lg:aspect-auto">
                  <img
                    src={featuredArticle.image || "/placeholder.svg"}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-primary text-primary-foreground">{featuredArticle.category}</Badge>
                    <Badge variant="outline" className="border-border text-muted-foreground">
                      注目記事
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl mb-4 text-card-foreground text-balance">
                    {featuredArticle.title}
                  </CardTitle>
                  <CardDescription className="text-base mb-6 text-pretty">{featuredArticle.excerpt}</CardDescription>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {featuredArticle.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {featuredArticle.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {featuredArticle.views.toLocaleString()}
                    </div>
                  </div>
                  <Link href={`/articles/${featuredArticle.id}`}>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">記事を読む</Button>
                  </Link>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* Regular Articles */}
        <section>
          <h3 className="text-2xl font-bold text-foreground mb-6">最新記事</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article) => (
              <Link key={article.id} href={`/articles/${article.id}`}>
                <Card className="bg-card border-border hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer h-full">
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-secondary text-secondary-foreground text-xs">
                        {article.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{article.readTime}</span>
                    </div>
                    <CardTitle className="text-lg text-card-foreground text-balance">{article.title}</CardTitle>
                    <CardDescription className="text-sm text-pretty">{article.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span>{article.author}</span>
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {article.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {article.comments}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-border text-foreground hover:bg-accent hover:text-accent-foreground bg-transparent"
          >
            さらに記事を読み込む
          </Button>
        </div>
      </div>
    </div>
  )
}
