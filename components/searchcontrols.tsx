"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, Filter, SortAsc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export function SearchControls() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // URLのパラメータから初期値を設定
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest")
  const [filterStatus, setFilterStatus] = useState<string[]>(searchParams.getAll("status") || [])
  const [filterManufacturer, setFilterManufacturer] = useState<string[]>(searchParams.getAll("manufacturer") || [])
  const [showFilters, setShowFilters] = useState(false)

  // URLを更新してページを再読み込みさせる関数
  const updateUrl = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.set("q", searchQuery)
    if (sortBy) params.set("sort", sortBy)
    filterStatus.forEach(status => params.append("status", status))
    filterManufacturer.forEach(manufacturer => params.append("manufacturer", manufacturer))
    
    // params.toString()は "q=E235&sort=newest" のような文字列を生成する
    router.push(`/search?${params.toString()}`)
  }

  // フォーム送信時の処理
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateUrl()
  }

  // ソートやフィルターが変更されたら即座にURLを更新
  useEffect(() => {
    // 最初の読み込み時や検索バーの入力中は発動しないようにする
    const initialSort = searchParams.get("sort") || "newest"
    const initialStatus = searchParams.getAll("status")
    const initialManufacturer = searchParams.getAll("manufacturer")
    if (sortBy !== initialSort || JSON.stringify(filterStatus) !== JSON.stringify(initialStatus) || JSON.stringify(filterManufacturer) !== JSON.stringify(initialManufacturer)) {
      updateUrl()
    }
  }, [sortBy, filterStatus, filterManufacturer])

  return (
    <section className="bg-card py-8 border-b border-border">
      <div className="container mx-auto px-4">
        <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="flex-1 flex gap-2">
            <Input
              placeholder="車両検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 h-12 text-lg bg-input border-border"
            />
            <Button type="submit" size="lg" className="h-12 px-8">
              <Search className="h-5 w-5 mr-2" />
              検索
            </Button>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4 mr-2" />
              フィルター
            </Button>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SortAsc className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">新しい順</SelectItem>
                <SelectItem value="oldest">古い順</SelectItem>
                <SelectItem value="series">形式順</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
        {showFilters && (
          <div className="mt-6 p-4 bg-muted rounded-lg border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-3">運用状況</h4>
                <div className="space-y-2">
                  {["運用中", "廃車"].map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox
                        id={`status-${status}`}
                        checked={filterStatus.includes(status)}
                        onCheckedChange={(checked) => {
                          const newStatus = checked
                            ? [...filterStatus, status]
                            : filterStatus.filter((s) => s !== status)
                          setFilterStatus(newStatus)
                        }}
                      />
                      <label htmlFor={`status-${status}`} className="text-sm">{status}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">製造会社</h4>
                <div className="space-y-2">
                  {["川崎重工業", "日立製作所", "東急車輛製造"].map((m) => (
                    <div key={m} className="flex items-center space-x-2">
                      <Checkbox
                        id={`m-${m}`}
                        checked={filterManufacturer.includes(m)}
                        onCheckedChange={(checked) => {
                          const newM = checked
                            ? [...filterManufacturer, m]
                            : filterManufacturer.filter((man) => man !== m)
                          setFilterManufacturer(newM)
                        }}
                      />
                      <label htmlFor={`m-${m}`} className="text-sm">{m}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
