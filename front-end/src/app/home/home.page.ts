import { Component, OnInit, ViewChild } from "@angular/core";
import { DataService } from "../data.service";
import { ModalController } from "@ionic/angular";
import { FiltersPage } from "app/filters/filters.page";
// import { ModalPage } from '../modal/modal.page';
// @ts-ignore
// import { ModalPage } from "../modal/modal.page";
// import { OverlayEventDetail } from "@ionic/core/components";
@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  public categories = [];
  public featuredProducts = [];
  public bestSellProducts = [];

  constructor(
    private data: DataService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.categories = this.data.getCategories();
    this.featuredProducts = this.data.getFeaturedProducts();
    this.bestSellProducts = this.data.getBestSellProducts();
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: FiltersPage,
      cssClass: "my-custom-class",
    });
    return await modal.present();
  }
}
