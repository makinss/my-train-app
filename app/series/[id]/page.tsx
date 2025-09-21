import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ToiletInfo from "@/components/ui/ToiletInfo";

// 型定義
type Car = {
  id: number;
  car_number: string;
  car_type: string;
  "Availability of toilet": string | null;
  position_in_formation: number;
};

type Formation = {
  id: number;
  formations: string;
  cars: Car[];
  depots: { name: string } | null;
};

type Series = {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  formations: Formation[];
};

export default async function SeriesDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  
  const { data: series, error } = await supabase
    .from("series")
    .select(
      `
      id,
      name,
      description,
      image_url,
      formations:formations ( 
        id,
        formations,
        depots ( name ),
        cars (
          id,
          car_number,
          car_type,
          "Availability of toilet",
          position_in_formation
        )
      )
    `
    )
    .eq("id", params.id)
    .single();

  if (error || !series) {
    console.error("Failed to fetch series data:", error);
    notFound();
  }

  // 号車順に並び替え
  series.formations.forEach(formation => {
    if (formation.cars) {
      formation.cars.sort((a, b) => a.position_in_formation - b.position_in_formation);
    }
  });

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* シリーズの基本情報 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{series.name}</h1>
        <p className="text-lg text-muted-foreground">{series.description}</p>
      </div>
      
      {/* 編成一覧の表示 */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">編成一覧</h2>
        <div className="space-y-6">
          {series.formations.map((formation) => (
            <div key={formation.id} className="border p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-primary">{formation.formations}</h3>
                {formation.depots && <span className="text-sm text-muted-foreground bg-secondary px-2 py-1 rounded">{formation.depots.name}</span>}
              </div>
              
              {/* 車両一覧の表示 */}
              {formation.cars && formation.cars.length > 0 ? (
                <ul className="list-disc list-inside mt-3 space-y-1">
                  {formation.cars.map((car) => (
                    <li key={car.id}>
                      <span className="font-semibold">{car.position_in_formation}号車: {car.car_number}</span> ({car.car_type})
                      <ToiletInfo text={car["Availability of toilet"]} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground mt-2">この編成の車両情報はありません。</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

