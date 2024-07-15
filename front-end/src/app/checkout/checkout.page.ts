import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ConfirmPage } from "app/confirm/confirm.page";
import { CartService } from "app/services/cart.service";
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
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userInfo = this.userService.userInfo.getValue();
    this.cardProducts = this.cartService.cartProducts.getValue();
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
    await modal.onDidDismiss();
    this.modalController.dismiss();
  }
}
