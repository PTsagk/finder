import { Injectable } from "@angular/core";

export interface ISortOptions {
  name: string;
  value: SortBy;
}

export type SortBy =
  | "relevancy"
  | "substring_matches"
  | "exact_matches"
  | "reviews_score"
  | "reviews_count"
  | "rated_reviews_count"
  | "date_added"
  | "number_of_sales"
  | "featured"
  | "favorite_first";

export interface IFilters {
  search?: string;
  brand_ids?: number[];
  color_ids?: number[];
  size_ids?: number[];
  category?: string;
  sortBy?: SortBy;
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
