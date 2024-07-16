import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { TranslationsService } from "app/services/translations.service";
import { UserService } from "../services/user.service";
import { UtilService } from "../services/util.service";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.page.html",
  styleUrls: ["./welcome.page.scss"],
})
export class WelcomePage implements OnInit {
  constructor(
    private util: UtilService,
    private userService: UserService,
    private navCtrl: NavController,
    public t: TranslationsService
  ) {}

  ngOnInit() {
    this.userService.userInfo.subscribe((user) => {
      if (user) {
        this.util.setMenuState(true);
        this.navCtrl.navigateRoot("/home", { animationDirection: "forward" });
      }
    });
  }
}
