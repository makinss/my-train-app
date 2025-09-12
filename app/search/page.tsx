import { createClient } from '@/lib/supabase/server'
import FormationChart from '@/components/FormationChart'
import { Series, Formation } from '@/lib/types'; // types.tsから型をインポート

export const revalidate = 0

export default async function SeriesDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

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
    .eq('id', params.id)
    .single<Series>()

  if (error || !series) {
    return <p>データが見つかりませんでした。</p>
  }

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">{series.name}</h1>
      
      <h2 className="text-xl font-semibold mb-4">所属編成一覧</h2>
      
      <div>
        {series.formations.map((formation) => (
          // ここで渡すformationの型と、FormationChartが受け取るformationの型が一致するため、エラーが消える
          <FormationChart key={formation.id} formation={formation} />
        ))}
      </div>
    </main>
  )
}
