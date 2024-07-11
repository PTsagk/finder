import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IUser, UserService } from "../user.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  user = new BehaviorSubject<IUser | null>(null);
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.userInfo.subscribe((user) => {
      if (user) {
        this.user.next(user);
      }
    });
  }
  update() {
    this.userService.userUpdate(this.user.getValue());
  }

  logout() {
    this.userService.userLogout();
  }
}
