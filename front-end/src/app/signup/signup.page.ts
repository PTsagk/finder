import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import { UtilService } from "../services/util.service";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
})
export class SignupPage implements OnInit {
  user = {};
  constructor(
    private userService: UserService,
    private util: UtilService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  register() {
    this.userService.userRegister(this.user);
    this.userService.userInfo.subscribe((user) => {
      if (user) {
        this.util.setMenuState(true);
        this.navCtrl.navigateRoot("/home", { animationDirection: "forward" });
      }
    });
  }
}
