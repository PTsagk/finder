import { Component, OnInit } from "@angular/core";
import {
  Animation,
  AnimationController,
  ModalController,
} from "@ionic/angular";
import { CartService } from "app/services/cart.service";
import { MyCartPage } from "app/my-cart/my-cart.page";

@Component({
  selector: "app-item-details",
  templateUrl: "./item-details.page.html",
  styleUrls: ["./item-details.page.scss"],
})
export class ItemDetailsPage implements OnInit {
  selectedSize: number;
  selectedColor: number;
  activeVariation: string;
  itemInfo: any;
  productCount = 0;
  constructor(
    private animatioCntrl: AnimationController,
    private cartService: CartService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.activeVariation = "size";
    this.cartService.cartProducts.subscribe((products) => {
      this.productCount = 0;
      products.forEach((product) => {
        this.productCount += product.quantity;
      });
    });
  }

  segmentChanged(e: any) {
    this.activeVariation = e.detail.value;

    if (this.activeVariation == "color") {
      this.animatioCntrl
        .create()
        .addElement(document.querySelector(".sizes"))
        .duration(500)
        .iterations(1)
        .fromTo("transform", "translateX(0px)", "translateX(100%)")
        .fromTo("opacity", "1", "0.2")
        .play();

      this.animatioCntrl
        .create()
        .addElement(document.querySelector(".colors"))
        .duration(500)
        .iterations(1)
        .fromTo("transform", "translateX(-100%)", "translateX(0)")
        .fromTo("opacity", "0.2", "1")
        .play();
    } else {
      this.animatioCntrl
        .create()
        .addElement(document.querySelector(".sizes"))
        .duration(500)
        .iterations(1)
        .fromTo("transform", "translateX(100%)", "translateX(0)")
        .fromTo("opacity", "0.2", "1")
        .play();

      this.animatioCntrl
        .create()
        .addElement(document.querySelector(".colors"))
        .duration(500)
        .iterations(1)
        .fromTo("transform", "translateX(0px)", "translateX(-100%)")
        .fromTo("opacity", "1", "0.2")
        .play();
    }
  }

  changeSize(size: number) {
    this.selectedSize = size;
  }

  changeColor(color: number) {
    this.selectedColor = color;
  }

  addToCart() {
    this.cartService.addToCart({
      id: 3,
      name: "test",
      price: 10,
      quantity: 1,
      size: "SMALL",
    });
  }
}
