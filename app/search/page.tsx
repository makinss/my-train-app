"use client"

import { useState } from "react"
import { Search, Filter, SortAsc, Train, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

const mockVehicles = [
  {
    id: "e235-1001",
    series: "E235系1000番台",
    number: "クハE235-1001",
    depot: "東京総合車両センター",
    routes: ["山手線"],
    manufacturer: "川崎重工業",
    year: 2015,
    status: "運用中",
    image: "/modern-green-jr-train-e235-series.jpg",
  },
  {
    id: "n700s-j1",
    series: "N700S系",
    number: "N700S-J1編成",
    depot: "東京新幹線車両センター",
    routes: ["東海道新幹線", "山陽新幹線"],
    manufacturer: "日立製作所",
    year: 2020,
    status: "運用中",
    image: "/white-bullet-train-n700s-shinkansen.jpg",
  },
  {
    id: "323-ls01",
    series: "323系",
    number: "クハ323-1",
    depot: "森ノ宮電車区",
    routes: ["大阪環状線", "ゆめ咲線"],
    manufacturer: "川崎重工業",
    year: 2016,
    status: "運用中",
    image: "/orange-jr-train-323-series-osaka-loop-line.jpg",
  },
  {
    id: "e5-u1",
    series: "E5系",
    number: "E5-U1編成",
    depot: "新幹線総合車両センター",
    routes: ["東北新幹線", "北海道新幹線"],
    manufacturer: "川崎重工業",
    year: 2011,
    status: "運用中",
    image: "/green-white-e5-series-hayabusa-shinkansen.jpg",
  },
  {
    id: "e231-500",
    series: "E231系500番台",
    number: "クハE231-501",
    depot: "東京総合車両センター",
    routes: ["山手線", "京浜東北線"],
    manufacturer: "東急車輛製造",
    year: 2002,
    status: "廃車",
    image: "/silver-blue-e231-series-jr-east-train.jpg",
  },
  {
    id: "700-c1",
    series: "700系",
    number: "700-C1編成",
    depot: "博多総合車両所",
    routes: ["山陽新幹線"],
    manufacturer: "川崎重工業",
    year: 1999,
    status: "廃車",
    image: "/white-blue-700-series-shinkansen-retired.jpg",
  },
]

export default function SearchResultsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filterStatus, setFilterStatus] = useState<string[]>([])
  const [filterManufacturer, setFilterManufacturer] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const filteredVehicles = mockVehicles.filter((vehicle) => {
    const matchesSearch =
      searchQuery === "" ||
      vehicle.series.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.routes.some((route) => route.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStatus = filterStatus.length === 0 || filterStatus.includes(vehicle.status)
    const matchesManufacturer = filterManufacturer.length === 0 || filterManufacturer.includes(vehicle.manufacturer)

    return matchesSearch && matchesStatus && matchesManufacturer
  })

  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.year - a.year
      case "oldest":
        return a.year - b.year
      case "series":
        return a.series.localeCompare(b.series)
      default:
        return 0
    }
  })

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
              <Link href="/search" className="text-primary font-medium">
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

      {/* Search Section */}
      <section className="bg-card py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search Bar */}
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="車両検索（例：E235系、山手線、クハE235-1）"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 h-12 text-lg bg-input border-border"
              />
              <Button size="lg" className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90">
                <Search className="h-5 w-5 mr-2" />
                検索
              </Button>
            </div>

            {/* Controls */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-border text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Filter className="h-4 w-4 mr-2" />
                フィルター
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 border-border">
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
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Status Filter */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">運用状況</h4>
                  <div className="space-y-2">
                    {["運用中", "廃車"].map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox
                          id={`status-${status}`}
                          checked={filterStatus.includes(status)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilterStatus([...filterStatus, status])
                            } else {
                              setFilterStatus(filterStatus.filter((s) => s !== status))
                            }
                          }}
                        />
                        <label htmlFor={`status-${status}`} className="text-sm text-foreground">
                          {status}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Manufacturer Filter */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">製造会社</h4>
                  <div className="space-y-2">
                    {["川崎重工業", "日立製作所", "東急車輛製造"].map((manufacturer) => (
                      <div key={manufacturer} className="flex items-center space-x-2">
                        <Checkbox
                          id={`manufacturer-${manufacturer}`}
                          checked={filterManufacturer.includes(manufacturer)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilterManufacturer([...filterManufacturer, manufacturer])
                            } else {
                              setFilterManufacturer(filterManufacturer.filter((m) => m !== manufacturer))
                            }
                          }}
                        />
                        <label htmlFor={`manufacturer-${manufacturer}`} className="text-sm text-foreground">
                          {manufacturer}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">検索結果: {sortedVehicles.length}件</h2>
            <div className="text-sm text-muted-foreground">{searchQuery && `「${searchQuery}」の検索結果`}</div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedVehicles.map((vehicle) => (
              <Link key={vehicle.id} href={`/vehicle/${vehicle.id}`}>
                <Card className="bg-card border-border hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer">
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                    <img
                      src={vehicle.image || "/placeholder.svg"}
                      alt={vehicle.series}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg text-card-foreground text-balance">{vehicle.series}</CardTitle>
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
                    <CardDescription className="text-muted-foreground">{vehicle.number}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-card-foreground">{vehicle.depot}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Train className="h-4 w-4 text-muted-foreground" />
                        <span className="text-card-foreground">{vehicle.routes.join("、")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-card-foreground">{vehicle.year}年製造</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* No Results */}
          {sortedVehicles.length === 0 && (
            <div className="text-center py-12">
              <Train className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">検索結果が見つかりません</h3>
              <p className="text-muted-foreground mb-4">検索条件を変更して再度お試しください。</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setFilterStatus([])
                  setFilterManufacturer([])
                }}
                className="border-border text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                フィルターをリセット
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
