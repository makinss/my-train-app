"use client"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Train,
  MapPin,
  Calendar,
  Factory,
  Users,
  MessageCircle,
  Heart,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"

// Mock data - in a real app this would come from a database
const vehicleData: Record<string, any> = {
  "e235-1001": {
    id: "e235-1001",
    series: "E235系1000番台",
    number: "クハE235-1001",
    depot: "東京総合車両センター",
    routes: ["山手線"],
    manufacturer: "川崎重工業",
    year: 2015,
    retirementYear: null,
    status: "運用中",
    formation: "11両編成",
    maxSpeed: "120km/h",
    capacity: "1,890人",
    powerSystem: "直流1,500V",
    images: [
      "/modern-green-jr-train-e235-series.jpg",
      "/e235-interior-modern-led-displays.jpg",
      "/e235-driver-cab-advanced-controls.jpg",
    ],
    description:
      "山手線の新型車両として2015年に導入されたE235系1000番台。省エネルギー性能と快適性を両立した最新技術を搭載しています。",
    specifications: {
      車両長: "20,000mm",
      車両幅: "2,950mm",
      車両高: "4,050mm",
      自重: "約32t",
      定員: "先頭車142人、中間車160人",
      モーター出力: "95kW×4",
    },
    seriesDifferences: [
      {
        title: "0番台との違い",
        content:
          "1000番台は山手線専用仕様として、0番台をベースに改良が加えられています。主な違いは車内案内表示器の配置と座席配色です。",
      },
      {
        title: "E231系からの進化",
        content:
          "従来のE231系と比較して、約10%の省エネルギー化を実現。また、車内の液晶ディスプレイが大型化され、情報提供が充実しています。",
      },
    ],
    interiorFeatures: [
      "大型液晶ディスプレイによる案内表示",
      "LED照明による明るい車内",
      "優先席の色分け表示",
      "車椅子スペースの拡大",
      "防犯カメラの設置",
    ],
  },
  "n700s-j1": {
    id: "n700s-j1",
    series: "N700S系",
    number: "N700S-J1編成",
    depot: "東京新幹線車両センター",
    routes: ["東海道新幹線", "山陽新幹線"],
    manufacturer: "日立製作所",
    year: 2020,
    retirementYear: null,
    status: "運用中",
    formation: "16両編成",
    maxSpeed: "320km/h",
    capacity: "1,323人",
    powerSystem: "交流25,000V",
    images: [
      "/white-bullet-train-n700s-shinkansen.jpg",
      "/n700s-interior-premium-seats.jpg",
      "/n700s-nose-aerodynamic-design.jpg",
    ],
    description: "東海道・山陽新幹線の最新車両N700S系。「Supreme」の名の通り、最高の技術と快適性を追求した新幹線です。",
    specifications: {
      車両長: "先頭車27,350mm、中間車25,000mm",
      車両幅: "3,360mm",
      車両高: "3,650mm",
      最高運転速度: "320km/h",
      定員: "普通車1,123人、グリーン車200人",
      モーター出力: "305kW×64",
    },
    seriesDifferences: [
      {
        title: "N700A系からの進化",
        content:
          "N700A系と比較して、さらなる省エネルギー化と乗り心地の向上を実現。新開発の台車により、より静かで快適な乗車体験を提供します。",
      },
    ],
    interiorFeatures: [
      "全席にコンセント設置",
      "大型荷物置き場の設置",
      "車内Wi-Fiサービス",
      "LED照明による快適な車内環境",
      "改良されたシート設計",
    ],
  },
}

const mockComments = [
  {
    id: 1,
    user: "鉄道ファン123",
    content: "E235系は本当に快適ですね。LED表示も見やすくて、山手線の新時代を感じます。",
    time: "2時間前",
    likes: 12,
  },
  {
    id: 2,
    user: "電車大好き",
    content: "先日乗車しましたが、加速性能が素晴らしいです。E231系との違いがよく分かりました。",
    time: "1日前",
    likes: 8,
  },
  {
    id: 3,
    user: "鉄道写真家",
    content: "車内の液晶ディスプレイが大型化されて、情報が見やすくなりましたね。",
    time: "3日前",
    likes: 15,
  },
]

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState(mockComments)

  const vehicle = vehicleData[params.id]

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Train className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">車両が見つかりません</h2>
          <p className="text-muted-foreground mb-4">指定された車両情報は存在しません。</p>
          <Link href="/search">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">検索ページに戻る</Button>
          </Link>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % vehicle.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length)
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
              <Train className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">鉄道情報サイト</h1>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                ホーム
              </Link>
              <Link href="/search" className="text-foreground hover:text-primary transition-colors">
                車両検索
              </Link>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                コラム
              </a>
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
            <Link href="/search" className="text-muted-foreground hover:text-primary">
              車両検索
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{vehicle.series}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card className="bg-card border-border">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img
                    src={vehicle.images[currentImageIndex] || "/placeholder.svg"}
                    alt={`${vehicle.series} - 画像 ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {vehicle.images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                    </>
                  )}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {vehicle.images.map((_: any, index: number) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? "bg-white" : "bg-white/50"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-card-foreground mb-2">{vehicle.series}</h2>
                      <p className="text-xl text-muted-foreground">{vehicle.number}</p>
                    </div>
                    <Badge
                      variant={vehicle.status === "運用中" ? "default" : "secondary"}
                      className={
                        vehicle.status === "運用中"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }
                    >
                      {vehicle.status}
                    </Badge>
                  </div>
                  <p className="text-card-foreground text-pretty">{vehicle.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">基本情報</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">所属基地</p>
                      <p className="font-medium text-card-foreground">{vehicle.depot}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Train className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">運用路線</p>
                      <p className="font-medium text-card-foreground">{vehicle.routes.join("、")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Factory className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">製造会社</p>
                      <p className="font-medium text-card-foreground">{vehicle.manufacturer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">製造年</p>
                      <p className="font-medium text-card-foreground">{vehicle.year}年</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">編成</p>
                      <p className="font-medium text-card-foreground">{vehicle.formation}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Train className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">最高速度</p>
                      <p className="font-medium text-card-foreground">{vehicle.maxSpeed}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Specifications */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">詳細仕様</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(vehicle.specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center py-2 border-b border-border last:border-b-0"
                    >
                      <span className="text-muted-foreground">{key}</span>
                      <span className="font-medium text-card-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Series Differences */}
            {vehicle.seriesDifferences && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">番台ごとの違い</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {vehicle.seriesDifferences.map((diff: any, index: number) => (
                    <div key={index}>
                      <h4 className="font-semibold text-card-foreground mb-2">{diff.title}</h4>
                      <p className="text-muted-foreground text-pretty">{diff.content}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Interior Features */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">車内設備</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {vehicle.interiorFeatures.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-card-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">車両情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">定員</p>
                  <p className="font-medium text-card-foreground">{vehicle.capacity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">電源方式</p>
                  <p className="font-medium text-card-foreground">{vehicle.powerSystem}</p>
                </div>
                {vehicle.retirementYear && (
                  <div>
                    <p className="text-sm text-muted-foreground">廃車年</p>
                    <p className="font-medium text-card-foreground">{vehicle.retirementYear}年</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Related Links */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">関連リンク</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/search" className="block">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-border text-foreground hover:bg-accent hover:text-accent-foreground bg-transparent"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    検索結果に戻る
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full justify-start border-border text-foreground hover:bg-accent hover:text-accent-foreground bg-transparent"
                >
                  同じ系列の車両を見る
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-border text-foreground hover:bg-accent hover:text-accent-foreground bg-transparent"
                >
                  同じ路線の車両を見る
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-12">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <MessageCircle className="h-5 w-5" />
                みんなのコメント ({comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Comment Form */}
              <div className="space-y-3">
                <Textarea
                  placeholder="この車両についてのコメントを投稿してください..."
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
