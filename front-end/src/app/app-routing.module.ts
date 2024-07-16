import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "welcome",
    pathMatch: "full",
  },
  {
    path: "folder/:id",
    loadChildren: () =>
      import("./folder/folder.module").then((m) => m.FolderPageModule),
  },
  {
    path: "welcome",
    loadChildren: () =>
      import("./welcome/welcome.module").then((m) => m.WelcomePageModule),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./signup/signup.module").then((m) => m.SignupPageModule),
  },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "item-details",
    loadChildren: () =>
      import("./item-details/item-details.module").then(
        (m) => m.ItemDetailsPageModule
      ),
  },
  {
    path: "my-cart",
    loadChildren: () =>
      import("./my-cart/my-cart.module").then((m) => m.MyCartPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./profile/profile.module").then((m) => m.ProfilePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "my-orders",
    loadChildren: () =>
      import("./my-orders/my-orders.module").then((m) => m.MyOrdersPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "favorite",
    loadChildren: () =>
      import("./favorite/favorite.module").then((m) => m.FavoritePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "checkout",
    loadChildren: () =>
      import("./checkout/checkout.module").then((m) => m.CheckoutPageModule),
  },
  {
    path: "confirm",
    loadChildren: () =>
      import("./confirm/confirm.module").then((m) => m.ConfirmPageModule),
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "test",
    loadChildren: () =>
      import("./test/test.module").then((m) => m.TestPageModule),
  },
  {
    path: "review",
    loadChildren: () =>
      import("./review/review.module").then((m) => m.ReviewPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
