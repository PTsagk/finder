import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { BrandService, IBrand } from "app/services/brand.service";
import { ColorService, IColor } from "app/services/color.service";
import { missingImageUrl } from "app/services/data.service";
import { IProduct, ProductService } from "app/services/product.service";
import { ISize, SizeService } from "app/services/size.service";

@Component({
  selector: "app-product-create-popup",
  templateUrl: "./product-create-popup.component.html",
  styleUrls: ["./product-create-popup.component.scss"],
})
export class ProductCreatePopupComponent implements OnInit {
  @Input() product!: IProduct;
  brands: IBrand[] = [];
  colors: IColor[] = [];
  sizes: ISize[] = [];
  isEditing: boolean = false;

  missingImageUrl = missingImageUrl;
  constructor(
    private modalController: ModalController,
    private productService: ProductService,
    private brandService: BrandService,
    private colorService: ColorService,
    private sizeService: SizeService
  ) {}

  ngOnInit() {
    this.isEditing = this.product.id !== 0;
    this.brandService.getBrands().subscribe((brands: IBrand[]) => {
      this.brands = brands;
    });
    this.colorService.getColors().subscribe((colors: IBrand[]) => {
      this.colors = colors;
    });
    this.sizeService.getSizes().subscribe((sizes: IBrand[]) => {
      this.sizes = sizes;
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

  changeColors(ev: any) {
    this.product.color_ids = ev.detail.value;
  }
  changeSizes(ev: any) {
    this.product.size_ids = ev.detail.value;
  }

  changeCategory(ev: any) {
    this.product.category = ev.detail.value;
  }
}
