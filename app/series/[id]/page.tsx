import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

// 型定義（プロジェクトに合わせて調整してください）
type Car = {
  id: number;
  car_number: string;
  car_type: string;
};

type Formation = {
  id: number;
  name: string;
  cars: Car[];
};

type Series = {
  id: number;
  name: string;
  description: string;
  image_url: string | null;
  formations: Formation[];
};

export default async function SeriesDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  
  // URLのIDを使って、seriesデータを取得。
  // 同時に、関連するformationsと、さらにその中のcarsの情報もまとめて取得します。
  const { data: series, error } = await supabase
    .from("series")
    .select(`
      id,
      name,
      description,
      image_url,
      formations (
        id,
        name,
        cars (
          id,
          car_number,
          car_type
        )
      )
    `)
    .eq("id", params.id)
    .single(); // IDで1件だけ取得するので .single() を使います
console.log("Fetched series data;");
  // エラーが発生した場合や、データが見つからなかった場合は404ページを表示
  if (error || !series) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      {/* シリーズの基本情報 */}
      <h1 className="text-3xl font-bold mb-2">{series.name}</h1>
      <p className="text-muted-foreground mb-6">{series.description}</p>
      
      {/* 編成一覧の表示 */}
      <h2 className="text-2xl font-semibold mb-4">編成一覧</h2>
      <div className="space-y-4">
        {series.formations.map((formation) => (
          <div key={formation.id} className="border p-4 rounded-lg">
            <h3 className="text-xl font-bold">{formation.name}</h3>
            
            {/* 車両一覧の表示 */}
            <ul className="list-disc list-inside mt-2">
              {formation.cars.map((car) => (
                <li key={car.id}>
                  {car.car_number} ({car.car_type})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}


