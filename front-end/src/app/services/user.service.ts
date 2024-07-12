import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  is_admin: boolean;
  address: string;
  phone: string;
}

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {
    this.http
      .get("http://localhost:8000/user/auth", { withCredentials: true })
      .subscribe((data: any) => {
        this.userInfo.next(data);
      });
  }

  userInfo = new BehaviorSubject<IUser | null>(null);

  userLogin(user) {
    this.http
      .post(
        "http://localhost:8000/user/login",
        {
          username: user.username,
          password: user.password,
        },
        { withCredentials: true }
      )
      .subscribe(
        (data: any) => {
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
          ...user,
        },
        { withCredentials: true }
      )
      .subscribe((data) => {
        console.log(user);
        this.userInfo.next(user);
      });
  }

  userUpdate(user) {
    this.http
      .put(
        "http://localhost:8000/user/update",
        {
          ...user,
        },
        { withCredentials: true }
      )
      .subscribe((data) => {
        console.log(user);
        this.userInfo.next(user);
      });
  }

  userLogout() {
    this.http
      .post("http://localhost:8000/user/logout", {}, { withCredentials: true })
      .subscribe((data) => {
        console.log(data);
        this.userInfo.next(null);
        this.router.navigate(["login"]);
      });
  }
}
