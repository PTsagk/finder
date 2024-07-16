import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { CartService } from "app/services/cart.service";
import { OrderService } from "app/services/order.service";

@Component({
  selector: "app-confirm",
  templateUrl: "./confirm.page.html",
  styleUrls: ["./confirm.page.scss"],
})
export class ConfirmPage implements OnInit {
  constructor(
    public modalController: ModalController,
    private cartService: CartService,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit() {}
  close() {
    this.cartService.deleteAllProducts();
  }
}
