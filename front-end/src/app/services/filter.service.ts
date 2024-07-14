import { Injectable } from "@angular/core";

export interface IFilters {
  brand_ids?: number[];
  color_ids?: number[];
}

@Injectable({
  providedIn: "root",
})
export class FilterService {
  filters: IFilters = {};

  constructor() {}

  setFilters(filters: IFilters): void {
    this.filters = filters;
  }
}
