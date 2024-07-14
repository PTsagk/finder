import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ColorService, IColor } from "app/services/color.service";
import { PopupColorComponent } from "../popup-color/popup-color.component";

@Component({
  selector: "app-color-admin",
  templateUrl: "./color-admin.component.html",
  styleUrls: ["./color-admin.component.scss"],
})
export class ColorAdminComponent implements OnInit {
  colors!: IColor[];
  newColor: IColor = { id: 0, name: "" };

  constructor(
    private colorService: ColorService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.colorService.getColors().subscribe((colors: IColor[]) => {
      this.colors = colors;
    });
  }

  createColor() {
    //TODO: add message
    if (this.newColor.name == "") return;
    this.colorService.createColor(this.newColor).subscribe((color: IColor) => {
      this.colors.push(color);
      this.newColor = { id: 0, name: "" };
    });
  }

  async presentModal(item: IColor) {
    const modal = await this.modalController.create({
      component: PopupColorComponent,
      cssClass: "my-custom-class",
      componentProps: {
        color: item,
      },
    });
    modal.onWillDismiss().then(() => {
      this.ngOnInit();
    });
    return await modal.present();
  }
}
