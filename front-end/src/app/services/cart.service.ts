import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { MyCartPage } from "app/my-cart/my-cart.page";
import { BehaviorSubject } from "rxjs";
import { IProduct } from "./product.service";

export interface ICartItem extends IProduct {
  quantity: number;
  size: number;
  color: number;
}

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

  addToCart(itemInfo: ICartItem) {
    const productsInCart = this.cartProducts.getValue();
    if (productsInCart.length == 0 || !productsInCart) {
      productsInCart.push(itemInfo);
    } else {
      const existingProductId = productsInCart
        .map((product) => {
          if (
            product.id == itemInfo.id &&
            product.size == itemInfo.size &&
            product.color == itemInfo.color
          )
            return product.id;
          else return -1;
        })
        // .map((product) => product.id)
        .indexOf(itemInfo.id);
      if (existingProductId != -1) {
        productsInCart[existingProductId].quantity++;
      } else productsInCart.push(itemInfo);
    }
    this.updateCart(productsInCart);
  }

  removeFromCart(itemInfo: ICartItem) {
    const productsInCart = this.cartProducts.getValue();
    const existingProductId = productsInCart
      .map((product) => {
        if (
          product.id == itemInfo.id &&
          product.size == itemInfo.size &&
          product.color == itemInfo.color
        )
          return product.id;
        else return -1;
      })
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
