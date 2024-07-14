export interface IProductCreate {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  category: "womens" | "mens" | "kids";
  brand_id: number;
  featured: boolean;
  color_ids: number[];
}
