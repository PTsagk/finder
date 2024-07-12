import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.page.html",
  styleUrls: ["./admin.page.scss"],
})
export class AdminPage implements OnInit {
  showBrandPage = true;
  constructor() {}
  ngOnInit(): void {}

  changePage(event: any): void {
    this.showBrandPage = event.detail.value === "brand";
  }
}
