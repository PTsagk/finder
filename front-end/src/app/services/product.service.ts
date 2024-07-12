import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  brand: string;
  category: string;
  image: string;
  rating: number;
}

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.post<IProduct[]>(
      "http://localhost:8000/product/get_all_products",
      {},
      { withCredentials: true }
    );
  }
}
