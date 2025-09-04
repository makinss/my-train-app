"use client"

import { useState } from "react"
import { Users, Plus, Heart, MessageCircle, Share2, Camera, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const mockPosts = [
  {
    id: 1,
    user: {
      name: "鉄道ファン123",
      avatar: "/user-avatar-1.jpg",
      verified: true,
    },
    content:
      "今日は久しぶりにE5系はやぶさに乗車！やっぱり新幹線は最高ですね。320km/hの速度感は何度体験しても感動します。",
    images: ["/green-white-e5-series-hayabusa-shinkansen.jpg"],
    location: "東北新幹線 東京駅",
    time: "2時間前",
    likes: 24,
    comments: 5,
    shares: 2,
    liked: false,
    tags: ["#新幹線", "#E5系", "#はやぶさ"],
  },
  {
    id: 2,
    user: {
      name: "電車大好き",
      avatar: "/user-avatar-2.jpg",
      verified: false,
    },
    content:
      "地元の路線で新型車両を発見！323系の大阪環状線仕様です。オレンジ色が鮮やかで、車内も快適でした。写真撮影してきました📸",
    images: ["/orange-jr-train-323-series-osaka-loop-line.jpg"],
    location: "大阪環状線 大阪駅",
    time: "4時間前",
    likes: 18,
    comments: 3,
    shares: 1,
    liked: true,
    tags: ["#323系", "#大阪環状線", "#JR西日本"],
  },
  {
    id: 3,
    user: {
      name: "鉄道写真家",
      avatar: "/user-avatar-3.jpg",
      verified: true,
    },
    content:
      "夕日をバックにした蒸気機関車の写真が撮れました。感動的な瞬間でした。やはり蒸気機関車には特別な魅力がありますね。",
    images: ["/steam-locomotive-black-smoke-countryside.jpg"],
    location: "秩父鉄道",
    time: "6時間前",
    likes: 45,
    comments: 12,
    shares: 8,
    liked: false,
    tags: ["#蒸気機関車", "#鉄道写真", "#秩父鉄道"],
  },
  {
    id: 4,
    user: {
      name: "新幹線マニア",
      avatar: "/user-avatar-4.jpg",
      verified: false,
    },
    content:
      "N700S系の車内設備が素晴らしい！全席コンセント、Wi-Fi完備で長距離移動も快適です。技術の進歩を実感しました。",
    images: ["/n700s-interior-premium-seats.jpg"],
    location: "東海道新幹線",
    time: "8時間前",
    likes: 31,
    comments: 7,
    shares: 4,
    liked: true,
    tags: ["#N700S", "#新幹線", "#車内設備"],
  },
  {
    id: 5,
    user: {
      name: "ローカル線愛好家",
      avatar: "/user-avatar-5.jpg",
      verified: false,
    },
    content:
      "今日は地方私鉄の旅。のどかな風景の中を走る電車は、都市部とは違った魅力がありますね。地域に根ざした鉄道の大切さを感じます。",
    images: ["/local-private-railway-train-countryside-japan.jpg"],
    location: "地方私鉄",
    time: "12時間前",
    likes: 22,
    comments: 6,
    shares: 3,
    liked: false,
    tags: ["#地方私鉄", "#ローカル線", "#鉄道旅"],
  },
]

export default function CommunityPage() {
  const [posts, setPosts] = useState(mockPosts)
  const [newPost, setNewPost] = useState("")
  const [newPostLocation, setNewPostLocation] = useState("")
  const [showPostDialog, setShowPostDialog] = useState(false)

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  const handleNewPost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        user: {
          name: "ゲストユーザー",
          avatar: "/user-avatar-guest.jpg",
          verified: false,
        },
        content: newPost,
        images: [],
        location: newPostLocation || "未設定",
        time: "たった今",
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false,
        tags: [],
      }
      setPosts([post, ...posts])
      setNewPost("")
      setNewPostLocation("")
      setShowPostDialog(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Users className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">鉄道情報サイト</h1>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                ホーム
              </Link>
              <Link href="/search" className="text-foreground hover:text-primary transition-colors">
                車両検索
              </Link>
              <Link href="/articles" className="text-foreground hover:text-primary transition-colors">
                コラム
              </Link>
              <Link href="/community" className="text-primary font-medium">
                コミュニティ
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-card py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-card-foreground mb-4 text-balance">鉄道コミュニティ</h2>
            <p className="text-lg text-muted-foreground text-pretty">鉄道ファン同士で体験や写真をシェアしよう</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Post Creation Card */}
          <Card className="bg-card border-border mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">ゲ</AvatarFallback>
                </Avatar>
                <Dialog open={showPostDialog} onOpenChange={setShowPostDialog}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 justify-start text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground bg-transparent"
                    >
                      今日の鉄道体験をシェアしよう...
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border">
                    <DialogHeader>
                      <DialogTitle className="text-card-foreground">新しい投稿を作成</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Textarea
                        placeholder="今日の鉄道体験をシェアしてください..."
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        className="min-h-[120px] bg-input border-border"
                      />
                      <Input
                        placeholder="場所を追加（例：山手線 新宿駅）"
                        value={newPostLocation}
                        onChange={(e) => setNewPostLocation(e.target.value)}
                        className="bg-input border-border"
                      />
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-border text-foreground hover:bg-accent hover:text-accent-foreground bg-transparent"
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          写真を追加
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-border text-foreground hover:bg-accent hover:text-accent-foreground bg-transparent"
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          位置情報
                        </Button>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setShowPostDialog(false)}
                          className="border-border text-foreground hover:bg-accent hover:text-accent-foreground bg-transparent"
                        >
                          キャンセル
                        </Button>
                        <Button
                          onClick={handleNewPost}
                          disabled={!newPost.trim()}
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          投稿する
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border text-foreground hover:bg-accent hover:text-accent-foreground bg-transparent"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  写真
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border text-foreground hover:bg-accent hover:text-accent-foreground bg-transparent"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  場所
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Posts Timeline */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="bg-card border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {post.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-card-foreground">{post.user.name}</span>
                        {post.user.verified && (
                          <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
                            認証済み
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{post.time}</span>
                        {post.location && (
                          <>
                            <span>•</span>
                            <MapPin className="h-3 w-3" />
                            <span>{post.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-card-foreground mb-4 text-pretty">{post.content}</p>

                  {/* Post Images */}
                  {post.images.length > 0 && (
                    <div className="mb-4">
                      <div className="grid grid-cols-1 gap-2">
                        {post.images.map((image, index) => (
                          <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
                            <img
                              src={image || "/placeholder.svg"}
                              alt="投稿画像"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Post Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-secondary text-secondary-foreground text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="flex items-center gap-6 pt-3 border-t border-border">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className={`h-8 px-3 ${
                        post.liked ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${post.liked ? "fill-current" : ""}`} />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-3 text-muted-foreground hover:text-primary">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-3 text-muted-foreground hover:text-primary">
                      <Share2 className="h-4 w-4 mr-2" />
                      {post.shares}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button
              variant="outline"
              size="lg"
              className="border-border text-foreground hover:bg-accent hover:text-accent-foreground bg-transparent"
            >
              さらに投稿を読み込む
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Dialog open={showPostDialog} onOpenChange={setShowPostDialog}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="rounded-full w-14 h-14 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>
    </div>
  )
}
