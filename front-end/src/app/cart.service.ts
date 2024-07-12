import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MyCartPage } from "./my-cart/my-cart.page";
import { ModalController } from "@ionic/angular";

// Category Interface

@Injectable({
  providedIn: "root",
})
export class CartService {
  cartProducts: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private modalController: ModalController) {
    var storedProducts = JSON.parse(localStorage.products || "[]");
    if (storedProducts.length > 0) {
      this.cartProducts.next(storedProducts);
    }
  }

  updateCart(products) {
    this.cartProducts.next(products);
    localStorage.products = JSON.stringify(products);
  }

  addToCart(itemInfo) {
    const productsInCart = this.cartProducts.getValue();
    if (productsInCart.length == 0 || !productsInCart) {
      productsInCart.push(itemInfo);
    } else {
      const existingProductId = productsInCart
        .map((product) => product.id)
        .indexOf(itemInfo.id);
      if (existingProductId != -1) productsInCart[existingProductId].quantity++;
      else productsInCart.push(itemInfo);
    }
    this.updateCart(productsInCart);
  }

  removeFromCart(itemInfo) {
    const productsInCart = this.cartProducts.getValue();
    const existingProductId = productsInCart
      .map((product) => product.id)
      .indexOf(itemInfo.id);
    if (existingProductId != -1) {
      productsInCart[existingProductId].quantity--;
      if (productsInCart[existingProductId].quantity == 0)
        productsInCart.splice(existingProductId, 1);
    }
    this.updateCart(productsInCart);
  }
  async cartModal() {
    const modal = await this.modalController.create({
      component: MyCartPage,
      cssClass: "my-custom-class",
    });
    return await modal.present();
  }
}
