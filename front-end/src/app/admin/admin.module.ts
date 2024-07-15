import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AdminPageRoutingModule } from "./admin-routing.module";

import { AdminPage } from "./admin.page";
import { BrandModalComponent } from "./brand-modal/brand-modal.component";
import { BrandsListComponent } from "./brands-list/brands-list.component";
import { ColorAdminComponent } from "./color-admin/color-admin.component";
import { PopupColorComponent } from "./popup-color/popup-color.component";
import { PopupSizeCreateComponent } from "./popup-size-create/popup-size-create.component";
import { ProductCreatePopupComponent } from "./product-create-popup/product-create-popup.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { SizesAdminComponent } from "./sizes-admin/sizes-admin.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AdminPageRoutingModule],
  declarations: [
    AdminPage,
    BrandsListComponent,
    BrandModalComponent,
    ProductListComponent,
    ProductCreatePopupComponent,
    ColorAdminComponent,
    PopupColorComponent,
    SizesAdminComponent,
    PopupSizeCreateComponent,
  ],
})
export class AdminPageModule {}
