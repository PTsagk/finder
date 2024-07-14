import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { BrandService, IBrand } from "app/services/brand.service";
import { ColorService, IColor } from "app/services/color.service";
import { FilterService, IFilters } from "app/services/filter.service";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
})
export class FilterComponent implements OnInit {
  filters: IFilters = {};
  brands: IBrand[] = [];
  colors: IColor[] = [];
  constructor(
    public modalController: ModalController,
    private brandService: BrandService,
    private colorService: ColorService,
    private filterService: FilterService
  ) {}
  ngOnInit() {
    this.brandService.getBrands().subscribe((brands: IBrand[]) => {
      this.brands = brands;
    });
    this.colorService.getColors().subscribe((colors: IColor[]) => {
      this.colors = colors;
    });
    this.filters = this.filterService.filters;
  }

  cancel() {
    this.modalController.dismiss(this.filters);
  }
  apply() {
    this.filterService.setFilters(this.filters);
    this.modalController.dismiss(this.filters);
  }

  clear() {
    this.filters = {};
    this.filterService.setFilters({});
  }

  selectBrand(ev: CustomEvent) {
    this.filters.brand_ids = ev.detail.value;
  }
  selectColors(ev: CustomEvent) {
    this.filters.color_ids = ev.detail.value;
  }
}
