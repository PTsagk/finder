import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { CartService } from "app/cart.service";

@Component({
  selector: "app-my-cart",
  templateUrl: "./my-cart.page.html",
  styleUrls: ["./my-cart.page.scss"],
})
export class MyCartPage implements OnInit {
  cartProducts: any[] = [];
  constructor(
    private modalController: ModalController,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartService.cartProducts.subscribe((products) => {
      if (products) this.cartProducts = products;
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  increment(itemInfo) {
    this.cartService.addToCart({
      id: 1,
      name: "test",
      price: 10,
      quantity: 1,
    });
  }

  decrease(itemInfo) {
    this.cartService.removeFromCart({
      id: 1,
      name: "test",
      price: 10,
      quantity: 1,
    });
  }
}
