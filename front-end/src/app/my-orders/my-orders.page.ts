import { Component, OnInit } from "@angular/core";
import { CartService } from "app/services/cart.service";
import { ColorService } from "app/services/color.service";
import { OrderService } from "app/services/order.service";
import { SizeService } from "app/services/size.service";

@Component({
  selector: "app-my-orders",
  templateUrl: "./my-orders.page.html",
  styleUrls: ["./my-orders.page.scss"],
})
export class MyOrdersPage implements OnInit {
  orders = [];
  productCount = 0;
  constructor(
    private orderService: OrderService,
    public cartService: CartService
  ) {}

  ngOnInit() {
    this.productCount = this.cartService.cartProducts.getValue().length;
    this.orderService.getOrders().subscribe((orders: any) => {
      console.log(orders);
      if (orders) this.orders = orders;
    });
  }

  addToCart(product) {
    this.cartService.addToCart({
      ...product,
      quantity: 1,
      size: product.size_name,
      color: product.color_name,
    });
  }
}
