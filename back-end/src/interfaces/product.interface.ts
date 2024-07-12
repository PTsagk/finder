export interface IProductCreate {
  name: string;
  price: string;
  image: string;
  description: string;
  category: "womens" | "mens" | "kids";
  brand_id: number;
}
