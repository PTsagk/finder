import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { BrandService, IBrand } from "app/services/brand.service";

export interface IFilter {
  brand_id?: number;
}

@Component({
  selector: "app-filters",
  templateUrl: "./filters.page.html",
  styleUrls: ["./filters.page.scss"],
})
export class FiltersPage implements OnInit {
  filters: IFilter = {};
  brands: IBrand[] = [];
  constructor(
    public modalController: ModalController,
    private brandService: BrandService
  ) {}

  ngOnInit() {
    this.brandService.getBrands().subscribe((brands: IBrand[]) => {
      this.brands = brands;
    });
  }
}
