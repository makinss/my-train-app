import { Formation } from '@/lib/types'; // types.tsからFormationの型をインポート

// propsの型注釈を修正
type FormationChartProps = {
  formation: Formation;
};

export default function FormationChart({ formation }: FormationChartProps) {
  return (
    <div className="mb-8 p-4 border rounded-lg shadow-md bg-card">
      <h3 className="text-lg font-bold mb-2 text-card-foreground">{formation.name}</h3>
      <p className="text-sm text-muted-foreground mb-4">製造日: {formation.new_build_date}</p>
      
      {/* 編成内の車両をリスト表示 */}
      <ul className="space-y-2">
        {formation.cars
          .sort((a, b) => a.position_in_formation - b.position_in_formation)
          .map((car) => (
            <li key={car.id} className="flex justify-between items-center p-2 bg-muted rounded">
              <span className="font-mono text-sm">{car.car_number}</span>
              <span className="text-xs text-muted-foreground">{car.car_type}</span>
            </li>
        ))}
      </ul>
    </div>
  );
}
