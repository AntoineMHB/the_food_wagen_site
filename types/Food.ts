export interface Food {
  id: string;
  createdAt?: string;
  name?: string;

  // Food info
  food_name?: string;
  food_image?: string;
  image?: string;
  imageUrl?: string;
  avatar?: string;
  food_rating?: number | string;
  rating?: number | string;

  price?: string | number;
  Price?: number | string;

  // Restaurant info
  restaurant_name?: string;
  restaurant_logo?: string;
  restaurant_image?: string;
  restaurant_status?: "Open Now" | "Closed" | string;
  restaurant?: {
    name?: string;
    logo?: string;
    status?: string;
  };

  //
  category?: string;
  open?: boolean | StaticRange;
  logo: string;
}
