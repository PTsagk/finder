import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-confirm",
  templateUrl: "./confirm.page.html",
  styleUrls: ["./confirm.page.scss"],
})
export class ConfirmPage implements OnInit {
  constructor(public modalController: ModalController) {}

  ngOnInit() {}
  close() {
    this.modalController.dismiss({ dismissed: true });
  }
}
