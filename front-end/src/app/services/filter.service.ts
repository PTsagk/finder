import { Injectable } from "@angular/core";

export interface IFilters {
  search?: string;
  brand_ids?: number[];
  color_ids?: number[];
  size_ids?: number[];
  category?: string;
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

  clearFilters() {
    this.filters = {};
  }
}
