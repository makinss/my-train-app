"use client"

import { useState } from "react"
import { Calendar, User, Eye, MessageCircle, Heart, Share2, BookOpen, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"

// Mock article data
const articleData: Record<string, any> = {
  "shinkansen-evolution": {
    id: "shinkansen-evolution",
    title: "新幹線の進化：0系から最新車両まで",
    author: "鉄道ライター 田中",
    date: "2024年9月1日",
    category: "技術解説",
    readTime: "8分",
    views: 1250,
    comments: 23,
    image: "/shinkansen-evolution-0-series-to-modern.jpg",
    content: `
      <p>1964年の東海道新幹線開業から60年。日本の新幹線技術は世界の高速鉄道をリードし続けています。この記事では、初代0系から最新のN700S系まで、新幹線の技術革新の歴史を振り返ります。</p>

      <h2>0系新幹線：夢の超特急の誕生</h2>
      <p>1964年10月1日、東海道新幹線が開業しました。当時の最高速度210km/hは世界最速であり、「夢の超特急」と呼ばれました。0系の特徴的な丸い鼻先は、空気抵抗を考慮した当時の最先端設計でした。</p>

      <p>0系の技術的な特徴：</p>
      <ul>
        <li>軽量化されたアルミニウム車体</li>
        <li>高速走行に対応した台車設計</li>
        <li>自動列車制御装置（ATC）の導入</li>
        <li>密閉式車体による快適性の向上</li>
      </ul>

      <h2>100系・300系：快適性と高速化の追求</h2>
      <p>1985年に登場した100系では、2階建て車両の導入により快適性が大幅に向上しました。続く300系（1992年）では、270km/hの高速運転を実現し、「のぞみ」サービスが開始されました。</p>

      <h2>500系：究極の高速化への挑戦</h2>
      <p>1997年に登場した500系は、320km/hでの営業運転を目指した究極の高速車両でした。航空機を思わせる流線型の車体は、空気抵抗を最小限に抑える設計となっています。</p>

      <h2>N700系・N700A系：環境性能と快適性の両立</h2>
      <p>2007年のN700系では、車体傾斜システムの導入により、カーブでの速度向上を実現しました。2013年のN700A系では、さらなる省エネルギー化が図られています。</p>

      <h2>N700S系：新幹線技術の集大成</h2>
      <p>2020年に営業運転を開始したN700S系は、「Supreme（最高の）」の名の通り、これまでの技術を集大成した車両です。</p>

      <p>N700S系の主な特徴：</p>
      <ul>
        <li>軽量化による10%の省エネルギー化</li>
        <li>大容量バッテリーによる自走機能</li>
        <li>全席コンセント設置</li>
        <li>車内Wi-Fiサービス</li>
        <li>大型荷物置き場の設置</li>
      </ul>

      <h2>未来への展望</h2>
      <p>現在開発中のリニア中央新幹線では、時速500km/hでの営業運転が予定されています。また、既存の新幹線でも、さらなる高速化と環境性能の向上が続けられています。</p>

      <p>新幹線の技術革新は、単なる高速化だけでなく、安全性、快適性、環境性能の全てを向上させる総合的な取り組みです。これからも世界をリードする日本の新幹線技術に注目していきましょう。</p>
    `,
  },
  "local-railways": {
    id: "local-railways",
    title: "地方私鉄の魅力：知られざる名車両たち",
    author: "鉄道写真家 佐藤",
    date: "2024年8月28日",
    category: "車両紹介",
    readTime: "6分",
    views: 890,
    comments: 15,
    image: "/local-private-railway-train-countryside-japan.jpg",
    content: `
      <p>日本全国には、JRとは異なる魅力を持つ地方私鉄が数多く存在します。これらの鉄道会社では、地域の特色を活かした個性豊かな車両が活躍しています。</p>

      <h2>観光列車としての地方私鉄</h2>
      <p>近年、地方私鉄では観光客誘致のため、特色ある観光列車の運行が盛んになっています。車窓からの景色を楽しめる展望車両や、地域の食材を使った車内販売など、様々な工夫が凝らされています。</p>

      <h2>レトロ車両の保存と活用</h2>
      <p>多くの地方私鉄では、古い車両を大切に保存・活用しています。昭和時代の車両が現役で活躍する路線もあり、鉄道ファンにとって貴重な存在となっています。</p>

      <h2>地域密着型の車両デザイン</h2>
      <p>地方私鉄の車両には、その地域の特産品や観光地をモチーフにしたデザインが施されることがあります。これらの車両は、地域のシンボルとしても親しまれています。</p>
    `,
  },
}

const mockComments = [
  {
    id: 1,
    user: "新幹線ファン",
    content:
      "N700S系の技術革新について詳しく解説されていて、とても勉強になりました。特にバッテリー自走機能は画期的ですね。",
    time: "2時間前",
    likes: 15,
  },
  {
    id: 2,
    user: "鉄道技術者",
    content: "0系から現在までの技術の進歩が良くまとめられています。リニア中央新幹線の実現が楽しみです。",
    time: "5時間前",
    likes: 22,
  },
  {
    id: 3,
    user: "歴史好き",
    content: "新幹線の歴史を振り返ると、日本の技術力の高さを改めて実感します。素晴らしい記事でした。",
    time: "1日前",
    likes: 18,
  },
]

export default function ArticleDetailPage({ params }: { params: { id: string } }) {
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState(mockComments)
  const [liked, setLiked] = useState(false)

  const article = articleData[params.id]

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">記事が見つかりません</h2>
          <p className="text-muted-foreground mb-4">指定された記事は存在しません。</p>
          <Link href="/articles">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">記事一覧に戻る</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: "ゲストユーザー",
        content: newComment,
        time: "たった今",
        likes: 0,
      }
      setComments([comment, ...comments])
      setNewComment("")
    }
  }

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

      {/* Breadcrumb */}
      <div className="bg-muted py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary">
              ホーム
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/articles" className="text-muted-foreground hover:text-primary">
              コラム
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{article.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              記事一覧に戻る
            </Link>

            <div className="mb-6">
              <Badge className="bg-primary text-primary-foreground mb-4">{article.category}</Badge>
              <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">{article.title}</h1>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {article.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {article.date}
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                {article.views.toLocaleString()} 回閲覧
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                {comments.length} コメント
              </div>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <Button
                variant={liked ? "default" : "outline"}
                onClick={() => setLiked(!liked)}
                className={
                  liked
                    ? "bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:bg-accent hover:text-accent-foreground bg-transparent"
                }
              >
                <Heart className={`h-4 w-4 mr-2 ${liked ? "fill-current" : ""}`} />
                いいね
              </Button>
              <Button
                variant="outline"
                className="border-border text-foreground hover:bg-accent hover:text-accent-foreground bg-transparent"
              >
                <Share2 className="h-4 w-4 mr-2" />
                シェア
              </Button>
            </div>

            {/* Featured Image */}
            <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-8">
              <img
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div
              className="text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: article.content
                  .replace(/<h2>/g, '<h2 class="text-2xl font-bold text-foreground mt-8 mb-4">')
                  .replace(/<p>/g, '<p class="mb-4 text-pretty">')
                  .replace(/<ul>/g, '<ul class="mb-4 pl-6 space-y-2">')
                  .replace(/<li>/g, '<li class="list-disc">'),
              }}
            />
          </div>

          {/* Article Footer */}
          <div className="border-t border-border pt-8 mb-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant={liked ? "default" : "outline"}
                  onClick={() => setLiked(!liked)}
                  className={
                    liked
                      ? "bg-primary text-primary-foreground"
                      : "border-border text-foreground hover:bg-accent hover:text-accent-foreground bg-transparent"
                  }
                >
                  <Heart className={`h-4 w-4 mr-2 ${liked ? "fill-current" : ""}`} />
                  いいね
                </Button>
                <Button
                  variant="outline"
                  className="border-border text-foreground hover:bg-accent hover:text-accent-foreground bg-transparent"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  シェア
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">読了時間: {article.readTime}</div>
            </div>
          </div>

          {/* Comments Section */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <MessageCircle className="h-5 w-5" />
                コメント ({comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Comment Form */}
              <div className="space-y-3">
                <Textarea
                  placeholder="この記事についてのコメントを投稿してください..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[100px] bg-input border-border"
                />
                <Button
                  onClick={handleCommentSubmit}
                  disabled={!newComment.trim()}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  コメントを投稿
                </Button>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b border-border pb-4 last:border-b-0">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {comment.user.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-card-foreground text-sm">{comment.user}</span>
                          <span className="text-xs text-muted-foreground">{comment.time}</span>
                        </div>
                        <p className="text-card-foreground text-sm mb-2 text-pretty">{comment.content}</p>
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-muted-foreground hover:text-primary"
                          >
                            <Heart className="h-4 w-4 mr-1" />
                            {comment.likes}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-muted-foreground hover:text-primary"
                          >
                            返信
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
