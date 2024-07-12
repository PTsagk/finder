import { Component, OnInit } from "@angular/core";
import { UtilService } from "../services/util.service";
import { NavController } from "@ionic/angular";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.page.html",
  styleUrls: ["./welcome.page.scss"],
})
export class WelcomePage implements OnInit {
  constructor(
    private util: UtilService,
    private userService: UserService,
    private navCtrl: NavController
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
