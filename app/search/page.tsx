import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Train, MapPin, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// ステップ1で作成したUIコンポーネントをインポート
import { SearchControls } from "@/components/SearchControls"

// 'use client'は削除！
// propsからsearchParamsを受け取る
export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const supabase = createClient()

  // 1. URLからパラメータを読み取る
  const query = (searchParams.q as string) || ""
  const sortBy = (searchParams.sort as string) || "newest"
  const statusFilter = (searchParams.status as string[]) || []
  const manufacturerFilter = (searchParams.manufacturer as string[]) || []

  // 2. Supabaseクエリを動的に組み立てる
  let queryBuilder = supabase.from("vehicles").select("*")

  // 検索クエリ
  if (query) {
    queryBuilder = queryBuilder.or(`series.ilike.%${query}%,number.ilike.%${query}%,routes.ilike.%${query}%`)
  }
  // フィルター
  if (statusFilter.length > 0) {
    queryBuilder = queryBuilder.in("status", statusFilter)
  }
  if (manufacturerFilter.length > 0) {
    queryBuilder = queryBuilder.in("manufacturer", manufacturerFilter)
  }
  // ソート
  if (sortBy === "newest") {
    queryBuilder = queryBuilder.order("year", { ascending: false })
  } else if (sortBy === "oldest") {
    queryBuilder = queryBuilder.order("year", { ascending: true })
  } else if (sortBy === "series") {
    queryBuilder = queryBuilder.order("series", { ascending: true })
  }

  // 3. データベースに問い合わせを実行
  const { data: vehicles, error } = await queryBuilder

  if (error) {
    console.error("Database query error:", error)
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
              <Link href="/" className="text-foreground hover:text-primary">ホーム</Link>
              <Link href="/search" className="text-primary font-medium">車両検索</Link>
              <a href="#" className="text-foreground hover:text-primary">コラム</a>
              <a href="#" className="text-foreground hover:text-primary">コミュニティ</a>
            </nav>
          </div>
        </div>
      </header>

      {/* 4. UIコンポーネントを呼び出す */}
      <SearchControls />

      {/* Results Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">検索結果: {vehicles?.length || 0}件</h2>
            <div className="text-sm text-muted-foreground">{query && `「${query}」の検索結果`}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {vehicles?.map((vehicle) => (
              <Link key={vehicle.id} href={`/vehicle/${vehicle.id}`}>
                <Card className="bg-card border hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer">
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                    <img src={vehicle.image_url || "/placeholder.svg"} alt={vehicle.series} className="w-full h-full object-cover" />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg text-balance">{vehicle.series}</CardTitle>
                      <Badge variant={vehicle.status === "運用中" ? "default" : "secondary"}>
                        {vehicle.status}
                      </Badge>
                    </div>
                    <CardDescription>{vehicle.number}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{vehicle.depot}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Train className="h-4 w-4 text-muted-foreground" />
                        {/* routesカラムがテキスト配列型(text[])の場合を想定 */}
                        <span>{Array.isArray(vehicle.routes) ? vehicle.routes.join("、") : vehicle.routes}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{vehicle.year}年製造</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          {(!vehicles || vehicles.length === 0) && (
            <div className="text-center py-12">
              <Train className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold">検索結果が見つかりません</h3>
              <p className="text-muted-foreground">検索条件を変更して再度お試しください。</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

