import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { IProduct } from "../../services/data.service";
import { ProductService } from "app/services/product.service";
import { ProductCreatePopupComponent } from "../product-create-popup/product-create-popup.component";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  constructor(
    private productService: ProductService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products: IProduct[]) => {
      this.products = products;
    });
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ProductCreatePopupComponent,
      cssClass: "my-custom-class",
    });
    return await modal.present();
  }
}
