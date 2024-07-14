import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "../services/data.service";
import { ModalController } from "@ionic/angular";
import { FiltersPage } from "app/filters/filters.page";
import { MyCartPage } from "app/my-cart/my-cart.page";
import { CartService } from "app/services/cart.service";
import { IProduct, ProductService } from "app/services/product.service";
import { ItemDetailsPage } from "app/item-details/item-details.page";
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
  public products = [];
  public productCount = 0;
  public categorySelected = null;
  constructor(
    public cartService: CartService,
    private data: DataService,
    private modalController: ModalController,
    private productService: ProductService
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
    this.productService.getFeaturedProducts().subscribe((products: any) => {
      console.log(products);
      this.featuredProducts = products;
    });

    this.productService.getBestSellerProducts().subscribe((products: any) => {
      console.log(products);
      this.bestSellProducts = products;
    });
  }
  async filterModal() {
    const modal = await this.modalController.create({
      component: FiltersPage,
      cssClass: "my-custom-class",
    });
    return await modal.present();
  }
  selectCategory(category: string) {
    this.categorySelected = category;
    this.productService
      .getProductsByCategory(category)
      .subscribe((products: any) => {
        if (products) {
          console.log(products);
          this.products = products;
        }
      });
  }

  async openItemDetails(product: IProduct) {
    const modal = await this.modalController.create({
      component: ItemDetailsPage,
      cssClass: "my-custom-class",
      componentProps: {
        product,
      },
    });
    return await modal.present();
  }

  clearCategory() {
    this.categorySelected = null;
    this.products = [];
  }
}
