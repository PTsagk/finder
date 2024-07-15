import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ISize, SizeService } from "app/services/size.service";
import { PopupSizeCreateComponent } from "../popup-size-create/popup-size-create.component";

@Component({
  selector: "app-sizes-admin",
  templateUrl: "./sizes-admin.component.html",
  styleUrls: ["./sizes-admin.component.scss"],
})
export class SizesAdminComponent implements OnInit {
  sizes!: ISize[];
  newSize: ISize = { id: 0, name: "" };

  constructor(
    private sizeService: SizeService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.sizeService.getSizes().subscribe((sizes: ISize[]) => {
      this.sizes = sizes;
    });
  }

  createSize() {
    //TODO: add message
    if (this.newSize.name == "") return;
    this.sizeService.createSize(this.newSize).subscribe((size: ISize) => {
      this.sizes.push(size);
      this.newSize = { id: 0, name: "" };
    });
  }

  async presentModal(item: ISize) {
    const modal = await this.modalController.create({
      component: PopupSizeCreateComponent,
      cssClass: "my-custom-class",
      componentProps: {
        size: item,
      },
    });
    modal.onWillDismiss().then(() => {
      this.ngOnInit();
    });
    return await modal.present();
  }
}
