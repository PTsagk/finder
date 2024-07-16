import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ColorService, IColor } from "app/services/color.service";
import { TranslationsService } from "app/services/translations.service";

@Component({
  selector: "app-popup-color",
  templateUrl: "./popup-color.component.html",
  styleUrls: ["./popup-color.component.scss"],
})
export class PopupColorComponent implements OnInit {
  @Input() color!: IColor;

  constructor(
    private colorService: ColorService,
    private modalController: ModalController,
    public t: TranslationsService
  ) {}

  ngOnInit() {}

  deleteColor() {
    this.colorService.deleteColor(this.color).subscribe(() => {
      this.modalController.dismiss(null);
    });
  }

  updateColor() {
    //TODO: add message
    if (this.color.name == "") return;
    this.colorService.updateColor(this.color).subscribe((color: IColor) => {
      this.modalController.dismiss(null);
    });
  }
}
