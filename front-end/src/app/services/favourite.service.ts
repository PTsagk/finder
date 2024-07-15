import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IProduct } from "./product.service";

export interface IFavourite {
  id: number;
  product_id: number;
  user_id: number;
}

@Injectable({
  providedIn: "root",
})
export class FavouriteService {
  constructor(private http: HttpClient) {}

  getFavourites() {
    return this.http.post("http://localhost:8000/favourite/get_favourites", {});
  }

  createFavourite(product: IProduct) {
    return this.http.post("http://localhost:8000/favourite/create", product, {
      withCredentials: true,
    });
  }
  deleteFavourite(product: IProduct) {
    return this.http.post("http://localhost:8000/favourite/delete", product, {
      withCredentials: true,
    });
  }
}
