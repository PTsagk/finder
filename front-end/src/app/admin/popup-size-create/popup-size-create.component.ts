import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ISize, SizeService } from "app/services/size.service";

@Component({
  selector: "app-popup-size-create",
  templateUrl: "./popup-size-create.component.html",
  styleUrls: ["./popup-size-create.component.scss"],
})
export class PopupSizeCreateComponent implements OnInit {
  @Input() size!: ISize;

  constructor(
    private sizeService: SizeService,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  deleteSize() {
    this.sizeService.deleteSize(this.size).subscribe(() => {
      this.modalController.dismiss(null);
    });
  }

  updateSize() {
    //TODO: add message
    if (this.size.name == "") return;
    this.sizeService.updateSize(this.size).subscribe((size: ISize) => {
      this.modalController.dismiss(null);
    });
  }
}
