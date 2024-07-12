import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "../data.service";
import { ModalController } from "@ionic/angular";
import { FiltersPage } from "app/filters/filters.page";
import { MyCartPage } from "app/my-cart/my-cart.page";
import { CartService } from "app/cart.service";
// import { ModalPage } from '../modal/modal.page';
// @ts-ignore
// import { ModalPage } from "../modal/modal.page";
// import { OverlayEventDetail } from "@ionic/core/components";
@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  public categories = [];
  public featuredProducts = [];
  public bestSellProducts = [];
  public productCount = 0;

  constructor(
    public cartService: CartService,
    private data: DataService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.categories = this.data.getCategories();
    this.featuredProducts = this.data.getFeaturedProducts();
    this.bestSellProducts = this.data.getBestSellProducts();
    this.cartService.cartProducts.subscribe((products) => {
      this.productCount = 0;
      products.forEach((product) => {
        this.productCount += product.quantity;
      });
    });
  }
  async filterModal() {
    const modal = await this.modalController.create({
      component: FiltersPage,
      cssClass: "my-custom-class",
    });
    return await modal.present();
  }
}
