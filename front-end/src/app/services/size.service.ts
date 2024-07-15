import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface ISize {
  id: number;
  name: string;
}

@Injectable({
  providedIn: "root",
})
export class SizeService {
  constructor(private http: HttpClient) {}

  getSizes() {
    return this.http.post("http://localhost:8000/size/get_sizes", {});
  }

  createSize(size: ISize) {
    return this.http.post("http://localhost:8000/size/create", size, {
      withCredentials: true,
    });
  }

  updateSize(size: ISize) {
    return this.http.put("http://localhost:8000/size/update", size, {
      withCredentials: true,
    });
  }
  deleteSize(size: ISize) {
    return this.http.post("http://localhost:8000/size/delete", size, {
      withCredentials: true,
    });
  }
}
