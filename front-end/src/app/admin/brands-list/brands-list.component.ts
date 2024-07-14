import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { BrandService, IBrand } from "app/services/brand.service";
import { BrandModalComponent } from "../brand-modal/brand-modal.component";

@Component({
  selector: "app-brands-list",
  templateUrl: "./brands-list.component.html",
  styleUrls: ["./brands-list.component.scss"],
})
export class BrandsListComponent implements OnInit {
  brands!: IBrand[];
  newBrand: IBrand = { id: 0, name: "" };

  constructor(
    private brandService: BrandService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.brandService.getBrands().subscribe((brands: IBrand[]) => {
      this.brands = brands;
    });
  }

  createBrand() {
    //TODO: add message
    if (this.newBrand.name == "") return;
    this.brandService.createBrand(this.newBrand).subscribe((brand: IBrand) => {
      this.brands.push(brand);
      this.newBrand = { id: 0, name: "" };
    });
  }

  async presentModal(item: IBrand) {
    const modal = await this.modalController.create({
      component: BrandModalComponent,
      cssClass: "my-custom-class",
      componentProps: {
        brand: item,
      },
    });
    modal.onWillDismiss().then(() => {
      this.ngOnInit();
    });
    return await modal.present();
  }
}
