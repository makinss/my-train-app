import { createClient } from '@/lib/supabase/server'
import FormationChart from '@/components/FormationChart' // 以前作成した編成表コンポーネント

export const revalidate = 0

// params.id でURLのID部分を受け取ります
type Car = {
  id: string;
  car_number: string;
  car_type: string;
  position_in_formation: number;
};

type Formation = {
  id: number;
  name: string;
  new_build_date: string;
  cars: Car[];
};

type Series = {
  id: string;
  name: string;
  formations: Formation[];
};

export default async function SeriesDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  // URLのIDを使って、特定の形式(series)のデータを取得します。
  // その際、関連する編成(formations)と、さらにその中の車両(cars)の情報もまとめて取得します。
  const { data: series, error } = await supabase
    .from('series')
    .select(`
      id,
      name,
      formations (
        id,
        name,
        new_build_date,
        cars (id, car_number, car_type, position_in_formation)
      )
    `)
    .eq('id', params.id) // URLのIDと一致するものを探す
    .single<Series>() // データを1件だけ取得する

  // データが見つからなかった場合の表示
  if (error || !series) {
    return <p>データが見つかりませんでした。</p>
  }

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">{series.name}</h1>
      
      <h2 className="text-xl font-semibold mb-4">所属編成一覧</h2>
      
      {/* 取得した編成のリストを元に、FormationChartコンポーネントを繰り返し表示 */}
      <div>
        {series.formations.map((formation: Formation) => (
          <FormationChart key={formation.id} formation={formation} />
        ))}
      </div>
    </main>
  )
}
