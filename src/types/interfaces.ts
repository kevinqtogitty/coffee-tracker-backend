interface User {
  userId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface UpdateCoffeeObject {
  newName?: string;
  newSingleOrigin?: boolean;
  newPrice?: number;
  newOrigin?: number;
  newRoaster?: string;
  newProcess?: number;
  newRoastLevel?: number;
  newFarmer?: number;
}

interface CoffeeObject {
  coffee_name: string;
  single_origin: boolean;
  price: number;
  origin_id: number;
  roaster: string;
  process_id: number;
  roast_level_id: number;
  farmer_id?: number;
  user_id?: number;
}

export { UpdateCoffeeObject, CoffeeObject, User };
