import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface IBrand {
  id: number;
  name: string;
}

@Injectable({
  providedIn: "root",
})
export class BrandService {
  constructor(private http: HttpClient) {}

  getBrands() {
    return this.http.post("http://localhost:8000/brand/get_brands", {});
  }

  createBrand(brand: IBrand) {
    return this.http.post("http://localhost:8000/brand/create", brand, {
      withCredentials: true,
    });
  }

  updateBrand(brand: IBrand) {
    return this.http.put("http://localhost:8000/brand/update", brand, {
      withCredentials: true,
    });
  }
  deleteBrand(brand: IBrand) {
    return this.http.post("http://localhost:8000/brand/delete", brand, {
      withCredentials: true,
    });
  }
}
