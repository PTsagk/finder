import { Product } from "../models/product.model";
import { User } from "../models/user.model";

export interface IFavouriteCreate {
  product: Product;
  user: User;
}
