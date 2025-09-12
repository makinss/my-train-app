// 車両の型
export type Car = {
  id: string;
  car_number: string;
  car_type: string;
  position_in_formation: number;
};

// 編成の型
export type Formation = {
  id: number;
  name: string;
  new_build_date: string;
  cars: Car[]; // carsはCarの配列
};

// 形式の型
export type Series = {
  id: string;
  name: string;
  formations: Formation[]; // formationsはFormationの配列
};
