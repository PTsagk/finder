import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { FilterComponent } from "app/components/filter/filter.component";
import { ItemDetailsPage } from "app/item-details/item-details.page";
import { CartService } from "app/services/cart.service";
import { FavouriteService } from "app/services/favourite.service";
import { FilterService } from "app/services/filter.service";
import { IProduct, ProductService } from "app/services/product.service";
import { TranslationsService } from "app/services/translations.service";
import { IUser, UserService } from "app/services/user.service";
import { DataService } from "../services/data.service";
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
  public products: IProduct[] = [];
  public productCount = 0;
  public categorySelected = null;

  language = "en";

  userInfo: IUser | null = null;
  constructor(
    public cartService: CartService,
    private data: DataService,
    private modalController: ModalController,
    private productService: ProductService,
    private favouriteService: FavouriteService,
    private userService: UserService,
    private filterService: FilterService,
    public t: TranslationsService
  ) {}

  ngOnInit() {
    this.userService.userInfo.subscribe((user) => {
      this.userInfo = user;
    });
    this.categories = this.data.getCategories();
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

    this.t.lang_text.subscribe((text: string) => {
      this.language = text;
    });
  }

  onSearchChange(ev: CustomEvent) {
    this.filterService.filters.search = ev.detail.value;
  }

  searchProducts() {
    this.productService.searchProducts().subscribe((products: any) => {
      if (products) {
        this.products = products;
      }
    });
  }
  async filterModal() {
    const modal = await this.modalController.create({
      component: FilterComponent,
      cssClass: "my-custom-class",
    });
    modal.onWillDismiss().then((filter) => {
      this.getFilteredProducts();
    });
    return await modal.present();
  }
  selectCategory(category: string) {
    this.categorySelected = category;
    this.filterService.clearFilters();
    this.filterService.filters.category = category.toLowerCase();
    this.getFilteredProducts();
  }

  getFilteredProducts() {
    this.productService.searchProducts().subscribe((products: any) => {
      if (products) {
        this.products = products;
      }
    });
  }

  async openItemDetails(product: IProduct) {
    const modal = await this.modalController.create({
      component: ItemDetailsPage,
      cssClass: "my-custom-class",
      componentProps: {
        id: product.id,
      },
    });
    return await modal.present();
  }

  clearCategory() {
    this.categorySelected = null;
    this.products = [];
  }

  clickFavourite(product: IProduct) {
    if (product.favourite) {
      product.favourite = false;
      this.favouriteService.deleteFavourite(product).subscribe((data) => {
        console.log(data);
      });
    } else {
      product.favourite = true;
      this.favouriteService.createFavourite(product).subscribe((data) => {
        console.log(data);
      });
    }
  }
  changeLanguage() {
    this.t.changeLanguage();
  }
}
