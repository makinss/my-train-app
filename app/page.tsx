import { createClient } from "@/lib/supabase/server"
import { Search, Train, BookOpen, Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// サーバーアクションとリダイレクト機能
import { redirect } from 'next/navigation'
import 'server-only'

export default async function HomePage() {
  const supabase = createClient()

  // 'series'テーブルから最新のデータを3件取得
  const { data: seriesList, error } = await supabase
    .from('series')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3)

  if (error) {
    console.error("Failed to fetch series list:", error)
  }
  
  // 検索用のサーバーアクション
  const searchVehicles = async (formData: FormData) => {
    'use server'
    const query = formData.get('query') as string
    if (query) {
      redirect(`/search?q=${encodeURIComponent(query)}`)
    }
  }

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
              <Link href="/search" className="text-foreground hover:text-primary transition-colors">
                車両検索
              </Link>
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
          <form action={searchVehicles} className="max-w-2xl mx-auto mb-8">
            <div className="flex gap-2">
              <Input
                name="query"
                placeholder="車両検索（例：E235系、山手線）"
                className="flex-1 h-12 text-lg bg-input border-border"
                required
              />
              <Button type="submit" size="lg" className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90">
                <Search className="h-5 w-5 mr-2" />
                検索
              </Button>
            </div>
          </form>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary">路線</Badge>
            <Badge variant="secondary">形式</Badge>
            <Badge variant="secondary">車両番号</Badge>
            <Badge variant="secondary">製造年</Badge>
            <Badge variant="secondary">所属基地</Badge>
          </div>
        </div>
      </section>

      {/* New Vehicles Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">新着形式</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seriesList?.map((series) => (
              <Card key={series.id} className="bg-card border-border hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img
                    src={series.image_url || "/placeholder.svg"}
                    alt={series.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-card-foreground">{series.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">{series.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/series/${series.id}`}>詳細を見る</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Columns & Community (ここはまだダミーデータです) */}
      <section className="py-16 bg-muted">
        {/* ... */}
      </section>
      <section className="py-16">
        {/* ... */}
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
              {/* ... */}
            </div>
            <div>
              <h5 className="font-semibold text-sidebar-foreground mb-3">コミュニティ</h5>
              {/* ... */}
            </div>
            <div>
              <h5 className="font-semibold text-sidebar-foreground mb-3">お問い合わせ</h5>
              {/* ... */}
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
