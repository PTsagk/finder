import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IProduct } from "./product.service";
import { UserService } from "./user.service";

export interface IFavourite {
  id: number;
  product_id: number;
  user_id: number;
}

@Injectable({
  providedIn: "root",
})
export class FavouriteService {
  constructor(private http: HttpClient, private userService: UserService) {}

  createFavourite(product: IProduct) {
    return this.http.post(
      "http://localhost:8000/favourite/create",
      { product, user: this.userService.userInfo.getValue() },
      {
        withCredentials: true,
      }
    );
  }
  deleteFavourite(product: IProduct) {
    return this.http.post(
      "http://localhost:8000/favourite/delete",
      { product, user: this.userService.userInfo.getValue() },
      {
        withCredentials: true,
      }
    );
  }

  getFavorites() {
    return this.http.get(
      "http://localhost:8000/favourite/get_favourites/" +
        this.userService.userInfo.getValue().id,
      {
        withCredentials: true,
      }
    );
  }
}
