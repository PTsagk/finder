import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { ConfirmPage } from "app/confirm/confirm.page";
import { CartService } from "app/services/cart.service";
import { OrderService } from "app/services/order.service";
import { IUser, UserService } from "app/services/user.service";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.page.html",
  styleUrls: ["./checkout.page.scss"],
})
export class CheckoutPage implements OnInit {
  cardProducts: any;
  userInfo: IUser;
  subTotal: any = 0;
  total: any = 10;

  constructor(
    public modalController: ModalController,
    private cartService: CartService,
    private userService: UserService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userInfo = this.userService.userInfo.getValue();
    this.cardProducts = this.cartService.cartProducts.value;
    this.cartService.cartProducts.subscribe((value) => {
      if (!value) this.modalController.dismiss();
    });
    this.cardProducts.forEach((product) => {
      this.subTotal += product.price * product.quantity;
      this.total += this.subTotal;
    });

    this.subTotal = this.subTotal.toFixed(2);
    this.total = this.total.toFixed(2);
  }

  async sendOrder() {
    const modal = await this.modalController.create({
      component: ConfirmPage,
      cssClass: "my-custom-class",
    });
    await modal.present();
    this.orderService
      .createOrder(this.cartService.cartProducts.getValue())
      .subscribe((res) => {
        console.log(res);
      });

    this.cartService.deleteAllProducts();
    this.router.navigate(["/home"]);
    window.location.reload();
    // console.log("here");
    // this.modalController.dismiss();
    // this.cartService.closeCartModal();
  }
}
