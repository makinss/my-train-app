import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Train, MapPin, Calendar, Wrench } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// ページのpropsとして { params } を受け取る
export default async function VehicleDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  // URLのidを使って、vehiclesテーブルから1件のデータを取得
  const { data: vehicle, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", params.id) // idカラムがparams.idと一致するものを探す
    .single() // 1件だけ取得する

  // データ取得でエラーが発生したか、データが見つからなかった場合は404ページを表示
  if (error || !vehicle) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={vehicle.image_url || "/placeholder.svg"}
            alt={vehicle.series}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold">{vehicle.series}</h1>
            <Badge variant={vehicle.status === "運用中" ? "default" : "secondary"}>
              {vehicle.status}
            </Badge>
          </div>
          <h2 className="text-xl text-muted-foreground mb-6">{vehicle.number}</h2>
          
          <div className="space-y-4 text-lg">
            <div className="flex items-center gap-3">
              <Train className="h-6 w-6 text-primary" />
              <span>
                <strong>路線:</strong> {Array.isArray(vehicle.routes) ? vehicle.routes.join("、") : vehicle.routes}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-primary" />
              <span>
                <strong>所属:</strong> {vehicle.depot}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Wrench className="h-6 w-6 text-primary" />
              <span>
                <strong>製造:</strong> {vehicle.manufacturer}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-primary" />
              <span>
                <strong>製造年:</strong> {vehicle.year}年
              </span>
            </div>
          </div>
          
          <p className="mt-8 text-muted-foreground">{vehicle.description}</p>
        </div>
      </div>
    </main>
  )
}
