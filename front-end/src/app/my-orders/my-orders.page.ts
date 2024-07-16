import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ItemDetailsPage } from "app/item-details/item-details.page";
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
    public cartService: CartService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.productCount = this.cartService.cartProducts.getValue().length;
    this.orderService.getOrders().subscribe((orders: any) => {
      console.log(orders);
      if (orders) this.orders = orders;
    });
  }

  async openItemModal(product) {
    const modal = await this.modalController.create({
      component: ItemDetailsPage,
      componentProps: {
        product,
        id: product.id,
      },
    });
    return await modal.present();
  }
}
