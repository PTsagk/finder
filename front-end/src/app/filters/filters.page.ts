import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.page.html",
  styleUrls: ["./filters.page.scss"],
})
export class FiltersPage implements OnInit {
  constructor(public modalController: ModalController) {}

  ngOnInit() {}
}
