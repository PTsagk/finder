import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface IColor {
  id: number;
  name: string;
}

@Injectable({
  providedIn: "root",
})
export class ColorService {
  constructor(private http: HttpClient) {}

  getColors() {
    return this.http.post("http://localhost:8000/color/get_colors", {});
  }

  createColor(color: IColor) {
    return this.http.post("http://localhost:8000/color/create", color, {
      withCredentials: true,
    });
  }

  updateColor(color: IColor) {
    return this.http.put("http://localhost:8000/color/update", color, {
      withCredentials: true,
    });
  }
  deleteColor(color: IColor) {
    return this.http.post("http://localhost:8000/color/delete", color, {
      withCredentials: true,
    });
  }
}
