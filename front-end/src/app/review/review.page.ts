import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ProductService } from "app/services/product.service";
import { UserService } from "app/services/user.service";

@Component({
  selector: "app-review",
  templateUrl: "./review.page.html",
  styleUrls: ["./review.page.scss"],
})
export class ReviewPage implements OnInit {
  @Input() product: any;
  description: string = "";
  rating: number = 1;
  constructor(
    public modalController: ModalController,
    private productService: ProductService,
    private userService: UserService
  ) {}

  ngOnInit() {}

  setRating(star: number) {
    console.log(star);
    this.rating = star;
  }

  createReview() {
    this.productService
      .createProductReview({
        score: this.rating,
        description: this.description,
        product_id: this.product.id,
        user_id: this.userService.userInfo.getValue().id,
      })
      .subscribe((res) => {
        console.log(res);
        this.modalController.dismiss();
      });
  }
}
