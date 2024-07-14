import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  featured: boolean;
  brand_id: number;
}

@Injectable({
  providedIn: "root",
})
export class ProductService {
  products: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>(null);
  constructor(private http: HttpClient) {}

  getFeaturedProducts() {
    return this.http.get(
      "http://localhost:8000/product/get_featured_products",
      {
        withCredentials: true,
      }
    );
  }
  getBestSellerProducts() {
    return this.http.get("http://localhost:8000/product/get_top_bestsellers", {
      withCredentials: true,
    });
  }

  getProducts() {
    return this.http.post<IProduct[]>(
      "http://localhost:8000/product/get_all_products",
      {},
      { withCredentials: true }
    );
  }
  getProductsByCategory(category: string) {
    return this.http.post<IProduct[]>(
      "http://localhost:8000/product/get_all_products_by_category/" +
        category.toLowerCase(),
      {},
      { withCredentials: true }
    );
  }

  createProduct(product: IProduct) {
    return this.http.post<IProduct>(
      "http://localhost:8000/product/create",
      product,
      { withCredentials: true }
    );
  }

  updateProduct(product: IProduct) {
    return this.http.put<IProduct>(
      "http://localhost:8000/product/update",
      product,
      { withCredentials: true }
    );
  }

  deleteProduct(product: IProduct) {
    return this.http.post<IProduct>(
      "http://localhost:8000/product/delete",
      product,
      { withCredentials: true }
    );
  }
}
