import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { BrandService, IBrand } from "app/services/brand.service";

@Component({
  selector: "app-brand-modal",
  templateUrl: "./brand-modal.component.html",
  styleUrls: ["./brand-modal.component.scss"],
})
export class BrandModalComponent implements OnInit {
  @Input() brand!: IBrand;
  constructor(
    private brandService: BrandService,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  deleteBrand() {
    this.brandService.deleteBrand(this.brand).subscribe(() => {
      this.modalController.dismiss(null);
    });
  }

  updateBrand() {
    //TODO: add message
    if (this.brand.name == "") return;
    this.brandService.updateBrand(this.brand).subscribe((brand: IBrand) => {
      this.modalController.dismiss(null);
    });
  }
}
