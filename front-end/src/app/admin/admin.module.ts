import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AdminPageRoutingModule } from "./admin-routing.module";

import { AdminPage } from "./admin.page";
import { BrandModalComponent } from "./brand-modal/brand-modal.component";
import { BrandsListComponent } from "./brands-list/brands-list.component";
import { ProductCreatePopupComponent } from "./product-create-popup/product-create-popup.component";
import { ProductListComponent } from "./product-list/product-list.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AdminPageRoutingModule],
  declarations: [
    AdminPage,
    BrandsListComponent,
    BrandModalComponent,
    ProductListComponent,
    ProductCreatePopupComponent,
  ],
})
export class AdminPageModule {}
