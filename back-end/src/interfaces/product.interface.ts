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
  size_ids: number[];
}

export interface IProductResult extends IProductCreate {
  created_at: Date;
  relevancy_score: number;
  number_of_substring_and_string_matches: number;
  exact_number_of_matches: number;
  reviews_average_rating: number;
  number_of_rated_reviews: number;
  total_reviews: number;
  number_of_sales: number;
}
