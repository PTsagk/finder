import { Component, Input, OnInit } from "@angular/core";
import { AnimationController, ModalController } from "@ionic/angular";
import { ReviewPage } from "app/review/review.page";
import { CartService } from "app/services/cart.service";
import { IProduct, ProductService } from "app/services/product.service";
import { ISize, SizeService } from "app/services/size.service";

@Component({
  selector: "app-item-details",
  templateUrl: "./item-details.page.html",
  styleUrls: ["./item-details.page.scss"],
})
export class ItemDetailsPage implements OnInit {
  selectedSize: number = 1;
  selectedColor: number = 1;
  activeVariation: string;
  itemInfo: any;
  productCount = 0;
  public reviews = [];
  @Input() product: IProduct;
  sizes: ISize[] = [];

  constructor(
    private animatioCntrl: AnimationController,
    private productService: ProductService,
    private cartService: CartService,
    public modalController: ModalController,
    private sizeService: SizeService
  ) {}

  ngOnInit() {
    this.activeVariation = "size";
    this.cartService.cartProducts.subscribe((products) => {
      this.productCount = 0;
      products.forEach((product) => {
        this.productCount += product.quantity;
      });
    });

    this.productService
      .getProductReviews(this.product.id)
      .subscribe((reviews: any) => {
        console.log(reviews);
        this.reviews = reviews;
      });

    this.sizeService.getSizes().subscribe((sizes: any) => {
      console.log(sizes);
      console.log(this.product);
      this.sizes = sizes.filter((size) =>
        this.product.size_ids.includes(size.id)
      );
      console.log(this.sizes);
    });
  }

  segmentChanged(e: any) {
    this.activeVariation = e.detail.value;

    if (this.activeVariation == "color") {
      this.animatioCntrl
        .create()
        .addElement(document.querySelector(".sizes"))
        .duration(500)
        .iterations(1)
        .fromTo("transform", "translateX(0px)", "translateX(100%)")
        .fromTo("opacity", "1", "0.2")
        .play();

      this.animatioCntrl
        .create()
        .addElement(document.querySelector(".colors"))
        .duration(500)
        .iterations(1)
        .fromTo("transform", "translateX(-100%)", "translateX(0)")
        .fromTo("opacity", "0.2", "1")
        .play();
    } else {
      this.animatioCntrl
        .create()
        .addElement(document.querySelector(".sizes"))
        .duration(500)
        .iterations(1)
        .fromTo("transform", "translateX(100%)", "translateX(0)")
        .fromTo("opacity", "0.2", "1")
        .play();

      this.animatioCntrl
        .create()
        .addElement(document.querySelector(".colors"))
        .duration(500)
        .iterations(1)
        .fromTo("transform", "translateX(0px)", "translateX(-100%)")
        .fromTo("opacity", "1", "0.2")
        .play();
    }
  }

  changeSize(size: number) {
    this.selectedSize = size;
  }

  changeColor(color: number) {
    this.selectedColor = color;
  }

  addToCart() {
    this.cartService.addToCart({
      ...this.product,
      quantity: 1,
      size: this.selectedSize,
      color: this.selectedColor,
    });
  }

  async addReviewModal() {
    const modal = await this.modalController.create({
      component: ReviewPage,
      componentProps: {
        product: this.product,
      },
    });
    await modal.present();

    await modal.onDidDismiss();
    this.productService
      .getProductReviews(this.product.id)
      .subscribe((reviews: any) => {
        console.log(reviews);
        this.reviews = reviews;
      });
  }
}
