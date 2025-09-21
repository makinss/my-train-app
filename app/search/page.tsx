


import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Train } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SearchControls } from "@/components/Search Controls"

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const supabase = createClient()

  // 1. URLから検索クエリを取得
  const query = (searchParams.q as string) || ""

  let seriesList = []
  let error = null

  // 検索クエリがある場合のみデータベースを検索
  if (query) {
    // 2. 'series' テーブルを検索するように修正
    const { data, error: queryError } = await supabase
      .from('series')
      .select('*')
      // 3. 'name' と 'description' カラムを対象に検索
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    
    seriesList = data || []
    error = queryError
  }
  
  if (error) {
    console.error("Search error:", error)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* (Header部分は必要に応じて元のコードからコピーしてください) */}
      
      {/* 検索コントロール */}
      <SearchControls />

      {/* Results Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">検索結果: {seriesList.length}件</h2>
            <div className="text-sm text-muted-foreground">{query && `「${query}」の検索結果`}</div>
          </div>
          
          {seriesList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* 4. 'series' のデータを使ってカードを表示 */}
              {seriesList.map((series) => (
                <Link key={series.id} href={`/series/${series.id}`}>
                  <Card className="bg-card border-border hover:shadow-lg transition-all duration-200 cursor-pointer">
                    <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                      <img
                        src={series.image_url || "/placeholder.svg"}
                        alt={series.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-card-foreground text-balance">{series.name}</CardTitle>
                      <CardDescription className="text-muted-foreground">{series.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="outline" size="sm" className="w-full">
                         <span>詳細を見る</span>
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            query && (
              <div className="text-center py-12">
                <Train className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold">検索結果が見つかりません</h3>
                <p className="text-muted-foreground">検索条件を変更して再度お試しください。</p>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  )
}