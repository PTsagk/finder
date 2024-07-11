import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { updateShorthandPropertyAssignment } from "typescript";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {
    this.http
      .get("http://localhost:8000/user/auth", { withCredentials: true })
      .subscribe((data) => {
        this.userInfo.next(data);
      });
  }

  userInfo = new BehaviorSubject<any>(null);

  userLogin(user) {
    this.http
      .post(
        "http://localhost:8000/user/login",
        {
          username: user.email,
          password: user.password,
        },
        { withCredentials: true }
      )
      .subscribe(
        (data) => {
          this.userInfo.next(data);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  userRegister(user) {
    this.http
      .post(
        "http://localhost:8000/user/register",
        {
          user,
        },
        { withCredentials: true }
      )
      .subscribe((data) => {
        console.log(user);
        this.userInfo.next(user);
      });
  }
}
