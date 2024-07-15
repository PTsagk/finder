import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ItemDetailsPage } from "app/item-details/item-details.page";
import { FavouriteService } from "app/services/favourite.service";

@Component({
  selector: "app-favorite",
  templateUrl: "./favorite.page.html",
  styleUrls: ["./favorite.page.scss"],
})
export class FavoritePage implements OnInit {
  favoriteProducts = [];
  constructor(
    private favoriteService: FavouriteService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.favoriteService.getFavorites().subscribe((products: any) => {
      console.log(products);

      this.favoriteProducts = products;
    });
  }

  async openItemDetails(product: any) {
    const modal = await this.modalController.create({
      component: ItemDetailsPage,
      cssClass: "my-custom-class",
      componentProps: {
        product,
      },
    });

    return await modal.present();
  }
}
