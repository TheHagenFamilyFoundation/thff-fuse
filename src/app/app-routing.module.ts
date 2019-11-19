import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "users", redirectTo: "users" },
    { path: "settings", redirectTo: "settings" },
    {
        path: "pages",
        loadChildren: "./main/pages/pages.module#PagesModule"
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
