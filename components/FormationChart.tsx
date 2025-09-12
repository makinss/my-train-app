// TypeScriptのための型定義
// これにより、どんなデータが来るかをコードが理解しやすくなります
type Car = {
  id: number;
  car_number: string;
  car_type: string;
  position_in_formation: number;
};

type Formation = {
  id: number;
  name: string;
  cars: Car[];
};

// FormationChartコンポーネントの定義
// formationというデータを引数として受け取ります
export default function FormationChart({ formation }: { formation: Formation }) {
  // 車両を号車番号(position_in_formation)の順に並び替える
  const sortedCars = [...formation.cars].sort(
    (a, b) => a.position_in_formation - b.position_in_formation
  );

  return (
    <div className="p-4 my-4 bg-gray-50 border rounded-lg shadow-sm">
      <h3 className="text-xl font-bold mb-4">{formation.name}</h3>
      {/* 横スクロールできるようにする設定 */}
      <div className="flex overflow-x-auto space-x-1 pb-2">
        {/* 並び替えた車両のリストを元に、車両ボックスを一つずつ表示 */}
        {sortedCars.map((car) => (
          <div key={car.id} className="border-2 border-gray-400 p-2 text-center flex-shrink-0 w-24">
            <div className="font-semibold bg-gray-200 px-1 text-sm">{car.car_type}</div>
            <div className="text-lg my-3 font-mono">{car.car_number}</div>
            <div className="text-xs text-gray-500">{car.position_in_formation}号車</div>
          </div>
        ))}
      </div>
    </div>
  );
}
