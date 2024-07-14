import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { IProduct, ProductService } from "app/services/product.service";
import { ProductCreatePopupComponent } from "../product-create-popup/product-create-popup.component";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  searchFilter = "";
  get filteredProducts() {
    return this.products.filter((product: IProduct) => {
      return product.name
        .toLowerCase()
        .includes(this.searchFilter.toLowerCase());
    });
  }

  constructor(
    private productService: ProductService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products: IProduct[]) => {
      this.products = products;
    });
  }

  openCreateModal() {
    this.presentModal({ id: 0 } as IProduct);
  }
  async presentModal(product: IProduct) {
    const modal = await this.modalController.create({
      component: ProductCreatePopupComponent,
      cssClass: "my-custom-class",
      componentProps: {
        product,
      },
    });
    modal.onWillDismiss().then(() => {
      this.ngOnInit();
    });
    return await modal.present();
  }
}
