import { Component, OnInit } from "@angular/core";
import { BrandService, IBrand } from "app/services/brand.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.page.html",
  styleUrls: ["./admin.page.scss"],
})
export class AdminPage implements OnInit {
  brands!: IBrand[];
  newBrand: IBrand = { id: 0, name: "" };
  constructor(private brandService: BrandService) {}

  ngOnInit() {
    this.brandService.getBrands().subscribe((brands: IBrand[]) => {
      console.log(brands);
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

  deleteBrand(brand: IBrand) {
    console.log(brand);
    this.brandService
      .deleteBrand(brand)
      .subscribe(
        () =>
          (this.brands = this.brands.filter((brand_) => brand_.id != brand.id))
      );
  }
}
