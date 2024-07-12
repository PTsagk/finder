import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { missingImageUrl } from "app/services/data.service";
import { BrandService, IBrand } from "app/services/brand.service";
import { IProduct, ProductService } from "app/services/product.service";

@Component({
  selector: "app-product-create-popup",
  templateUrl: "./product-create-popup.component.html",
  styleUrls: ["./product-create-popup.component.scss"],
})
export class ProductCreatePopupComponent implements OnInit {
  @Input() product!: IProduct;
  brands: IBrand[] = [];
  isEditing: boolean = false;

  missingImageUrl = missingImageUrl;
  constructor(
    private modalController: ModalController,
    private productService: ProductService,
    private brandService: BrandService
  ) {}

  ngOnInit() {
    this.isEditing = this.product.id !== 0;
    this.brandService.getBrands().subscribe((brands: IBrand[]) => {
      this.brands = brands;
    });
  }

  close() {
    this.modalController.dismiss(null);
  }

  save() {
    if (this.isEditing) {
      this.update();
    } else {
      this.create();
    }
  }

  deleteProduct() {
    console.log("first");
    this.productService.deleteProduct(this.product).subscribe((product) => {
      this.modalController.dismiss(null);
    });
  }

  private create() {
    this.productService.createProduct(this.product).subscribe((product) => {
      this.close();
    });
  }

  private update() {
    this.productService.updateProduct(this.product).subscribe((product) => {
      this.close();
    });
  }

  changeFeature(ev: any) {
    this.product.featured = ev.detail.checked;
  }

  changeBrand(ev: any) {
    this.product.brand_id = ev.detail.value;
  }

  changeCategory(ev: any) {
    this.product.category = ev.detail.value;
  }
}
