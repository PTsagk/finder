import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { BrandService, IBrand } from "app/services/brand.service";
import { ColorService, IColor } from "app/services/color.service";
import {
  FilterService,
  IFilters,
  ISortOptions,
} from "app/services/filter.service";
import { ISize, SizeService } from "app/services/size.service";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
})
export class FilterComponent implements OnInit {
  filters: IFilters = {};
  brands: IBrand[] = [];
  colors: IColor[] = [];
  sizes: ISize[] = [];
  readonly sortOptions: ISortOptions[] = [
    { name: "Relevancy", value: "relevancy" },
    { name: "Substring Matches", value: "substring_matches" },
    { name: "Exact Matches", value: "exact_matches" },
    { name: "Reviews Score", value: "reviews_score" },
    { name: "Reviews Count", value: "reviews_count" },
    { name: "Rated Reviews Count", value: "rated_reviews_count" },
    { name: "Date Added", value: "date_added" },
    { name: "Number Of Sales", value: "number_of_sales" },
    { name: "Featured", value: "featured" },
    { name: "Favorite First", value: "favorite_first" },
  ];
  constructor(
    public modalController: ModalController,
    private brandService: BrandService,
    private colorService: ColorService,
    private sizeService: SizeService,
    private filterService: FilterService
  ) {}
  ngOnInit() {
    this.brandService.getBrands().subscribe((brands: IBrand[]) => {
      this.brands = brands;
    });
    this.colorService.getColors().subscribe((colors: IColor[]) => {
      this.colors = colors;
    });
    this.sizeService.getSizes().subscribe((sizes: IColor[]) => {
      this.sizes = sizes;
    });
    this.filters = this.filterService.filters;
  }

  cancel() {
    this.modalController.dismiss();
  }
  apply() {
    this.filterService.setFilters(this.filters);
    this.modalController.dismiss();
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
  selectSizes(ev: CustomEvent) {
    this.filters.size_ids = ev.detail.value;
  }
  selectSortBy(ev: CustomEvent) {
    this.filters.sortBy = ev.detail.value;
  }
}
