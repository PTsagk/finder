import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IProduct } from "./product.service";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor(private http: HttpClient, private userService: UserService) {}

  createOrder(products) {
    return this.http.post("http://localhost:8000/order", {
      userId: this.userService.userInfo.getValue().id,
      products,
    });
  }
}
