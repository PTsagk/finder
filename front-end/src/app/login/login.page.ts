import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { UserService } from "../services/user.service";
import { UtilService } from "../services/util.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  user = {};
  constructor(
    private util: UtilService,
    private navCtrl: NavController,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.userInfo.subscribe((user) => {
      if (user) {
        this.util.setMenuState(true);
        this.navCtrl.navigateRoot("/home", { animationDirection: "forward" });
      }
    });
  }

  login() {
    // Enabling Side Menu

    this.userService.userLogin(this.user);
    // this.util.setMenuState(true);
    // this.navCtrl.navigateRoot("/home", { animationDirection: "forward" });
  }
}
