import { Routes } from "@angular/router";
import { sortNumbersRoutes } from "../sort-numbers/sort-numbers.routes";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "sort-numbers",
  },
  ...sortNumbersRoutes,
];
