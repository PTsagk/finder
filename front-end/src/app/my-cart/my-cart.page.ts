import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { CheckoutPage } from "app/checkout/checkout.page";
import { CartService, ICartItem } from "app/services/cart.service";
import { ColorService, IColor } from "app/services/color.service";
import { ISize, SizeService } from "app/services/size.service";

@Component({
  selector: "app-my-cart",
  templateUrl: "./my-cart.page.html",
  styleUrls: ["./my-cart.page.scss"],
})
export class MyCartPage implements OnInit {
  cartProducts: ICartItem[] = [];
  sizes: ISize[] = [];
  colors: IColor[] = [];

  getSizeName(cartItem: ICartItem) {
    return this.sizes.find((size) => size.id == cartItem.size)?.name;
  }
  getColorName(cartItem: ICartItem) {
    return this.colors.find((color) => color.id == cartItem.color)?.name;
  }
  constructor(
    private modalController: ModalController,
    private cartService: CartService,
    private sizeService: SizeService,
    private colorService: ColorService
  ) {}

  ngOnInit() {
    this.cartService.cartProducts.subscribe((products) => {
      if (products) this.cartProducts = products;
    });
    this.sizeService.getSizes().subscribe((sizes: any) => {
      this.sizes = sizes;
    });
    this.colorService.getColors().subscribe((colors: any) => {
      this.colors = colors;
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  increment(itemInfo) {
    this.cartService.addToCart({
      ...itemInfo,
    });
  }

  decrease(itemInfo) {
    this.cartService.removeFromCart({
      ...itemInfo,
    });
  }

  async openCheckoutModal() {
    const modal = await this.modalController.create({
      component: CheckoutPage,
      componentProps: {
        cartProducts: this.cartProducts,
      },
    });

    return await modal.present();
  }
}
