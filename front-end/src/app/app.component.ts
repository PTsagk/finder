import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { ModalController, Platform } from "@ionic/angular";
import { menuController } from "@ionic/core";
import { MyCartPage } from "./my-cart/my-cart.page";
import { TranslationsService } from "./services/translations.service";
import { UserService } from "./services/user.service";
import { UtilService } from "./services/util.service";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  public isMenuEnabled: boolean = true;
  public selectedIndex = 0;

  isAdmin = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private util: UtilService,
    private router: Router,
    private userService: UserService,
    private modalController: ModalController,
    public t: TranslationsService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.selectedIndex = 1;

    this.util.getMenuState().subscribe((menuState) => {
      this.isMenuEnabled = menuState;
    });

    this.userService.userInfo.subscribe((user) => {
      if (user) {
        this.isAdmin = user.is_admin;
      }
    });
  }

  navigate(path, selectedId) {
    this.selectedIndex = selectedId;
    this.router.navigate([path]);
  }
  async openCartModal() {
    const modal = await this.modalController.create({
      component: MyCartPage,
      cssClass: "cart-modal",
    });

    return await modal.present();
  }

  close() {
    menuController.toggle();
  }
}
