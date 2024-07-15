import { Injectable } from "@angular/core";
import { IProduct } from "../services/product.service";

// Category Interface
export interface ICategory {
  id: number;
  name: string;
  image: string;
}

export const missingImageUrl = "https://www.youtube.com/watch?v=iGx5a1ifSDs";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor() {}

  getCategories() {
    let categories = [];

    let cat1: ICategory = {
      id: 1,
      name: "Womens",
      image: "../../assets/categories/category-1.png",
    };
    let cat2: ICategory = {
      id: 2,
      name: "Mens",
      image: "../../assets/categories/category-2.png",
    };
    let cat3: ICategory = {
      id: 3,
      name: "Kids",
      image: "../../assets/categories/category-3.png",
    };

    categories.push(cat1, cat2, cat3);

    return categories;
  }

  getBestSellProducts() {
    let products = [];

    let prod1: IProduct = {
      id: 1,
      name: "Womens T-Shirt",
      price: 55,
      image: "../../assets/products/prod-4.png",
      brand_id: 1,
      featured: true,
      rating: 4.5,
      description: "Womens T-Shirt",
      category: "womens",
      color_ids: [1, 2, 3],
    };
    let prod2: IProduct = {
      id: 2,
      name: "Mens T-Shirt",
      price: 34,
      image: "../../assets/products/prod-5.png",
      brand_id: 1,
      featured: true,
      rating: 4.5,
      description: "Womens T-Shirt",
      category: "womens",
      color_ids: [1, 2, 3],
    };
    let prod3: IProduct = {
      id: 1,
      name: "Womens T-Shirt",
      price: 40,
      image: "../../assets/products/prod-6.png",
      brand_id: 1,
      featured: true,
      rating: 4.5,
      description: "Womens T-Shirt",
      category: "womens",
      color_ids: [1, 2, 3],
    };

    products.push(prod1, prod2, prod3);

    return products;
  }
}
