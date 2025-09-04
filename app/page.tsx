import { Search, Train, BookOpen, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Train className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">鉄道情報サイト</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                車両検索
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                新着車両
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                コラム
              </a>
              <Link href="/community" className="text-foreground hover:text-primary transition-colors">
                コミュニティ
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section with Search */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-card-foreground mb-4 text-balance">日本全国の鉄道車両を検索</h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">路線、形式、車両番号から詳細情報を見つけよう</p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex gap-2">
              <Input
                placeholder="車両検索（例：E235系、山手線、クハE235-1）"
                className="flex-1 h-12 text-lg bg-input border-border"
              />
              <Button size="lg" className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90">
                <Search className="h-5 w-5 mr-2" />
                検索
              </Button>
            </div>
          </div>

          {/* Search Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              路線
            </Badge>
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              形式
            </Badge>
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              車両番号
            </Badge>
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              製造年
            </Badge>
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              所属基地
            </Badge>
          </div>
        </div>
      </section>

      {/* New Vehicles Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">新着車両</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "E235系1000番台",
                description: "山手線新型車両",
                depot: "東京総合車両センター",
                image: "/modern-green-jr-train-e235-series.jpg",
              },
              {
                title: "N700S系",
                description: "東海道新幹線最新車両",
                depot: "東京新幹線車両センター",
                image: "/white-bullet-train-n700s-shinkansen.jpg",
              },
              {
                title: "323系",
                description: "大阪環状線新型車両",
                depot: "森ノ宮電車区",
                image: "/orange-jr-train-323-series-osaka-loop-line.jpg",
              },
            ].map((vehicle, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img
                    src={vehicle.image || "/placeholder.svg"}
                    alt={vehicle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-card-foreground">{vehicle.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{vehicle.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">所属: {vehicle.depot}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border text-foreground hover:bg-accent hover:text-accent-foreground bg-transparent"
                  >
                    詳細を見る
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Columns Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <BookOpen className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">人気のコラム</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "新幹線の進化：0系から最新車両まで",
                excerpt: "日本の新幹線技術の発展を振り返り、各世代の特徴と技術革新について詳しく解説します。",
                author: "鉄道ライター 田中",
                date: "2024年9月1日",
                image: "/shinkansen-evolution-0-series-to-modern.jpg",
              },
              {
                title: "地方私鉄の魅力：知られざる名車両たち",
                excerpt: "全国の地方私鉄で活躍する個性豊かな車両たちを紹介。地域に根ざした鉄道の魅力を探ります。",
                author: "鉄道写真家 佐藤",
                date: "2024年8月28日",
                image: "/local-private-railway-train-countryside-japan.jpg",
              },
            ].map((article, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow">
                <div className="flex gap-4 p-6">
                  <div className="flex-shrink-0">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 text-card-foreground text-balance">{article.title}</CardTitle>
                    <CardDescription className="text-sm mb-3 text-pretty">{article.excerpt}</CardDescription>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{article.author}</span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Posts Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <Users className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">みんなの投稿</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                user: "鉄道ファン123",
                content: "今日は久しぶりにE5系はやぶさに乗車！やっぱり新幹線は最高ですね。",
                time: "2時間前",
                likes: 12,
              },
              {
                user: "電車大好き",
                content: "地元の路線で新型車両を発見！写真撮影してきました。",
                time: "4時間前",
                likes: 8,
              },
              {
                user: "鉄道写真家",
                content: "夕日をバックにした蒸気機関車の写真が撮れました。感動的な瞬間でした。",
                time: "6時間前",
                likes: 25,
              },
            ].map((post, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs text-primary-foreground font-bold">{post.user.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-card-foreground text-sm">{post.user}</p>
                      <p className="text-xs text-muted-foreground">{post.time}</p>
                    </div>
                  </div>
                  <p className="text-sm text-card-foreground mb-3 text-pretty">{post.content}</p>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-primary">
                      ♥ {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-primary">
                      コメント
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sidebar border-t border-sidebar-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Train className="h-6 w-6 text-sidebar-primary" />
                <h4 className="font-bold text-sidebar-foreground">鉄道情報サイト</h4>
              </div>
              <p className="text-sm text-sidebar-foreground">日本全国の鉄道車両情報を提供する総合サイトです。</p>
            </div>
            <div>
              <h5 className="font-semibold text-sidebar-foreground mb-3">サイトマップ</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-sidebar-foreground hover:text-sidebar-primary">
                    車両検索
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sidebar-foreground hover:text-sidebar-primary">
                    新着情報
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sidebar-foreground hover:text-sidebar-primary">
                    コラム
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-sidebar-foreground mb-3">コミュニティ</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-sidebar-foreground hover:text-sidebar-primary">
                    投稿一覧
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sidebar-foreground hover:text-sidebar-primary">
                    ユーザー登録
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sidebar-foreground hover:text-sidebar-primary">
                    利用規約
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-sidebar-foreground mb-3">お問い合わせ</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-sidebar-foreground hover:text-sidebar-primary">
                    サポート
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sidebar-foreground hover:text-sidebar-primary">
                    プライバシーポリシー
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-sidebar-border mt-8 pt-8 text-center">
            <p className="text-sm text-sidebar-foreground">© 2024 鉄道情報サイト. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
