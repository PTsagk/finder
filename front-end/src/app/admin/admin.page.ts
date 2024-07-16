import { Component, OnInit } from "@angular/core";
import { TranslationsService } from "app/services/translations.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.page.html",
  styleUrls: ["./admin.page.scss"],
})
export class AdminPage implements OnInit {
  showBrandPage = "brand";
  constructor(public t: TranslationsService) {}
  ngOnInit(): void {}

  changePage(event: any): void {
    this.showBrandPage = event.detail.value;
  }
}
